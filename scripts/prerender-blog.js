const fs = require('fs');
const path = require('path');

const BLOG_HTML = path.join(__dirname, '../pages/blog.html');
const INDEX_JSON = path.join(__dirname, '../pages/blog-index.json');

const blogData = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
const posts = blogData.posts;

function getCategory(post) {
  const text = ((post.topic || '') + ' ' + (post.title || '')).toLowerCase();
  if (text.includes('meteor') || text.includes('eclipse') || text.includes('stargazing') || text.includes('telescope') || text.includes('observe')) {
    return { slug: 'stargazing', label: 'Stargazing Guide' };
  }
  if (text.includes('hawking') || text.includes('dark matter') || text.includes('dark energy') || text.includes('black hole')) {
    return { slug: 'astrophysics', label: 'Astrophysics' };
  }
  if (text.includes('saturn') || text.includes('planet') || text.includes('kuiper') || text.includes('star systems') || text.includes('exoplanet') || text.includes('uranus')) {
    return { slug: 'planets', label: 'Planetary Science' };
  }
  return { slug: 'cosmology', label: 'Cosmology & Deep Space' };
}

function estimateReadTime(post) {
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
  if (filename === 'how-to-watch-a-meteor-shower.html') return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80';
  return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';
}

function resolveCardImg(url, filename) {
  if (!url) return getCardFallback(filename);
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('../assets/')) return url;
  if (url.startsWith('assets/')) return '../' + url;
  if (url.startsWith('/assets/')) return '..' + url;
  return url;
}

function prerenderBlog() {
  const blogData = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
  const posts = blogData.posts;

  const staticCardsHtml = posts.map(post => {
    const cat = getCategory(post);
    const readTime = estimateReadTime(post);
    const img = resolveCardImg(post.imageUrl, post.filename);
    const fallback = getCardFallback(post.filename);
    const excerpt = post.excerpt || `Read this in-depth scientific exploration on ${post.topic || 'the cosmos'}.`;

    return `
            <article class="blog-card" data-category="${cat.slug}">
                <div class="blog-img-wrap">
                    <span class="blog-card-category">${cat.label}</span>
                    <img src="${img}" alt="${post.title}" loading="lazy" onerror="this.src='${fallback}'">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span>✦ ${post.date}</span>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="blog-excerpt">${excerpt}</p>
                    <div class="blog-card-footer">
                        <a href="blog-posts/${post.filename}" class="read-more">CONTINUE READING</a>
                        <span class="read-time">${readTime}</span>
                    </div>
                </div>
            </article>`;
  }).join('\n');

  let blogHtml = fs.readFileSync(BLOG_HTML, 'utf8');

  // Replace #blog-grid content with static cards
  blogHtml = blogHtml.replace(
    /<div id="blog-grid" class="blog-grid" aria-live="polite">[\s\S]*?<\/div>/i,
    `<div id="blog-grid" class="blog-grid" aria-live="polite">${staticCardsHtml}\n        </div>`
  );

  // Update initial JS in blog.html to embed initial posts so loading indicator is not needed
  blogHtml = blogHtml.replace(
    /let allPosts = \[.*?\];/s,
    `let allPosts = ${JSON.stringify(posts)};`
  );

  // Update counter initially
  blogHtml = blogHtml.replace(
    /<span id="results-counter">✦ Showing [^<]*<\/span>/,
    `<span id="results-counter">✦ Showing all ${posts.length} articles</span>`
  );

  fs.writeFileSync(BLOG_HTML, blogHtml, 'utf8');
  console.log('Updated blog.html with static pre-rendered cards!');
}

if (require.main === module) {
  prerenderBlog();
}

module.exports = { prerenderBlog };
