const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.contentBlock.findMany().then(bs => {
  let emptyMr = 0;
  let validMr = 0;
  bs.forEach(b => {
    const s = JSON.stringify(b.content);
    if (s.match(/"mr"\s*:\s*""/)) emptyMr++;
    else if (s.includes('"mr"')) validMr++;
  });
  console.log('Empty mr:', emptyMr, 'Valid mr:', validMr);
  process.exit(0);
});
