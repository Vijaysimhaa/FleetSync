#!/bin/bash

# Script to make all dashboard pages mobile-friendly
# This script will update all HTML files with the mobile-friendly changes

# List of dashboard pages to update
PAGES=(
  "alerts.html"
  "deliveries.html"
  "drivers.html"
  "warehouses.html"
  "reports.html"
  "general.html"
  "security.html"
  "profile.html"
)

# Function to add mobile sidebar overlay
add_mobile_overlay() {
  local file=$1
  
  # Add mobile sidebar overlay
  sed -i '' 's/<div class="md:hidden fixed bottom-4 left-4 z-50">\n<button type="button" class="bg-primary text-white p-3 rounded-full shadow-lg !rounded-button">\n<i class="ri-menu-line ri-lg"><\/i>\n<\/button>\n<\/div>/<div class="md:hidden fixed bottom-4 left-4 z-50">\n<button type="button" id="mobile-menu-button" class="bg-primary text-white p-3 rounded-full shadow-lg !rounded-button">\n<i class="ri-menu-line ri-lg"><\/i>\n<\/button>\n<\/div>\n\n<!-- Mobile sidebar overlay -->\n<div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden"><\/div>/g' "$file"
  
  # Update header menu button
  sed -i '' 's/<div class="md:hidden mr-4">\n<button type="button" class="text-gray-400 hover:text-white">/<div class="md:hidden mr-4">\n<button type="button" id="header-menu-button" class="text-gray-400 hover:text-white">/g' "$file"
}

# Function to add mobile CSS
add_mobile_css() {
  local file=$1
  
  # Add mobile CSS
  sed -i '' '/\.custom-checkbox .checkmark:after {/,/}/ s/}/}\n\n\/\* Mobile sidebar enhancements \*\/\n@media (max-width: 768px) {\n  aside.fixed {\n    transition: all 0.3s ease-in-out;\n    overflow-y: auto;\n  }\n  \n  \/\* Improve table responsiveness \*\/\n  table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  \n  \/\* Adjust chart heights for mobile \*\/\n  [id$="Chart"] {\n    height: 250px !important;\n  }\n  \n  \/\* Improve card spacing on mobile \*\/\n  .p-6 {\n    padding: 1rem;\n  }\n  \n  \/\* Adjust font sizes for mobile \*\/\n  h1.text-xl {\n    font-size: 1.1rem;\n  }\n  \n  h3.text-2xl {\n    font-size: 1.5rem;\n  }\n  \n  \/\* Improve spacing for mobile \*\/\n  .gap-6 {\n    gap: 1rem;\n  }\n  \n  .mb-6 {\n    margin-bottom: 1rem;\n  }\n  \n  .mt-6 {\n    margin-top: 1rem;\n  }\n}/g' "$file"
}

# Function to add mobile JavaScript
add_mobile_js() {
  local file=$1
  
  # Add mobile JavaScript
  sed -i '' '/document.addEventListener('\''DOMContentLoaded'\'', function() {/,/});/ s/\/\/ Placeholder for mobile sidebar toggle functionality.*console.log('\''Mobile menu button clicked'\'');.*});.*}/\/\/ Mobile sidebar toggle functionality\nconst sidebar = document.querySelector('\''aside'\'');\nconst sidebarOverlay = document.getElementById('\''sidebar-overlay'\'');\nconst mobileMenuButton = document.getElementById('\''mobile-menu-button'\'');\nconst headerMenuButton = document.getElementById('\''header-menu-button'\'');\n\nfunction toggleSidebar() {\n    sidebar.classList.toggle('\''hidden'\'');\n    sidebar.classList.toggle('\''fixed'\'');\n    sidebar.classList.toggle('\''inset-0'\'');\n    sidebar.classList.toggle('\''z-50'\'');\n    sidebar.classList.toggle('\''h-full'\'');\n    sidebar.classList.toggle('\''w-3\/4'\'');\n    \n    \/\/ Toggle overlay\n    sidebarOverlay.classList.toggle('\''hidden'\'');\n}\n\n\/\/ Add event listeners for mobile menu buttons\nif (mobileMenuButton) {\n    mobileMenuButton.addEventListener('\''click'\'', toggleSidebar);\n}\n\nif (headerMenuButton) {\n    headerMenuButton.addEventListener('\''click'\'', toggleSidebar);\n}\n\n\/\/ Close sidebar when clicking overlay\nif (sidebarOverlay) {\n    sidebarOverlay.addEventListener('\''click'\'', toggleSidebar);\n}/g' "$file"
}

# Process each page
for page in "${PAGES[@]}"; do
  echo "Processing $page..."
  
  # Make a backup
  cp "$page" "${page}.bak"
  
  # Add mobile overlay
  add_mobile_overlay "$page"
  
  # Add mobile CSS
  add_mobile_css "$page"
  
  # Add mobile JavaScript
  add_mobile_js "$page"
  
  echo "Completed $page"
done

echo "All pages have been updated to be mobile-friendly!"