process.env.NODE_ENV = !!+process.env.PROD ? 'production' : 'development';

export default {
  PROD: !!+process.env.PROD,
  PORT: process.env.PORT,

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_DURATION: process.env.COOKIE_DURATION || '86400000',
  COOKIE_ACTIVE_DURATION: process.env.COOKIE_ACTIVE_DURATION || '300000',
  COOKIE_SECURE_SETTING: !!+process.env.COOKIE_SECURE_SETTING,

  AUTHENTICATION_ROUTE: process.env.AUTHENTICATION_ROUTE || '/api/authentication',

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/google/callback',

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || '/github/callback'
};