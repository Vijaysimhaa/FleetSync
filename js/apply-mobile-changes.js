/**
 * Script to apply mobile-friendly changes to all dashboard pages
 * 
 * This script should be included at the end of all dashboard pages
 * to enable mobile responsiveness.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidebar toggle functionality
  const sidebar = document.querySelector('aside');
  const sidebarOverlay = document.getElementById('sidebar-overlay') || createSidebarOverlay();
  const mobileMenuButton = document.getElementById('mobile-menu-button') || updateMobileMenuButton();
  const headerMenuButton = document.getElementById('header-menu-button') || updateHeaderMenuButton();

  function createSidebarOverlay() {
    // Create overlay if it doesn't exist
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden';
    document.body.insertBefore(overlay, document.querySelector('.flex-1'));
    return overlay;
  }

  function updateMobileMenuButton() {
    // Update mobile menu button if it exists
    const button = document.querySelector('.md\\:hidden button');
    if (button) {
      button.id = 'mobile-menu-button';
    }
    return button;
  }

  function updateHeaderMenuButton() {
    // Update header menu button if it exists
    const button = document.querySelector('.md\\:hidden .mr-4 button');
    if (button) {
      button.id = 'header-menu-button';
    }
    return button;
  }

  function toggleSidebar() {
    if (!sidebar) return;
    
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('fixed');
    sidebar.classList.toggle('inset-0');
    sidebar.classList.toggle('z-50');
    sidebar.classList.toggle('h-full');
    sidebar.classList.toggle('w-3/4');
    
    // Toggle overlay
    if (sidebarOverlay) {
      sidebarOverlay.classList.toggle('hidden');
    }
  }

  // Add event listeners for mobile menu buttons
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleSidebar);
  }

  if (headerMenuButton) {
    headerMenuButton.addEventListener('click', toggleSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }

  // Add mobile-specific CSS
  addMobileCSS();

  function addMobileCSS() {
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile sidebar enhancements */
      @media (max-width: 768px) {
        aside.fixed {
          transition: all 0.3s ease-in-out;
          overflow-y: auto;
        }
        
        /* Improve table responsiveness */
        table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        
        /* Adjust chart heights for mobile */
        [id$="Chart"] {
          height: 250px !important;
        }
        
        /* Improve card spacing on mobile */
        .p-6 {
          padding: 1rem !important;
        }
        
        /* Adjust font sizes for mobile */
        h1.text-xl {
          font-size: 1.1rem !important;
        }
        
        h3.text-2xl {
          font-size: 1.5rem !important;
        }
        
        /* Improve spacing for mobile */
        .gap-6 {
          gap: 1rem !important;
        }
        
        .mb-6 {
          margin-bottom: 1rem !important;
        }
        
        .mt-6 {
          margin-top: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
});