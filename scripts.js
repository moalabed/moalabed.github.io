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

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Collect form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    console.log('Contact Form Data:', data);
    
    // Show success message (in a real implementation, you'd send this data to a server)
    alert('Thank you for your message. I will get back to you soon!');
    
    // Reset the form
    event.target.reset();
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

