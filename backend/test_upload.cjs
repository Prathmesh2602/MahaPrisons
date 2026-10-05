require('dotenv').config();
const { uploadFile } = require('./src/lib/storage');

async function testUpload() {
  process.env.STORAGE_MODE = 'supabase';
  const buffer = Buffer.from('hello world this is a test image', 'utf-8');
  const filename = `test_upload_${Date.now()}.txt`;
  
  try {
    const result = await uploadFile({
      buffer,
      filename,
      mimetype: 'text/plain',
      localPath: 'dummy'
    });
    
    console.log("Upload Success!");
    console.log("Filepath:", result.filepath);
    console.log("URL:", result.url);
  } catch (error) {
    console.error("Upload Failed:", error);
  }
}

testUpload();
