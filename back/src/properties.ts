const dev = () => {
    return {
      DEV: true,
      PORT: 8080,
      COOKIE_SECRET: "SOME_SECRET_HERE",
      AUTHENTICATION_ROUTE: '/api/authentication',
      GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
      GOOGLE_SECRET: 'GOOGLE_CLIENT_SECRET',
      GITHUB_CLIENT_ID: 'GITHUB_CLIENT_ID',
      GITHUB_CLIENT_SECRET: 'GITHUB_CLIENT_SECRET',
    };
  };

export default dev();