import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";
const CRX_PATH = "tampermonkey_stable";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: "/usr/bin/google-chrome-stable",
    args: [
      "--start-maximized",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      `--disable-extensions-except=${CRX_PATH}`,
      `--load-extension=${CRX_PATH}`,
    ],
    ignoreDefaultArgs: ["--disable-extensions"],
    userDataDir: "./profile",
  });

  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);
  await page.goto(
    `chrome-extension://fnifbmiiblhhkafleoiioecbcpphhemm/options.html#nav=dashboard`,
  );
  console.log("Loaded Tampermonkey Dashboard");
})();
