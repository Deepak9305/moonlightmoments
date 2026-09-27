const fs = require('fs');
const path = require('path');

const BLOG_HTML = path.join(__dirname, '../pages/blog.html');
const INDEX_JSON = path.join(__dirname, '../pages/blog-index.json');
const { categoryForTopic, normalizeCategory } = require('./blog-taxonomy');
const { responsiveImageMarkup } = require('./blog-image-utils');

const blogData = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
const posts = blogData.posts;

function getCategory(post) {
  return normalizeCategory(post.category) || categoryForTopic(`${post.topic || ''} ${post.title || ''}`);
}

function estimateReadTime(post) {
  if (post.filename === 'gravitational-waves.html') return '9 min read';
  if (post.filename === 'how-to-observe-venus-and-its-phases.html') return '11 min read';
  if (post.filename === 'how-to-observe-mars-and-its-ice-caps.html') return '12 min read';
  if (post.filename === 'how-to-observe-jupiter-and-its-moons.html') return '11 min read';
  if (post.filename === 'how-to-observe-saturn-and-its-rings.html') return '10 min read';
  if (post.filename === 'how-to-watch-a-meteor-shower.html') return '8 min read';
  return '5 min read';
}

function getCardFallback(filename) {
  if (filename === 'how-to-observe-venus-and-its-phases.html') return 'https://images-assets.nasa.gov/image/PIA00104/PIA00104~medium.jpg';
  if (filename === 'how-to-observe-mars-and-its-ice-caps.html') return 'https://images-assets.nasa.gov/image/PIA04591/PIA04591~medium.jpg';
  if (filename === 'how-to-observe-jupiter-and-its-moons.html') return 'https://images-assets.nasa.gov/image/PIA02873/PIA02873~medium.jpg';
  if (filename === 'how-to-observe-saturn-and-its-rings.html') return 'https://images-assets.nasa.gov/image/PIA09931/PIA09931~medium.jpg';
  if (filename === 'how-to-watch-a-meteor-shower.html') return 'https://images-assets.nasa.gov/image/NHQ202108110003/NHQ202108110003~medium.jpg';
  if (filename === 'hawking-radiation.html') return 'https://images-assets.nasa.gov/image/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o~medium.jpg';
  if (filename === 'uranus-ice.html') return 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg';
  if (filename === 'dark-energy-mystery.html') return 'https://images-assets.nasa.gov/image/PIA14094/PIA14094~medium.jpg';
  return 'https://images-assets.nasa.gov/image/PIA18916/PIA18916~small.jpg';
}

function resolveCardImg(url, filename) {
  if (!url) return getCardFallback(filename);
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('../assets/')) return url;
  if (url.startsWith('assets/')) return '../' + url;
  if (url.startsWith('/assets/')) return '..' + url;
  return url;
}

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, char => entities[char]);
}

function prerenderBlog() {
  const blogData = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
  const posts = blogData.posts;

  const staticCardsHtml = posts.map(post => {
    const cat = getCategory(post);
    const readTime = estimateReadTime(post);
    const img = escapeHtml(resolveCardImg(post.imageUrl, post.filename));
    const fallback = escapeHtml(getCardFallback(post.filename));
    const title = escapeHtml(post.title);
    const date = escapeHtml(post.date);
    const excerpt = escapeHtml(post.excerpt || `Read this in-depth scientific exploration on ${post.topic || 'the cosmos'}.`);
    const href = `blog-posts/${encodeURIComponent(post.filename)}`;

    const image = responsiveImageMarkup({
      src: img,
      alt: title,
      attrs: ` loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"`,
    });

    return `
            <article class="blog-card" data-category="${cat.slug}">
                <div class="blog-img-wrap">
                    <span class="blog-card-category">${cat.label}</span>
                    ${image}
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span>✦ ${date}</span>
                    </div>
                    <h2>${title}</h2>
                    <p class="blog-excerpt">${excerpt}</p>
                    <div class="blog-card-footer">
                        <a href="${href}" class="read-more">CONTINUE READING</a>
                        <span class="read-time">${readTime}</span>
                    </div>
                </div>
            </article>`;
  }).join('\n');

  let blogHtml = fs.readFileSync(BLOG_HTML, 'utf8');

  const startMarker = '<!-- BLOG_CARDS_START -->';
  const endMarker = '<!-- BLOG_CARDS_END -->';
  const start = blogHtml.indexOf(startMarker);
  const end = blogHtml.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) {
    throw new Error('Expected BLOG_CARDS_START and BLOG_CARDS_END markers in pages/blog.html');
  }
  blogHtml = `${blogHtml.slice(0, start + startMarker.length)}\n${staticCardsHtml}\n            ${blogHtml.slice(end)}`;

  // Update initial JS in blog.html to embed initial posts so loading indicator is not needed
  blogHtml = blogHtml.replace(
    /let allPosts = \[.*?\];/s,
    `let allPosts = ${JSON.stringify(posts).replace(/<\/script/gi, '<\\/script')};`
  );

  // Update counter initially
  blogHtml = blogHtml.replace(
    /<span id="results-counter">[^<]*Showing[^<]*<\/span>/,
    `<span id="results-counter">Showing all ${posts.length} articles</span>`
  );

  fs.writeFileSync(BLOG_HTML, blogHtml, 'utf8');
  console.log('Updated blog.html with static pre-rendered cards!');
}

if (require.main === module) {
  prerenderBlog();
}

module.exports = { prerenderBlog };
