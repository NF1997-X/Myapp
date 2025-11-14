#!/bin/bash

echo "🚀 Starting Vercel deployment..."

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up database..."
npm run db:push

echo "🏗️ Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "✅ Build successful!"

echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed. Trying regular deployment..."
    vercel
fi

echo "📋 Deployment completed!"

# Instructions for manual environment setup
echo ""
echo "📝 IMPORTANT: Set environment variable in Vercel dashboard:"
echo "   Variable: DATABASE_URL"
echo "   Value: postgresql://neondb_owner:npg_14HnecjViyzK@ep-calm-leaf-ahuzw0xa-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
echo ""
echo "🌐 Then redeploy with: vercel --prod"