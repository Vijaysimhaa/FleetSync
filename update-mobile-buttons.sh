#!/bin/bash

# Script to update mobile menu buttons on all dashboard pages

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
  "dashboard.html"
)

# Process each page
for page in "${PAGES[@]}"; do
  echo "Processing $page..."
  
  # Check if file exists
  if [ ! -f "$page" ]; then
    echo "File $page not found, skipping..."
    continue
  fi
  
  # Make a backup
  cp "$page" "${page}.bak2"
  
  # Update mobile menu button
  sed -i '' 's/<div class="md:hidden fixed bottom-4 left-4 z-50">\n<button type="button" class="bg-primary text-white p-3 rounded-full shadow-lg !rounded-button">/<div class="md:hidden fixed bottom-4 left-4 z-50">\n<button type="button" id="mobile-menu-button" class="bg-primary text-white p-3 rounded-full shadow-lg !rounded-button">/g' "$page"
  
  # Update header menu button
  sed -i '' 's/<div class="md:hidden mr-4">\n<button type="button" class="text-gray-400 hover:text-white">/<div class="md:hidden mr-4">\n<button type="button" id="header-menu-button" class="text-gray-400 hover:text-white">/g' "$page"
  
  # Add sidebar overlay if it doesn't exist
  if ! grep -q "sidebar-overlay" "$page"; then
    sed -i '' 's/<div class="flex-1 flex flex-col overflow-hidden bg-dark">/<\!-- Mobile sidebar overlay -->\n<div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden"><\/div>\n\n<div class="flex-1 flex flex-col overflow-hidden bg-dark">/g' "$page"
  fi
  
  echo "Completed $page"
done

echo "All pages have been updated with mobile menu buttons!"