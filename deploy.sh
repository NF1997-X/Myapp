#!/bin/bash

echo "🚀 Starting deployment process..."

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up database..."
npm run db:push

echo "🏗️ Building application..."
npm run build

echo "✅ Build complete!"

echo "📝 Committing changes..."
git add .
git commit -m "Setup database, build and deploy - $(date)"

echo "🚀 Pushing to repository..."
git push origin main

echo "✅ Deployment complete!"