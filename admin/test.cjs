const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR CONSOLE:', msg.text());
  });
  page.on('pageerror', err => console.error('BROWSER PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173');
  
  await page.evaluate(() => {
    localStorage.setItem('token', 'fake-token-bypass');
  });

  await page.goto('http://localhost:5173/page-editor?slug=/cultural/awareness-programs');
  
  try {
    await page.waitForFunction(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some(b => b.textContent.includes('Change Layout'));
    }, { timeout: 10000 });
    
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('Change Layout'));
      if (btn) btn.click();
    });
    console.log('Clicked Change Layout button');
    
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div'));
      const card = cards.find(c => c.textContent && c.textContent.includes('Hero Features Timeline') && c.textContent.includes('Hero section, features grid'));
      if (card) {
        // Find closest clickable parent or click the card itself
        card.click();
      }
    });
    console.log('Clicked Hero Features Timeline');
    
    await page.waitForTimeout(3000);
    console.log('Done waiting after click.');
  } catch(e) {
    console.log('Error during Puppeteer interaction:', e);
  }
  
  await browser.close();
})();
