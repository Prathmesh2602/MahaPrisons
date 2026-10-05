const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
  console.log('=== DATABASE ENCODING AUDIT ===\n');

  const models = [
    { name: 'MenuItem', fields: ['label_mr'] },
    { name: 'PageNode', fields: ['title_mr'] },
    { name: 'ContentBlock', fields: ['content'] },
    { name: 'SiteSetting', fields: ['value'] },
  ];

  for (const model of models) {
    console.log(`\n--- Auditing ${model.name} ---`);
    const records = await prisma[model.name].findMany();
    let corrupted = 0;
    let valid = 0;

    for (const record of records) {
      for (const field of model.fields) {
        let value = record[field];
        if (!value) continue;

        // If it's JSON (like in ContentBlock or SiteSetting), stringify it to search
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }

        if (typeof value === 'string') {
          const isCorrupted = value.includes('a??') || value.includes('Ã') || value.includes('Â');
          // Check for valid devanagari characters (Unicode range 0900-097F)
          const isValidDevanagari = /[\u0900-\u097F]/.test(value);

          if (isCorrupted) {
            corrupted++;
            console.log(`[CORRUPTED] ${model.name} ID: ${record.id} | Field: ${field} | Value (snippet): ${value.substring(0, 50)}`);
          } else if (isValidDevanagari) {
            valid++;
          }
        }
      }
    }
    console.log(`Summary for ${model.name}: ${valid} valid Marathi records, ${corrupted} corrupted records.`);
  }

  await prisma.$disconnect();
}

audit().catch(console.error);
