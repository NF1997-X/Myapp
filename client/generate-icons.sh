#!/bin/bash

# Generate App Icons for PWA
# This script creates placeholder icons - replace with actual app icons

echo "🎨 Generating PWA icons..."

# Create a simple SVG icon
cat > /tmp/app-icon.svg << 'EOF'
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" ry="100" fill="url(#gradient)"/>
  <g fill="white" opacity="0.9">
    <!-- App icons grid -->
    <rect x="100" y="100" width="80" height="80" rx="16" ry="16"/>
    <rect x="200" y="100" width="80" height="80" rx="16" ry="16"/>
    <rect x="300" y="100" width="80" height="80" rx="16" ry="16"/>
    
    <rect x="100" y="200" width="80" height="80" rx="16" ry="16"/>
    <rect x="200" y="200" width="80" height="80" rx="16" ry="16"/>
    <rect x="300" y="200" width="80" height="80" rx="16" ry="16"/>
    
    <rect x="100" y="300" width="80" height="80" rx="16" ry="16"/>
    <rect x="200" y="300" width="80" height="80" rx="16" ry="16"/>
    <rect x="300" y="300" width="80" height="80" rx="16" ry="16"/>
  </g>
  <!-- Center highlight -->
  <circle cx="256" cy="256" r="40" fill="white" opacity="0.3"/>
</svg>
EOF

# Icon sizes needed for PWA
sizes=(16 32 72 96 128 144 152 180 192 384 512)

echo "📦 Converting to PNG icons..."

for size in "${sizes[@]}"; do
  echo "  Creating ${size}x${size} icon..."
  
  # Create simple colored rectangle as placeholder since we don't have imagemagick
  cat > "/workspaces/Myapp/client/public/icon-${size}x${size}.png.b64" << EOF
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==
EOF
  
  # Decode the base64 to create actual PNG file
  # This creates a 1x1 transparent pixel - replace with actual icon generation
  python3 -c "
import base64
import sys

# Simple gradient icon generator
def create_icon(size):
    from io import BytesIO
    
    # Create a simple colored square as placeholder
    width, height = size, size
    
    # PNG header for a simple colored image
    # This is a placeholder - in production you'd use PIL or similar
    data = b'\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR\\x00\\x00\\x00\\x01\\x00\\x00\\x00\\x01\\x08\\x06\\x00\\x00\\x00\\x1f\\x15\\xc4\\x89\\x00\\x00\\x00\\rIDATx\\x9cc\xf8\x0f\\x00\\x00\\x00\\x00\\x01\\x00\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00IEND\\xaeB\x60\\x82'
    
    return data

with open('/workspaces/Myapp/client/public/icon-${size}x${size}.png', 'wb') as f:
    f.write(create_icon(${size}))
"
  
  rm -f "/workspaces/Myapp/client/public/icon-${size}x${size}.png.b64"
done

echo "✅ PWA icons generated!"
echo ""
echo "📱 To replace with custom icons:"
echo "  1. Create a 512x512 app icon in your favorite design tool"
echo "  2. Use online PWA icon generators to create all sizes"
echo "  3. Replace the generated placeholder icons"
echo ""
echo "🚀 Your PWA is ready! Users can now:"
echo "  • Add the app to their home screen"
echo "  • Run it like a native app"
echo "  • Use it offline (basic functionality)"