const masterCalendar = [
    { month: 0, day: 3, type: "Celestial Primary", title: "Quadrantids Peak", query: "meteor shower", dateObj: new Date(2026, 0, 3, 23, 0), desc: "High-velocity meteors with bright blue trails." },
    { month: 0, day: 14, type: "Planetary Alignment", title: "Mercury Elongation", query: "mercury", dateObj: new Date(2026, 0, 14, 18, 0), desc: "Best evening visibility for the smallest planet." },
    { month: 0, day: 22, type: "Stellar Event", title: "Lunar Perigee", query: "moon surface", dateObj: new Date(2026, 0, 22, 10, 0), desc: "The moon reaches its closest point to Earth." },
    { month: 1, day: 1, type: "Lunar Phase", title: "Full Snow Moon", query: "full moon", dateObj: new Date(2026, 1, 1, 20, 0), desc: "Named after the heavy snowfalls of midwinter." },
    { month: 1, day: 15, type: "Celestial Primary", title: "Mars Opposition", query: "mars", dateObj: new Date(2026, 1, 15, 22, 0), desc: "Mars is visible all night and at its brightest." },
    { month: 2, day: 3, type: "Celestial Primary", title: "Total Lunar Eclipse", query: "lunar eclipse", dateObj: new Date(2026, 2, 3, 11, 30), desc: "A rare blood moon visible across the Pacific." },
    { month: 2, day: 20, type: "Orbital Equinox", title: "March Equinox", query: "equinox", dateObj: new Date(2026, 2, 20, 14, 0), desc: "Spring begins in the Northern Hemisphere." },
    { month: 3, day: 12, type: "Stellar Event", title: "Ceres at Opposition", query: "asteroid", dateObj: new Date(2026, 3, 12, 1, 0), desc: "The dwarf planet Ceres is bright in the night sky." },
    { month: 3, day: 21, type: "Celestial Primary", title: "Lyrids Shower", query: "lyrids", dateObj: new Date(2026, 3, 21, 23, 0), desc: "Active meteor shower originating from Comet Thatcher." },
    { month: 4, day: 5, type: "Stellar Event", title: "Eta Aquariids", query: "comet halley", dateObj: new Date(2026, 4, 5, 3, 0), desc: "Fast meteors produced by debris from Halley's Comet." },
    { month: 4, day: 30, type: "Lunar Phase", title: "Super Flower Moon", query: "supermoon", dateObj: new Date(2026, 4, 30, 18, 45), desc: "One of the largest full moons of the year." },
    { month: 5, day: 12, type: "Planetary Alignment", title: "Moon & Saturn", query: "saturn", dateObj: new Date(2026, 5, 12, 2, 0), desc: "A stunning pre-dawn pairing in the eastern sky." },
    { month: 5, day: 21, type: "Orbital Solstice", title: "June Solstice", query: "solstice", dateObj: new Date(2026, 5, 21, 8, 20), desc: "The longest day of the year for the North." },
    { month: 6, day: 4, type: "Planetary Alignment", title: "Earth at Aphelion", query: "earth orbit", dateObj: new Date(2026, 6, 4, 15, 0), desc: "Earth reaches its furthest point from the Sun." },
    { month: 6, day: 28, type: "Stellar Event", title: "Delta Aquariids", query: "meteors", dateObj: new Date(2026, 6, 28, 22, 0), desc: "Best viewed from southern dark-sky locations." },
    { month: 7, day: 12, type: "Celestial Primary", title: "Perseids Peak", query: "perseid", dateObj: new Date(2026, 7, 12, 23, 0), desc: "The most famous meteor shower of the summer." },
    { month: 7, day: 28, type: "Planetary Alignment", title: "Neptune Opposition", query: "neptune", dateObj: new Date(2026, 7, 28, 21, 0), desc: "The blue ice giant is at its closest point to Earth." },
    { month: 8, day: 14, type: "Lunar Phase", title: "Harvest Supermoon", query: "harvest moon", dateObj: new Date(2026, 8, 14, 5, 0), desc: "A massive moon rising near the autumnal equinox." },
    { month: 8, day: 21, type: "Celestial Primary", title: "Saturn Opposition", query: "saturn rings", dateObj: new Date(2026, 8, 21, 19, 0), desc: "The ringed planet is visible all night at its brightest." },
    { month: 9, day: 12, type: "Planetary Alignment", title: "Moon & Venus", query: "venus moon", dateObj: new Date(2026, 9, 12, 18, 0), desc: "Bright evening pairing in the western sky." },
    { month: 9, day: 21, type: "Stellar Event", title: "Orionids Shower", query: "orionids", dateObj: new Date(2026, 9, 21, 23, 0), desc: "Meteors from the tail of Comet Halley." },
    { month: 10, day: 10, type: "Stellar Event", title: "Taurids Peak", query: "fireball", dateObj: new Date(2026, 10, 10, 1, 0), desc: "Known for slow-moving, bright fireball meteors." },
    { month: 10, day: 17, type: "Stellar Event", title: "Leonids Shower", query: "leonid", dateObj: new Date(2026, 10, 17, 2, 0), desc: "Fast-moving meteors from Comet Tempel-Tuttle." },
    { month: 11, day: 14, type: "Celestial Primary", title: "Geminids Peak", query: "geminids", dateObj: new Date(2026, 11, 14, 21, 0), desc: "Usually the strongest meteor shower of the year." },
    { month: 11, day: 21, type: "Orbital Solstice", title: "December Solstice", query: "winter", dateObj: new Date(2026, 11, 21, 20, 50), desc: "The shortest day of the year in the North." },
    { month: 11, day: 30, type: "Lunar Phase", title: "New Year's Moon", query: "crescent", dateObj: new Date(2026, 11, 30, 23, 59), desc: "Closing the year under a waning crescent moon." }
];

let currentViewMonth = new Date().getMonth();

function startCountdown() {
    const now = new Date();
    const futureEvents = masterCalendar.filter(ev => ev.dateObj > now).sort((a, b) => a.dateObj - b.dateObj);

    if (futureEvents.length > 0) {
        const next = futureEvents[0];
        const timerTitle = document.getElementById('timer-title');
        if (timerTitle) timerTitle.textContent = `Next Sequence: ${next.title}`;

        let timerId = setInterval(() => {
            const diff = next.dateObj - new Date();
            if (diff <= 0) {
                clearInterval(timerId);
                location.reload();
                return;
            }
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        }, 1000);
    } else {
        const timerTitle = document.getElementById('timer-title');
        if (timerTitle) timerTitle.textContent = 'The 2026 celestial calendar is complete';
    }
}

async function fetchEventImage(query) {
    let img = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';

    try {
        const resp = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
        if (resp.ok) {
            const data = await resp.json();
            const items = data.collection?.items || [];
            const badWords = ['astronaut', 'scientist', 'engineer', 'technician', 'personnel', 'crew portrait', 'standing next to', 'holding', 'man in', 'woman in', 'control room', 'laboratory interior', 'lab interior', 'test facility', 'machinery', 'circuitry', 'blueprint', 'schematic', 'technical diagram', 'instrument panel', 'launch vehicle technical', 'office building', 'hangar interior', 'warehouse', 'factory', 'parking lot', 'chart', 'graph', 'presentation slide', 'clipart', 'line drawing', 'patch design', 'insignia design', 'document scan', 'rocket', 'falcon', 'starship', 'pads', 'launch site', 'gantry', 'technical tower', 'spacesuit', 'suit portrait'];

            const filteredItem = items.find(item => {
                if (!item.data || !item.data[0]) return false;
                const meta = (item.data[0].title + (item.data[0].description || '')).toLowerCase();
                return !badWords.some(word => meta.includes(word));
            }) || items[0];

            if (filteredItem?.links?.[0]?.href) {
                img = filteredItem.links[0].href;
            }
        }
    } catch (e) {
        console.error('Failed to fetch image for query:', query, e);
    }

    return img;
}

async function updateUI() {
    const container = document.getElementById('events-container');
    if (!container) return;
    container.classList.add('fade-out');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    setTimeout(async () => {
        try {
            const monthNameEl = document.getElementById('month-name');
            if (monthNameEl) monthNameEl.textContent = monthNames[currentViewMonth];
            container.innerHTML = '';
            const monthlyEvents = masterCalendar.filter(ev => ev.month === currentViewMonth);
            const eventImages = await Promise.all(monthlyEvents.map(ev => fetchEventImage(ev.query)));

            monthlyEvents.forEach((ev, index) => {
                const card = document.createElement('div');
                card.className = 'event-card';

                const imgBox = document.createElement('div');
                imgBox.className = 'img-box';
                imgBox.style.backgroundImage = `url('${eventImages[index]}')`;
                imgBox.setAttribute('aria-label', ev.title);

                const content = document.createElement('div');
                content.className = 'card-content';

                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = ev.type;

                const dayNum = document.createElement('div');
                dayNum.className = 'day-num';
                dayNum.textContent = ev.day.toString().padStart(2, '0');

                const title = document.createElement('div');
                title.className = 'event-title';
                title.textContent = ev.title;

                const desc = document.createElement('p');
                desc.className = 'event-desc';
                desc.textContent = ev.desc;

                content.appendChild(tag);
                content.appendChild(dayNum);
                content.appendChild(title);
                content.appendChild(desc);

                card.appendChild(imgBox);
                card.appendChild(content);
                container.appendChild(card);
            });
        } finally {
            container.classList.remove('fade-out');
            if (typeof setupHovers === 'function') setupHovers();
        }
    }, 500);
}

function changeMonth(delta) {
    currentViewMonth = (currentViewMonth + delta + 12) % 12;
    updateUI();
}

document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    updateUI();

    const prevBtn = document.getElementById('prev-month-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));

    const nextBtn = document.getElementById('next-month-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));
});
