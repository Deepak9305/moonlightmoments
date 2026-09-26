const LOCAL_BLOG_IMAGE_NAMES = new Set([
  'venus-telescope-guide-hero.jpg',
  'mars-telescope-guide-hero.jpg',
  'jupiter-telescope-guide-hero.jpg',
  'saturn-telescope-guide-hero.jpg',
  'meteor-shower-guide-hero.jpg',
]);

function getLocalWebpUrl(src) {
  if (!src || typeof src !== 'string') return null;

  const cleanSrc = src.split(/[?#]/, 1)[0];
  const filename = cleanSrc.slice(cleanSrc.lastIndexOf('/') + 1).toLowerCase();
  if (!LOCAL_BLOG_IMAGE_NAMES.has(filename)) return null;

  return src.replace(/\.jpg(?=([?#]|$))/i, '.webp');
}

function responsiveImageMarkup({ src, alt = '', attrs = '' }) {
  const webp = getLocalWebpUrl(src);
  const image = `<img src="${src}" alt="${alt}"${attrs}>`;
  if (!webp) return image;
  return `<picture><source srcset="${webp}" type="image/webp">${image}</picture>`;
}

module.exports = { getLocalWebpUrl, responsiveImageMarkup };
