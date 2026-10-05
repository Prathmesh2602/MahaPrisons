const fs = require('fs');
const path = require('path');
const { supabase, bucketName } = require('./supabase');

const isSupabase = process.env.STORAGE_MODE === 'supabase';

if (process.env.NODE_ENV === 'production' && !isSupabase) {
    throw new Error('FATAL: Running in production without STORAGE_MODE=supabase. Ephemeral local storage is disabled in production to prevent data loss. Please set STORAGE_MODE=supabase.');
}
const uploadFile = async ({ buffer, filename, mimetype, localPath }) => {
    if (!isSupabase) {
        return {
            filepath: localPath,
            url: `/uploads/${filename}`
        };
    }

    const storagePath = `uploads/${filename}`;

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, buffer, {
            contentType: mimetype,
            upsert: false
        });

    if (error) {
        throw error;
    }

    return {
        filepath: storagePath,
        url: storagePath
    };
};

const deleteFile = async (filepath) => {
    if (!isSupabase) {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        return;
    }

    const { error } = await supabase.storage
        .from(bucketName)
        .remove([filepath]);

    if (error) {
        throw error;
    }
};

module.exports = {
    uploadFile,
    deleteFile
};