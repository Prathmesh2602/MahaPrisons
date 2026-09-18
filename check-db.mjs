import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017/maha-prisons";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db();
    const pages = db.collection('pages');
    
    const homePage = await pages.findOne({ slug: '/' });
    if (!homePage) {
      console.log('Home page not found');
      return;
    }

    const draftBlocks = homePage.draft?.blocks || [];
    const qsBlock = draftBlocks.find((b) => b.type === 'quick_services');
    
    if (qsBlock) {
      console.log("Draft Helplines:", JSON.stringify(qsBlock.data.helplines, null, 2));
    } else {
      console.log("Quick Services block not found in draft");
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
