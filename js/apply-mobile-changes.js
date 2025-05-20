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
  const headerMenuButton = document.querySelector('.md\\:hidden button') || updateHeaderMenuButton();

  function createSidebarOverlay() {
    // Create overlay if it doesn't exist
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden';
    document.body.appendChild(overlay);
    return overlay;
  }

  function updateMobileMenuButton() {
    // Find or create mobile menu button
    let button = document.querySelector('.md\\:hidden button');
    
    if (!button) {
      // Create mobile menu button if it doesn't exist
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'md:hidden fixed bottom-4 left-4 z-50';
      
      button = document.createElement('button');
      button.id = 'mobile-menu-button';
      button.className = 'bg-primary text-white p-3 rounded-full shadow-lg !rounded-button';
      button.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
      
      buttonContainer.appendChild(button);
      document.body.appendChild(buttonContainer);
    } else if (!button.id) {
      button.id = 'mobile-menu-button';
    }
    
    return button;
  }

  function updateHeaderMenuButton() {
    // Find header menu button in the mobile header
    const headerMenuContainer = document.querySelector('.md\\:hidden.mr-4');
    
    if (headerMenuContainer) {
      const button = headerMenuContainer.querySelector('button');
      if (button && !button.id) {
        button.id = 'header-menu-button';
        return button;
      }
      return button;
    }
    
    return null;
  }

  function toggleSidebar() {
    if (!sidebar) return;
    
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('md:flex');
    
    if (!sidebar.classList.contains('hidden')) {
      sidebar.classList.add('fixed', 'inset-0', 'z-50', 'h-full', 'w-3/4');
      document.body.style.overflow = 'hidden';
      
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('hidden');
      }
    } else {
      sidebar.classList.remove('fixed', 'inset-0', 'z-50', 'h-full', 'w-3/4');
      document.body.style.overflow = '';
      
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('hidden');
      }
    }
  }

  // Add event listeners
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleSidebar);
  }

  if (headerMenuButton) {
    headerMenuButton.addEventListener('click', toggleSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (!sidebar.classList.contains('hidden')) {
        toggleSidebar();
      }
    });
  }

  // Add mobile-specific CSS
  addMobileCSS();

  // Make tables responsive
  makeTablesResponsive();
  
  // Make forms responsive
  makeFormsResponsive();
  
  // Adjust chart sizes on window resize
  setupChartResizing();

  function addMobileCSS() {
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile sidebar enhancements */
      @media (max-width: 768px) {
        aside.fixed {
          transition: all 0.3s ease-in-out;
          overflow-y: auto;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
        
        /* Improve table responsiveness */
        table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
          font-size: 0.875rem !important;
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
        
        /* Improve form elements on mobile */
        input, select, textarea {
          font-size: 16px !important; /* Prevents iOS zoom on focus */
        }
        
        /* Improve button sizing on mobile */
        button {
          min-height: 44px; /* Minimum touch target size */
        }
        
        /* Stack flex items on mobile */
        .flex.flex-col.md\\:flex-row {
          flex-direction: column !important;
        }
        
        /* Adjust modal sizing */
        .modal-content {
          width: 95% !important;
          max-width: 95% !important;
          margin: 0 auto;
        }
        
        /* Improve dropdown positioning */
        .dropdown-menu {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          bottom: 0 !important;
          top: auto !important;
          border-radius: 12px 12px 0 0 !important;
          max-height: 80vh !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  function makeTablesResponsive() {
    // Find all tables and make them responsive
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      if (!table.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive overflow-x-auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }
  
  function makeFormsResponsive() {
    // Find all form elements and ensure they're properly sized for mobile
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(el => {
      // Add appropriate classes for mobile
      if (!el.classList.contains('mobile-friendly')) {
        el.classList.add('mobile-friendly');
        
        // Ensure minimum height for touch targets
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
          el.style.minHeight = '44px';
        }
      }
    });
  }
  
  function setupChartResizing() {
    // Find all chart elements
    const chartElements = document.querySelectorAll('[id$="Chart"]');
    
    // Set up resize event for charts
    if (chartElements.length > 0) {
      window.addEventListener('resize', function() {
        // Resize all charts when window size changes
        chartElements.forEach(chartEl => {
          const chart = echarts.getInstanceByDom(chartEl);
          if (chart) {
            chart.resize();
          }
        });
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu button functionality
    const mobileMenuButton = document.querySelector('button[x-text="☰"]') || document.querySelector('button[aria-label="Menu"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const sidebar = document.querySelector('aside');
            if (sidebar) {
                sidebar.classList.toggle('hidden');
                sidebar.classList.toggle('md:flex');
            }
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('aside');
        const mobileMenuButton = document.querySelector('button[x-text="☰"]') || document.querySelector('button[aria-label="Menu"]');
        
        if (sidebar && mobileMenuButton) {
            if (!sidebar.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                sidebar.classList.add('hidden');
                sidebar.classList.add('md:flex');
            }
        }
    });
});
