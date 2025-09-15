// Smooth scrolling and form handling for SEO audit landing page
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('auditForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            formatPhoneNumber(e.target);
        });
    }

    // Website URL formatting
    const websiteInput = document.getElementById('website');
    if (websiteInput) {
        websiteInput.addEventListener('blur', function(e) {
            formatWebsiteUrl(e.target);
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for chart bars
                if (entry.target.classList.contains('chart-bar')) {
                    animateChartBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.advantage-card, .included-item, .case-info, .form, .chart-bar');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize chart animations
    initializeChartAnimations();
});

// Function to scroll to form
function scrollToForm() {
    const formSection = document.getElementById('order');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to scroll to advantages
function scrollToAdvantages() {
    const advantagesSection = document.getElementById('advantages');
    if (advantagesSection) {
        advantagesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to handle form submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.website) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Пожалуйста, введите корректный номер телефона', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return;
    }

    // Website URL validation
    const urlRegex = /^https?:\/\/.+\..+/;
    if (!urlRegex.test(data.website)) {
        showNotification('Пожалуйста, введите корректный URL сайта (например: https://example.com)', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Заявка отправляется...', 'info');
    
    // Show loading animation
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляем...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // In real application, you would send data to server
        console.log('Audit form data:', data);
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в течение 30 минут для уточнения деталей.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Function to format phone number
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value[0] === '8') {
            value = '7' + value.slice(1);
        }
        
        if (value[0] === '7') {
            if (value.length <= 1) {
                value = '+7';
            } else if (value.length <= 4) {
                value = '+7 (' + value.slice(1);
            } else if (value.length <= 7) {
                value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4);
            } else if (value.length <= 9) {
                value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
            } else {
                value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
            }
        }
    }
    
    input.value = value;
}

// Function to format website URL
function formatWebsiteUrl(input) {
    let value = input.value.trim();
    
    if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
        value = 'https://' + value;
        input.value = value;
    }
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${colors[type] || colors.info};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Function to initialize chart animations
function initializeChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.setProperty('--height', bar.style.height);
        bar.style.height = '0';
        
        // Stagger the animation
        setTimeout(() => {
            bar.style.height = bar.style.getPropertyValue('--height');
        }, index * 200);
    });
}

// Function to animate chart bars
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.height = bar.style.getPropertyValue('--height');
        }, index * 100);
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .result-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else if (counter.textContent.includes('+')) {
                counter.textContent = '+' + Math.floor(current);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to pricing card
const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    pricingCard.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    pricingCard.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
}
