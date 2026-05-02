const planetDB = [
    { name: 'Mercury', g: 0.38, yr: 88, color: '#A5A5A5' },
    { name: 'Venus', g: 0.91, yr: 224.7, color: '#E3BB76' },
    { name: 'Mars', g: 0.38, yr: 687, color: '#E27B58' },
    { name: 'Jupiter', g: 2.34, yr: 4333, color: '#D39C7E' },
    { name: 'Saturn', g: 1.06, yr: 10759, color: '#C5AB6E' },
    { name: 'Uranus', g: 0.92, yr: 30687, color: '#B5E2E2' },
    { name: 'Neptune', g: 1.12, yr: 60190, color: '#6081ff' },
    { name: 'Pluto', g: 0.06, yr: 90560, color: '#fff1e0' }
];

document.addEventListener('DOMContentLoaded', () => {
    const syncBtn = document.getElementById('sync-btn');
    if (syncBtn) syncBtn.addEventListener('click', initializeSync);

    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportPass);

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.addEventListener('click', shareStats);
});

function initializeSync() {
    const weightInput = document.getElementById('weight');
    const birthdateInput = document.getElementById('birthdate');
    const res = document.getElementById('results');
    const actions = document.getElementById('actions');

    const m = parseFloat(weightInput?.value || 0);
    const d = birthdateInput?.value || '';

    if (!m || !d) {
        alert("Biometrics required for sync.");
        return;
    }

    if (m <= 0 || m > 500) {
        alert("Please enter a valid weight between 1 and 500 kg.");
        return;
    }

    const birthDate = new Date(d);
    const today = new Date();
    if (birthDate > today) {
        alert("Birth date cannot be in the future.");
        return;
    }

    if (!res || !actions) return;

    const diff = Math.floor((today - birthDate) / 86400000);
    res.innerHTML = '';

    planetDB.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.style.setProperty('--p-color', p.color);

        const planetName = document.createElement('div');
        planetName.className = 'planet-name';
        planetName.style.color = p.color;
        planetName.textContent = p.name;

        const statLabel1 = document.createElement('div');
        statLabel1.className = 'stat-label';
        statLabel1.textContent = 'Cosmic Mass';

        const statVal1 = document.createElement('div');
        statVal1.className = 'stat-val';
        statVal1.textContent = (m * p.g).toFixed(1) + ' ';
        const unit1 = document.createElement('small');
        unit1.textContent = 'kg';
        statVal1.appendChild(unit1);

        const statLabel2 = document.createElement('div');
        statLabel2.className = 'stat-label';
        statLabel2.textContent = 'Orbital Age';

        const statVal2 = document.createElement('div');
        statVal2.className = 'stat-val';
        statVal2.textContent = (diff / p.yr).toFixed(2) + ' ';
        const unit2 = document.createElement('small');
        unit2.textContent = 'yrs';
        statVal2.appendChild(unit2);

        card.appendChild(planetName);
        card.appendChild(statLabel1);
        card.appendChild(statVal1);
        card.appendChild(statLabel2);
        card.appendChild(statVal2);

        res.appendChild(card);
        setTimeout(() => card.classList.add('active'), i * 150);
    });

    actions.style.display = 'flex';
}

async function exportPass() {
    const area = document.getElementById('capture-area');
    const mark = document.getElementById('watermark');
    if (!area || !mark || typeof html2canvas !== 'function') return;
    mark.style.display = 'block';

    try {
        const canvas = await html2canvas(area, { backgroundColor: '#050505', scale: 2 });
        const link = document.createElement('a');
        link.download = 'Interstellar-Pass.png';
        link.href = canvas.toDataURL();
        link.click();
    } finally {
        mark.style.display = 'none';
    }
}

async function shareStats() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Interstellar Identity',
                text: 'I just synced my orbital biometrics!',
                url: window.location.href
            });
        } catch (error) {
            if (error && error.name !== 'AbortError') {
                alert('Sharing is unavailable right now.');
            }
        }
    } else {
        alert("Sharing not supported on this browser.");
    }
}
