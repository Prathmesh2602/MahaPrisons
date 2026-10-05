require('dotenv').config();
const { uploadFile } = require('./src/lib/storage');
const { supabase, bucketName } = require('./src/lib/supabase');

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
    
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(result.filepath);
        
    console.log("Upload Success!");
    console.log("Filepath:", result.filepath);
    console.log("Final URL:", publicUrlData.publicUrl);
  } catch (error) {
    console.error("Upload Failed:", error);
  }
}

testUpload();
