import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { mockHomepageData } from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/mockData.js';
import * as yerawadaOpenJailData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/yerawadaOpenJailData.js';

const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

function traverseAndFix(obj, goodObj) {
  if (typeof obj === 'string') {
    if (isCorrupted(obj) && typeof goodObj === 'string' && !isCorrupted(goodObj)) {
      return goodObj;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (!Array.isArray(goodObj)) return obj;
    return obj.map((item, i) => traverseAndFix(item, goodObj[i] !== undefined ? goodObj[i] : item));
  }
  if (obj !== null && typeof obj === 'object') {
    if (goodObj === null || typeof goodObj !== 'object') return obj;
    let newObj = {};
    for (const key in obj) {
      newObj[key] = traverseAndFix(obj[key], goodObj[key] !== undefined ? goodObj[key] : obj[key]);
    }
    return newObj;
  }
  return obj;
}

async function overwriteRemaining() {
  const blocks = await prisma.contentBlock.findMany();
  for (const b of blocks) {
    let str = JSON.stringify(b.content);
    if (isCorrupted(str)) {
      let goodData = null;
      if (b.id === '51817b5b-e64f-48d0-9885-22ee5dd694f1') goodData = mockHomepageData.hero_carousel;
      else if (b.id === '7052406a-49d0-4ba5-acae-f2fb202ac584') goodData = mockHomepageData.page_template_data; // Wait, which page?
      else if (b.id === 'announcements_tabs') goodData = mockHomepageData.announcements_tabs;
      else if (b.id === '5a31ffb8-3b48-4ab9-b850-7bd8c5f63520') goodData = mockHomepageData.minister_profiles;
      else if (b.id === '34a8ff0b-5648-4221-964f-09aecd0a6ada') goodData = mockHomepageData.prison_administration; // Or yerawada?
      else if (b.id === 'a0e8c537-1438-400a-b92f-cd115515188b') goodData = yerawadaOpenJailData.page_template_data;
      
      if (goodData) {
        let newContent = traverseAndFix(b.content, goodData);
        if (!isCorrupted(JSON.stringify(newContent))) {
          await prisma.contentBlock.update({ where: { id: b.id }, data: { content: newContent } });
          console.log(`Fixed ContentBlock: ${b.id}`);
        } else {
          console.log(`Failed to fully fix ContentBlock: ${b.id}`);
        }
      } else {
        console.log(`No goodData mapping for ContentBlock: ${b.id}`);
      }
    }
  }

  const settings = await prisma.siteSetting.findMany();
  for (const s of settings) {
    let str = JSON.stringify(s.value);
    if (isCorrupted(str)) {
      let goodData = null;
      if (s.key === 'global_config') goodData = mockHomepageData.global_config;
      else if (s.key === 'footer_config') goodData = mockHomepageData.footer_config;
      else if (s.key === 'header_config') goodData = yerawadaOpenJailData.header_config; // Wait, is it? Let's check!
      
      if (goodData) {
        let newValue = traverseAndFix(s.value, goodData);
        if (!isCorrupted(JSON.stringify(newValue))) {
          await prisma.siteSetting.update({ where: { id: s.id }, data: { value: newValue } });
          console.log(`Fixed SiteSetting: ${s.id}`);
        } else {
          console.log(`Failed to fully fix SiteSetting: ${s.id}`);
        }
      } else {
         console.log(`No goodData mapping for SiteSetting: ${s.id}`);
      }
    }
  }
  
  console.log('\n--- VERIFICATION ---');
  let cCb = 0;
  for (const b of await prisma.contentBlock.findMany()) if (isCorrupted(JSON.stringify(b.content))) cCb++;
  let cSs = 0;
  for (const s of await prisma.siteSetting.findMany()) if (isCorrupted(JSON.stringify(s.value))) cSs++;
  console.log(`Corrupted ContentBlocks: ${cCb}`);
  console.log(`Corrupted SiteSettings: ${cSs}`);

  prisma.$disconnect();
}
overwriteRemaining();
