const masterCalendar = [
    { month: 0, day: 3, type: "meteor", typeName: "Meteor Shower", title: "Quadrantids Peak", query: "Quadrantid meteor shower", dateObj: new Date(2026, 0, 3, 12), desc: "The Quadrantids peak around January 3. Visible rates vary with sky conditions and location.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 0, day: 10, type: "planet", typeName: "Planetary Opposition", title: "Jupiter at Opposition", query: "Jupiter planet", dateObj: new Date(2026, 0, 10, 12), desc: "Jupiter is opposite the Sun in Earth's sky and is well placed for evening observation." },
    { month: 0, day: 23, type: "planet", typeName: "Planetary Conjunction", title: "Moon and Saturn Conjunction", query: "Moon Saturn conjunction", dateObj: new Date(2026, 0, 23, 12), desc: "The Moon and Saturn appear close together in the sky; visibility depends on local time and horizon." },
    { month: 1, day: 1, type: "moon", typeName: "Lunar Phase", title: "Full Snow Moon", query: "full moon", dateObj: new Date(2026, 1, 1, 12), desc: "The February full Moon. Traditional full-Moon names are seasonal naming conventions." },
    { month: 1, day: 20, type: "planet", typeName: "Planetary Event", title: "Mercury at Greatest Eastern Elongation", query: "Mercury planet", dateObj: new Date(2026, 1, 20, 12), desc: "Mercury reaches greatest eastern elongation. Viewing time and altitude depend on your location." },
    { month: 2, day: 3, type: "moon", typeName: "Total Lunar Eclipse", title: "Total Lunar Eclipse and Full Moon", query: "total lunar eclipse", dateObj: new Date(2026, 2, 3, 12), desc: "A total lunar eclipse occurs with the full Moon. It is visible only where the Moon is above the horizon during the event.", blogUrl: "blog-posts/lunar-eclipse-science.html", blogText: "Eclipse Science Guide" },
    { month: 2, day: 20, type: "equinox", typeName: "Orbital Equinox", title: "March Equinox", query: "March equinox Earth", dateObj: new Date(2026, 2, 20, 12), desc: "The March equinox marks astronomical spring in the Northern Hemisphere and autumn in the Southern Hemisphere." },
    { month: 3, day: 3, type: "planet", typeName: "Planetary Event", title: "Mercury at Greatest Western Elongation", query: "Mercury planet", dateObj: new Date(2026, 3, 3, 12), desc: "Mercury reaches greatest western elongation. Viewing time and altitude depend on your location." },
    { month: 3, day: 22, type: "meteor", typeName: "Meteor Shower", title: "Lyrids Peak", query: "Lyrid meteor shower", dateObj: new Date(2026, 3, 22, 12), desc: "The annual Lyrids are expected to peak around April 22. Actual rates depend on observing conditions.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 4, day: 1, type: "moon", typeName: "Lunar Phase", title: "Full Flower Moon", query: "full moon", dateObj: new Date(2026, 4, 1, 12), desc: "The first full Moon of May; this calendar does not classify it as a supermoon." },
    { month: 4, day: 6, type: "meteor", typeName: "Meteor Shower", title: "Eta Aquariids Peak", query: "Eta Aquariid meteor shower", dateObj: new Date(2026, 4, 6, 12), desc: "The Eta Aquariids, associated with Halley's Comet, are forecast to peak around May 6.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 4, day: 31, type: "moon", typeName: "Lunar Phase", title: "Second Full Moon in May", query: "full moon", dateObj: new Date(2026, 4, 31, 12), desc: "The second full Moon in May is sometimes called a blue Moon; the Moon does not appear blue." },
    { month: 5, day: 21, type: "equinox", typeName: "Orbital Solstice", title: "June Solstice", query: "June solstice Earth", dateObj: new Date(2026, 5, 21, 12), desc: "The June solstice marks astronomical summer in the Northern Hemisphere and winter in the Southern Hemisphere." },
    { month: 5, day: 29, type: "moon", typeName: "Lunar Phase", title: "Full Moon", query: "full moon", dateObj: new Date(2026, 5, 29, 12), desc: "The June full Moon; its local calendar date can vary by time zone." },
    { month: 6, day: 6, type: "planet", typeName: "Orbital Milestone", title: "Earth at Aphelion", query: "Earth orbit Sun", dateObj: new Date(2026, 6, 6, 12), desc: "Earth reaches its farthest point from the Sun for the year. This distance does not cause the seasons." },
    { month: 6, day: 29, type: "moon", typeName: "Lunar Phase", title: "Full Moon", query: "full moon", dateObj: new Date(2026, 6, 29, 12), desc: "The July full Moon; its local calendar date can vary by time zone." },
    { month: 6, day: 30, type: "meteor", typeName: "Meteor Shower", title: "Southern Delta Aquariids Peak", query: "Delta Aquariid meteor shower", dateObj: new Date(2026, 6, 30, 12), desc: "The Southern Delta Aquariids are forecast to peak around July 30; visibility depends on location and sky conditions.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 7, day: 12, type: "moon", typeName: "Solar Eclipse", title: "Total Solar Eclipse and New Moon", query: "total solar eclipse", dateObj: new Date(2026, 7, 12, 12), desc: "A total solar eclipse crosses a limited path, with a partial eclipse visible across a wider region. Never view the Sun without certified solar protection." },
    { month: 7, day: 12, type: "meteor", typeName: "Major Meteor Peak", title: "Perseids Peak Night", query: "Perseid meteor shower", dateObj: new Date(2026, 7, 12, 12), desc: "The Perseids peak during the night of August 12-13. The new Moon provides dark skies where weather and local conditions allow.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Perseids Viewing Guide" },
    { month: 7, day: 14, type: "planet", typeName: "Planetary Event", title: "Venus at Greatest Eastern Elongation", query: "Venus planet evening sky", dateObj: new Date(2026, 7, 14, 12), desc: "Venus reaches greatest eastern elongation around mid-August and appears in the evening sky; visibility varies by location." },
    { month: 7, day: 28, type: "moon", typeName: "Partial Lunar Eclipse", title: "Partial Lunar Eclipse", query: "partial lunar eclipse", dateObj: new Date(2026, 7, 28, 12), desc: "A partial lunar eclipse occurs around August 27-28 UTC; its date and visibility depend on time zone and location.", blogUrl: "blog-posts/lunar-eclipse-science.html", blogText: "Eclipse Science Guide" },
    { month: 8, day: 22, type: "equinox", typeName: "Orbital Equinox", title: "September Equinox", query: "September equinox Earth", dateObj: new Date(2026, 8, 22, 12), desc: "The September equinox marks astronomical autumn in the Northern Hemisphere and spring in the Southern Hemisphere." },
    { month: 8, day: 26, type: "moon", typeName: "Lunar Phase", title: "Harvest Moon", query: "full moon", dateObj: new Date(2026, 8, 26, 12), desc: "The full Moon nearest the September equinox is traditionally called the Harvest Moon; it is not necessarily a supermoon." },
    { month: 8, day: 26, type: "planet", typeName: "Planetary Opposition", title: "Neptune at Opposition", query: "Neptune planet", dateObj: new Date(2026, 8, 26, 12), desc: "Neptune reaches opposition. It is too faint for unaided-eye viewing and requires optical aid under suitable conditions." },
    { month: 9, day: 4, type: "planet", typeName: "Planetary Opposition", title: "Saturn at Opposition", query: "Saturn planet", dateObj: new Date(2026, 9, 4, 12), desc: "Saturn reaches opposition and is well placed for observation; telescope views depend on local seeing and equipment." },
    { month: 9, day: 21, type: "meteor", typeName: "Meteor Shower", title: "Orionids Peak", query: "Orionid meteor shower", dateObj: new Date(2026, 9, 21, 12), desc: "The Orionids, produced by debris from Halley's Comet, peak around October 21.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 9, day: 26, type: "moon", typeName: "Lunar Phase", title: "Full Moon", query: "full moon", dateObj: new Date(2026, 9, 26, 12), desc: "The October full Moon; its local calendar date can vary by time zone." },
    { month: 10, day: 17, type: "meteor", typeName: "Meteor Shower", title: "Leonids Peak", query: "Leonid meteor shower", dateObj: new Date(2026, 10, 17, 12), desc: "The Leonids are expected to peak around November 17; observed rates vary with conditions.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 10, day: 24, type: "moon", typeName: "Lunar Phase", title: "Full Moon", query: "full moon", dateObj: new Date(2026, 10, 24, 12), desc: "The November full Moon; its local calendar date can vary by time zone." },
    { month: 10, day: 26, type: "planet", typeName: "Planetary Opposition", title: "Uranus at Opposition", query: "Uranus planet", dateObj: new Date(2026, 10, 26, 12), desc: "Uranus reaches opposition and is not reliably visible without optical aid from most locations." },
    { month: 11, day: 14, type: "meteor", typeName: "Major Meteor Peak", title: "Geminids Peak", query: "Geminid meteor shower", dateObj: new Date(2026, 11, 14, 12), desc: "The Geminids are forecast to peak around December 14; moonlight and local conditions affect the observed rate.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Geminids Viewing Guide" },
    { month: 11, day: 21, type: "equinox", typeName: "Orbital Solstice", title: "December Solstice", query: "December solstice Earth", dateObj: new Date(2026, 11, 21, 12), desc: "The December solstice marks astronomical winter in the Northern Hemisphere and summer in the Southern Hemisphere." },
    { month: 11, day: 22, type: "meteor", typeName: "Meteor Shower", title: "Ursids Peak", query: "Ursid meteor shower", dateObj: new Date(2026, 11, 22, 12), desc: "The Ursids peak around December 22; the shower is typically modest and best viewed from dark skies.", blogUrl: "blog-posts/how-to-watch-a-meteor-shower.html", blogText: "Meteor Viewing Guide" },
    { month: 11, day: 24, type: "moon", typeName: "Lunar Phase", title: "Full Moon", query: "full moon", dateObj: new Date(2026, 11, 24, 12), desc: "The December full Moon; its local calendar date can vary by time zone." }
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
        if (timerTitle) timerTitle.textContent = `Approximate countdown to: ${next.title} (${next.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;

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
