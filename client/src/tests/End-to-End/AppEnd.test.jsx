const puppeteer = require("puppeteer");

test("Confirm text on page", async () => {
  global.WebSocket = require('ws');
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("http://google.com");

    let pageHeader = await page.$("#pageTitle");
    let pageHeaderValue = await pageHeader.evaluate((el) => el.textContent);

    expect(pageHeaderValue).toContain("Google");

  } finally {
    await browser.close();
  }
}, 120000);

