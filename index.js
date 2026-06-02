
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => preloader.remove(), 700);
    }, 1200);
});


/* CUSTOM CURSOR */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .skill-card, .service-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
    });
}


/*  SCROLL PROGRESS BAR */
const scrollBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollBar) scrollBar.style.width = scrollPercent + '%';
});


/*  NAVBAR SCROLL EFFECT  */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


/* MOBILE NAVBAR TOGGLE */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
    }
});


/* ACTIVE NAV LINK ON SCROLL */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


/* TYPED.JS */
var typed = new Typed("#typed", {
    strings: ["MERN Full Stack Developer", "Web Designer", "JavaScript Developer", "UI Enthusiast"],
    typeSpeed: 65,
    backSpeed: 35,
    backDelay: 1200,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});


/* PARTICLES IN HERO */
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.setProperty('--dur', (6 + Math.random() * 10) + 's');
        p.style.setProperty('--delay', (Math.random() * 8) + 's');
        p.style.left = Math.random() * 100 + '%';
        p.style.width = (2 + Math.random() * 4) + 'px';
        p.style.height = p.style.width;
        particlesContainer.appendChild(p);
    }
}


/* STATS COUNTER ANIMATION */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = true;
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));


/* SKILLS PROGRESS ANIMATION */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = true;

            const percentage = parseInt(entry.target.dataset.percentage);
            const progressBar = entry.target.querySelector('.skill-progress');
            const numberEl = entry.target.querySelector('.number');
            let current = 0;

            const timer = setInterval(() => {
                current += 1;
                if (current > percentage) {
                    clearInterval(timer);
                    return;
                }
                numberEl.textContent = current + '%';
                progressBar.style.width = current + '%';
            }, 14);
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));


/* REVEAL SECTIONS ON SCROLL */
const revealElements = document.querySelectorAll(
    '.service-card, .project-card, .testimonial-card, .stat-item, .skill-card, .contact-item, .section-header'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ABOUT SECTION REVEAL */
const aboutSection = document.querySelector('#about');

if (aboutSection) {
    const aboutParagraphs = aboutSection.querySelectorAll('p');
    const aboutInfoSpans = aboutSection.querySelectorAll('.about-info span');

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !aboutSection.dataset.animated) {
                aboutSection.dataset.animated = true;

                aboutParagraphs.forEach((p, i) => {
                    setTimeout(() => p.classList.add('revealed'), i * 200);
                });

                aboutInfoSpans.forEach((span, i) => {
                    setTimeout(() => span.classList.add('revealed'), 600 + i * 150);
                });
            }
        });
    }, { threshold: 0.2 });

    aboutObserver.observe(aboutSection);
}


/* PROJECT FILTER */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


/* CONTACT FORM */
const form = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';

        // Simulate send delay
        setTimeout(() => {
            if (btnText) btnText.style.display = 'inline-flex';
            if (btnLoading) btnLoading.style.display = 'none';

            formMessage.textContent = '✅ Message Sent Successfully! I will get back to you soon.';
            formMessage.style.opacity = '1';
            formMessage.style.color = '#00d4ff';

            form.reset();

            setTimeout(() => {
                formMessage.style.opacity = '0';
            }, 4000);
        }, 2000);
    });
}


/* BACK TO TOP */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* DARK / LIGHT MODE TOGGLE */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check saved preference
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});


/* SMOOTH HOVER TILT ON CARDS */
document.querySelectorAll('.skill-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
