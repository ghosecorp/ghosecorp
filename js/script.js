// Navigation toggle
const nav = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => { link.style.animation = ''; });
        }
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll down button
const scrollDownBtn = document.getElementById('scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
}

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.about-text, .about-image, .services-intro, .service-card, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// Contact form animation
const formElements = document.querySelectorAll('.form-group input, .form-group textarea');
formElements.forEach(element => {
    if (element.value !== '') {
        element.parentElement.classList.add('active');
    }
    element.addEventListener('focus', () => {
        element.parentElement.classList.add('active');
    });
    element.addEventListener('blur', () => {
        if (element.value === '') {
            element.parentElement.classList.remove('active');
        }
    });
});

// Optimized Particles JS Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.3 + 0.05;

        particle.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(0, 242, 255, ${opacity});
            border-radius: 50%;
            pointer-events: none;
        `;

        const duration = (Math.random() * 15 + 10) * 1000;
        particle.animate([
            { transform: 'translateY(0) translateX(0)', opacity: opacity },
            { transform: `translateY(-${Math.random() * 100 + 50}px) translateX(${Math.random() * 40 - 20}px)`, opacity: 0 }
        ], {
            duration: duration,
            iterations: Infinity,
            easing: 'linear',
            delay: Math.random() * -duration
        });

        fragment.appendChild(particle);
    }
    particlesContainer.appendChild(fragment);
}

// Create dynamic background particles
window.addEventListener('load', createParticles);

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px)';
        const icon = this.querySelector('.service-icon');
        if (icon) icon.style.transform = 'scale(1.2) rotate(5deg)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        const icon = this.querySelector('.service-icon');
        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Typing effect for hero description
function typeEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}
// Apply typing effect to a paragraph in the hero section
const heroDescriptionElement = document.getElementById('hero-desc');
if (heroDescriptionElement) {
    const originalText = heroDescriptionElement.textContent;
    heroDescriptionElement.textContent = '';
    heroDescriptionElement.style.opacity = '1';
    heroDescriptionElement.style.transform = 'none';
    heroDescriptionElement.style.animation = 'none';

    setTimeout(() => {
        typeEffect(heroDescriptionElement, originalText, 25);
    }, 1200);
}
// Floating animation for service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});
