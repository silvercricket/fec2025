describe('Google', () => {
  beforeAll(async () => {
    await global.page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(global.page.title()).resolves.toMatch('Google');
  });
});

