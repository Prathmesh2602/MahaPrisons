const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'media';

module.exports = {
    supabase,
    bucketName
};