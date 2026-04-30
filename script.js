// BMW CAR RACING GAME - JavaScript Functionality

// ==================== Canvas Animation ====================
function initializeCanvas() {
    const canvas = document.getElementById('raceTrackCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    // Animation variables
    let animationFrameId;
    let carX = canvas.width / 2;
    let carY = canvas.height / 2;
    let carAngle = 0;
    let carVelocity = 2;

    // Road/track properties
    const roadWidth = 150;
    const roadOffsetX = canvas.width / 2 - roadWidth / 2;

    function drawRoad() {
        // Road background
        ctx.fillStyle = 'rgba(20, 30, 50, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Main road
        ctx.fillStyle = 'rgba(30, 40, 60, 0.5)';
        ctx.fillRect(roadOffsetX, 0, roadWidth, canvas.height);

        // Road center line
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([20, 20]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Road sides
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(roadOffsetX, 0);
        ctx.lineTo(roadOffsetX, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(roadOffsetX + roadWidth, 0);
        ctx.lineTo(roadOffsetX + roadWidth, canvas.height);
        ctx.stroke();
    }

    function drawCar() {
        ctx.save();
        ctx.translate(carX, carY);
        ctx.rotate(carAngle);

        // Car body
        ctx.fillStyle = '#FF0055';
        ctx.fillRect(-20, -10, 40, 20);

        // Car windows
        ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
        ctx.fillRect(-15, -5, 12, 8);
        ctx.fillRect(3, -5, 12, 8);

        // Car details
        ctx.strokeStyle = '#00D4FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-18, -8, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-18, 8, 3, 0, Math.PI * 2);
        ctx.stroke();

        // Speed effect
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-25, -5);
        ctx.lineTo(-35, -5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-25, 5);
        ctx.lineTo(-35, 5);
        ctx.stroke();

        ctx.restore();
    }

    function drawStars() {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
        for (let i = 0; i < 50; i++) {
            const x = (i * 50 + Date.now() * 0.05) % canvas.width;
            const y = 50 + (i * 30) % (canvas.height - 100);
            ctx.fillRect(x, y, 2, 2);
        }
    }

    function drawCityscape() {
        // Background buildings
        ctx.fillStyle = 'rgba(0, 212, 255, 0.05)';
        for (let i = 0; i < 8; i++) {
            const x = i * (canvas.width / 8);
            const height = 100 + Math.sin(i + Date.now() * 0.001) * 30;
            ctx.fillRect(x, canvas.height - height, canvas.width / 8 - 10, height);

            // Building windows
            ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
            for (let j = 0; j < height / 20; j++) {
                ctx.fillRect(x + 10, canvas.height - height + j * 20 + 5, 8, 8);
                ctx.fillRect(x + 30, canvas.height - height + j * 20 + 5, 8, 8);
            }
            ctx.fillStyle = 'rgba(0, 212, 255, 0.05)';
        }
    }

    function animate() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(10, 14, 39, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw elements
        drawStars();
        drawCityscape();
        drawRoad();

        // Update car position
        carY -= carVelocity;
        if (carY < -30) {
            carY = canvas.height;
        }

        // Car sway effect
        carX = canvas.width / 2 + Math.sin(Date.now() * 0.001) * 30;
        carAngle = Math.sin(Date.now() * 0.0005) * 0.05;

        // Draw car
        drawCar();

        // Draw glow effect
        ctx.shadowColor = 'rgba(0, 212, 255, 0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Continue animation
        animationFrameId = requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 60;
    });

    // Start animation
    animate();

    return animationFrameId;
}

// ==================== Navigation ====================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize canvas
    initializeCanvas();

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Car selection
    const carButtons = document.querySelectorAll('.btn-select');
    carButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const carName = button.closest('.car-card').querySelector('h3').textContent;
            showNotification(`${carName} selected!`, 'success');
        });
    });

    // Download buttons
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.querySelector('span').textContent;
            showNotification(`${platform} download started!`, 'success');
        });
    });

    // Add scroll animations
    observeElements();
});

// ==================== Scroll Animations ====================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe cars
    document.querySelectorAll('.car-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe features
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// ==================== Utility Functions ====================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, ${type === 'success' ? '#00ff88, #00cc66' : '#ff6b00, #ff4500'});
        color: #000;
        border-radius: 50px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-out forwards;
        box-shadow: 0 0 30px rgba(${type === 'success' ? '0, 255, 136' : '255, 107, 0'}, 0.5);
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== Parallax Effect ====================
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ==================== Performance Optimization ====================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollEffects();
            ticking = false;
        });
        ticking = true;
    }
});

function updateScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

// ==================== Mouse Tracking ====================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Apply subtle parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero && mouseY < 0.5) {
        hero.style.backgroundPosition = `${mouseX * 10}px ${mouseY * 10}px`;
    }
});

// ==================== Keyboard Controls ====================
document.addEventListener('keydown', (e) => {
    // Quick navigation with keyboard shortcuts
    const shortcuts = {
        'h': '#home',
        'a': '#about',
        'c': '#cars',
        'f': '#features',
        'g': '#gallery',
        'd': '#download'
    };

    if (shortcuts[e.key.toLowerCase()]) {
        e.preventDefault();
        scrollToSection(shortcuts[e.key.toLowerCase()].substring(1));
    }
});

// ==================== Service Worker (Optional) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('BMW CAR RACING GAME - Website Loaded Successfully! 🏁');
