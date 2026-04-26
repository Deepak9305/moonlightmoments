const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const NASA_API_KEY = process.env.NASA_API_KEY;
const INPUT_TOPIC = process.env.TOPIC || '';

// Mid-volume, low-competition space topics
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

async function getGroqResponse(topic) {
  try {
    console.log(`Generating blog for topic: ${topic}`);

    const prompt = `Write an optimized, engaging 800-word blog post about "${topic}" for astronomy/space enthusiasts.

Requirements:
- Exactly 800 words (approximately)
- SEO-optimized with keyword usage
- Educational yet accessible tone
- Include interesting facts and recent discoveries
- Well-structured with clear sections
- Include a compelling introduction and conclusion
- Format with HTML tags for headings (h2, h3) and paragraphs
- No images tags (images will be added separately)

Start with an H1 title tag, then provide the content.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    throw error;
  }
}

async function getNASAImage(topic) {
  try {
    console.log(`Fetching NASA images for: ${topic}`);

    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: {
        q: topic,
        media_type: 'image',
        page_size: 5
      }
    });

    const items = response.data.collection?.items || [];
    if (items.length > 0) {
      // Filter out non-image content
      const image = items.find(item => item.links?.[0]?.href) || items[0];
      if (image?.links?.[0]?.href) {
        return {
          url: image.links[0].href,
          title: image.data?.[0]?.title || topic,
          description: image.data?.[0]?.description || ''
        };
      }
    }

    // Fallback image if no NASA images found
    return {
      url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
      title: topic,
      description: 'Space imagery'
    };
  } catch (error) {
    console.error('NASA API Error:', error.message);
    return {
      url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
      title: topic,
      description: 'Space imagery'
    };
  }
}

function selectTopic() {
  if (INPUT_TOPIC && INPUT_TOPIC.trim()) {
    return INPUT_TOPIC.trim();
  }
  return SPACE_TOPICS[Math.floor(Math.random() * SPACE_TOPICS.length)];
}

function formatBlogContent(content, topic, imageUrl, imageTitle) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const category = 'Space Science';
  const slug = topic.toLowerCase().replace(/\s+/g, '-');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic} - Moonlight Moments Blog</title>
    <meta name="description" content="Explore ${topic} with Moonlight Moments. Learn about this fascinating topic in our comprehensive astronomy blog.">
    <meta name="keywords" content="${topic}, astronomy, space science, nasa, exploration">

    <link rel="icon" type="image/png" href="../assets/img/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
    <style>
        .blog-post-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .blog-post-header { margin-bottom: 30px; }
        .blog-post-meta { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 15px; }
        .blog-post-content { line-height: 1.8; color: var(--text-color); }
        .blog-post-content h2 { margin-top: 30px; margin-bottom: 15px; }
        .blog-post-content h3 { margin-top: 20px; margin-bottom: 10px; }
        .blog-post-content p { margin-bottom: 15px; }
        .blog-post-featured-img { width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin: 30px 0; }
    </style>
</head>
<body>
    <div id="cursor-ring"></div>

    <nav class="glass-nav">
        <a href="../index.html" class="logo">
            <img src="../assets/img/logo.png" alt="Moonlight Moments Logo" class="logo-img">
            Moonlight Moments
        </a>
        <div class="nav-links">
            <a href="../index.html">Space Gallery</a>
            <a href="age.html">Age on Planets</a>
            <a href="event.html">Astronomical Calendar</a>
            <a href="solar-system.html">3D Solar System</a>
            <a href="blog.html" class="active">Blogs</a>
            <a href="https://ko-fi.com/moonlightmoments" target="_blank" class="support-btn">Support Us</a>
        </div>
    </nav>

    <article class="blog-post-container">
        <header class="blog-post-header">
            <div class="blog-post-meta">
                <span>✦ ${date}</span>
                <span>✦ ${category}</span>
            </div>
        </header>

        <img src="${imageUrl}" alt="${imageTitle}" class="blog-post-featured-img" onerror="this.src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800'">

        <div class="blog-post-content">
            ${content}
        </div>

        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--glass-border);">
            <p style="color: var(--text-dim); font-size: 0.9rem;">
                <strong>Author:</strong> Moonlight Moments Team<br>
                <strong>Generated:</strong> ${date}<br>
                <strong>Category:</strong> ${category}
            </p>
        </div>
    </article>

    <footer style="text-align: center; padding: 40px 20px; border-top: 1px solid var(--glass-border);">
        <p class="footer-copyright">&copy; 2026 MOONLIGHT MOMENTS | AUTO-GENERATED SPACE BLOG</p>
    </footer>

    <script src="../assets/js/common.js"></script>
</body>
</html>`;
}

async function generateBlog() {
  try {
    const topic = selectTopic();
    console.log(`\n📝 Starting blog generation for: "${topic}"\n`);

    // Generate content and fetch image in parallel
    const [content, image] = await Promise.all([
      getGroqResponse(topic),
      getNASAImage(topic)
    ]);

    // Create blog-posts directory if it doesn't exist
    const blogDir = path.join(__dirname, '../pages/blog-posts');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Format filename
    const filename = `${Date.now()}-${topic.toLowerCase().replace(/\s+/g, '-')}.html`;
    const filepath = path.join(blogDir, filename);

    // Create formatted blog post
    const htmlContent = formatBlogContent(content, topic, image.url, image.title);

    // Write file
    fs.writeFileSync(filepath, htmlContent);
    console.log(`✅ Blog post created: ${filepath}`);
    console.log(`📊 Topic: ${topic}`);
    console.log(`🖼️  Image: ${image.title}`);
    console.log(`📝 Content length: ~800 words`);
    console.log(`\n✨ Blog generation complete!\n`);

  } catch (error) {
    console.error('❌ Error generating blog:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateBlog();
