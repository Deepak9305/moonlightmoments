// --- Shared Logic ---

document.addEventListener('DOMContentLoaded', () => {
    setupCursor();
    setupMobileMenu();
    setupHovers();
    setupLegalModals();
});

function setupCursor() {
    const cursor = document.getElementById('cursor-ring') || document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    
    if (!cursor) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (window.innerWidth > 900) {
            cursor.style.display = 'block';
            if (dot) {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
                dot.style.display = 'block';
            }
        }
    });

    function animateCursor() {
        if (window.innerWidth > 900) {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursor.style.transform = `translate3d(${ringX - 12}px, ${ringY - 12}px, 0)`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdown = document.getElementById('myDropdown');

    if (!menuBtn) return;

    // Inject backdrop once
    let backdrop = document.getElementById('nav-drawer-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'nav-drawer-backdrop';
        backdrop.className = 'nav-drawer-backdrop';
        document.body.appendChild(backdrop);
    }

    function openMobileMenu() {
        navLinks && navLinks.classList.add('mobile-open');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        backdrop.classList.add('visible');
    }

    function closeMobileMenu() {
        navLinks && navLinks.classList.remove('mobile-open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
        backdrop.classList.remove('visible');
    }

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 768) {
            navLinks && navLinks.classList.contains('mobile-open')
                ? closeMobileMenu()
                : openMobileMenu();
        } else {
            dropdown && dropdown.classList.toggle('show');
        }
    });

    // Close when backdrop is tapped
    backdrop.addEventListener('click', closeMobileMenu);

    // Close mobile nav when a link is tapped
    navLinks && navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close desktop dropdown when clicking anywhere
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            dropdown && dropdown.classList.remove('show');
        }
    });

    // Reset on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            dropdown && dropdown.classList.remove('show');
        }
    });
}

function setupHovers() {
    const cursor = document.getElementById('cursor-ring') || document.getElementById('cursor');
    if (!cursor) return;

    document.querySelectorAll('a, button, .grid-item-card, .event-card, .blog-card, input').forEach(el => {
        el.onmouseenter = () => cursor.classList.add('cursor-expand');
        el.onmouseleave = () => cursor.classList.remove('cursor-expand');
    });
}

function setupLegalModals() {
    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = e.target.getAttribute('data-type');
            if (type) showLegal(type);
        });
    });

    const closeBtn = document.getElementById('close-legal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLegal);
    }
}

function showLegal(t) {
    const data = {
        about: "Moonlight Moments is a 2026 archival project designed to preserve and display the most aesthetically significant views of our cosmos.",
        privacy: "Your celestial journey is anonymous. No trackers, no cookies, just the stars."
    };
    const legalContent = document.getElementById('legal-content');
    const legalModal = document.getElementById('legal-modal');

    if (legalContent && legalModal && data[t]) {
        legalContent.innerHTML = '';
        const title = document.createElement('h2');
        title.className = 'legal-title';
        title.textContent = t.toUpperCase();
        const desc = document.createElement('p');
        desc.className = 'legal-desc';
        desc.textContent = data[t];
        legalContent.appendChild(title);
        legalContent.appendChild(desc);
        legalModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLegal() {
    const legalModal = document.getElementById('legal-modal');
    if (legalModal) {
        legalModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
