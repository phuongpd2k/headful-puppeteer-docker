import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import express from "express";
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
      "--window-size=1920,1080",
    ],
    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    userDataDir: "./profile",
  });

  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);
  await page.goto(
    `chrome-extension://fnifbmiiblhhkafleoiioecbcpphhemm/options.html#nav=dashboard`,
  );
  console.log("Loaded Tampermonkey Dashboard");

  // Setup API server to open page
  const app = express();
  const port = 3000;
  app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
  });
  app.get("/open-page", async (req, res) => {
    const { targetUrl } = req.query;

    if (!targetUrl) {
      return res.status(400).send("Missing targetUrl parameter");
    }

    let formattedUrl = targetUrl;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      formattedUrl = `http://${targetUrl}`;
    }

    const parsedUrl = new URL(formattedUrl);
    if (!parsedUrl.hostname) {
      return res.status(400).send("Invalid targetUrl");
    }

    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);
    await page.goto(formattedUrl);
    console.log(`Loaded ${formattedUrl}`);
    res.send("Page opened successfully");
  });
})();
