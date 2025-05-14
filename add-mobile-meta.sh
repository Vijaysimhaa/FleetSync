#!/bin/bash

# Script to add mobile-friendly meta tags to all dashboard pages

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
  cp "$page" "${page}.bak3"
  
  # Add mobile meta tags if they don't exist
  if ! grep -q "maximum-scale" "$page"; then
    sed -i '' 's/<meta name="viewport" content="width=device-width, initial-scale=1.0">/<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="theme-color" content="#111827">/g' "$page"
  fi
  
  echo "Completed $page"
done

echo "All pages have been updated with mobile-friendly meta tags!"