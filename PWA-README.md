# 🚀 Multi-App Launcher PWA

A beautiful iOS-style app launcher that works as a Progressive Web App (PWA) for a native app experience.

## ✨ PWA Features

### 📱 Install as Native App
- **Add to Home Screen**: Install the app on your device's home screen
- **Standalone Mode**: Runs without browser chrome for true native feel
- **Offline Support**: Basic functionality works even without internet
- **Background Sync**: Automatically syncs when connection is restored

### 🎯 Installation Process

#### On Mobile (iOS/Android):
1. Open the app in Safari (iOS) or Chrome (Android)
2. Look for the "Install" prompt at the top of the screen
3. Or tap the Share button → "Add to Home Screen"
4. The app will appear on your home screen like any other app

#### On Desktop (Chrome/Edge):
1. Look for the install icon in the address bar
2. Or use the "Install" prompt that appears
3. The app will be added to your applications folder

## 🔧 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm run deploy
```

## 📦 PWA Configuration

### Manifest (`/client/public/manifest.json`)
- App name, description, and branding
- Icon configurations for all device sizes
- Display mode (standalone for native feel)
- Theme colors and orientation preferences

### Service Worker (`/client/public/sw.js`)
- Offline functionality and caching
- Background sync capabilities
- Push notification support (future)

### Icon Sizes Included
- 72x72, 96x96, 128x128, 144x144, 152x152
- 180x180 (Apple Touch Icon)
- 192x192, 384x384, 512x512

## 🎨 Customizing Icons

1. Create a 512x512 master icon in your design tool
2. Use online PWA icon generators to create all sizes:
   - [PWA Builder](https://www.pwabuilder.com/)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Replace the placeholder icons in `/client/public/`

## 🌟 Features

### App Management
- **Password Protection**: Secure access with 4-digit PIN
- **URL Editing**: Customize app URLs individually or in bulk
- **Persistent Storage**: Settings saved locally and persist across sessions
- **Responsive Design**: Works on all screen sizes

### iOS-Style Interface
- **Black Glass Design**: Premium iOS-inspired interface
- **Smooth Animations**: Framer Motion powered transitions
- **Touch Optimized**: Perfect for mobile and touch devices
- **Apple-like Icons**: Rounded corners and consistent styling

## 🔐 Security Features

- Local password storage
- Client-side data persistence
- No data transmitted to servers (except app URLs for external services)

## 🛠 Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Web App Manifest + Service Worker
- **Backend**: Express.js (for API endpoints)
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Deployment**: Vercel

## 📱 Browser Support

### PWA Installation Support:
- ✅ Chrome (Android/Desktop)
- ✅ Safari (iOS 11.3+)
- ✅ Edge (Desktop)
- ✅ Samsung Internet
- ✅ Firefox (limited)

### Core Functionality:
- ✅ All modern browsers
- ✅ iOS Safari 10+
- ✅ Android Chrome 60+

## 🚀 Deployment

The app is configured for Vercel deployment with:
- Serverless functions for backend API
- Static file serving for frontend
- Environment variable support
- Automatic PWA optimization

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for a native app experience on the web**