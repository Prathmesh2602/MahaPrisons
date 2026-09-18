const fs = require('fs');
const path = require('path');
const https = require('https');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode} from ${url}`));
        return;
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
};

async function updateMinisterProfiles() {
  try {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const profiles = [
      {
        "img_src": "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/2025012261249385.jpg",
        "filename": "devendra_fadnavis.jpg",
        "img_alt": "श्री. देवेंद्र फडणवीस",
        "name": "श्री. देवेंद्र फडणवीस",
        "desg": "माननीय मुख्यमंत्री महोदय"
      },
      {
        "img_src": "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/202501221097700001.jpg",
        "filename": "eknath_shinde.jpg",
        "img_alt": "श्री. एकनाथ शिंदे",
        "name": "श्री. एकनाथ शिंदे",
        "desg": "माननीय उपमुख्यमंत्री"
      },
      {
        "img_src": "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602091228963919.jpg",
        "filename": "sunetra_pawar.jpg",
        "img_alt": "श्रीमती. सुनेत्रा पवार",
        "name": "श्रीमती.सुनेत्रा पवार",
        "desg": "माननीय उपमुख्यमंत्री"
      },
      {
        "img_src": "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg",
        "filename": "adg_sir_warke.jpeg",
        "img_alt": "ADG Suhas Warke (IPS)",
        "name": "श्री. सुहास वारके",
        "desg": "Director General of Prisons and Correctional Services"
      },
      {
        "img_src": "http://localhost:5000/uploads/yogesh_desai.png",
        "img_alt": "Yogesh Desai",
        "name": "श्री. योगेश देसाई",
        "desg": "विशेष कारागृह महानिरीक्षक, महाराष्ट्र राज्य"
      },
      {
        "img_src": "http://localhost:5000/uploads/Sunil_Dhamal.png",
        "img_alt": "Sunil Dhamal",
        "name": "श्री. सुनील ढमाळ",
        "desg": "कारागृह उपमहानिरीक्षक, पश्चिम विभाग, येरवडा"
      },
      {
        "img_src": "http://localhost:5000/uploads/Shamkant_shedge.png",
        "img_alt": "Shamkant Shedge",
        "name": "श्री. शामकांत शालन चंद्रकांत शेडगे",
        "desg": "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१"
      }
    ];

    const newContent = [];

    for (const profile of profiles) {
      let finalImgSrc = profile.img_src;
      if (profile.filename) {
        const filepath = path.join(uploadDir, profile.filename);
        if (!fs.existsSync(filepath)) {
          console.log(`Downloading ${profile.filename}...`);
          await downloadImage(profile.img_src, filepath);
          console.log(`Downloaded ${profile.filename}`);
        } else {
          console.log(`${profile.filename} already exists.`);
        }
        finalImgSrc = `http://localhost:5000/uploads/${profile.filename}`;
      }
      
      newContent.push({
        img_src: finalImgSrc,
        img_alt: profile.img_alt,
        name: profile.name,
        desg: profile.desg
      });
    }

    console.log('Finding minister_profiles block in database...');
    const block = await prisma.contentBlock.findFirst({
      where: { blockType: 'minister_profiles' }
    });

    if (block) {
      console.log(`Updating block ${block.id}...`);
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: newContent }
      });
      console.log('Minister Profiles block updated successfully with the primary web data!');
    } else {
      console.log('Minister Profiles block not found in database. Cannot update.');
    }

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMinisterProfiles();
