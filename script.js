const WALLET_LINK_URL = "https://www.walletlink.org/2.0";

const setupQRCode = (uri) => {
  let qrcode = new QRCode(document.getElementById("qrcode"), {
    text: uri,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  document.getElementById("qr-link").href = uri;
};

const setupButton = () => {
  let button = document.getElementById("connect-btn");
  let spinner = document.getElementById("spinner");

  button.addEventListener("click", async () => {
    button.classList.add("is-loading");
    spinner.classList.remove("is-hidden");

    try {
      let uri = await WalletLink.generateWalletLink(WALLET_LINK_URL);
      setupQRCode(uri);
    } catch (e) {
      console.error(e);
      alert("Failed to generate wallet link");
    }

    button.classList.remove("is-loading");
    spinner.classList.add("is-hidden");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  setupButton();
});
