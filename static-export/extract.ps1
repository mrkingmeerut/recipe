# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "./html"
New-Item -ItemType Directory -Force -Path "./css"
New-Item -ItemType Directory -Force -Path "./js"

# Copy CSS files
Copy-Item "../src/app/globals.css" -Destination "./css/"
Get-ChildItem -Path "../.next/static/css" -Filter "*.css" | Copy-Item -Destination "./css/"

# Copy JS files
Get-ChildItem -Path "../.next/static/chunks" -Filter "*.js" | Copy-Item -Destination "./js/"

# Copy HTML content
Copy-Item "../.next/server/app/page.html" -Destination "./html/index.html" -ErrorAction SilentlyContinue
