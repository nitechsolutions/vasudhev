/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vasudhev.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/login',
    '/dashboard',
    '/admin',
    '/api/*',
  ],
};
