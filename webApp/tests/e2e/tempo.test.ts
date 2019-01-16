import * as puppeteer from 'puppeteer';


describe('e2e temporaire', async () => {
  let page;
  let browser;
  beforeEach(async () => {
    jest.setTimeout(30000);
     // headless: false, slowMo: 100, ignoreHTTPSErrors: true
     /*
     args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
      */
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
     ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
  });

  test('test 1', async () => {
      await page.goto('https://localhost:4200');
      const actualUrl = await page.url();
      expect(actualUrl).toBe('https://localhost:4200/');
      const body = await page.evaluate(() => {
        return {
                'body': document.body.innerText
            };
        });
        const b = body.body.includes('Bienvenue sur Cineweb');
        expect(b).toBe(true);
  });
  afterAll(async () => {
    await browser.close();
  });
});
