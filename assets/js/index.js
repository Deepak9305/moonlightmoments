const API_KEY = 'DEMO_KEY';
const UNSPLASH_ACCESS_KEY = '';
const PEXELS_API_KEY = '';
let galleryItems = [];

document.addEventListener('DOMContentLoaded', () => {
    if (API_KEY === 'DEMO_KEY') {
        console.warn('⚠️ Using DEMO_KEY - API requests are rate-limited. Add your NASA API key for full functionality.');
    }
    createStars();
    loadArchive();
    
    document.getElementById('search-btn').onclick = () => {
        const input = document.getElementById('search-input');
        const v = input.value.trim();
        if (v && v.length > 1) {
            loadArchive(v);
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
            input.value = '';
        }
    };

    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('search-btn').click();
    });

    document.getElementById('date-btn').onclick = async function () {
        const input = document.getElementById('date-input');
        const d = input.value;
        if (!d) {
            alert("Please enter a birth date");
            return;
        }
        const dateObj = new Date(d);
        const today = new Date();
        if (dateObj > today) {
            alert("Birth date cannot be in the future");
            return;
        }
        this.disabled = true;
        this.textContent = "...";
        try {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${d}&api_key=${API_KEY}`);
            if (!res.ok) throw new Error('NASA API error');
            const i = await res.json();
            if (!i.url || i.media_type !== 'image') throw new Error('Invalid image data');
            galleryItems.unshift({ url: i.url, title: i.title || 'Unknown', explanation: i.explanation || '', date: i.date || d, source: 'BIRTH STAR' });
            renderGrid();
            openModal(0);
        } catch (e) {
            alert("Sky data unavailable for this date.");
            console.error(e);
        }
        finally {
            this.disabled = false;
            this.textContent = "Space on My Birthday";
        }
    };

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => loadArchive('', true));
    }

    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });
    }

    const mainGrid = document.getElementById('main-grid');
    if (mainGrid) {
        mainGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.grid-item-card');
            if (card) {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(idx)) openModal(idx);
            }
        });
    }
});

function createStars() {
    const field = document.getElementById('loader-starfield');
    if (!field) return;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        field.appendChild(star);
    }
}

async function loadArchive(query = '', isAppend = false) {
    const preloader = document.getElementById('preloader');
    const loadBtn = document.getElementById('load-more-btn');
    const startTime = Date.now();

    if (!isAppend) {
        if (preloader) {
            preloader.style.display = 'flex';
            preloader.style.opacity = '1';
        }
    } else if (loadBtn) {
        loadBtn.innerText = "...";
    }

    const beautyPool = ['nebula', 'galaxy cluster', 'carina nebula', 'hubble legacy', 'webb deep field', 'stellar nursery', 'pillars of creation', 'supernova remnant', 'spiral galaxy'];
    const searchQ = query || beautyPool[Math.floor(Math.random() * beautyPool.length)];

    let cleanApods = [];
    let cleanLibrary = [];
    let extraSources = [];

    try {
        try {
            const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
            if (apodRes.ok) {
                const apodData = await apodRes.json();
                cleanApods = (apodData || []).filter(i => i && i.media_type === 'image' && i.url).map(i => ({
                    url: i.url, title: i.title || "Celestial View", explanation: i.explanation || "", date: i.date || "Archive", source: 'CURATED'
                }));
            }
        } catch (e) { console.warn("APOD sync skipped"); }

        const searchRes = await fetch(`https://images-api.nasa.gov/search?q=${searchQ}&media_type=image`);
        if (searchRes.ok) {
            const searchData = await searchRes.json();
            const items = searchData?.collection?.items || [];
            const badWords = ['astronaut', 'Museum', 'scientist', 'engineer', 'technician', 'personnel', 'crew portrait', 'standing next to', 'holding', 'man in', 'woman in', 'control room', 'laboratory interior', 'lab interior', 'test facility', 'machinery', 'circuitry', 'blueprint', 'schematic', 'technical diagram', 'instrument panel', 'launch vehicle technical', 'office building', 'hangar interior', 'warehouse', 'factory', 'parking lot', 'chart', 'graph', 'presentation slide', 'clipart', 'line drawing', 'patch design', 'insignia design', 'document scan', 'infographic', 'rocket', 'falcon', 'starship', 'pads', 'launch site', 'gantry', 'technical tower', 'spacesuit', 'suit portrait', 'official portrait', 'portrait of', 'booster', 'capsule', 'fairing', 'stage 1', 'stage 2', 'first stage', 'engine testing'];

            cleanLibrary = items.filter(item => {
                if (!item.data || !item.data[0]) return false;
                const meta = (item.data[0].title + (item.data[0].description || "")).toLowerCase();
                return !badWords.some(word => meta.includes(word));
            }).slice(0, 8).map(item => ({
                url: item.links?.[0]?.href,
                title: item.data[0].title || "Cosmic Object",
                explanation: item.data[0].description || "",
                date: item.data[0].date_created?.split('T')[0] || "Archive",
                source: 'NASA ARCHIVE'
            })).filter(i => i.url);
        }

        if (isAppend || query === '') {
            const diversified = await Promise.all([
                fetchMarsRover(),
                fetchEPIC(),
                fetchDeepSpace(),
                fetchUnsplash(),
                fetchPexels()
            ]);
            extraSources = diversified.flat();
        }

        const newItems = [...cleanApods, ...cleanLibrary, ...extraSources].sort(() => 0.5 - Math.random());

        if (newItems.length === 0 && !query.includes('galaxy')) {
            loadArchive('galaxy nebula cosmos', isAppend);
            return;
        }

        if (isAppend) {
            const startIdx = galleryItems.length;
            galleryItems = [...galleryItems, ...newItems];
            renderGrid(true, startIdx);
        } else {
            galleryItems = newItems;
            renderGrid();
            if (galleryItems[0]) {
                const heroBg = document.getElementById('hero-bg');
                if (heroBg) {
                    heroBg.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = galleryItems[0].url;
                    img.alt = galleryItems[0].title;
                    heroBg.appendChild(img);
                }
            }
        }
    } catch (e) {
        console.error("Archive sync failure", e);
    } finally {
        if (loadBtn) loadBtn.innerText = "Load More ✧";
        if (!isAppend && preloader) {
            const elapsedTime = Date.now() - startTime;
            const minWait = 4000;
            const remainingWait = Math.max(0, minWait - elapsedTime);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 1600);
            }, remainingWait);
        }
    }
}

function renderGrid(isAppend = false, startIdx = 0) {
    const container = document.getElementById('main-grid');
    if (!container) return;
    const targetItems = isAppend ? galleryItems.slice(startIdx) : galleryItems;

    if (!isAppend) {
        container.innerHTML = '';
    }

    targetItems.forEach((item, i) => {
        const globalIdx = isAppend ? startIdx + i : i;
        const card = document.createElement('div');
        card.className = 'grid-item-card';
        card.setAttribute('data-index', globalIdx);
        card.style.animation = `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${i * 0.1}s`;

        const sourceTag = document.createElement('div');
        sourceTag.className = `source-tag ${(item.source || 'Unknown').toLowerCase().replace(/\s+/g, '-')}`;
        sourceTag.textContent = item.source || 'Unknown';

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'card-img-wrapper';
        imgWrapper.style.background = '#0a0a0c';
        const img = document.createElement('img');
        img.src = item.url || '';
        img.alt = item.title || 'Space image';
        img.style.opacity = '0';
        img.addEventListener('load', () => { img.style.opacity = '1'; });
        img.addEventListener('error', () => {
            img.src = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';
            img.style.opacity = '1';
        });
        imgWrapper.appendChild(img);

        const textSection = document.createElement('div');
        textSection.style.padding = '22px';
        const dateSpan = document.createElement('span');
        dateSpan.style.cssText = 'font-size:0.75rem; color:var(--accent); font-weight:600;';
        dateSpan.textContent = item.date || 'Archive';
        const title = document.createElement('h3');
        title.style.cssText = 'font-size:1rem; margin-top:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:white;';
        title.textContent = item.title || 'Cosmic Object';
        textSection.appendChild(dateSpan);
        textSection.appendChild(title);

        card.appendChild(sourceTag);
        card.appendChild(imgWrapper);
        card.appendChild(textSection);
        container.appendChild(card);
    });

    if (typeof setupHovers === 'function') setupHovers();
}

function openModal(i) {
    const item = galleryItems[i];
    const modalImg = document.querySelector('.modal-img-side');
    if (modalImg) {
        modalImg.innerHTML = '';
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.title;
        img.onerror = () => {
            img.src = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';
            img.alt = 'Fallback space image';
        };
        modalImg.appendChild(img);
    }
    document.getElementById('m-title').textContent = item.title;
    document.getElementById('m-date').textContent = item.date;
    document.getElementById('m-desc').textContent = item.explanation;
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const dlBtn = document.getElementById('m-dl');
    dlBtn.onclick = () => downloadImage(item.url, item.title);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function downloadImage(url, title) {
    const a = document.createElement('a');
    a.href = url;
    a.download = title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 100) + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function fetchMarsRover() {
    try {
        const sol = Math.floor(Math.random() * 1000) + 1000;
        const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${API_KEY}`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.photos || []).slice(0, 8).map(p => ({
            url: p.img_src, title: `Mars - ${p.camera.full_name}`, explanation: `Captured by Curiosity Rover on Sol ${p.sol}.`, date: p.earth_date, source: 'MARS ROVER'
        }));
    } catch (e) { return []; }
}

async function fetchEPIC() {
    try {
        const res = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${API_KEY}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.slice(0, 5).map(i => {
            const date = i.date.split(' ')[0].replace(/-/g, '/');
            return {
                url: `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${i.image}.png?api_key=${API_KEY}`,
                title: "Earth from EPIC", explanation: i.caption, date: i.date.split(' ')[0], source: 'EARTH EPIC'
            };
        });
    } catch (e) { return []; }
}

async function fetchDeepSpace() {
    try {
        const queries = ['hubble ultra deep field', 'james webb galaxy', 'm31 andromeda', 'crab nebula', 'eagle nebula pillows of creation'];
        const q = queries[Math.floor(Math.random() * queries.length)];
        const res = await fetch(`https://images-api.nasa.gov/search?q=${q}&media_type=image`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.collection?.items || []).slice(0, 5).map(i => ({
            url: i.links?.[0]?.href,
            title: i.data[0].title || "Deep Space",
            explanation: i.data[0].description || "",
            date: i.data[0].date_created?.split('T')[0] || "Archive",
            source: 'DEEP SPACE'
        })).filter(i => i.url);
    } catch (e) { return []; }
}

async function fetchUnsplash() {
    if (!UNSPLASH_ACCESS_KEY) return [];
    try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=nebula+galaxy+space&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.results || []).map(i => ({
            url: i.urls.regular,
            title: i.description || i.alt_description || "Cosmic Scene",
            explanation: `Captured by ${i.user.name} on Unsplash.`,
            date: i.created_at.split('T')[0],
            source: 'UNSPLASH'
        }));
    } catch (e) { return []; }
}

async function fetchPexels() {
    if (!PEXELS_API_KEY) return [];
    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=space+stars&orientation=landscape`, {
            headers: { 'Authorization': PEXELS_API_KEY }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.photos || []).map(i => ({
            url: i.src.large2x,
            title: i.alt || "Celestial Object",
            explanation: `Photo by ${i.photographer} on Pexels.`,
            date: "Recent",
            source: 'PEXELS'
        }));
    } catch (e) { return []; }
}
