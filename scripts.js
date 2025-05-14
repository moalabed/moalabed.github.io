document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
        name: formData.get('name'),
        contact: formData.get('contact'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        notes: formData.get('notes')
    };

    console.log('Booking Data:', data);

    alert('Your appointment has been booked successfully!');
});

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Add animation for stats on scroll
const stats = document.querySelectorAll('.stat-value');
let animated = false;

function animateStats() {
    if (animated) return;
    
    const statsSection = document.querySelector('.about-stats');
    const position = statsSection.getBoundingClientRect().top;
    
    // Only animate when stats are in view
    if (position < window.innerHeight - 100) {
        stats.forEach(stat => {
            const value = stat.innerText;
            stat.innerText = '0';
            
            // Simple animation for numeric values
            if (!isNaN(parseFloat(value))) {
                let current = 0;
                const target = parseFloat(value);
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    stat.innerText = Math.ceil(current) + (value.includes('+') ? '+' : '');
                    if (current >= target) {
                        stat.innerText = value;
                        clearInterval(timer);
                    }
                }, 20);
            } else {
                // For non-numeric values, just show them
                stat.innerText = value;
            }
        });
        
        animated = true;
    }
}

// Check for scroll to animate stats
window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Add "active" class to navigation links based on scroll position
window.addEventListener('scroll', highlightNavLink);

function highlightNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Orbit Animation with p5.js
const orbitSketch = (p) => {
    let particles = [];
    const numParticles = 5;
    let canvasContainer;
    let sunColor, planetColor1, planetColor2, orbitLineColor;

    p.setup = () => {
        canvasContainer = document.getElementById('orbit-canvas-container');
        const canvas = p.createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        canvas.parent('orbit-canvas-container');
        p.angleMode(p.DEGREES);

        // Get colors from CSS variables
        const rootStyles = getComputedStyle(document.documentElement);
        sunColor = p.color(rootStyles.getPropertyValue('--accent-color').trim());
        planetColor1 = p.color(rootStyles.getPropertyValue('--secondary-color').trim());
        planetColor2 = p.color(rootStyles.getPropertyValue('--text-on-primary-color').trim() + '80'); // Lighter with some transparency
        orbitLineColor = p.color(rootStyles.getPropertyValue('--border-color').trim() + '40'); // Faint border color

        const centerX = p.width / 2;
        const centerY = p.height / 2;
        const maxOrbitRadius = p.min(p.width, p.height) / 3;


        for (let i = 0; i < numParticles; i++) {
            particles.push({
                radius: p.random(maxOrbitRadius * 0.2, maxOrbitRadius),
                speed: p.random(0.1, 0.5) * (p.random() > 0.5 ? 1 : -1),
                angle: p.random(360),
                size: p.random(3, 7),
                color: p.random() > 0.5 ? planetColor1 : planetColor2
            });
        }
    };

    p.draw = () => {
        p.clear(); // Use clear() for a transparent background to see header bg
        const centerX = p.width / 2;
        const centerY = p.height / 2;

        // Draw Sun
        p.fill(sunColor);
        p.noStroke();
        p.ellipse(centerX, centerY, 15, 15);

        // Draw Particles and Orbits
        particles.forEach(particle => {
            const x = centerX + particle.radius * p.cos(particle.angle);
            const y = centerY + particle.radius * p.sin(particle.angle);

            // Draw orbit line
            p.noFill();
            p.stroke(orbitLineColor);
            p.strokeWeight(0.5);
            p.ellipse(centerX, centerY, particle.radius * 2, particle.radius * 2);

            // Draw particle
            p.fill(particle.color);
            p.noStroke();
            p.ellipse(x, y, particle.size, particle.size);

            particle.angle += particle.speed;
        });
    };

    p.windowResized = () => {
        if (canvasContainer) {
            p.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        }
    };
};

// Ensure the DOM is loaded before trying to get the container and CSS variables
document.addEventListener('DOMContentLoaded', () => {
    new p5(orbitSketch);
});

