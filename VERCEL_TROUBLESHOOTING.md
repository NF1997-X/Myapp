# Vercel Deployment Troubleshooting Guide

## Common Deployment Issues & Solutions

### 1. Build Errors
If you get build errors, try:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build
```

### 2. Environment Variables
Make sure to set these in Vercel dashboard:
- Go to your project settings
- Add environment variable:
  - Name: `DATABASE_URL`
  - Value: `postgresql://neondb_owner:npg_14HnecjViyzK@ep-calm-leaf-ahuzw0xa-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

### 3. Manual Deployment Steps

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy (first time):**
   ```bash
   vercel
   ```

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### 4. Alternative Deployment via GitHub

1. Connect your repository to Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Set build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist/public`
   - Add environment variables

### 5. If Vercel CLI Fails

Try the web interface:
1. Go to https://vercel.com/dashboard
2. Click "New Project" 
3. Connect your GitHub repo
4. Configure build settings
5. Set environment variables
6. Deploy

### 6. Debug Commands

```bash
# Check Vercel version
vercel --version

# Check build locally
npm run build

# Check if files are created
ls -la dist/

# Test production locally
npm start
```

### 7. Vercel Configuration Issues

If deployment fails, check `vercel.json`:
- Make sure paths are correct
- Verify build commands
- Check function configuration

### 8. Database Connection Issues

Ensure database URL is correct and accessible:
```bash
# Test database connection
npm run db:push
```

## Current Project Structure
```
dist/
  public/     (Frontend files)
  index.js    (Server bundle)
vercel.json   (Deployment config)
package.json  (Build scripts)
```

## Working vercel.json Configuration
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "functions": {
    "dist/index.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/dist/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```