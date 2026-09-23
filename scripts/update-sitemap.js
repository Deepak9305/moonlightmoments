const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const baseUrl = 'https://www.moonlightmoments.org';

function getLastModified(relativePath, fallbackDate) {
  try {
    const workingTreeStatus = execFileSync('git', ['status', '--porcelain', '--', relativePath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (workingTreeStatus) return fallbackDate;

    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', relativePath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : fallbackDate;
  } catch {
    return fallbackDate;
  }
}

function collectPages() {
  const pagesDir = path.join(rootDir, 'pages');
  const htmlFiles = [
    'index.html',
    ...fs.readdirSync(pagesDir, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.html'))
      .map(entry => `pages/${entry.name}`),
    ...fs.readdirSync(path.join(pagesDir, 'blog-posts'), { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.html'))
      .map(entry => `pages/blog-posts/${entry.name}`)
  ];

  return htmlFiles.map(relativePath => {
    const isHome = relativePath === 'index.html';
    const isPost = relativePath.startsWith('pages/blog-posts/');
    const url = isHome ? `${baseUrl}/` : `${baseUrl}/${relativePath}`;
    const fallbackDate = fs.statSync(path.join(rootDir, relativePath)).mtime.toISOString().slice(0, 10);
    return {
      url,
      lastmod: getLastModified(relativePath, fallbackDate),
      changefreq: isHome ? 'daily' : isPost ? 'monthly' : 'weekly',
      priority: isHome ? '1.0' : isPost ? '0.7' : '0.8'
    };
  }).sort((a, b) => a.url.localeCompare(b.url));
}

function renderSitemap() {
  const entries = collectPages().map(page => `    <url>\n        <loc>${page.url}</loc>\n        <lastmod>${page.lastmod}</lastmod>\n        <changefreq>${page.changefreq}</changefreq>\n        <priority>${page.priority}</priority>\n    </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

function syncSitemap() {
  fs.writeFileSync(sitemapPath, renderSitemap(), 'utf8');
  console.log(`Synchronized sitemap.xml with ${collectPages().length} canonical HTML pages.`);
}

function removeSitemapEntry() {
  // Regenerate from the current set of HTML files so removed pages cannot linger.
  syncSitemap();
}

if (require.main === module) syncSitemap();

module.exports = { syncSitemap, removeSitemapEntry, renderSitemap };
