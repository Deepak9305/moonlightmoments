const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const indexPath = path.join(rootDir, 'pages/blog-index.json');

function syncSitemap() {
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found');
    return;
  }

  const blogData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const posts = blogData.posts || [];
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');

  posts.forEach(post => {
    const url = `https://www.moonlightmoments.org/pages/blog-posts/${post.filename}`;
    if (!sitemap.includes(url)) {
      const pubDate = post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      const entry = `    <url>
        <loc>${url}</loc>
        <lastmod>${pubDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>\n`;
      sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
      console.log(`Added ${post.filename} to sitemap.xml`);
    }
  });

  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

function removeSitemapEntry(filename) {
  if (!fs.existsSync(sitemapPath)) return;
  const url = `https://www.moonlightmoments.org/pages/blog-posts/${filename}`;
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const regex = new RegExp(`\\s*<url>\\s*<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>[\\s\\S]*?</url>`, 'g');
  sitemap = sitemap.replace(regex, '');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`Removed ${filename} from sitemap.xml`);
}

if (require.main === module) {
  syncSitemap();
}

module.exports = { syncSitemap, removeSitemapEntry };
