// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initStatsCounter();
    initSmoothScrolling();
    initParticleEffect();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements first
    const aboutContent = document.querySelector('.about-content .about-text');
    const aboutVisual = document.querySelector('.about-visual');
    const skillTiles = document.querySelectorAll('.skill-tile');
    const projectCards = document.querySelectorAll('.project-card');
    const contactInfo = document.querySelector('.contact-info');

    if (aboutContent) aboutContent.classList.add('slide-in-left');
    if (aboutVisual) aboutVisual.classList.add('slide-in-right');
    if (contactInfo) contactInfo.classList.add('slide-in-left');

    skillTiles.forEach((tile, index) => {
        tile.classList.add('fade-in');
        tile.style.animationDelay = `${index * 0.05}s`;
    });

    projectCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Now observe all animated elements (after classes are added)
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Typing effect for hero section
function initTypingEffect() {
    const roleText = document.querySelector('.role-text');
    if (!roleText) return;

    const roles = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker'
    ];
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeWriter() {
        const current = roles[currentRole];
        
        if (isDeleting) {
            roleText.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            roleText.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target > 50 ? '+' : '');
        }, 20);
    };

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                countUp(statNumber);
                statsObserver.unobserve(statNumber);
            }
        });
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${left}%;
            bottom: -10px;
            animation: float-up ${animationDuration}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentElement) {
                particle.remove();
            }
        }, animationDuration * 1000);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Skill item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Project card tilt effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    floatingShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Load animations for elements already in view
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Theme toggle functionality (bonus feature)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Cursor trail effect (bonus feature)
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transform: scale(${1 - i / trailLength});
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Initialize bonus features on larger screens
if (window.innerWidth > 768) {
    initCursorTrail();
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-related updates go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
