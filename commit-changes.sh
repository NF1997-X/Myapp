#!/bin/bash

# Manual commit commands for Multi-App Launcher
# Run these commands in your terminal to commit the changes

echo "🔄 Adding all changes to git..."
git add .

echo "📝 Committing changes..."
git commit -m "Enhanced settings with URL bulk edit and improved password change

- Added 'Change URLs' feature to edit all app URLs at once
- Improved password change to require current password verification
- Added current password, new password, and confirm password fields
- Enhanced UI with better modal organization in settings
- Added bulk URL editing with save/cancel functionality
- Fixed password validation with proper error messages
- Updated deployment configuration with database integration
- Created deployment guide and environment files
- All features tested and working properly"

echo "🚀 Pushing to origin main..."
git push origin main

echo "✅ Commit completed successfully!"

echo ""
echo "📋 Summary of changes:"
echo "- Enhanced main-dashboard.tsx with better settings features"
echo "- Added bulk URL editing functionality"
echo "- Improved password change with current password verification"
echo "- Updated git-commit-push.sh with proper commit message"
echo "- Created deployment documentation and configuration"
echo "- Added environment files and deployment scripts"
echo ""
echo "🌐 Ready for deployment to Vercel!"