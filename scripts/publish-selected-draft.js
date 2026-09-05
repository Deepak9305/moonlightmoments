const fs = require('fs');
const path = require('path');

const ADSENSE_PUB_ID = process.env.ADSENSE_PUB_ID || '';
const DRAFT_FILE = process.env.DRAFT_FILE || '';

const DRAFTS_DIR = path.join(__dirname, '../drafts');
const BLOG_DIR = path.join(__dirname, '../pages/blog-posts');
const INDEX_FILE = path.join(__dirname, '../pages/blog-index.json');

function selectDraft() {
  if (DRAFT_FILE) return DRAFT_FILE;
  if (!fs.existsSync(DRAFTS_DIR)) {
    console.error('ERROR: No drafts/ directory found');
    process.exit(1);
  }
  const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.html'));
  if (!files.length) {
    console.error('ERROR: No .html drafts found in drafts/');
    process.exit(1);
  }
  return files[0];
}

function tryParseFrontMatter(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  const yamlBlock = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const meta = {};
  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) meta[key] = val;
  }
  return { meta, content };
}

function isFullPage(raw) {
  const lower = raw.toLowerCase().trimStart();
  return lower.startsWith('<!doctype') || lower.startsWith('<html');
}

function extractFromHtml(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);

  const title = (h1Match || titleMatch)
    ? (h1Match || titleMatch)[1].replace(/<[^>]+>/g, '').trim()
    : null;
  const excerpt = pMatch
    ? pMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 200)
    : '';
  const imageUrl = imgMatch ? imgMatch[1] : '';

  return { title, excerpt, imageUrl };
}

function extractBodyContent(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1].trim() : html;
}

function extractTitle(fragment) {
  const m = fragment.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null;
}

function extractExcerpt(fragment) {
  const m = fragment.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const text = m[1].replace(/<[^>]+>/g, '').trim();
  return text.length > 200 ? text.slice(0, 197) + '...' : text;
}

function readIndex() {
  if (!fs.existsSync(INDEX_FILE)) return { posts: [] };
  try { return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8')); }
  catch (_) { return { posts: [] }; }
}

function updateIndex(entry) {
  const index = readIndex();
  index.posts = [entry, ...index.posts.filter(p => p.filename !== entry.filename)];
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

function adsenseTag() {
  if (!ADSENSE_PUB_ID) return '';
  return `
    <ins class="adsbygoogle" style="display:block;text-align:center;margin:32px 0"
         data-ad-layout="in-article" data-ad-format="fluid"
         data-ad-client="${ADSENSE_PUB_ID}" data-ad-slot="auto"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;
}

function wrapFragment(content, meta, title, date, imageUrl, imageTitle, filename) {
  const pageTitle = title || 'Blog Post';
  const topic = meta.topic || pageTitle;
  const fallback = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';
  const heroImg = imageUrl || fallback;
  const canonicalUrl = `https://www.moonlightmoments.org/pages/blog-posts/${filename || ''}`;
  const excerpt = meta.description || extractExcerpt(content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | Moonlight Moments</title>
    <meta name="description" content="${meta.description || `Explore ${topic} with Moonlight Moments.`}">
    <meta name="keywords" content="${topic}, astronomy, space science, cosmos">
    <meta name="author" content="Moonlight Moments Team">
    <meta name="robots" content="index, follow">
    ${filename ? `<link rel="canonical" href="${canonicalUrl}">` : ''}

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    ${filename ? `<meta property="og:url" content="${canonicalUrl}">` : ''}
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${meta.description || `Explore ${topic} with Moonlight Moments.`}">
    <meta property="og:image" content="${heroImg}">
    <meta property="og:site_name" content="Moonlight Moments">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${meta.description || `Explore ${topic} with Moonlight Moments.`}">
    <meta name="twitter:image" content="${heroImg}">

    <!-- Schema.org JSON-LD Article Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${pageTitle.replace(/"/g, '\\"')}",
      "image": "${heroImg}",
      "author": {
        "@type": "Organization",
        "name": "Moonlight Moments"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Moonlight Moments",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.moonlightmoments.org/assets/img/logo.png"
        }
      },
      "datePublished": "${new Date().toISOString().split('T')[0]}",
      "description": "${excerpt.replace(/"/g, '\\"')}"
    }
    </script>

    <link rel="icon" type="image/png" href="../../assets/img/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/base.css">
    <link rel="stylesheet" href="../../assets/css/blog.css">
    ${ADSENSE_PUB_ID ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}" crossorigin="anonymous"></script>` : ''}
    <style>
        .reading-progress {
            position: fixed; top: 0; left: 0;
            height: 2px; width: 0;
            background: linear-gradient(90deg, #a78bfa, #7c3aed);
            z-index: 1001; transition: width 0.1s linear;
        }
        .blog-post-container { max-width: 760px; margin: 0 auto; padding: 120px 24px 60px; }
        .blog-post-meta {
            color: var(--text-dim); font-size: 0.8rem;
            letter-spacing: 2px; text-transform: uppercase;
            margin-bottom: 20px; display: flex; gap: 16px; flex-wrap: wrap;
        }
        .blog-post-featured-img {
            width: 100%; max-height: 440px; object-fit: cover;
            border-radius: 16px; margin: 0 0 36px; display: block;
        }
        .blog-post-content { line-height: 1.85; color: var(--text-color); }
        .blog-post-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.7rem, 5vw, 2.4rem);
            line-height: 1.25; margin-bottom: 16px;
        }
        .blog-post-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.2rem, 3.5vw, 1.6rem);
            color: var(--accent); margin-top: 44px; margin-bottom: 14px; line-height: 1.35;
        }
        .blog-post-content h3 {
            font-size: clamp(1rem, 3vw, 1.15rem);
            margin-top: 28px; margin-bottom: 10px; color: #fff;
        }
        .blog-post-content p { margin-bottom: 20px; font-size: clamp(0.95rem, 2.2vw, 1.05rem); }
        .blog-post-content ul { margin: 0 0 20px; padding-left: 22px; }
        .blog-post-content li { margin-bottom: 10px; font-size: clamp(0.95rem, 2.2vw, 1.05rem); line-height: 1.7; }
        .blog-post-content strong { color: var(--text-color); }
        .blog-post-content blockquote {
            border-left: 3px solid var(--accent);
            margin: 36px 0; padding: 18px 24px;
            background: var(--glass); border-radius: 0 12px 12px 0;
            font-style: italic; color: var(--text-dim);
            font-size: clamp(0.9rem, 2vw, 1rem); line-height: 1.75;
        }
        .post-footer {
            margin-top: 52px; padding-top: 28px;
            border-top: 1px solid var(--glass-border);
            color: var(--text-dim); font-size: 0.85rem; line-height: 1.8;
        }
        .related-posts { margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--glass-border); }
        .related-heading {
            font-family: 'Playfair Display', serif; font-size: 1.3rem;
            margin-bottom: 22px; color: var(--accent); letter-spacing: 1px;
        }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .related-card {
            display: block; text-decoration: none; border-radius: 14px; overflow: hidden;
            background: var(--glass); border: 1px solid var(--glass-border);
            transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .related-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(167,139,250,0.22); }
        .related-card img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .related-card-body { padding: 14px 16px; }
        .related-card-body h4 {
            color: #fff; font-family: 'Playfair Display', serif;
            font-size: 0.9rem; margin: 0 0 6px; line-height: 1.4;
        }
        .related-date { color: var(--text-dim); font-size: 0.73rem; }
        .legal-modal {
            display: none; position: fixed; inset: 0;
            background: rgba(2,2,4,0.97); z-index: 9999; overflow-y: auto; padding: 80px 5%;
        }
        .legal-inner { max-width: 680px; margin: 0 auto; }
        .legal-close-span {
            position: fixed; top: 28px; right: 28px; font-size: 2.6rem;
            color: #fff; cursor: pointer; line-height: 1; opacity: 0.7; transition: opacity 0.2s;
        }
        .legal-close-span:hover { opacity: 1; }
        @media (max-width: 768px) {
            .blog-post-container { padding: 90px 18px 48px; }
            .blog-post-featured-img { border-radius: 10px; max-height: 230px; margin-bottom: 26px; }
            .blog-post-content blockquote { padding: 14px 18px; margin: 26px 0; }
            .related-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
        }
        @media (max-width: 480px) {
            .blog-post-container { padding: 80px 14px 40px; }
            .blog-post-featured-img { max-height: 190px; border-radius: 8px; margin-bottom: 20px; }
            .blog-post-meta { font-size: 0.72rem; gap: 10px; }
            .blog-post-content blockquote { padding: 12px 14px; border-radius: 0 8px 8px 0; }
            .related-grid { grid-template-columns: 1fr; }
            .related-card img { height: 150px; }
            .legal-close-span { top: 16px; right: 16px; font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="reading-progress" id="reading-progress"></div>
    <div id="cursor-ring"></div>
    <div id="cursor-dot"></div>

    <nav class="glass-nav">
        <a href="../../index.html" class="logo">
            <img src="../../assets/img/logo.png" alt="Moonlight Moments Logo" class="logo-img">
            Moonlight Moments
        </a>
        <div class="nav-links" id="navLinks">
            <a href="../../index.html">Space Gallery</a>
            <a href="../age.html">Age on Planets</a>
            <a href="../event.html">Astronomical Calendar</a>
            <a href="../solar-system.html">3D Solar System</a>
            <a href="../blog.html" class="active">Blogs</a>
            <a href="https://ko-fi.com/moonlightmoments" target="_blank" rel="noopener noreferrer" class="support-btn">Support Us</a>
            <a href="#" class="legal-link nav-legal-link" data-type="about">✦ Our Story</a>
            <a href="#" class="legal-link nav-legal-link" data-type="privacy">✦ Privacy Orbit</a>
        </div>
        <div class="nav-hamburger">
            <button class="hamburger-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
            <div class="dropdown-content" id="myDropdown">
                <a href="#" class="legal-link" data-type="about">✦ Our Story</a>
                <a href="#" class="legal-link" data-type="privacy">✦ Privacy Orbit</a>
            </div>
        </div>
    </nav>

    <article class="blog-post-container">
        <div class="blog-post-meta">
            <span>✦ ${date}</span>
            <span>✦ ${meta.category || 'Space Science'}</span>
        </div>

        <img src="${heroImg}" alt="${imageTitle || topic}" class="blog-post-featured-img"
             onerror="this.src='${fallback}'">

        <div class="blog-post-content">
            ${content}
        </div>

        ${adsenseTag()}

        <div class="post-footer">
            <strong>Author:</strong> ${meta.author || 'Moonlight Moments Team'} &nbsp;·&nbsp;
            <strong>Published:</strong> ${date} &nbsp;·&nbsp;
            <strong>Category:</strong> ${meta.category || 'Space Science'}
        </div>

        <section class="related-posts" id="related-section">
            <h2 class="related-heading">✦ You Might Also Like</h2>
            <div class="related-grid" id="related-posts-grid"></div>
        </section>
    </article>

    <footer style="text-align:center;padding:48px 20px 40px;border-top:1px solid var(--glass-border);">
        <p class="footer-copyright">&copy; 2026 MOONLIGHT MOMENTS | ASTRONOMY BLOG</p>
    </footer>

    <div id="legal-modal" class="legal-modal">
        <span class="legal-close-span" id="close-legal-btn" aria-label="Close">&times;</span>
        <div class="legal-inner" id="legal-content"></div>
    </div>

    <script src="../../assets/js/common.js"></script>
    <script>
        const progressBar = document.getElementById('reading-progress');
        const articleContent = document.querySelector('.blog-post-content');
        if (progressBar && articleContent) {
            window.addEventListener('scroll', () => {
                const rect = articleContent.getBoundingClientRect();
                const scrolled = Math.max(0, -rect.top);
                progressBar.style.width = Math.min(100, (scrolled / articleContent.offsetHeight) * 100) + '%';
            }, { passive: true });
        }
        (async function loadRelated() {
            const grid = document.getElementById('related-posts-grid');
            const section = document.getElementById('related-section');
            if (!grid) return;
            const currentFile = location.pathname.split('/').pop();
            const fallback = '${fallback}';
            try {
                const res = await fetch('../blog-index.json');
                if (!res.ok) throw new Error();
                const { posts } = await res.json();
                const picks = posts.filter(p => p.filename !== currentFile).sort(() => Math.random() - 0.5).slice(0, 3);
                if (!picks.length) { section.style.display = 'none'; return; }
                grid.innerHTML = picks.map(p => \`
                    <a href="\${p.filename}" class="related-card">
                        <img src="\${p.imageUrl || fallback}" alt="\${p.title}" onerror="this.src='\${fallback}'" loading="lazy">
                        <div class="related-card-body"><h4>\${p.title}</h4><span class="related-date">\${p.date}</span></div>
                    </a>\`).join('');
            } catch (_) { section.style.display = 'none'; }
        })();
    </script>
</body>
</html>`;
}

function publish() {
  const draftFilename = selectDraft();
  console.log(`[Publish] Publishing selected draft: ${draftFilename}`);

  const draftPath = path.join(DRAFTS_DIR, draftFilename);
  if (!fs.existsSync(draftPath)) {
    console.error(`ERROR: Draft file not found: ${draftPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(draftPath, 'utf8');

  // Derive output filename: strip version suffix like -v1, -v2
  const slug = draftFilename.replace(/\.html$/, '').replace(/-v\d+$/, '');
  const outputFilename = `${slug}.html`;
  const outputPath = path.join(BLOG_DIR, outputFilename);

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  let title, excerpt, imageUrl, date, meta = {};

  if (isFullPage(raw)) {
    // Full HTML page — copy body content into site template
    const extracted = extractFromHtml(raw);
    title = extracted.title;
    excerpt = extracted.excerpt;
    imageUrl = extracted.imageUrl;
    date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const bodyContent = extractBodyContent(raw);
    fs.writeFileSync(outputPath, wrapFragment(bodyContent, meta, title, date, imageUrl, title || '', outputFilename));
  } else {
    // Try front matter, fall back to treating whole file as a fragment
    const parsed = tryParseFrontMatter(raw);
    if (parsed) {
      meta = parsed.meta;
      const content = parsed.content;
      title = meta.title || extractTitle(content);
      excerpt = meta.excerpt || extractExcerpt(content);
      imageUrl = meta.imageUrl || '';
      date = meta.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      fs.writeFileSync(outputPath, wrapFragment(content, meta, title, date, imageUrl, meta.imageTitle || title || '', outputFilename));
    } else {
      // Plain fragment, no front matter
      title = extractTitle(raw);
      excerpt = extractExcerpt(raw);
      imageUrl = '';
      date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      fs.writeFileSync(outputPath, wrapFragment(raw, meta, title, date, imageUrl, title || '', outputFilename));
    }
  }

  console.log(`[Publish] ✅ Published: pages/blog-posts/${outputFilename}`);

  updateIndex({
    filename: outputFilename,
    topic: meta.topic || slug.replace(/-/g, ' '),
    title: title || slug,
    date,
    timestamp: Date.now(),
    imageUrl: imageUrl || '',
    excerpt: excerpt || '',
  });
  console.log('[Publish] 📋 blog-index.json updated');

  try {
    const { prerenderBlog } = require('./prerender-blog');
    prerenderBlog();
    console.log('[Publish] 🚀 pages/blog.html pre-rendered for SEO indexing');
  } catch (err) {
    console.warn('Could not prerender blog.html:', err.message);
  }

  try {
    const { syncSitemap } = require('./update-sitemap');
    syncSitemap();
    console.log('[Publish] 🗺️  sitemap.xml synchronized');
  } catch (err) {
    console.warn('Could not update sitemap.xml:', err.message);
  }

  fs.unlinkSync(draftPath);
  console.log(`[Publish] 🗑️  Draft removed: drafts/${draftFilename}`);
}

publish();
