const puppeteer = require('puppeteer');
const WebSocket = require('ws');

describe('End-to-End Test', () => {
  test('should display the homepage', async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: puppeteer.executablePath(),
      timeout: 10000,
    });
    const page = await browser.newPage();
    await page.goto('http://google.com');
    await expect(page.title()).resolves.toMatch('Google');
    await browser.close();
  });
});

