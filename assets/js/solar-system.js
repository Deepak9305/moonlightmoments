// =============================================
//  PLANET DATA (realistic)
// =============================================
const PLANET_DATA = {
    Sun: {
        desc: "The yellow dwarf star at the center of our solar system. It holds 99.86% of the system's total mass and radiates the light and heat powering all planetary climates.",
        diameter: "1,392,700 km", distance: "0 km (Center)", day: "25-35 Earth days", year: "230M Earth yrs",
        moons: "8 Planets", temp: "5,500°C (15M°C core)", type: "G2V Yellow Dwarf Star"
    },
    Mercury: {
        desc: "The smallest and innermost planet. A cratered world of extremes — scorching days reaching 430°C and freezing nights at −180°C, with virtually no atmosphere to moderate temperatures.",
        diameter: "4,879 km", distance: "57.9M km", day: "58.6 Earth days", year: "88 Earth days",
        moons: "0", temp: "−180 to 430°C", type: "Terrestrial"
    },
    Venus: {
        desc: "Earth's toxic twin, shrouded in a dense atmosphere of CO₂ and sulfuric acid clouds. Runaway greenhouse effect makes it the hottest planet — hotter than Mercury despite being farther from the Sun.",
        diameter: "12,104 km", distance: "108.2M km", day: "243 Earth days", year: "225 Earth days",
        moons: "0", temp: "462°C avg.", type: "Terrestrial"
    },
    Earth: {
        desc: "Our home — the only known planet to harbour life. A world of liquid water spanning 71% of its surface, dynamic plate tectonics, and a magnetic field shielding it from solar wind.",
        diameter: "12,742 km", distance: "149.6M km", day: "24 hours", year: "365.25 days",
        moons: "1 (Moon)", temp: "15°C avg.", type: "Terrestrial"
    },
    Mars: {
        desc: "The Red Planet, coloured by iron oxide dust. Home to Olympus Mons (tallest volcano, 21.9 km) and Valles Marineris (4,000 km canyon). Evidence suggests liquid water once flowed here.",
        diameter: "6,779 km", distance: "227.9M km", day: "24h 37m", year: "687 Earth days",
        moons: "2 (Phobos, Deimos)", temp: "−65°C avg.", type: "Terrestrial"
    },
    Jupiter: {
        desc: "The king of planets — a gas giant so massive it holds 2.5× the mass of all other planets combined. The Great Red Spot is a storm larger than Earth, raging for over 350 years.",
        diameter: "139,820 km", distance: "778.5M km", day: "9h 56m", year: "11.86 Earth years",
        moons: "95+", temp: "−110°C cloud top", type: "Gas Giant"
    },
    Saturn: {
        desc: "The jewel of the Solar System. Its magnificent ring system spans 282,000 km but averages only 10 metres thick. Made of billions of ice and rock particles ranging from grains to house-sized chunks.",
        diameter: "116,460 km", distance: "1.43B km", day: "10h 42m", year: "29.4 Earth years",
        moons: "146+", temp: "−140°C cloud top", type: "Gas Giant"
    },
    Uranus: {
        desc: "An ice giant tilted 98° on its axis — likely from a massive ancient collision. It effectively orbits the Sun rolling on its side. Methane in its atmosphere absorbs red light, giving it a pale cyan colour.",
        diameter: "50,724 km", distance: "2.87B km", day: "17h 14m", year: "84 Earth years",
        moons: "28", temp: "−224°C", type: "Ice Giant"
    },
    Neptune: {
        desc: "The farthest planet, a vivid deep blue ice giant. Its atmosphere hosts the strongest winds in the Solar System — up to 2,100 km/h. Its moon Triton orbits retrograde and may be a captured Kuiper Belt object.",
        diameter: "49,244 km", distance: "4.5B km", day: "16h 6m", year: "164.8 Earth years",
        moons: "16", temp: "−214°C", type: "Ice Giant"
    },
    Pluto: {
        desc: "The most famous dwarf planet. Once the ninth planet, it has a complex, heart-shaped glacier of nitrogen ice (Sputnik Planitia) and a massive moon, Charon, that is so large they orbit each other as a binary system.",
        diameter: "2,376 km", distance: "5.9B km", day: "6.4 Earth days", year: "248 Earth years",
        moons: "5", temp: "−225°C", type: "Dwarf Planet"
    }
};

const FAMOUS_STARS = [
    { name: "Polaris", ra: { h: 2, m: 31, s: 49 }, dec: { d: 89, m: 15, s: 51 }, color: 0xffffee, desc: "The North Star. A yellow supergiant in a triple star system.", dist: "433 ly", type: "F7Ib", size: "37.5 R☉" },
    { name: "Sirius", ra: { h: 6, m: 45, s: 9 }, dec: { d: -16, m: 42, s: 58 }, color: 0xccddee, desc: "The brightest star in the night sky. A binary system consisting of a main-sequence star and a faint white dwarf.", dist: "8.6 ly", type: "A1V", size: "1.71 R☉" },
    { name: "Canopus", ra: { h: 6, m: 23, s: 57 }, dec: { d: -52, m: 41, s: 44 }, color: 0xffffff, desc: "The second-brightest star. A rare type of white supergiant often used by spacecraft for navigation.", dist: "310 ly", type: "A9II", size: "71.4 R☉" },
    { name: "Rigil Kent", ra: { h: 14, m: 39, s: 36 }, dec: { d: -60, m: 50, s: 7 }, color: 0xffeedd, desc: "Also known as Alpha Centauri A. The closest star system to the Solar System.", dist: "4.37 ly", type: "G2V", size: "1.22 R☉" },
    { name: "Arcturus", ra: { h: 14, m: 15, s: 40 }, dec: { d: 19, m: 10, s: 56 }, color: 0xffccaa, desc: "A red giant star. It is the brightest star in the northern celestial hemisphere.", dist: "36.7 ly", type: "K1.5III", size: "25.4 R☉" },
    { name: "Vega", ra: { h: 18, m: 36, s: 56 }, dec: { d: 38, m: 47, s: 1 }, color: 0xccddee, desc: "A rapidly rotating blue-white star. It was the first star ever to be photographed.", dist: "25 ly", type: "A0Va", size: "2.4-2.7 R☉" },
    { name: "Capella", ra: { h: 5, m: 16, s: 41 }, dec: { d: 45, m: 59, s: 53 }, color: 0xffffcc, desc: "Appears as a single star, but is actually a quadruple star system consisting of two binary pairs.", dist: "42.9 ly", type: "G8III / G0III", size: "12R☉ / 9R☉" },
    { name: "Rigel", ra: { h: 5, m: 14, s: 32 }, dec: { d: -8, m: 12, s: 6 }, color: 0xbbccff, desc: "A massive, extremely bright blue supergiant defining the left foot of Orion.", dist: "860 ly", type: "B8Ia", size: "79 R☉" },
    { name: "Procyon", ra: { h: 7, m: 39, s: 18 }, dec: { d: 5, m: 13, s: 30 }, color: 0xffffee, desc: "The 8th brightest star. Like Sirius, it has a faint white dwarf companion.", dist: "11.4 ly", type: "F5IV-V", size: "2.05 R☉" },
    { name: "Achernar", ra: { h: 1, m: 37, s: 43 }, dec: { d: -57, m: 14, s: 12 }, color: 0xccddee, desc: "The flattest known star in the Milky Way due to its incredibly rapid rotation.", dist: "139 ly", type: "B6Vep", size: "7.5 R☉ (Oblate)" },
    { name: "Betelgeuse", ra: { h: 5, m: 55, s: 10 }, dec: { d: 7, m: 24, s: 25 }, color: 0xffaa88, desc: "A massive red supergiant nearing the end of its life, expected to go supernova in the astronomical 'near future'.", dist: "~500 ly", type: "M1-M2Ia-ab", size: "764 R☉" },
    { name: "Hadar", ra: { h: 14, m: 3, s: 49 }, dec: { d: -60, m: 22, s: 23 }, color: 0xccddee, desc: "Also called Beta Centauri, a triple star system primarily composed of blue giants.", dist: "390 ly", type: "B1III", size: "11 R☉" },
    { name: "Altair", ra: { h: 19, m: 50, s: 47 }, dec: { d: 8, m: 52, s: 6 }, color: 0xffffff, desc: "A rapidly rotating A-type main sequence star. Part of the 'Summer Triangle'.", dist: "16.7 ly", type: "A7V", size: "1.9 R☉" },
    { name: "Aldebaran", ra: { h: 4, m: 35, s: 55 }, dec: { d: 16, m: 30, s: 33 }, color: 0xffccaa, desc: "An orange giant star. Known as 'the Follower' because it appears to follow the Pleiades.", dist: "65.3 ly", type: "K5III", size: "44.1 R☉" },
    { name: "Spica", ra: { h: 13, m: 25, s: 12 }, dec: { d: -11, m: 9, s: 41 }, color: 0xccddee, desc: "A spectroscopic binary star; the two components orbit so closely they are egg-shaped.", dist: "250 ly", type: "B1III-IV", size: "7.4 R☉" },
    { name: "Antares", ra: { h: 16, m: 29, s: 25 }, dec: { d: -26, m: 25, s: 55 }, color: 0xff8866, desc: "A massive red supergiant at the heart of Scorpius. 'Anti-Ares' (Rival of Mars) due to its color.", dist: "550 ly", type: "M1.5Iab-Ib", size: "~680 R☉" },
    { name: "Pollux", ra: { h: 7, m: 45, s: 19 }, dec: { d: 28, m: 7, s: 35 }, color: 0xffccaa, desc: "An orange giant star, the brightest in Gemini. It has an exoplanet orbiting it.", dist: "34 ly", type: "K0III", size: "9.06 R☉" },
    { name: "Fomalhaut", ra: { h: 22, m: 57, s: 39 }, dec: { d: -29, m: 37, s: 20 }, color: 0xffffff, desc: "A young, bright star surrounded by a spectacular circumstellar debris disk.", dist: "25.1 ly", type: "A3V", size: "1.84 R☉" },
    { name: "Deneb", ra: { h: 20, m: 41, s: 26 }, dec: { d: 45, m: 16, s: 49 }, color: 0xffffff, desc: "A highly luminous blue-white supergiant. One of the most distant naked-eye stars.", dist: "2,600 ly", type: "A2Ia", size: "203 R☉" },
    // Additional stars for constellations
    { name: "Bellatrix", ra: { h: 5, m: 25, s: 8 }, dec: { d: 6, m: 20, s: 59 }, color: 0xccddee },
    { name: "Saiph", ra: { h: 5, m: 47, s: 45 }, dec: { d: -9, m: 40, s: 11 }, color: 0xccddee },
    { name: "Alnitak", ra: { h: 5, m: 40, s: 46 }, dec: { d: -1, m: 56, s: 34 }, color: 0xccddee },
    { name: "Alnilam", ra: { h: 5, m: 36, s: 13 }, dec: { d: -1, m: 12, s: 7 }, color: 0xccddee },
    { name: "Mintaka", ra: { h: 5, m: 32, s: 0 }, dec: { d: -0, m: 17, s: 57 }, color: 0xccddee },
    { name: "Dubhe", ra: { h: 11, m: 3, s: 44 }, dec: { d: 61, m: 45, s: 3 }, color: 0xffffcc },
    { name: "Merak", ra: { h: 11, m: 1, s: 50 }, dec: { d: 56, m: 22, s: 56 }, color: 0xccddee },
    { name: "Phecda", ra: { h: 11, m: 53, s: 50 }, dec: { d: 53, m: 41, s: 41 }, color: 0xccddee },
    { name: "Megrez", ra: { h: 12, m: 15, s: 25 }, dec: { d: 57, m: 1, s: 47 }, color: 0xccddee },
    { name: "Alioth", ra: { h: 12, m: 54, s: 1 }, dec: { d: 55, m: 57, s: 35 }, color: 0xccddee },
    { name: "Mizar", ra: { h: 13, m: 23, s: 55 }, dec: { d: 54, m: 55, s: 31 }, color: 0xccddee },
    { name: "Alkaid", ra: { h: 13, m: 47, s: 32 }, dec: { d: 49, m: 18, s: 48 }, color: 0xccddee },
    { name: "Segin", ra: { h: 1, m: 54, s: 24 }, dec: { d: 63, m: 40, s: 12 }, color: 0xccddee },
    { name: "Ruchbah", ra: { h: 1, m: 25, s: 49 }, dec: { d: 60, m: 14, s: 7 }, color: 0xccddee },
    { name: "Gamma Cas", ra: { h: 0, m: 56, s: 43 }, dec: { d: 60, m: 43, s: 0 }, color: 0xbbccff },
    { name: "Schedar", ra: { h: 0, m: 40, s: 30 }, dec: { d: 56, m: 32, s: 14 }, color: 0xffccaa },
    { name: "Caph", ra: { h: 0, m: 9, s: 11 }, dec: { d: 59, m: 8, s: 59 }, color: 0xffffee },
    { name: "Sadr", ra: { h: 20, m: 22, s: 14 }, dec: { d: 40, m: 15, s: 24 }, color: 0xffffee },
    { name: "Gienah", ra: { h: 20, m: 46, s: 13 }, dec: { d: 33, m: 58, s: 13 }, color: 0xffffee },
    { name: "Albireo", ra: { h: 19, m: 30, s: 43 }, dec: { d: 27, m: 57, s: 35 }, color: 0xffffcc },
    { name: "Fawaris", ra: { h: 19, m: 44, s: 58 }, dec: { d: 45, m: 7, s: 51 }, color: 0xccddee },
    { name: "Kochab", ra: { h: 14, m: 50, s: 42 }, dec: { d: 74, m: 9, s: 20 }, color: 0xffccaa },
    { name: "Pherkad", ra: { h: 15, m: 20, s: 44 }, dec: { d: 71, m: 50, s: 3 }, color: 0xffffff }
];

const CONSTELLATIONS = [
    { name: "Orion", stars: ["Betelgeuse", "Rigel", "Bellatrix", "Saiph", "Betelgeuse"] },
    { name: "Belt", stars: ["Alnitak", "Alnilam", "Mintaka"] },
    { name: "Big Dipper", stars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"] },
    { name: "Cassiopeia", stars: ["Caph", "Schedar", "Gamma Cas", "Ruchbah", "Segin"] },
    { name: "Cygnus", stars: ["Deneb", "Sadr", "Albireo", "Sadr", "Gienah", "Sadr", "Fawaris"] },
    { name: "Ursa Minor", stars: ["Polaris", "Kochab", "Pherkad", "Polaris"] }
];

// =============================================
//  NOISE HELPERS
// =============================================
function noise2D(x, y) {
    let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
}

function fbm(x, y, octaves) {
    let val = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < octaves; i++) {
        val += amp * noise2D(x * freq, y * freq);
        amp *= 0.5;
        freq *= 2.0;
    }
    return val;
}

// =============================================
//  PROCEDURAL TEXTURE GENERATOR
// =============================================
function makeRealisticTexture(config) {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const { baseR, baseG, baseB, varR, varG, varB, type, bands, craters } = config;
    const imageData = ctx.createImageData(size, size);
    const d = imageData.data;

    for (let py = 0; py < size; py++) {
        for (let px = 0; px < size; px++) {
            const idx = (py * size + px) * 4;
            const nx = px / size, ny = py / size;
            let n = fbm(nx * 8, ny * 8, 5);
            let r = baseR, g = baseG, b = baseB;

            if (type === 'rocky') {
                const detail = fbm(nx * 16, ny * 16, 4);
                r = baseR + (varR * (n - 0.5) + varR * 0.3 * (detail - 0.5));
                g = baseG + (varG * (n - 0.5) + varG * 0.3 * (detail - 0.5));
                b = baseB + (varB * (n - 0.5) + varB * 0.3 * (detail - 0.5));
                if (craters && fbm(nx * 30, ny * 30, 3) > 0.7) { r *= 0.75; g *= 0.75; b *= 0.75; }
            } else if (type === 'gaseous') {
                const bandNoise = Math.sin(ny * Math.PI * (bands || 12)) * 0.5 + 0.5;
                const turbulence = fbm(nx * 6 + n * 2, ny * 3, 4);
                r = baseR + varR * (bandNoise * 0.6 + turbulence * 0.4 - 0.5);
                g = baseG + varG * (bandNoise * 0.6 + turbulence * 0.4 - 0.5);
                b = baseB + varB * (bandNoise * 0.6 + turbulence * 0.4 - 0.5);
            } else if (type === 'earth') {
                const continent = fbm(nx * 5 + 0.3, ny * 5 + 0.7, 6);
                if (continent > 0.48) {
                    const landDetail = fbm(nx * 20, ny * 20, 3);
                    r = 30 + 50 * landDetail; g = 80 + 60 * landDetail; b = 25 + 30 * landDetail;
                } else {
                    const oceanDepth = fbm(nx * 12, ny * 12, 3);
                    r = 15 + 20 * oceanDepth; g = 40 + 60 * oceanDepth; b = 130 + 70 * oceanDepth;
                }
                const lat = Math.abs(ny - 0.5) * 2;
                if (lat > 0.82) {
                    const ice = (lat - 0.82) / 0.18;
                    r = r * (1 - ice) + 230 * ice; g = g * (1 - ice) + 235 * ice; b = b * (1 - ice) + 240 * ice;
                }
            } else if (type === 'ice' || type === 'venus') {
                const swirl = fbm(nx * (type === 'ice' ? 4 : 3 + ny * 0.5), ny * 8, 5);
                const swirl2 = fbm(nx * 6, ny * (type === 'ice' ? 6 : 4 + nx * 2), 4);
                r = baseR + varR * (swirl * 0.7 + swirl2 * 0.3 - 0.5);
                g = baseG + varG * (swirl * 0.7 + swirl2 * 0.3 - 0.5);
                b = baseB + varB * (swirl * 0.7 + swirl2 * 0.3 - 0.5);
            }
            d[idx] = Math.max(0, Math.min(255, r));
            d[idx + 1] = Math.max(0, Math.min(255, g));
            d[idx + 2] = Math.max(0, Math.min(255, b));
            d[idx + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(c);
}

// =============================================
//  SCENE SETUP
// =============================================
const canvas = document.getElementById('solar-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000005);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 80000);
camera.position.set(0, 160, 350);

let orbitControls = new THREE.OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.06;
orbitControls.minDistance = 25;
orbitControls.maxDistance = 1500;

let flyControls = new THREE.FlyControls(camera, renderer.domElement);
flyControls.movementSpeed = 60;
flyControls.rollSpeed = Math.PI / 10;
flyControls.dragToLook = true;

let currentMode = 'orbit';

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    if (mode === 'orbit') {
        document.getElementById('btn-orbit').classList.add('active');
        camera.position.set(0, 160, 350);
        orbitControls.target.set(0, 0, 0);
        document.getElementById('wasd-hint').style.display = 'none';
    } else {
        document.getElementById('btn-fly').classList.add('active');
        closePlanetPanel();
        document.getElementById('wasd-hint').style.display = 'block';
    }
}

const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2, // strength
    0.5, // radius
    0.75 // threshold
);
composer.addPass(bloomPass);

// =============================================
//  SUN (VIBRANT GLOWING CELESTIAL STAR)
// =============================================
const sunC = document.createElement('canvas');
sunC.width = sunC.height = 512;
const sunCtx = sunC.getContext('2d');
const sunImgData = sunCtx.createImageData(512, 512);

for (let i = 0; i < 512 * 512; i++) {
    const px = i % 512, py = Math.floor(i / 512);
    // Solar turbulence noise
    const n1 = fbm(px / 24, py / 24, 5);
    const n2 = fbm(px / 12 + 10, py / 12 + 10, 4);
    const plasma = n1 * 0.65 + n2 * 0.35;

    // Glowing solar spectrum: Bright gold core to deep fiery orange granules
    sunImgData.data[i * 4] = 255; // Red
    sunImgData.data[i * 4 + 1] = Math.floor(160 + plasma * 85); // Green (gold/yellow)
    sunImgData.data[i * 4 + 2] = Math.floor(plasma * 60); // Blue (warmth, no pale gray)
    sunImgData.data[i * 4 + 3] = 255;
}
sunCtx.putImageData(sunImgData, 0, 0);

const sunTexture = new THREE.CanvasTexture(sunC);
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(22, 64, 64),
    new THREE.MeshBasicMaterial({ map: sunTexture, color: 0xffd152 })
);
sun.name = 'Sun';
scene.add(sun);

// Radiant Sun Lights & Balanced Cosmic Fill
const sunLight = new THREE.PointLight(0xfff8ee, 3.2, 5000, 0.4);
sun.add(sunLight);

const innerSunGlow = new THREE.PointLight(0xffaa22, 1.8, 600, 0.8);
sun.add(innerSunGlow);

// Soft cosmic fill so night side of planets remains visible and beautiful
scene.add(new THREE.AmbientLight(0xdbe6fe, 0.82));
scene.add(new THREE.HemisphereLight(0xffeedd, 0x1e2238, 0.55));

// =============================================
//  PLANETS
// =============================================
const planetDefs = [
    { name: 'Mercury', radius: 2.0, orbitA: 52, orbitB: 47, speed: 4.1, tilt: 0.03, tex: { baseR: 148, baseG: 138, baseB: 126, varR: 40, varG: 35, varB: 30, type: 'rocky', craters: true } },
    { name: 'Venus', radius: 4.8, orbitA: 80, orbitB: 78, speed: 1.6, tilt: 0.05, tex: { baseR: 205, baseG: 175, baseB: 115, varR: 50, varG: 45, varB: 40, type: 'venus' }, atmo: 0xd4a855, atmoOpacity: 0.18 },
    { name: 'Earth', radius: 5.0, orbitA: 112, orbitB: 110, speed: 1.0, tilt: 0.41, tex: { type: 'earth' }, atmo: 0x4488ff, atmoOpacity: 0.12, hasMoon: true },
    { name: 'Mars', radius: 3.2, orbitA: 155, orbitB: 148, speed: 0.53, tilt: 0.44, tex: { baseR: 180, baseG: 100, baseB: 60, varR: 50, varG: 35, varB: 25, type: 'rocky', craters: true } },
    { name: 'Jupiter', radius: 13, orbitA: 250, orbitB: 238, speed: 0.084, tilt: 0.05, tex: { baseR: 185, baseG: 150, baseB: 110, varR: 65, varG: 50, varB: 40, type: 'gaseous', bands: 16 } },
    { name: 'Saturn', radius: 11, orbitA: 350, orbitB: 330, speed: 0.034, tilt: 0.47, tex: { baseR: 200, baseG: 180, baseB: 140, varR: 50, varG: 45, varB: 40, type: 'gaseous', bands: 10 }, rings: true },
    { name: 'Uranus', radius: 7, orbitA: 450, orbitB: 443, speed: 0.012, tilt: 1.71, tex: { baseR: 155, baseG: 210, baseB: 215, varR: 25, varG: 30, varB: 25, type: 'ice' }, rings: 'thin' },
    { name: 'Neptune', radius: 6.5, orbitA: 550, orbitB: 544, speed: 0.006, tilt: 0.49, tex: { baseR: 50, baseG: 80, baseB: 180, varR: 30, varG: 40, varB: 60, type: 'ice' } },
    { name: 'Pluto', radius: 1.1, orbitA: 720, orbitB: 680, speed: 0.003, tilt: 2.05, tex: { baseR: 180, baseG: 170, baseB: 160, varR: 30, varG: 25, varB: 20, type: 'rocky', craters: true }, inclination: 0.3 }
];

const planetMeshes = [];
const orbitAngles = planetDefs.map(() => Math.random() * Math.PI * 2);
let moonMesh = null, moonOrbitAngle = 0;

planetDefs.forEach((def, idx) => {
    const orbitPts = [];
    for (let i = 0; i <= 180; i++) {
        const a = (i / 180) * Math.PI * 2;
        orbitPts.push(new THREE.Vector3(Math.cos(a) * def.orbitA, 0, Math.sin(a) * def.orbitB));
    }
    const orbitLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbitPts), new THREE.LineBasicMaterial({ color: 0x303550, transparent: true, opacity: 0.4 }));
    if (def.inclination) orbitLine.rotation.x = def.inclination;
    scene.add(orbitLine);

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(def.radius, 64, 64), new THREE.MeshStandardMaterial({ map: makeRealisticTexture(def.tex), roughness: 0.8, metalness: 0.02 }));
    mesh.rotation.z = def.tilt; mesh.name = def.name;
    if (def.atmo) mesh.add(new THREE.Mesh(new THREE.SphereGeometry(def.radius * 1.06, 48, 48), new THREE.MeshBasicMaterial({ color: def.atmo, transparent: true, opacity: def.atmoOpacity, side: THREE.BackSide, depthWrite: false })));
    
    if (def.rings === true) {
        const rC = document.createElement('canvas'); rC.width = 512; rC.height = 64;
        const rctx = rC.getContext('2d');
        for (let x = 0; x < 512; x++) {
            const b = Math.sin(x / 512 * Math.PI * 30) * 0.3 + 0.5;
            const gap = (x / 512 > 0.42 && x / 512 < 0.47) ? 0.05 : 1;
            rctx.fillStyle = `rgba(200, 180, 140, ${b * gap * 0.75})`; rctx.fillRect(x, 0, 1, 64);
        }
        const rGeo = new THREE.RingGeometry(def.radius * 1.3, def.radius * 2.6, 120);
        const uv = rGeo.attributes.uv;
        for (let i = 0; i < rGeo.attributes.position.count; i++) {
            const d = Math.sqrt(Math.pow(rGeo.attributes.position.getX(i), 2) + Math.pow(rGeo.attributes.position.getZ(i), 2));
            uv.setXY(i, (d - def.radius * 1.3) / (def.radius * 1.3), 0.5);
        }
        const rMesh = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(rC), side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthWrite: false }));
        rMesh.rotation.x = Math.PI / 2.2; mesh.add(rMesh);
    }
    if (def.rings === 'thin') {
        const rMesh = new THREE.Mesh(new THREE.RingGeometry(def.radius * 1.5, def.radius * 1.65, 80), new THREE.MeshBasicMaterial({ color: 0x88aaaa, side: THREE.DoubleSide, transparent: true, opacity: 0.2, depthWrite: false }));
        rMesh.rotation.x = Math.PI / 2; mesh.add(rMesh);
    }
    if (def.hasMoon) {
        moonMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ map: makeRealisticTexture({ baseR: 160, baseG: 158, baseB: 155, varR: 30, varG: 28, varB: 26, type: 'rocky', craters: true }), roughness: 0.9 }));
        moonMesh.name = 'Moon'; scene.add(moonMesh);
    }
    scene.add(mesh);
    planetMeshes.push({ mesh, orbitA: def.orbitA, orbitB: def.orbitB, speed: def.speed, name: def.name, radius: def.radius, inclination: def.inclination || 0 });
});

// =============================================
//  INTERSTELLAR
// =============================================
const starObjects = [], interstellarGroup = new THREE.Group(); scene.add(interstellarGroup);
const raDecToXYZ = (ra, dec, radius) => {
    const phi = (90 - (dec.d + dec.m / 60 + dec.s / 3600)) * (Math.PI / 180), theta = (ra.h * 15 + ra.m * 0.25 + ra.s * 0.004166) * (Math.PI / 180);
    return new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};
FAMOUS_STARS.forEach(s => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(6, 8, 8), new THREE.MeshBasicMaterial({ color: s.color }));
    m.position.copy(raDecToXYZ(s.ra, s.dec, 3000)); m.name = s.name; interstellarGroup.add(m); starObjects.push(m);
});
CONSTELLATIONS.forEach(con => {
    const pts = [];
    for (let i = 0; i < con.stars.length - 1; i++) {
        const s1 = FAMOUS_STARS.find(s => s.name === con.stars[i]), s2 = FAMOUS_STARS.find(s => s.name === con.stars[i + 1]);
        if (s1 && s2) { pts.push(raDecToXYZ(s1.ra, s1.dec, 3000)); pts.push(raDecToXYZ(s2.ra, s2.dec, 3000)); }
    }
    interstellarGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x4455aa, transparent: true, opacity: 0.2 })));
});

// Asteroid belt
(function () {
    const count = 3000, pos = new Float32Array(count * 3), geo = new THREE.BufferGeometry();
    for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2, d = 190 + Math.random() * 40;
        pos[i * 3] = Math.cos(a) * d; pos[i * 3 + 1] = (Math.random() - 0.5) * 6; pos[i * 3 + 2] = Math.sin(a) * d;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x887766, size: 0.4, transparent: true, opacity: 0.5 })));
})();

// =============================================
//  INTERACTION
// =============================================
const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
let focusedObject = null, focusLerp = 0, focusedName = "", compareModeActive = false, compareBaseObj = null;

canvas.addEventListener('mousemove', e => {
    const m = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(m, camera);
    const hits = raycaster.intersectObjects([...planetMeshes.map(p => p.mesh), ...starObjects]);
    const label = document.getElementById('planet-hover-label');
    if (hits.length > 0) {
        label.textContent = hits[0].object.name; label.style.display = 'block';
        label.style.left = (e.clientX + 18) + 'px'; label.style.top = (e.clientY - 12) + 'px';
        canvas.style.cursor = 'pointer';
    } else { label.style.display = 'none'; canvas.style.cursor = 'crosshair'; }
});

canvas.addEventListener('click', e => {
    if (currentMode !== 'orbit' || compareModeActive) return;
    mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects([...planetMeshes.map(p => p.mesh), ...starObjects]);
    if (hits.length > 0) {
        const name = hits[0].object.name, star = FAMOUS_STARS.find(s => s.name === name);
        if (star) showStarPanel(star, hits[0].object); else showPlanetPanel(name);
    }
});

function showPlanetPanel(name) {
    focusedName = name; const d = PLANET_DATA[name]; if (!d) return;
    document.getElementById('pi-name').textContent = name; document.getElementById('pi-desc').textContent = d.desc;
    const s = document.getElementById('pi-stats-container'); s.innerHTML = '';
    const statMap = {
        'Diameter': d.diameter,
        'Distance': d.distance,
        'Day Length': d.day,
        'Year Length': d.year,
        'Moons': d.moons,
        'Temperature': d.temp,
        'Type': d.type
    };
    Object.entries(statMap).forEach(([k, val]) => {
        const stat = document.createElement('div');
        stat.className = 'planet-ui-stat';
        const kSpan = document.createElement('span');
        kSpan.textContent = k;
        const vSpan = document.createElement('span');
        vSpan.textContent = val || 'Unknown';
        stat.appendChild(kSpan);
        stat.appendChild(vSpan);
        s.appendChild(stat);
    });
    document.getElementById('planet-info-panel').classList.add('visible');
    if (name === 'Sun') {
        focusedObject = { mesh: sun, radius: 25 };
    } else {
        focusedObject = planetMeshes.find(p => p.name === name);
    }
    focusLerp = 0;

    // Highlight dock button
    document.querySelectorAll('.dock-btn').forEach(b => {
        if (b.dataset.target === name) b.classList.add('active');
        else b.classList.remove('active');
    });
}

function showStarPanel(star, mesh) {
    focusedName = star.name; document.getElementById('pi-name').textContent = star.name; document.getElementById('pi-desc').textContent = star.desc || "Distant star.";
    const s = document.getElementById('pi-stats-container'); s.innerHTML = '';
    [['Spectral Type', star.type], ['Distance', star.dist], ['Est. Size', star.size]].forEach(pair => {
        const stat = document.createElement('div');
        stat.className = 'planet-ui-stat';
        const label = document.createElement('span');
        label.textContent = pair[0];
        const value = document.createElement('span');
        value.textContent = pair[1] || 'Unknown';
        stat.appendChild(label);
        stat.appendChild(value);
        s.appendChild(stat);
    });
    document.getElementById('planet-info-panel').classList.add('visible');
    focusedObject = { mesh, radius: 10 }; focusLerp = 0;
}

function closePlanetPanel() { document.getElementById('planet-info-panel').classList.remove('visible'); focusedObject = null; }

function startCompareMode() {
    compareModeActive = true; compareBaseObj = focusedName;
    closePlanetPanel();
    const hint = document.getElementById('hint-bar'); hint.textContent = 'SELECT ANOTHER BODY TO COMPARE'; hint.style.opacity = '1'; hint.style.animation = 'none';
    const handler = (e) => {
        mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects([...planetMeshes.map(p => p.mesh), ...starObjects]);
        if (hits.length > 0 && hits[0].object.name !== compareBaseObj) openComparisonModal(compareBaseObj, hits[0].object.name);
        compareModeActive = false; hint.style.opacity = '0'; canvas.removeEventListener('click', handler);
    };
    setTimeout(() => canvas.addEventListener('click', handler), 50);
}

function openComparisonModal(n1, n2) {
    const getStats = (n) => {
        if (PLANET_DATA[n]) {
            const d = PLANET_DATA[n];
            return { name: n, type: d.type, stats: [['Diameter', d.diameter], ['Distance', d.distance], ['Temp', d.temp], ['Orbit', d.year]] };
        }
        const s = FAMOUS_STARS.find(x => x.name === n);
        return s ? { name: n, type: "Star", stats: [['Spectral', s.type], ['Distance', s.dist], ['Size', s.size]] } : null;
    };
    [n1, n2].forEach((n, i) => {
        const obj = getStats(n), side = document.getElementById(i === 0 ? 'comp-left' : 'comp-right');
        if (!obj) return;
        let h = `<div class="planet-ui-title">${obj.name}</div><div class="planet-ui-desc compare-desc-margin">${obj.type}</div>`;
        obj.stats.forEach(s => h += `<div class="planet-ui-stat"><span>${s[0]}</span><span>${s[1]}</span></div>`);
        side.innerHTML = h;
    });
    document.getElementById('compare-overlay').classList.add('visible'); document.getElementById('compare-modal').classList.add('visible');
}

function closeCompareModal() { document.getElementById('compare-overlay').classList.remove('visible'); document.getElementById('compare-modal').classList.remove('visible'); }

// Time speed
let timeSpeed = 1.0;

document.addEventListener('DOMContentLoaded', () => {
    const timeSlider = document.getElementById('time-slider');
    if (timeSlider) {
        timeSlider.addEventListener('input', (e) => { 
            timeSpeed = parseFloat(e.target.value); 
            document.getElementById('speed-label').textContent = timeSpeed.toFixed(1) + '×'; 
        });
    }

    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) compareBtn.addEventListener('click', startCompareMode);

    const closePanelBtn = document.getElementById('close-panel-btn');
    if (closePanelBtn) closePanelBtn.addEventListener('click', closePlanetPanel);

    const btnOrbit = document.getElementById('btn-orbit');
    if (btnOrbit) btnOrbit.addEventListener('click', () => setMode('orbit'));

    const btnFly = document.getElementById('btn-fly');
    if (btnFly) btnFly.addEventListener('click', () => setMode('fly'));

    const compareOverlay = document.getElementById('compare-overlay');
    if (compareOverlay) compareOverlay.addEventListener('click', closeCompareModal);

    // Planet Dock quick buttons
    document.querySelectorAll('.dock-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target) {
                if (currentMode !== 'orbit') setMode('orbit');
                showPlanetPanel(target);
            }
        });
    });
});

// Animation
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta(), ts = 0.0008 * timeSpeed;
    if (currentMode === 'orbit') orbitControls.update(); else flyControls.update(dt);
    sun.rotation.y += 0.0005;
    planetMeshes.forEach((p, i) => {
        orbitAngles[i] += p.speed * ts;
        const x = Math.cos(orbitAngles[i]) * p.orbitA, z = Math.sin(orbitAngles[i]) * p.orbitB;
        p.mesh.position.set(x, p.inclination ? Math.sin(p.inclination) * x : 0, z); p.mesh.rotation.y += 0.003;
    });
    if (moonMesh) {
        const e = planetMeshes.find(p => p.name === 'Earth');
        if (e) {
            moonOrbitAngle += 0.008 * timeSpeed;
            moonMesh.position.set(e.mesh.position.x + Math.cos(moonOrbitAngle) * 12, 0.5, e.mesh.position.z + Math.sin(moonOrbitAngle) * 12);
        }
    }
    if (focusedObject && currentMode === 'orbit') {
        focusLerp = Math.min(focusLerp + 0.015, 1);
        const t = focusedObject.mesh.position, r = focusedObject.radius === 10 ? 40 : focusedObject.radius * 4.5;
        orbitControls.target.lerp(t, 0.05); camera.position.lerp(t.clone().add(new THREE.Vector3(r, r / 2, r)), 0.035);
    }
    composer.render();
}
animate();
window.onresize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); composer.setSize(window.innerWidth, window.innerHeight); };
