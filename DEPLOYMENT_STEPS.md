# Manual Deployment Steps

## Step 1: Install dependencies
```bash
npm install
```

## Step 2: Build the application
```bash
npm run build
```

## Step 3: Test build locally (optional)
```bash
npm start
# Then open http://localhost:5000 to test
```

## Step 4: Deploy to Vercel
```bash
vercel login
vercel
```

## Step 5: Set environment variables
Go to Vercel dashboard > Your Project > Settings > Environment Variables
Add:
- Name: `DATABASE_URL`
- Value: `postgresql://neondb_owner:npg_14HnecjViyzK@ep-calm-leaf-ahuzw0xa-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

## Step 6: Deploy to production
```bash
vercel --prod
```

## If you get errors:

### Error 1: Build fails
```bash
rm -rf node_modules
npm install
npm run build
```

### Error 2: Database connection
Check if DATABASE_URL is set correctly in Vercel dashboard

### Error 3: Function timeout
The functions are set to 30 seconds max duration

### Error 4: Vercel CLI not working
Use Vercel web interface:
1. Go to https://vercel.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist/public`
5. Add environment variables
6. Deploy

## Alternative: GitHub Integration
1. Push code to GitHub
2. Connect Vercel to your GitHub repo
3. Auto-deploy on every push

## Test URLs after deployment:
- Main app: https://your-app.vercel.app
- API test: https://your-app.vercel.app/api/test (if you have API routes)