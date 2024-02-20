import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import express from "express";
puppeteer.use(StealthPlugin());
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // executablePath: "/usr/bin/google-chrome-stable",
    args: [
      "--start-maximized",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--window-size=1920,1080",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
    userDataDir: "./profile",
  });

  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  // Setup API server to open page
  const app = express();
  const port = 3000;
  app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
  });
  app.get("/get-sponsored", async (req, res) => {
    const { targetUrl } = req.query;

    if (!targetUrl) {
      return res.status(400).send({
        status: "error",
        message: "targetUrl is required",
      });
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

    const response = await page.evaluate(async (formattedUrl) => {
      const response = await fetch(formattedUrl);
      return response;
    }, formattedUrl);

    var keywords = JSON.parse(response.responseText);
    keywords.forEach((keyword, index) => {
      console.log("Open gooogle search for keyword :>> ", keyword);
      setTimeout(() => {
        // window.open(`https://www.google.com/search?q=${keyword}`, "_blank");
      }, index * 10000); // Delay each open by 10 seconds (10000 milliseconds)
    });
    console.log(response);

    await page.close();
    res.send({
      status: "success",
      message: `Loaded ${formattedUrl}`,
      keywords,
    });
  });
})();
