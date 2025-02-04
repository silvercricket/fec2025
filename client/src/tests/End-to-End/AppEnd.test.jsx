/*global describe beforeAll it page expect*/
/*eslint no-undef: "error"*/

import "expect-puppeteer";

describe("Google Homepage", () => {
  beforeAll(async () => {

    await page.goto('https://google.com');
  }, 600000);

  it('should display "google" text on page', async () => {
    await expect(page).toMatchTextContent(/Google/);
  }, 600000);
});