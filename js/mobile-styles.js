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
  `;
  document.head.appendChild(style);
});