// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typed.js Effect for Hero Subtitle
window.addEventListener('load', () => {
    if (window.Typed) {
        new Typed('.typing-text', {
            strings: ['Full Stack Web Developer', 'React + .NET Specialist', 'UI/UX Experience Crafter'],
            typeSpeed: 55,
            backSpeed: 25,
            backDelay: 1200,
            loop: true
        });
    }
});

// Active Navigation Link Highlight
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// AOS Animations
document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }
});

// Spotlight + 3D Tilt Effects (Premium)
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function bindSpotlightAndTilt(elements) {
    elements.forEach((el) => {
        let rafId = null;

        const onMove = (clientX, clientY) => {
            const rect = el.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            // Spotlight
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);

            if (prefersReducedMotion) return;

            // Tilt
            const px = x / rect.width;
            const py = y / rect.height;
            const rotateY = (px - 0.5) * 12;
            const rotateX = (0.5 - py) * 12;

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0) scale(1.01)`;
            });
        };

        el.addEventListener('mousemove', (e) => {
            onMove(e.clientX, e.clientY);
        });

        el.addEventListener('mouseleave', () => {
            el.style.setProperty('--mx', `50%`);
            el.style.setProperty('--my', `50%`);
            el.style.transform = '';
        });

        // Touch devices: keep it lightweight (spotlight only)
        el.addEventListener('touchmove', (e) => {
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            onMove(t.clientX, t.clientY);
        }, { passive: true });

        el.addEventListener('touchend', () => {
            el.style.setProperty('--mx', `50%`);
            el.style.setProperty('--my', `50%`);
            el.style.transform = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tiltTargets = document.querySelectorAll('.stat, .skill-category, .project-card, .contact-item');
    bindSpotlightAndTilt(Array.from(tiltTargets));
});

// Skill Item Animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Social Media Links Animation
document.querySelectorAll('.social-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: rgba(255, 255, 255, 0.95);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Count-up animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 60));

        const update = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 100 ? '%' : '+');
                return;
            }
            counter.textContent = current + (target === 100 ? '%' : '+');
            requestAnimationFrame(update);
        };

        update();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Particles.js
if (window.particlesJS) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ['#ffffff', '#22d3ee', '#a855f7'] },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 120, color: '#ffffff', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1.2 }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        retina_detect: true
    });
}

// Cursor Follow Effect (optional - for desktop only)
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
        opacity: 0.7;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const loaderText = document.createElement('h2');
    loaderText.textContent = 'Mahaz Abdullah';
    loaderText.style.cssText = `
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 1rem;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    const loaderSubtext = document.createElement('p');
    loaderSubtext.textContent = 'Loading amazing portfolio...';
    loaderSubtext.style.cssText = `
        font-size: 1rem;
        opacity: 0.8;
    `;
    
    loaderContent.appendChild(loaderText);
    loaderContent.appendChild(loaderSubtext);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Form Validation (if contact form is added later)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || formData.email.trim() === '') {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim() === '') {
        errors.push('Message is required');
    }
    
    return errors;
}

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

console.log('🚀 Portfolio loaded successfully! Created with ❤️ by Mahaz Abdullah');
