const fs = require('fs');
const path = require('path');
const { getLocalWebpUrl } = require('./blog-image-utils');

const ROOT = path.join(__dirname, '..');
const BLOG_POSTS_DIR = path.join(ROOT, 'pages/blog-posts');
const FILES = [
  path.join(ROOT, 'pages/blog.html'),
  ...fs.readdirSync(BLOG_POSTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(BLOG_POSTS_DIR, file)),
];

const IMG_TAG = /<img\b[^>]*?\bsrc=(['"])([^'"]+)\1[^>]*>/gi;

let changedFiles = 0;
let wrappedImages = 0;

for (const file of FILES) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(IMG_TAG, (tag, quote, src, offset) => {
    const lastOpen = before.lastIndexOf('<picture>', offset);
    const lastClose = before.lastIndexOf('</picture>', offset);
    if (lastOpen > lastClose) return tag;
    const webp = getLocalWebpUrl(src);
    if (!webp) return tag;
    wrappedImages += 1;
    return `<picture><source srcset="${webp}" type="image/webp">${tag}</picture>`;
  });

  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changedFiles += 1;
  }
}

console.log(`Wrapped ${wrappedImages} local blog images in ${changedFiles} files.`);
