// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1000);
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
} else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

// Floating 3D Cubes Background
function initCubeBackground() {
    const container = document.getElementById('cube-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    const cubes = [];
    const geometry = new THREE.BoxGeometry(40, 40, 40);
    for (let i = 0; i < 20; i++) {
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            transparent: true,
            opacity: 0.3,
            wireframe: Math.random() > 0.5
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = Math.random() * 1000 - 500;
        cube.position.y = Math.random() * 1000 - 500;
        cube.position.z = Math.random() * 1000 - 500;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        cube.userData = {
            originalX: cube.position.x,
            originalY: cube.position.y,
            originalZ: cube.position.z,
            speedX: Math.random() * 0.02 - 0.01,
            speedY: Math.random() * 0.02 - 0.01,
            speedZ: Math.random() * 0.02 - 0.01,
            rotationSpeedX: Math.random() * 0.01,
            rotationSpeedY: Math.random() * 0.01
        };
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        cubes.forEach(cube => {
            cube.position.x = cube.userData.originalX + Math.sin(Date.now() * 0.001) * 100;
            cube.position.y = cube.userData.originalY + Math.cos(Date.now() * 0.001) * 100;
            cube.rotation.x += cube.userData.rotationSpeedX;
            cube.rotation.y += cube.userData.rotationSpeedY;
        });
        renderer.render(scene, camera);
    }
    
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Enhanced Particles.js with Mouse Interaction
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3498db" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#3498db", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                onmousemove: { enable: true, mode: "grab" }
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 1 } },
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
}

// Scroll to Top
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animate Elements on Scroll
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('skill-progress-bar')) {
                    const width = entry.target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                    entry.target.style.width = width + '%';
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section, .skill-category, .project-card, .education-card, .achievement-card, .certificate-card, .timeline-item, .skill-progress-bar').forEach(el => {
        observer.observe(el);
    });
}

// CV Button Confirmation
function initCVButton() {
    const cvButton = document.querySelector('.btn-cv');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            if (!confirm('Would you like to view/download my CV?')) {
                e.preventDefault();
            }
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = form.querySelector('.submit-text');
    const sendingText = form.querySelector('.sending-text');
    const successMessage = form.querySelector('.form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show sending state
        submitText.style.display = 'none';
        sendingText.style.display = 'inline-block';
        
        // Simulate form submission (replace with actual backend logic)
        setTimeout(() => {
            // Hide sending state
            submitText.style.display = 'inline-block';
            sendingText.style.display = 'none';
            
            // Show success message
            successMessage.style.display = 'block';
            form.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }, 1500);
    });
}

// Achievement Modals
function initAchievementModals() {
    const cards = document.querySelectorAll('.achievement-card');
    const modals = document.querySelectorAll('.achievement-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
            document.body.style.overflow = 'auto';
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Copy to Clipboard Functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change icon to checkmark temporarily
                const icon = this.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}

// Typewriter Effect with Typed.js
function initTypewriter() {
    if (document.querySelector('.typewriter')) {
        const typed = new Typed('.typewriter', {
            strings: ["Computer Science Engineer", "Problem Solver", "Full Stack Developer", "Data Analyst"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

// Certificate View Buttons
function initCertificateButtons() {
    document.querySelectorAll('.view-certificate, .view-certificate-btn, .view-transcript').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.tagName === 'A') return; // Let anchor tags work normally
            const url = this.getAttribute('data-url') || this.href;
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Sticky Header
function initStickyHeader() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
}

// Initialize All Functions
document.addEventListener('DOMContentLoaded', function() {
    initCubeBackground();
    initParticles();
    initSmoothScrolling();
    initScrollToTop();
    initIntersectionObserver();
    initCVButton();
    initContactForm();
    initAchievementModals();
    initCopyButtons();
    initTypewriter();
    initCertificateButtons();
    initMobileMenu();
    initStickyHeader();
});