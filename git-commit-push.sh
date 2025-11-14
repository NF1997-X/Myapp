#!/bin/bash

echo "=== Git Status ==="
git status

echo ""
echo "=== Adding all changes ==="
git add .

echo ""
echo "=== Committing changes ==="
git commit -m "Complete iOS black glass design with responsive layout and all features

- Applied full iOS black glass theme across all screens
- Made entire app responsive (mobile, tablet, iPad, desktop)
- Added change password functionality with validation
- Added Home and Gallery app icons
- Fixed text color issue with !important flag
- Removed borders from app icons
- Fixed password dot flickering
- Fixed icon flickering after loading
- Removed status bar notification
- Settings modal with URL editing
- localStorage persistence for URLs and passwords
- Vercel deployment configuration"

echo ""
echo "=== Pushing to origin main ==="
git push origin main

echo ""
echo "=== Done! ==="
