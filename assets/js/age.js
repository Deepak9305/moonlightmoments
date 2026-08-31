const planetDB = [
    { name: 'Mercury', g: 0.38, yr: 87.97, color: '#A5A5A5', glow: 'rgba(165, 165, 165, 0.3)' },
    { name: 'Venus', g: 0.91, yr: 224.7, color: '#E3BB76', glow: 'rgba(227, 187, 118, 0.3)' },
    { name: 'Mars', g: 0.38, yr: 686.98, color: '#E27B58', glow: 'rgba(226, 123, 88, 0.3)' },
    { name: 'Jupiter', g: 2.34, yr: 4332.59, color: '#D39C7E', glow: 'rgba(211, 156, 126, 0.3)' },
    { name: 'Saturn', g: 1.06, yr: 10759.22, color: '#C5AB6E', glow: 'rgba(197, 171, 110, 0.3)' },
    { name: 'Uranus', g: 0.92, yr: 30685.4, color: '#B5E2E2', glow: 'rgba(181, 226, 226, 0.3)' },
    { name: 'Neptune', g: 1.12, yr: 60189.0, color: '#6081ff', glow: 'rgba(96, 129, 255, 0.3)' },
    { name: 'Pluto', g: 0.06, yr: 90560.0, color: '#fff1e0', glow: 'rgba(255, 241, 224, 0.3)' }
];

let currentUnit = 'kg';

document.addEventListener('DOMContentLoaded', () => {
    const syncBtn = document.getElementById('sync-btn');
    if (syncBtn) syncBtn.addEventListener('click', initializeSync);

    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportPass);

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.addEventListener('click', shareStats);

    // Unit toggle
    const unitKg = document.getElementById('unit-kg');
    const unitLbs = document.getElementById('unit-lbs');
    const weightInput = document.getElementById('weight');

    if (unitKg && unitLbs && weightInput) {
        unitKg.addEventListener('click', () => {
            if (currentUnit === 'lbs') {
                currentUnit = 'kg';
                unitKg.classList.add('active');
                unitLbs.classList.remove('active');
                weightInput.placeholder = 'Earth Weight (kg)';
                if (weightInput.value) {
                    weightInput.value = (parseFloat(weightInput.value) / 2.20462).toFixed(1);
                    initializeSync();
                }
            }
        });

        unitLbs.addEventListener('click', () => {
            if (currentUnit === 'kg') {
                currentUnit = 'lbs';
                unitLbs.classList.add('active');
                unitKg.classList.remove('active');
                weightInput.placeholder = 'Earth Weight (lbs)';
                if (weightInput.value) {
                    weightInput.value = (parseFloat(weightInput.value) * 2.20462).toFixed(1);
                    initializeSync();
                }
            }
        });
    }

    // Presets
    document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const w = chip.dataset.weight;
            const years = parseInt(chip.dataset.years, 10);
            const d = new Date();
            d.setFullYear(d.getFullYear() - years);

            if (weightInput) {
                weightInput.value = currentUnit === 'lbs' ? (w * 2.20462).toFixed(1) : w;
            }
            const birthInput = document.getElementById('birthdate');
            if (birthInput) {
                birthInput.value = d.toISOString().split('T')[0];
            }
            initializeSync();
        });
    });
});

function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'site-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function initializeSync() {
    const weightInput = document.getElementById('weight');
    const birthdateInput = document.getElementById('birthdate');
    const res = document.getElementById('results');
    const actions = document.getElementById('actions');
    const promo = document.getElementById('tool-promo');

    let m = parseFloat(weightInput?.value || 0);
    const d = birthdateInput?.value || '';

    if (!m || !d) {
        showToast("Please enter your weight and birth date!");
        return;
    }

    if (m <= 0 || m > 1000) {
        showToast("Please enter a realistic weight.");
        return;
    }

    const birthDate = new Date(d);
    const today = new Date();
    if (birthDate > today) {
        showToast("Birth date cannot be in the future.");
        return;
    }

    if (!res || !actions) return;

    const diffDays = Math.floor((today - birthDate) / 86400000);
    res.innerHTML = '';

    planetDB.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.style.setProperty('--p-color', p.color);
        card.style.setProperty('--p-glow', p.glow);

        const ageYears = diffDays / p.yr;
        const currentPlanetOrbits = Math.floor(ageYears);
        const daysIntoCurrentOrbit = diffDays - (currentPlanetOrbits * p.yr);
        const daysToNextBday = Math.ceil(p.yr - daysIntoCurrentOrbit);

        const weightOnPlanet = (m * p.g).toFixed(1);
        const unitLabel = currentUnit;

        card.innerHTML = `
            <div class="planet-header">
                <h3 class="planet-name" style="color: ${p.color};">${p.name}</h3>
                <div class="planet-dot"></div>
            </div>
            
            <div class="stat-group">
                <div class="stat-label">Cosmic Mass</div>
                <div class="stat-val">${weightOnPlanet} <small>${unitLabel}</small></div>
            </div>

            <div class="stat-group">
                <div class="stat-label">Orbital Age</div>
                <div class="stat-val">${ageYears.toFixed(2)} <small>Planetary Years</small></div>
            </div>

            <div class="next-bday-box">
                🎂 Next ${p.name} Birthday in: <strong>${daysToNextBday.toLocaleString()} Earth Days</strong>
            </div>
        `;

        res.appendChild(card);
        setTimeout(() => card.classList.add('active'), i * 80);
    });

    actions.style.display = 'flex';
    if (promo) promo.style.display = 'block';
}

async function exportPass() {
    const area = document.getElementById('capture-area');
    const mark = document.getElementById('watermark');
    if (!area || !mark || typeof html2canvas !== 'function') return;
    mark.style.display = 'block';

    try {
        const canvas = await html2canvas(area, { backgroundColor: '#050508', scale: 2 });
        const link = document.createElement('a');
        link.download = 'Moonlight-Moments-Cosmic-Pass.png';
        link.href = canvas.toDataURL();
        link.click();
        showToast("Passport downloaded! 📸");
    } catch (e) {
        showToast("Unable to generate image on this device.");
    } finally {
        mark.style.display = 'none';
    }
}

async function shareStats() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My Interstellar Age & Weight Profile | Moonlight Moments',
                text: 'Check out my age and weight across every planet in the Solar System!',
                url: window.location.href
            });
        } catch (error) {
            if (error && error.name !== 'AbortError') {
                copyUrlFallback();
            }
        }
    } else {
        copyUrlFallback();
    }
}

function copyUrlFallback() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => showToast("Link copied to clipboard! ✦"))
        .catch(() => showToast("Sharing unavailable."));
}
