const fs = require('fs');
const path = require('path');

const filename = process.env.FILENAME || process.argv[2];

if (!filename) {
  console.error('Usage: FILENAME=<post.html> node scripts/delete-post.js');
  process.exit(1);
}

const postPath = path.join(__dirname, '..', 'pages', 'blog-posts', filename);
const indexPath = path.join(__dirname, '..', 'pages', 'blog-index.json');

if (!fs.existsSync(postPath)) {
  console.error(`File not found: ${postPath}`);
  process.exit(1);
}

fs.unlinkSync(postPath);
console.log(`Deleted: ${postPath}`);

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const before = index.posts.length;
index.posts = index.posts.filter(p => p.filename !== filename);

if (index.posts.length === before) {
  console.warn(`Warning: no entry for "${filename}" found in blog-index.json`);
} else {
  console.log(`Removed index entry for: ${filename}`);
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
console.log('blog-index.json updated.');
