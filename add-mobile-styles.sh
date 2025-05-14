#!/bin/bash

# Script to add additional mobile styles to all dashboard pages

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
  cp "$page" "${page}.bak4"
  
  # Add mobile styles script before apply-mobile-changes.js
  sed -i '' 's/<script src="js\/apply-mobile-changes.js"><\/script>/<script src="js\/mobile-styles.js"><\/script>\n<script src="js\/apply-mobile-changes.js"><\/script>/g' "$page"
  
  echo "Completed $page"
done

echo "All pages have been updated with additional mobile styles!"