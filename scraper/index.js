const puppeteer = require("puppeteer");

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://www.devconf.co.za/capetown");

  const SELECTORS = {
    date: ".sponsor-title-content-second > span",
  };

  const element = await page.waitForSelector(SELECTORS.date);

  console.log("element", element);
  // browser.close();
});
