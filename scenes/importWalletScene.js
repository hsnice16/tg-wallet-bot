const { Scenes } = require("telegraf");
const { generateAccount } = require("../utils");

const importWalletScene = "importWalletScene";
const importWalletStep = new Scenes.BaseScene(importWalletScene);

importWalletStep.enter((ctx) =>
  ctx.reply(
    "Please provide either the private key of the wallet you wish to import or a 12-word mnemonic phrase."
  )
);

importWalletStep.on("text", (ctx) => {
  const phrase = ctx.message.text;

  try {
    const wallet = generateAccount(phrase);

    ctx.session.wallet = wallet;
    ctx.reply(
      `🎉 Your wallet has been successfully imported. Your wallet address is ${wallet.address}.`
    );
  } catch (error) {
    ctx.reply(
      "😔 This does not appear to be a valid private key / mnemonic phrase. Please try again."
    );
  }

  ctx.scene.leave();
});

module.exports = {
  importWalletScene,
  importWalletStep,
};
