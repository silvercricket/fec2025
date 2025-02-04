/*global describe beforeAll it page expect*/
/*eslint no-undef: "error"*/

import "expect-puppeteer";

describe("App Homepage", () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  }, 600000);

  it('should have a title of eastbluelegends', async () => {
    const title = await page.title();
    expect(title).toBe('eastbluelegends');
  }, 600000);
});