const { createClient } = require('@supabase/supabase-js');

// Only build the client when Supabase storage is enabled; createClient throws without a URL.
const supabase = process.env.STORAGE_MODE === 'supabase'
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null;

const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'media';

module.exports = {
    supabase,
    bucketName
};
