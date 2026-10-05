require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

const prisma = new PrismaClient();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const bucketName = process.env.SUPABASE_BUCKET_NAME || 'media';

async function generateReport() {
    console.log("=== SUPABASE CONFIGURATION ===");
    console.log("Supabase URL Configured:", !!supabaseUrl);
    console.log("Supabase Key Configured:", !!supabaseKey);
    console.log("Bucket Name:", bucketName);

    if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        try {
            const { data: buckets, error } = await supabase.storage.listBuckets();
            if (error) throw error;
            
            const bucketExists = buckets.find(b => b.name === bucketName);
            console.log("Bucket Exists:", !!bucketExists);
            if (bucketExists) {
                console.log("Bucket Public:", bucketExists.public);
            } else {
                console.log("Attempting to create bucket...");
                const { data, error: createError } = await supabase.storage.createBucket(bucketName, { public: true });
                if (createError) console.error("Create bucket error:", createError.message);
                else console.log("Created bucket successfully.");
            }
        } catch (e) {
            console.error("Supabase connection error:", e.message);
        }
    } else {
        console.error("Missing Supabase credentials in environment variables.");
    }

    console.log("\n=== MEDIA DATABASE REPORT ===");
    const allMedia = await prisma.media.findMany();
    
    console.log("Total Media records:", allMedia.length);
    
    let supabaseCount = 0;
    let uploadsCount = 0;
    let localhostCount = 0;
    let invalidCount = 0;
    let otherCount = 0;

    allMedia.forEach(m => {
        if (!m.url) invalidCount++;
        else if (m.url.includes('supabase.co')) supabaseCount++;
        else if (m.url.startsWith('/uploads/')) uploadsCount++;
        else if (m.url.includes('localhost')) localhostCount++;
        else otherCount++;
    });

    console.log("Supabase HTTPS URL:", supabaseCount);
    console.log("/uploads/... paths:", uploadsCount);
    console.log("localhost URLs:", localhostCount);
    console.log("invalid/empty URLs:", invalidCount);
    console.log("other URLs:", otherCount);
    
    // Check if some /uploads/ still exist on disk
    if (uploadsCount > 0) {
        const fs = require('fs');
        const path = require('path');
        let diskCount = 0;
        allMedia.forEach(m => {
            if (m.url && m.url.startsWith('/uploads/')) {
                const diskPath = path.join(__dirname, '../uploads', path.basename(m.url));
                if (fs.existsSync(diskPath)) {
                    diskCount++;
                }
            }
        });
        console.log(`Files still existing on local disk (in backend/uploads): ${diskCount}/${uploadsCount}`);
    }

    await prisma.$disconnect();
}

generateReport().catch(e => console.error(e));
