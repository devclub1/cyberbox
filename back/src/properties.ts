const dev = () => {
  return {
    DEV: true,
    PORT: 8080,

    DB_HOST: 'DB_HOST',
    DB_PORT: 3306,
    DB_NAME: 'DB_NAME',
    DB_USER: 'DB_USER',
    DB_PASSWORD: 'DB_PASSWORD',

    COOKIE_SECRET: 'SOME_SECRET_HERE',
    COOKIE_DURATION: 24 * 60 * 60 * 1000,
    COOKIE_ACTIVE_DURATION: 1000 * 60 * 5,
    COOKIE_SECURE_SETTING: false,

    AUTHENTICATION_ROUTE: '/api/authentication',
    GOOGLE_CALLBACK_URL: '/google/callback',
    GITHUB_CALLBACK_URL: '/github/callback',

    GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
    GOOGLE_SECRET: 'GOOGLE_SECRET',
    GITHUB_CLIENT_ID: 'GITHUB_CLIENT_ID',
    GITHUB_CLIENT_SECRET: 'GITHUB_CLIENT_SECRET'
  };
};

export default dev();