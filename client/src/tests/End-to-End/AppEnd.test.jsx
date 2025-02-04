
/*global describe beforeAll it page expect*/
/*eslint no-undef: "error"*/

import "expect-puppeteer";

describe('East Blue Legends', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('page should be titled "East Blue Legends"', async () => {
    await expect(page.title()).resolves.toMatch('eastbluelegends');
  });
});


