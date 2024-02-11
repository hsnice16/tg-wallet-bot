const { Markup } = require("telegraf");
const { encrypt } = require("./encryption");
const { Wallet } = require("ethers");

function createCallBackBtn(btnLabel, cbActionCommand) {
  return Markup.button.callback(btnLabel, cbActionCommand);
}

function generateAccount(phrase, index = 0) {
  /**
   * If the phrase does not contain spaces, it is likely a private key
   */
  const wallet = phrase.includes(" ")
    ? Wallet.fromMnemonic(phrase, `m/44'/60'/0'/0/${index}`)
    : new Wallet(phrase);

  return {
    address: wallet.address,
    privateKey: encrypt(wallet.privateKey),
    mnemonic: encrypt(phrase),
  };
}

module.exports = {
  createCallBackBtn,
  generateAccount,
};
