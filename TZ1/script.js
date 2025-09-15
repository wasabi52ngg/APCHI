// Smooth scrolling for navigation links
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
    const form = document.getElementById('consultationForm');
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.advantage-card, .case-info, .form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to scroll to form
function scrollToForm() {
    const formSection = document.getElementById('contact');
    if (formSection) {
        formSection.scrollIntoView({
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
    if (!data.name || !data.phone) {
        showNotification('Пожалуйста, заполните обязательные поля', 'error');
        return;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Пожалуйста, введите корректный номер телефона', 'error');
        return;
    }

    // Email validation (if provided)
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
    }

    // Simulate form submission
    showNotification('Заявка отправляется...', 'info');
    
    setTimeout(() => {
        // In real application, you would send data to server
        console.log('Form data:', data);
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в течение 30 минут.', 'success');
        form.reset();
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
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
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

// Add loading animation for images
function addLoadingAnimation() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.8)';
        placeholder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', addLoadingAnimation);
