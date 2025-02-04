<<<<<<< HEAD
/**
 * @jest-environment jest-puppeteer
 */

describe('East Blue Legends', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('page should be titled "East Blue Legends"', async () => {
    await expect(page.title()).resolves.toMatch('eastbluelegends');
  });
});

=======
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
>>>>>>> origin/main
