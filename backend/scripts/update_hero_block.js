const fs = require('fs');
const path = require('path');
const https = require('https');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
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

async function updateHeroBlock() {
  try {
    const imageUrl = "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg";
    const filename = "adg_sir_warke.jpeg";
    const uploadDir = path.join(__dirname, '..', 'uploads');
    const filepath = path.join(uploadDir, filename);

    console.log(`Downloading external image from ${imageUrl}...`);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    if (!fs.existsSync(filepath)) {
      await downloadImage(imageUrl, filepath);
      console.log(`Downloaded image to ${filepath}`);
    } else {
      console.log(`Image already exists at ${filepath}`);
    }

    const localUrl = `http://localhost:5000/uploads/${filename}`;

    const newContent = {
      "directorMessage": {
        "name": {
          "mr": "श्री. सुहास वारके",
          "en": "Shri. Suhas Warke"
        },
        "designation": {
          "mr": "अपर पोलीस महासंचालक व महानिरीक्षक",
          "en": "ADG & Director General"
        },
        "quote": {
          "mr": "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत.",
          "en": "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society."
        },
        "image": localUrl,
        "link": "https://mahaprisons.gov.in/directors-message/"
      },
      "slides": [
        {
          "img_src": "http://localhost:5000/uploads/rehab_hero.png",
          "img_alt": "येरवडा खुले कारागृह",
          "category": {
            "mr": "पुनर्वसन",
            "en": "Rehabilitation"
          },
          "title": {
            "mr": "येरवडा खुले कारागृह",
            "en": "Yerawada Open Prison"
          },
          "statement": {
            "mr": "श्रमातून परिवर्तनाची वाट.",
            "en": "Path of transformation through labor."
          },
          "description": {
            "mr": "शिस्त, कौशल्य, श्रम आणि स्वावलंबनाच्या माध्यमातून पुनर्वसनाची नवी दिशा.",
            "en": "A new direction in rehabilitation through discipline, skills, labor, and self-reliance."
          },
          "cta1": {
            "mr": "आमचा प्रवास",
            "en": "Our Journey",
            "href": "#"
          },
          "cta2": {
            "mr": "उपक्रम पहा",
            "en": "View Initiatives",
            "href": "#"
          }
        },
        {
          "img_src": "http://localhost:5000/uploads/farming_hero.png",
          "img_alt": "शेती उपक्रम",
          "category": {
            "mr": "शेती",
            "en": "Agriculture"
          },
          "title": {
            "mr": "मातीशी नातं",
            "en": "Bond with Soil"
          },
          "statement": {
            "mr": "स्वावलंबनाकडे वाटचाल.",
            "en": "Stepping towards self-reliance."
          },
          "description": {
            "mr": "शेती आणि पूरक उपक्रमांच्या माध्यमातून कौशल्य आणि जबाबदारीची जडणघडण.",
            "en": "Building skills and responsibility through farming and allied activities."
          },
          "cta1": {
            "mr": "शेती उपक्रम",
            "en": "Farming Activities",
            "href": "#"
          },
          "cta2": null
        },
        {
          "img_src": "http://localhost:5000/uploads/skills_hero.png",
          "img_alt": "कौशल्य विकास केंद्र",
          "category": {
            "mr": "कौशल्य विकास",
            "en": "Skill Development"
          },
          "title": {
            "mr": "कौशल्यातून आत्मनिर्भरतेकडे",
            "en": "Self-reliance through Skills"
          },
          "statement": {
            "mr": "नव्या संधींची तयारी.",
            "en": "Preparing for new opportunities."
          },
          "description": {
            "mr": "व्यावसायिक प्रशिक्षण आणि उत्पादनाच्या माध्यमातून नव्या संधींची तयारी.",
            "en": "Empowerment through vocational training and productive activities."
          },
          "cta1": {
            "mr": "प्रशिक्षण पहा",
            "en": "View Training",
            "href": "#"
          },
          "cta2": null
        },
        {
          "img_src": "http://localhost:5000/uploads/industry_hero.png",
          "img_alt": "उद्योग विभाग",
          "category": {
            "mr": "उत्पादन व उद्योग",
            "en": "Production & Industry"
          },
          "title": {
            "mr": "श्रमाला संधी, भविष्याला दिशा.",
            "en": "Opportunity for Labor, Direction for Future."
          },
          "statement": {
            "mr": "शिस्त आणि आत्मविश्वासाचा विकास.",
            "en": "Developing discipline and confidence."
          },
          "description": {
            "mr": "उत्पादक कामातून कौशल्य, शिस्त आणि आत्मविश्वासाचा विकास.",
            "en": "Fostering skill, discipline, and self-belief through productive work."
          },
          "cta1": {
            "mr": "उद्योग उपक्रम",
            "en": "Industrial Activities",
            "href": "#"
          },
          "cta2": null
        },
        {
          "img_src": "http://localhost:5000/uploads/reintegration_hero.png",
          "img_alt": "पुनर्वसन उपक्रम",
          "category": {
            "mr": "पुनर्वसन",
            "en": "Reintegration"
          },
          "title": {
            "mr": "नव्या आयुष्याची तयारी",
            "en": "Preparing for a New Life"
          },
          "statement": {
            "mr": "समाजात पुनर्स्थापना.",
            "en": "Reintegration into society."
          },
          "description": {
            "mr": "जबाबदारी आणि स्वावलंबनाच्या माध्यमातून समाजात पुनर्स्थापनेची तयारी.",
            "en": "Getting ready for reintegration into society through responsibility and self-sufficiency."
          },
          "cta1": {
            "mr": "आमची उत्पादने",
            "en": "Our Products",
            "href": "#"
          },
          "cta2": null
        }
      ]
    };

    console.log('Finding hero_carousel block in database...');
    const block = await prisma.contentBlock.findFirst({
      where: { blockType: 'hero_carousel' }
    });

    if (block) {
      console.log(`Updating block ${block.id}...`);
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: newContent }
      });
      console.log('Hero Carousel block updated successfully with the primary web data!');
    } else {
      console.log('Hero Carousel block not found in database. Cannot update.');
    }

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateHeroBlock();
