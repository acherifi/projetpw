import * as puppeteer from 'puppeteer';


describe('e2e temporaire', async () => {
  let page;
  let browser;
  beforeEach(async () => {
    jest.setTimeout(100000);
    browser = await puppeteer.launch({
      headless: false, slowMo: 500, ignoreHTTPSErrors: true
    });
    page = await browser.newPage();
  });

  test('test 1', async () => {
      await page.goto('https://localhost:4200');
      await Promise.all([
        page.waitForNavigation(),
      ]);
      await browser.close();
  });
});
