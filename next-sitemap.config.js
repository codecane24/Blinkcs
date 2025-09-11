/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blink-bricks.com',  // Replace with your real domain
  generateRobotsTxt: true,             // Automatically generates robots.txt
  sitemapSize: 5000,                    // Max URLs per sitemap
  changefreq: 'weekly',                 // How often pages change
  priority: 0.8,                        // Default priority for pages
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },          // Allow all pages
      { userAgent: '*', disallow: '/admin' },  // Disallow admin page
    ],
  },
};
