

describe('Google', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should be titled "East Blue Legends"', async () => {
    await expect(page.title()).resolves.toMatch('eastbluelegends');
  });
});

