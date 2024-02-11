require("dotenv").config();
const { Telegraf, Scenes, session } = require("telegraf");
const { createCallBackBtn } = require("./utils");
const { importWalletScene, importWalletStep } = require("./scenes");

const bot = new Telegraf(process.env.TG_WALLET_BOT_TOKEN);

const stage = new Scenes.Stage([importWalletStep]);
bot.use(session());
bot.use(stage.middleware());

bot.command("start", (ctx) => {
  const message = `Welcome to the TG Wallet Bot!`;

  const importWalletButton = createCallBackBtn(
    "Import Wallet",
    "import-wallet"
  );

  const showWalletButton = createCallBackBtn("Show Wallet", "show-wallet");

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [[importWalletButton], [showWalletButton]],
    },
  });
});

bot.action("import-wallet", (ctx) => {
  ctx.scene.enter(importWalletScene);
});

bot.action("show-wallet", (ctx) => {
  if (ctx.session.wallet) {
    ctx.reply(`Your wallet address is ${ctx.session.wallet.address}`);
  } else {
    ctx.reply("You have not imported any wallet yet.");
  }
});

bot.launch();
