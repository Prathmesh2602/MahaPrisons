const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });
  page.on('pageerror', err => console.error('BROWSER PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173');
  
  await page.evaluate(() => {
    localStorage.setItem('token', 'fake-token-bypass');
  });

  await page.goto('http://localhost:5173/page-editor?slug=/cultural/awareness-programs');
  
  await page.waitForTimeout(5000);
  
  await browser.close();
})();
