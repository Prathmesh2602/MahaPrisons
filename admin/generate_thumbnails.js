import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const templates = [
  'HeroFeaturesTimelineLayout',
  'HeroStatsGrid',
  'HeroThreeColGrid',
  'HeroSplitTimeline',
  'HeroFeatureList',
  'ContactInfoGrid',
  'ContentWithRightSidebar',
  'ContentWithTabs',
  'BasicFeatureGrid',
  'CardsAndVerticalTimeline',
  'IconsListWithTimeline',
  'MinimalIconGrid',
  'HeroBannerWithArticles',
  'SideBySideListCards',
  'HeroBannerWithBadges',
  'HeroBannerWithMedia',
  'ContentWithAccordion',
  'ThreeColServiceCards',
  'TwoColEventCards',
  'HeroWithProcessGrid',
  'HeroWithPricingList',
  'HeroWithMenuGrid'
];

const PORT = 3000;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'template-previews');

async function generateThumbnails() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  for (const template of templates) {
    const url = `http://localhost:${PORT}/template-preview?t=${template}`;
    console.log(`Navigating to ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Additional wait just in case images are still rendering
      await new Promise(r => setTimeout(r, 1000));

      const outputPath = path.join(OUTPUT_DIR, `${template}.webp`);
      console.log(`Capturing screenshot to ${outputPath}...`);
      
      await page.screenshot({
        path: outputPath,
        type: 'webp',
        quality: 80,
        fullPage: true
      });
      
      console.log(`✅ Saved ${template}.webp`);
    } catch (err) {
      console.error(`❌ Failed to capture ${template}:`, err.message);
    }
  }

  await browser.close();
  console.log('Done!');
}

generateThumbnails().catch(console.error);
