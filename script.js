// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingText = document.getElementById('typing-text');
const roles = [
    'Flutter Developer',
    'Full-Stack Developer',
    'Mobile App Developer',
    'Python & AI Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 70;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        // Typing text
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
    }
    
    // Check if word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 200;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        typeEffect();
    }, 2000); // Start after loading screen
});

// ============================================
// CURSOR WAVING TEXT EFFECT
// ============================================
const cursorWaveText = document.getElementById('cursorWaveText');
const waveTextContent = 'CODE • INNOVATE';

// Create span elements for each character
waveTextContent.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.08}s`;
    cursorWaveText.appendChild(span);
});

let cursorWaveX = 0;
let cursorWaveY = 0;
let targetX = 0;
let targetY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    // Show text when mouse moves
    cursorWaveText.classList.add('active');
    isMouseMoving = true;
    
    // Hide text after mouse stops
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        cursorWaveText.classList.remove('active');
        isMouseMoving = false;
    }, 800);
});

// Smooth following animation
function animateWaveText() {
    // Smooth interpolation with higher ease for more responsiveness
    const ease = 0.15;
    cursorWaveX += (targetX - cursorWaveX) * ease;
    cursorWaveY += (targetY - cursorWaveY) * ease;
    
    // Use transform for smoother rendering
    cursorWaveText.style.left = `${cursorWaveX}px`;
    cursorWaveText.style.top = `${cursorWaveY}px`;
    
    requestAnimationFrame(animateWaveText);
}

animateWaveText();

// ============================================
// NEURAL NETWORK CANVAS BACKGROUND
// ============================================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 10;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        
        // Random color from palette
        const colors = [
            { r: 139, g: 92, b: 246 },   // Purple
            { r: 6, g: 182, b: 212 },     // Cyan
            { r: 236, g: 72, b: 153 }     // Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
    }

    update() {
        // Move particles
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction - push away
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density * 0.3;
                let directionY = forceDirectionY * force * this.density * 0.3;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 12000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

// Connect particles with lines
function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                // Line opacity fades with distance
                let opacity = 1 - (distance / 120);
                opacity = opacity * 0.3;
                
                // Mix colors of connected particles
                let color1 = particlesArray[i].color;
                let color2 = particlesArray[j].color;
                let avgR = (color1.r + color2.r) / 2;
                let avgG = (color1.g + color2.g) / 2;
                let avgB = (color1.b + color2.b) / 2;
                
                ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    // Draw connections
    connectParticles();
    
    // Reset shadow for next frame
    ctx.shadowBlur = 0;
    
    requestAnimationFrame(animateParticles);
}

// Initialize
resizeCanvas();
initParticles();
animateParticles();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
// Optimized for fast, professional scroll reveals:
// - 0.4s duration with cubic-bezier easing
// - 0.05s delay between cards (resets every 6)
// - Higher threshold (0.15) for earlier triggers
// - Reduced translateY distance (20px)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
});

// Observe cards for staggered animation with faster timing
const cards = document.querySelectorAll('.skill-card, .project-card, .stat-card, .education-card, .contact-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    const delay = (index % 6) * 0.05; // Faster stagger, resets every 6 cards
    card.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
    observer.observe(card);
});

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 100);
            }
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ============================================
// COUNTER ANIMATION
// ============================================
const animateCounter = (element, target, addPlus, duration = 1500) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = addPlus ? Math.floor(start) + '+' : Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = addPlus ? target + '+' : target;
        }
    };
    
    updateCounter();
};

// Observe stat cards and animate counters
const statCards = document.querySelectorAll('.stat-card h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent.trim();
            const number = parseInt(text, 10);
            const addPlus = text.includes('+');
            if (!isNaN(number)) {
                animateCounter(entry.target, number, addPlus);
            }
        }
    });
}, { threshold: 0.3 });

statCards.forEach(stat => statsObserver.observe(stat));

// ============================================
// TYPING EFFECT
// ============================================
const typeWriter = (element, text, speed = 40) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing effect
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTagline = document.querySelector('.hero-tagline');
        if (heroTagline) {
            const originalText = heroTagline.textContent;
            typeWriter(heroTagline, originalText, 25);
        }
    }, 1800);
});

// ============================================
// PROJECT MODAL
// ============================================
const projectData = {
    1: {
        title: 'RES-Q',
        subtitle: 'Jan 2026',
        description: 'Multi-role SOS platform (User / Volunteer / Admin) with RBAC, live GPS tracking, and offline-first request queue. Zero SOS data loss in low-connectivity - auto-syncs on reconnect. FCM push notifications deliver in under 2 seconds for critical events. Nearest-volunteer dispatch cuts assignment time by ~35-40%.',
        features: [
            'Multi-role access control with role-based permissions',
            'Live GPS tracking with nearest volunteer dispatch',
            'Offline-first request queue with auto-sync',
            'FCM push notifications under 2 seconds',
            'Admin monitoring and incident analytics'
        ],
        tech: ['Flutter', 'Firebase Firestore', 'Google Maps SDK', 'FCM'],
        github: 'https://github.com/prasathshiva81-stack/Res-Q'
    },
    2: {
        title: 'GoLocal',
        subtitle: '2025',
        description: 'Production cross-platform app (Android & iOS) connecting users with local service providers. Geo-query powered service discovery reduces time-to-provider-selection by ~30%. Supabase with RLS and real-time subscriptions replaces custom backend. Integrated AI chatbot for guided service selection.',
        features: [
            'Geo-query powered service discovery',
            'Supabase RLS with real-time subscriptions',
            'AI chatbot for guided service selection',
            'Provider profiles, ratings, and booking flow'
        ],
        tech: ['Flutter', 'Supabase', 'PostgreSQL', 'Google Maps API', 'AI Chatbot'],
        github: 'https://github.com/prasathshiva81-stack/golocal-app'
    },
    3: {
        title: 'Virtual Try-On System',
        subtitle: '2025',
        description: 'Full-stack web app overlaying clothing onto user photos using background segmentation, affine transformation, and alpha compositing. Average processing time under 3 seconds. Decoupled Python REST API backend with responsive mobile-first frontend.',
        features: [
            'Background segmentation and alpha compositing',
            'Affine transformations for clothing alignment',
            'Average processing time under 3 seconds',
            'Mobile-first responsive frontend'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Python Flask', 'OpenCV'],
        github: 'https://github.com/prasathshiva81-stack/virtual_tryon'
    }
};

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p style="color: var(--accent-secondary); font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem;">
                ${project.subtitle}
            </p>
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">
                ${project.description}
            </p>
            
            <h3><i class="fas fa-star" style="color: var(--accent-primary);"></i> Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h3><i class="fas fa-code" style="color: var(--accent-primary);"></i> Technology Stack</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1rem;">
                ${project.tech.map(tech => `
                    <span style="background: rgba(139, 92, 246, 0.15); color: var(--accent-secondary); 
                    padding: 0.6rem 1.2rem; border-radius: 25px; font-size: 0.9rem; font-weight: 600; 
                    border: 1px solid rgba(139, 92, 246, 0.3);">${tech}</span>
                `).join('')}
            </div>
            
            <div style="margin-top: 2.5rem; display: flex; gap: 1rem;">
                <a href="${project.github}" target="_blank" class="btn btn-primary" 
                   style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.7rem;">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// PARALLAX EFFECT
// ============================================
const floatingIcons = document.querySelectorAll('.floating-icon');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.1 + (index * 0.03);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// PROJECT CARD HOVER EFFECTS
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.project-header');
        if (icon) {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.project-header');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// ============================================
// SKILL CARD HOVER TILT
// ============================================
const allSkillCards = document.querySelectorAll('.skill-card');

allSkillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
const buttons = document.querySelectorAll('.btn, .btn-view-details');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn, .btn-view-details {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
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
`;
document.head.appendChild(style);

// ============================================
// SMOOTH REVEAL FOR SECTION TITLES
// ============================================
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-15px)';
    title.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(title);
});

// ============================================
// AOS (ANIMATE ON SCROLL) ATTRIBUTES
// ============================================
const aosElements = document.querySelectorAll('[data-aos]');
aosElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const delay = element.getAttribute('data-aos-delay') || 0;
    element.style.transitionDelay = delay + 'ms';
    
    observer.observe(element);
});

// ============================================
// CONTACT CARD ICON ROTATION
// ============================================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// ============================================
// CONSOLE LOG
// ============================================
console.log('%c🚀 Premium Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%cDesigned & Developed by Siva Prasath K', 'color: #8b5cf6; font-size: 14px;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavLink, 100);
window.removeEventListener('scroll', highlightNavLink);
window.addEventListener('scroll', debouncedHighlight);
