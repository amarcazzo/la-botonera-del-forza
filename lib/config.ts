const config = {
  BUCKET_URL: process.env.BUCKET_URL || '',
  BUCKET_EMAIL: process.env.BUCKET_EMAIL || '',
  BUCKET_PRIVATE_KEY: process.env.BUCKET_PRIVATE_KEY || '',
  BUCKET_NAME: process.env.BUCKET_NAME || '',
  BUCKET_PROJECT_ID: process.env.BUCKET_PROJECT_ID || '',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_API_KEY: process.env.SUPABASE_API_KEY || ''
};

export default config;
