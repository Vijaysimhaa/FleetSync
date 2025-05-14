#!/bin/bash

# Script to add the mobile-friendly script to all dashboard pages

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

# Process each page
for page in "${PAGES[@]}"; do
  echo "Processing $page..."
  
  # Check if file exists
  if [ ! -f "$page" ]; then
    echo "File $page not found, skipping..."
    continue
  fi
  
  # Make a backup
  cp "$page" "${page}.bak"
  
  # Add script reference before closing body tag
  sed -i '' 's/<\/script>\n<\/body>\n<\/html>/<\/script>\n<script src="js\/apply-mobile-changes.js"><\/script>\n<\/body>\n<\/html>/g' "$page"
  
  echo "Completed $page"
done

echo "All pages have been updated to include the mobile-friendly script!"
