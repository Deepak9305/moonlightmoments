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
      .map(f => f.replace(/^\d+-/, '').replace(/\.html$/, ''))
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
  let index = { posts: [] };
  if (fs.existsSync(INDEX_FILE)) {
    try {
      index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
    } catch (_) {
      index = { posts: [] };
    }
  }
  index.posts = [entry, ...index.posts.filter(p => p.filename !== entry.filename)];
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

function formatBlogContent(content, topic, title, imageUrl, imageTitle, date) {
  const pageTitle = title || topic;

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
    <link rel="icon" type="image/png" href="../assets/img/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
    <style>
        .blog-post-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .blog-post-header { margin-bottom: 30px; }
        .blog-post-meta { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 15px; }
        .blog-post-content { line-height: 1.8; color: var(--text-color); }
        .blog-post-content h1 { font-size: 2rem; margin-bottom: 12px; }
        .blog-post-content h2 { margin-top: 35px; margin-bottom: 15px; font-size: 1.5rem; color: var(--accent); }
        .blog-post-content h3 { margin-top: 25px; margin-bottom: 10px; font-size: 1.15rem; }
        .blog-post-content p { margin-bottom: 18px; }
        .blog-post-content blockquote {
            border-left: 3px solid var(--accent);
            margin: 30px 0;
            padding: 16px 24px;
            background: var(--glass);
            border-radius: 0 8px 8px 0;
            font-style: italic;
            color: var(--text-dim);
        }
        .blog-post-featured-img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 12px; margin: 30px 0; }
        @media (max-width: 768px) {
            .blog-post-container { padding: 20px 15px; }
            .blog-post-content h1 { font-size: 1.5rem; }
            .blog-post-content h2 { font-size: 1.25rem; margin-top: 25px; }
            .blog-post-content h3 { font-size: 1.05rem; }
            .blog-post-featured-img { max-height: 220px; margin: 20px 0; border-radius: 8px; }
        }
        @media (max-width: 480px) {
            .blog-post-container { padding: 15px 12px; }
            .blog-post-content { font-size: 0.95rem; line-height: 1.7; }
            .blog-post-meta { font-size: 0.8rem; }
            .blog-post-content blockquote { padding: 12px 16px; }
        }
    </style>
</head>
<body>
    <div id="cursor-ring"></div>

    <nav class="glass-nav">
        <a href="../index.html" class="logo">
            <img src="../assets/img/logo.png" alt="Moonlight Moments Logo" class="logo-img">
            Moonlight Moments
        </a>
        <div class="nav-links" id="navLinks">
            <a href="../index.html">Space Gallery</a>
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
        <header class="blog-post-header">
            <div class="blog-post-meta">
                <span>✦ ${date}</span>
                <span>✦ Space Science</span>
            </div>
        </header>

        <img src="${imageUrl}" alt="${imageTitle}" class="blog-post-featured-img"
             onerror="this.src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800'">

        <div class="blog-post-content">
            ${content}
        </div>

        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--glass-border);">
            <p style="color: var(--text-dim); font-size: 0.9rem;">
                <strong>Author:</strong> Moonlight Moments Team<br>
                <strong>Published:</strong> ${date}<br>
                <strong>Category:</strong> Space Science
            </p>
        </div>
    </article>

    <footer style="text-align: center; padding: 40px 20px; border-top: 1px solid var(--glass-border);">
        <p class="footer-copyright">&copy; 2026 MOONLIGHT MOMENTS | ASTRONOMY BLOG</p>
    </footer>

    <script src="../assets/js/common.js"></script>
</body>
</html>`;
}

async function generateBlog() {
  try {
    const generatedSlugs = getGeneratedSlugs();
    const topic = selectTopic(generatedSlugs);
    console.log(`\n📝 Starting blog generation for: "${topic}"\n`);

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
    const slug = topic.toLowerCase().replace(/\s+/g, '-');
    const filename = `${timestamp}-${slug}.html`;
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
