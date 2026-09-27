/* =========================================================
   NAVBAR + PROJECT MODALS
========================================================= */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* Tutup dropdown jika klik di luar navbar */
document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar') && navMenu) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
});

/* =========================================================
   PROJECT MODAL
========================================================= */
function openProject(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.project-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
        if (navMenu) navMenu.classList.remove('active');
    }
});

/* =========================================================
   ACTIVE NAV LINK
========================================================= */
const sections = document.querySelectorAll('main[id], section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const updateActiveLink = () => {
    let current = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);
