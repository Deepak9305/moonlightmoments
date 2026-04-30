const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const INPUT_TOPIC = process.env.TOPIC || '';

const SPACE_TOPICS = [
  'auroras on other planets',
  'moon dust composition',
  'solar wind effects on satellites',
  'cosmic radiation',
  'exoplanet atmospheres',
  'neutron stars',
  'binary star systems',
  'pulsar stars',
  'asteroid mining',
  'space debris',
  'gravitational lensing',
  'dark energy mystery',
  'kuiper belt objects',
  'comet tail formation',
  'solar flares',
  'magnetosphere',
  'lunar eclipse science',
  'solar eclipse corona',
  'interstellar dust',
  'galaxy formation',
  'supernova remnants',
  'nebula colors',
  'planetary rings',
  'moons of jupiter',
  'saturn atmosphere',
  'uranus ice',
  'neptune winds',
  'mars geology',
  'venus atmosphere',
  'mercury surface',
  'earth magnetosphere',
  'cosmic microwave background',
  'big bang theory',
  'quantum entanglement in space',
  'time dilation near black holes',
  'hawking radiation',
  'wormholes theory',
  'multiverse hypothesis',
  'dark matter detection',
  'cosmic rays',
];

const BLOG_DIR = path.join(__dirname, '../pages/blog-posts');
const INDEX_FILE = path.join(__dirname, '../pages/blog-index.json');

function getGeneratedSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return new Set();
  return new Set(
    fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.html') && f !== '.gitkeep')
      .map(f => f.replace(/\.html$/, ''))
  );
}

function selectTopic(generatedSlugs) {
  if (INPUT_TOPIC && INPUT_TOPIC.trim()) {
    return INPUT_TOPIC.trim();
  }
  const available = SPACE_TOPICS.filter(
    t => !generatedSlugs.has(t.toLowerCase().replace(/\s+/g, '-'))
  );
  if (available.length === 0) {
    console.log('✅ All topics have already been generated. Nothing new to create.');
    process.exit(0);
  }
  console.log(`📚 ${available.length} topics remaining out of ${SPACE_TOPICS.length}`);
  return available[Math.floor(Math.random() * available.length)];
}

function extractTitle(content) {
  const match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (match) return match[1].replace(/<[^>]+>/g, '').trim();
  return null;
}

function extractExcerpt(content) {
  const match = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (match) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    return text.length > 200 ? text.slice(0, 197) + '...' : text;
  }
  return '';
}

function readIndex() {
  if (!fs.existsSync(INDEX_FILE)) return { posts: [] };
  try {
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  } catch (_) {
    return { posts: [] };
  }
}


async function getGroqResponse(topic) {
  console.log(`Generating blog content for: "${topic}"`);

  const prompt = `You are a science writer for a premium astronomy magazine. Write a high-quality, engaging blog post about "${topic}" for space enthusiasts aged 18–45.

REQUIREMENTS:
- 1000–1200 words total
- A compelling, creative H1 title (not just the raw topic name)
- At least 3 H2 section headings that cover different angles of the topic
- H3 sub-headings within sections where they add clarity
- Use <p> tags for every paragraph
- Include exactly one "Did You Know?" callout formatted as a <blockquote> with a surprising, accurate fact
- Magazine-quality prose: vivid, scientifically accurate, and accessible — explain jargon when used
- A strong, inspiring conclusion paragraph
- Do NOT include any image tags

Output ONLY valid HTML fragments starting with the <h1> tag. Do not include DOCTYPE, <html>, <head>, or <body> tags.`;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const content = response.data.choices[0].message.content;
  if (!content || !content.includes('<p>')) {
    throw new Error('Groq returned empty or invalid content — aborting to prevent writing an empty file');
  }
  return content;
}

async function getNASAImage(topic) {
  try {
    console.log(`Fetching NASA image for: "${topic}"`);
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: { q: topic, media_type: 'image', page_size: 5 },
    });
    const items = response.data.collection?.items || [];
    if (items.length > 0) {
      const image = items.find(item => item.links?.[0]?.href) || items[0];
      if (image?.links?.[0]?.href) {
        return {
          url: image.links[0].href,
          title: image.data?.[0]?.title || topic,
        };
      }
    }
  } catch (err) {
    console.error('NASA API Error:', err.message);
  }
  return {
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    title: topic,
  };
}

function updateIndex(entry) {
  const index = readIndex();
  index.posts = [entry, ...index.posts.filter(p => p.filename !== entry.filename)];
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

function formatBlogContent(content, topic, title, imageUrl, imageTitle, date) {
  const pageTitle = title || topic;
  const fallback = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | Moonlight Moments</title>
    <meta name="description" content="Explore ${topic} with Moonlight Moments — an in-depth astronomy blog covering the cosmos.">
    <meta name="keywords" content="${topic}, astronomy, space science, nasa, exploration, cosmos">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="Explore ${topic} with Moonlight Moments.">
    <meta property="og:image" content="${imageUrl}">
    <link rel="icon" type="image/png" href="../../assets/img/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/base.css">
    <link rel="stylesheet" href="../../assets/css/blog.css">
    <style>
        .reading-progress {
            position: fixed;
            top: 0; left: 0;
            height: 2px; width: 0;
            background: linear-gradient(90deg, #a78bfa, #7c3aed);
            z-index: 1001;
            transition: width 0.1s linear;
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
            <a href="https://ko-fi.com/moonlightmoments" target="_blank" class="support-btn">Support Us</a>
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
            <span>✦ Space Science</span>
        </div>

        <img src="${imageUrl}" alt="${imageTitle}" class="blog-post-featured-img"
             onerror="this.src='${fallback}'">

        <div class="blog-post-content">
            ${content}
        </div>

        <div class="post-footer">
            <strong>Author:</strong> Moonlight Moments Team &nbsp;·&nbsp;
            <strong>Published:</strong> ${date} &nbsp;·&nbsp;
            <strong>Category:</strong> Space Science
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

async function generateBlog() {
  try {
    const generatedSlugs = getGeneratedSlugs();
    const topic = selectTopic(generatedSlugs);
    console.log(`\n📝 Starting blog generation for: "${topic}"\n`);

    const slug = topic.toLowerCase().replace(/\s+/g, '-');

    const [content, image] = await Promise.all([
      getGroqResponse(topic),
      getNASAImage(topic),
    ]);

    const title = extractTitle(content);
    const excerpt = extractExcerpt(content);
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    const timestamp = Date.now();
    const filename = `${slug}.html`;
    const filepath = path.join(BLOG_DIR, filename);

    if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

    fs.writeFileSync(filepath, formatBlogContent(content, topic, title, image.url, image.title, date));
    console.log(`✅ Blog post created: pages/blog-posts/${filename}`);

    updateIndex({ filename, topic, title: title || topic, date, timestamp, imageUrl: image.url, excerpt });
    console.log(`📋 blog-index.json updated`);
    console.log(`\n✨ Blog generation complete!\n`);

  } catch (error) {
    console.error('❌ Error generating blog:', error.message);
    process.exit(1);
  }
}

generateBlog();
