#!/bin/bash

echo "=== Git Status ==="
git status

echo ""
echo "=== Adding all changes ==="
git add .

echo ""
echo "=== Committing changes ==="
git commit -m "Database setup and deployment configuration

- Configured Neon PostgreSQL database connection
- Set up Drizzle ORM schema synchronization
- Verified database connection and schema push
- Prepared application for deployment
- Updated environment configuration for production
- Ready for Vercel deployment with database integration"

echo ""
echo "=== Pushing to origin main ==="
git push origin main

echo ""
echo "=== Done! ==="
