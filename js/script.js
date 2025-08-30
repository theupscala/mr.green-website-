// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && navMenu) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 13, 102, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.backgroundColor = 'rgba(0, 13, 102, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Hero Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Initialize slider
function initSlider() {
    if (slides.length === 0) return;
    
    slides.forEach((slide, index) => {
        const bgImage = slide.getAttribute('data-bg');
        if (bgImage) {
            slide.style.backgroundImage = `url(${bgImage})`;
        }
    });
    
    // Auto-play slider
    if (totalSlides > 1) {
        setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    if (slides.length === 0) return;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    if (indicators.length > 0) {
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Add prev class to previous slide for animation
    const prevIndex = currentSlideIndex;
    if (prevIndex !== index) {
        slides[prevIndex].classList.add('prev');
    }
    
    currentSlideIndex = index;
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Enhanced slider with better animations
function showSlide(index) {
    if (slides.length === 0) return;
    
    // Remove active class from all slides and indicators
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        // Reset text animation
        const textAnimation = slide.querySelector('.hero-text-animation');
        if (textAnimation) {
            textAnimation.style.animation = 'none';
        }
    });
    
    if (indicators.length > 0) {
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
    
    // Add prev class to current slide
    if (currentSlideIndex !== index) {
        slides[currentSlideIndex].classList.add('prev');
    }
    
    // Add active class to new slide
    slides[index].classList.add('active');
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Trigger text animation for new slide
    setTimeout(() => {
        const textAnimation = slides[index].querySelector('.hero-text-animation');
        if (textAnimation) {
            textAnimation.style.animation = 'heroTextSlideIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }
    }, 300);
    
    currentSlideIndex = index;
}

// Add click ripple effect to buttons
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all clickable elements
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll('.cta-button, .nav-btn, .indicator, .whatsapp-link');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            addRippleEffect(this, e);
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || formData.get('firstName');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Add click effect to CTA button
document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
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

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .cta-button, .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #ffcc00;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);




// Apply background images from data-bg
document.querySelectorAll(".my-slider .slide").forEach(slide => {
  const bg = slide.getAttribute("data-bg");
  slide.style.backgroundImage = `url(${bg})`;
});

let currentSlide = 0;
const slides = document.querySelectorAll(".my-slider .slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function changeSlide(step) {
  currentSlide = (currentSlide + step + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);
