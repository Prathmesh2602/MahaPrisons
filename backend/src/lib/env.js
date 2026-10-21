// Fail fast in production when required configuration is missing.
const validateEnv = () => {
  if (process.env.NODE_ENV !== 'production') return;

  const required = ['DATABASE_URL', 'JWT_SECRET', 'CORS_ORIGINS'];
  if (process.env.STORAGE_MODE === 'supabase') {
    required.push('SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY');
  }

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`FATAL: Missing required environment variables: ${missing.join(', ')}`);
  }
};

module.exports = { validateEnv };
