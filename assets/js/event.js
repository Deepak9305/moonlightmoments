const masterCalendar = [
    { month: 0, day: 3, type: "meteor", typeName: "Meteor Shower", title: "Quadrantids Peak", query: "meteor shower", dateObj: new Date(2026, 0, 3, 23, 0), desc: "High-velocity meteors with bright blue trails. Up to 120 meteors per hour under dark skies.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 0, day: 14, type: "planet", typeName: "Planetary Alignment", title: "Mercury Greatest Elongation", query: "mercury planet", dateObj: new Date(2026, 0, 14, 18, 0), desc: "Best evening visibility for the smallest planet as it reaches its farthest point from the Sun." },
    { month: 0, day: 22, type: "moon", typeName: "Stellar Event", title: "Lunar Perigee", query: "moon surface", dateObj: new Date(2026, 0, 22, 10, 0), desc: "The moon reaches its closest orbital point to Earth, creating elevated gravitational tides." },
    { month: 1, day: 1, type: "moon", typeName: "Lunar Phase", title: "Full Snow Moon", query: "full moon", dateObj: new Date(2026, 1, 1, 20, 0), desc: "Named after the heavy snowfalls of midwinter, illuminating the winter sky." },
    { month: 1, day: 15, type: "planet", typeName: "Celestial Opposition", title: "Mars at Opposition", query: "mars planet", dateObj: new Date(2026, 1, 15, 22, 0), desc: "Mars is opposite the Sun from Earth, glowing at its brightest all night long." },
    { month: 2, day: 3, type: "moon", typeName: "Total Lunar Eclipse", title: "Total Blood Moon Eclipse", query: "lunar eclipse", dateObj: new Date(2026, 2, 3, 11, 30), desc: "A total lunar eclipse casting Earth's copper-red umbral shadow across the lunar disk.", blogUrl: "blog-posts/lunar-eclipse-science.html", blogText: "✦ Eclipse Science Guide" },
    { month: 2, day: 20, type: "equinox", typeName: "Orbital Equinox", title: "March Equinox", query: "equinox space", dateObj: new Date(2026, 2, 20, 14, 0), desc: "Day and night are equal in length. Spring begins in the Northern Hemisphere." },
    { month: 3, day: 12, type: "planet", typeName: "Stellar Event", title: "Dwarf Planet Ceres Opposition", query: "asteroid ceres", dateObj: new Date(2026, 3, 12, 1, 0), desc: "The largest object in the asteroid belt is visible with binoculars in the constellation Virgo." },
    { month: 3, day: 21, type: "meteor", typeName: "Meteor Shower", title: "Lyrids Shower Peak", query: "lyrids meteor shower", dateObj: new Date(2026, 3, 21, 23, 0), desc: "Annual shower originating from debris shed by Comet C/1861 G1 Thatcher.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 4, day: 5, type: "meteor", typeName: "Meteor Shower", title: "Eta Aquariids Peak", query: "eta aquariids", dateObj: new Date(2026, 4, 5, 3, 0), desc: "Fast meteors produced by debris from Halley's Comet, favoring southern hemisphere observers.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 4, day: 30, type: "moon", typeName: "Supermoon", title: "Super Flower Moon", query: "supermoon", dateObj: new Date(2026, 4, 30, 18, 45), desc: "One of the largest and closest full moons of the year, appearing 14% larger and 30% brighter." },
    { month: 5, day: 12, type: "planet", typeName: "Planetary Conjunction", title: "Moon & Saturn Conjunction", query: "saturn rings", dateObj: new Date(2026, 5, 12, 2, 0), desc: "A stunning pre-dawn pairing in the eastern sky with the ringed planet." },
    { month: 5, day: 21, type: "equinox", typeName: "Orbital Solstice", title: "June Solstice", query: "sun solar", dateObj: new Date(2026, 5, 21, 8, 20), desc: "The longest day of the year in the Northern Hemisphere and shortest in the South." },
    { month: 6, day: 4, type: "planet", typeName: "Orbital Milestone", title: "Earth at Aphelion", query: "earth orbit space", dateObj: new Date(2026, 6, 4, 15, 0), desc: "Earth reaches its farthest point in orbit from the Sun (approx. 94.5 million miles)." },
    { month: 6, day: 28, type: "meteor", typeName: "Meteor Shower", title: "Delta Aquariids Peak", query: "delta aquariids", dateObj: new Date(2026, 6, 28, 22, 0), desc: "Produces up to 20 meteors per hour under moonless skies.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 7, day: 12, type: "meteor", typeName: "Major Meteor Peak", title: "Perseids Meteor Peak", query: "perseid meteors", dateObj: new Date(2026, 7, 12, 23, 0), desc: "The king of summer meteor showers, producing 90 to 110 meteors per hour with glowing fireballs.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Perseids Viewing Guide" },
    { month: 7, day: 28, type: "planet", typeName: "Planetary Opposition", title: "Neptune at Opposition", query: "neptune planet", dateObj: new Date(2026, 7, 28, 21, 0), desc: "The blue ice giant is at its closest point to Earth and fully illuminated by the Sun." },
    { month: 8, day: 14, type: "moon", typeName: "Supermoon", title: "Harvest Supermoon", query: "harvest moon", dateObj: new Date(2026, 8, 14, 5, 0), desc: "A massive full supermoon rising near the autumnal equinox." },
    { month: 8, day: 21, type: "planet", typeName: "Planetary Opposition", title: "Saturn at Opposition", query: "saturn telescope", dateObj: new Date(2026, 8, 21, 19, 0), desc: "Saturn's ring system is inclined and visible all night at maximum brilliance." },
    { month: 9, day: 12, type: "planet", typeName: "Planetary Conjunction", title: "Moon & Venus Pairing", query: "venus evening star", dateObj: new Date(2026, 9, 12, 18, 0), desc: "Brilliant evening pairing between the thin crescent Moon and glowing Venus." },
    { month: 9, day: 21, type: "meteor", typeName: "Meteor Shower", title: "Orionids Meteor Peak", query: "orionids meteor shower", dateObj: new Date(2026, 9, 21, 23, 0), desc: "Fast shooting stars formed from debris left behind by Halley's Comet.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 10, day: 10, type: "meteor", typeName: "Meteor Shower", title: "Taurids Fireball Peak", query: "fireball meteor", dateObj: new Date(2026, 10, 10, 1, 0), desc: "Famous for exceptionally bright, slow-moving fireball meteors." },
    { month: 10, day: 17, type: "meteor", typeName: "Meteor Shower", title: "Leonids Meteor Peak", query: "leonids meteors", dateObj: new Date(2026, 10, 17, 2, 0), desc: "Fast meteors traveling at 44 miles per second from Comet Tempel-Tuttle.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Meteor Viewing Guide" },
    { month: 11, day: 14, type: "meteor", typeName: "Major Meteor Peak", title: "Geminids Meteor Peak", query: "geminids meteor shower", dateObj: new Date(2026, 11, 14, 21, 0), desc: "The most reliable winter meteor shower with rates up to 150 multicolored meteors per hour.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "✦ Geminids Viewing Guide" },
    { month: 11, day: 21, type: "equinox", typeName: "Orbital Solstice", title: "December Solstice", query: "winter solstice space", dateObj: new Date(2026, 11, 21, 20, 50), desc: "The shortest day and longest night of the year in the Northern Hemisphere." },
    { month: 11, day: 30, type: "moon", typeName: "Lunar Phase", title: "New Year's Moon", query: "crescent moon sky", dateObj: new Date(2026, 11, 30, 23, 59), desc: "Closing 2026 beneath a delicate crescent moon." }
];

let currentViewMonth = new Date().getMonth();
let currentFilter = 'all';
let renderToken = 0;

document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    updateUI();

    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentViewMonth = (currentViewMonth - 1 + 12) % 12;
            updateUI();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentViewMonth = (currentViewMonth + 1) % 12;
            updateUI();
        });
    }

    // Filter bar
    document.querySelectorAll('.event-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.event-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.type;
            updateUI();
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

function startCountdown() {
    const now = new Date();
    const futureEvents = masterCalendar.filter(ev => ev.dateObj > now).sort((a, b) => a.dateObj - b.dateObj);

    const timerTitle = document.getElementById('timer-title');
    if (futureEvents.length > 0) {
        const next = futureEvents[0];
        if (timerTitle) timerTitle.textContent = `✦ Next Up: ${next.title} (${next.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;

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
        if (timerTitle) timerTitle.textContent = '✦ 2026 Astronomical Almanac Complete';
    }
}

async function fetchEventImage(query) {
    let img = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';

    try {
        const resp = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
        if (resp.ok) {
            const data = await resp.json();
            const items = data.collection?.items || [];
            const badWords = ['astronaut', 'scientist', 'engineer', 'technician', 'personnel', 'crew', 'standing next to', 'holding', 'control room', 'laboratory', 'diagram', 'chart', 'blueprint', 'rocket', 'falcon', 'starship'];

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
        // Fallback
    }

    return img;
}

async function updateUI() {
    const container = document.getElementById('events-container');
    const monthHeader = document.getElementById('month-name');
    if (!container) return;

    const currentToken = ++renderToken;
    container.classList.add('fade-out');
    const monthNames = ["January 2026", "February 2026", "March 2026", "April 2026", "May 2026", "June 2026", "July 2026", "August 2026", "September 2026", "October 2026", "November 2026", "December 2026"];

    if (monthHeader) {
        monthHeader.textContent = monthNames[currentViewMonth];
    }

    setTimeout(async () => {
        if (currentToken !== renderToken) return;
        container.innerHTML = '';

        let monthlyEvents = masterCalendar.filter(ev => ev.month === currentViewMonth);
        if (currentFilter !== 'all') {
            monthlyEvents = monthlyEvents.filter(ev => ev.type === currentFilter);
        }

        if (monthlyEvents.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-dim);">
                    <p style="font-size: 1.1rem; color: #fff; margin-bottom: 8px;">No ${currentFilter} events in ${monthNames[currentViewMonth]}</p>
                    <p style="font-size: 0.85rem;">Use the arrows above to browse other months or select "All Events".</p>
                </div>`;
            container.classList.remove('fade-out');
            return;
        }

        for (const ev of monthlyEvents) {
            const card = document.createElement('div');
            card.className = 'event-card';

            const blogLinkHtml = ev.blogUrl ? `<a href="${ev.blogUrl}" class="event-guide-link">${ev.blogText}</a>` : `<span></span>`;

            card.innerHTML = `
                <div class="img-box" style="background-image: url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80');"></div>
                <div class="card-content">
                    <div class="card-top-row">
                        <span class="tag">✦ ${ev.typeName}</span>
                        <div class="day-num">${ev.day.toString().padStart(2, '0')}</div>
                    </div>
                    <div class="event-title">${ev.title}</div>
                    <div class="event-desc">${ev.desc}</div>
                    <div class="event-card-actions">
                        ${blogLinkHtml}
                        <button class="copy-event-btn" data-title="${ev.title}" data-date="${ev.day} ${monthNames[ev.month]}">📋 Copy Info</button>
                    </div>
                </div>
            `;

            container.appendChild(card);

            // Fetch NASA APOD/Media image asynchronously
            fetchEventImage(ev.query).then(imgUrl => {
                const imgBox = card.querySelector('.img-box');
                if (imgBox && imgUrl) {
                    imgBox.style.backgroundImage = `url('${imgUrl}')`;
                }
            });
        }

        // Add copy listeners
        container.querySelectorAll('.copy-event-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = `🌌 Astronomical Event: ${btn.dataset.title} on ${btn.dataset.date} - Track on MoonlightMoments.org`;
                navigator.clipboard.writeText(text).then(() => showToast("Event copied to clipboard! ✦"));
            });
        });

        container.classList.remove('fade-out');
    }, 250);
}
