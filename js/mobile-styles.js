/**
 * Additional mobile-friendly styles for FleetSync
 * This script adds comprehensive mobile styles to all pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add mobile-specific CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Mobile-specific styles */
    @media (max-width: 768px) {
      /* General layout improvements */
      body {
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      
      /* Improve touch targets */
      a, button, .clickable, [role="button"] {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Improve form elements */
      input, select, textarea, button {
        font-size: 16px !important; /* Prevents iOS zoom */
        padding: 10px !important;
      }
      
      /* Improve spacing */
      .container {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
      
      /* Stack elements on mobile */
      .md\\:flex-row {
        flex-direction: column !important;
      }
      
      .md\\:items-center {
        align-items: flex-start !important;
      }
      
      /* Adjust grid layouts */
      .grid {
        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
      }
      
      /* Improve card layouts */
      .card, .bg-darklight {
        margin-bottom: 12px !important;
      }
      
      /* Adjust font sizes */
      h1, .h1 { font-size: 1.5rem !important; }
      h2, .h2 { font-size: 1.25rem !important; }
      h3, .h3 { font-size: 1.125rem !important; }
      
      /* Improve table display */
      table {
        display: block !important;
        overflow-x: auto !important;
      }
      
      th, td {
        padding: 8px !important;
        white-space: nowrap !important;
      }
      
      /* Improve modal display */
      .modal {
        padding: 0 !important;
      }
      
      .modal-content {
        width: 95% !important;
        max-width: 95% !important;
        margin: 10px auto !important;
        max-height: 90vh !important;
        overflow-y: auto !important;
      }
      
      /* Improve dropdown menus */
      .dropdown-menu {
        width: 100% !important;
        left: 0 !important;
        right: 0 !important;
      }
      
      /* Fix fixed positioning */
      .fixed {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      /* Improve scrolling */
      .overflow-y-auto, .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Adjust sidebar */
      aside.fixed {
        width: 75% !important;
        max-width: 300px !important;
      }
      
      /* Improve buttons */
      button.rounded-full {
        width: 56px !important;
        height: 56px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      /* Adjust chart containers */
      [id$="Chart"] {
        width: 100% !important;
      }
      
      /* Improve form layouts */
      .form-group {
        margin-bottom: 16px !important;
      }
      
      /* Adjust spacing between elements */
      .space-y-4 > * + * {
        margin-top: 12px !important;
      }
    }
    
    /* Small phone specific adjustments */
    @media (max-width: 375px) {
      .p-6 {
        padding: 8px !important;
      }
      
      h1, .h1 { font-size: 1.25rem !important; }
      h2, .h2 { font-size: 1.125rem !important; }
      h3, .h3 { font-size: 1rem !important; }
      
      .text-sm {
        font-size: 0.75rem !important;
      }
    }
    
    /* Cookie consent enhancements */
    .cookie-category {
        transition: background-color 0.2s;
        padding: 1rem;
        border-radius: 0.375rem;
    }
    
    .cookie-category:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }
    
    .cookie-toggle {
        position: relative;
        width: 3rem;
        height: 1.5rem;
    }
    
    .cookie-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .cookie-toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 1.5rem;
    }
    
    .cookie-toggle-slider:before {
        position: absolute;
        content: "";
        height: 1.25rem;
        width: 1.25rem;
        left: 0.125rem;
        bottom: 0.125rem;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    
    .cookie-toggle input:checked + .cookie-toggle-slider {
        background-color: #10B981;
    }
    
    .cookie-toggle input:checked + .cookie-toggle-slider:before {
        transform: translateX(1.5rem);
    }
    
    .cookie-info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background-color: #E5E7EB;
        color: #6B7280;
        font-size: 0.75rem;
        margin-left: 0.5rem;
        cursor: help;
    }
    
    .cookie-details {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .cookie-details.expanded {
        max-height: 500px;
    }
  `;
  document.head.appendChild(style);
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader-wrapper').classList.add('loaded');
    }, 1000);
});

// Scroll Animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu enhancements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile menu enhancements */
        @media (max-width: 768px) {
            #mobileMenu {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }

            #mobileMenu .text-logo {
                opacity: 0.9;
            }

            #mobileMenu a {
                position: relative;
                transition: all 0.3s ease;
            }

            #mobileMenu a:after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 50%;
                width: 0;
                height: 2px;
                background: currentColor;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }

            #mobileMenu a:hover:after {
                width: 80%;
            }

            #mobileMenu a:active {
                transform: scale(0.95);
            }

            #mobileMenuBtn:active {
                transform: scale(0.9);
            }
        }
    `;
    document.head.appendChild(style);
});