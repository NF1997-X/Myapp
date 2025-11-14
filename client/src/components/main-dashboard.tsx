import { motion, AnimatePresence } from "framer-motion";
import { Power, Clock, Route, Map, MessageSquare, Video, FolderOpen, Settings, X, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface MainDashboardProps {
  onLogout: () => void;
}

interface App {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  url: string;
}

const defaultApps: App[] = [
  { 
    id: "expired", 
    name: "Expired", 
    icon: Clock, 
    color: "bg-destructive",
    url: "https://monitor-expired-faizzz7348.replit.app"
  },
  { 
    id: "routes", 
    name: "Routes", 
    icon: Route, 
    color: "bg-chart-1",
    url: "https://routes-vm-Faizzz7348.replit.app"
  },
  { 
    id: "mapper", 
    name: "Mapper", 
    icon: Map, 
    color: "bg-chart-2",
    url: "https://routes-map-Faizzz7348.replit.app"
  },
  { 
    id: "sms", 
    name: "SMS", 
    icon: MessageSquare, 
    color: "bg-chart-3",
    url: "https://sms-gateway-Faizzz7348.replit.app"
  },
  { 
    id: "video", 
    name: "Video", 
    icon: Video, 
    color: "bg-chart-4",
    url: "https://video-linker-faizzz7348.replit.app"
  },
  { 
    id: "file-share", 
    name: "File Share", 
    icon: FolderOpen, 
    color: "bg-chart-5",
    url: "https://file-share-Faizzz7348.replit.app"
  }
];

export default function MainDashboard({ onLogout }: MainDashboardProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apps, setApps] = useState<App[]>(() => {
    const saved = localStorage.getItem("app-urls");
    if (saved) {
      try {
        const savedApps = JSON.parse(saved);
        return defaultApps.map(defaultApp => {
          const savedApp = savedApps.find((a: any) => a.id === defaultApp.id);
          return savedApp ? { ...defaultApp, url: savedApp.url } : defaultApp;
        });
      } catch (e) {
        return defaultApps;
      }
    }
    return defaultApps;
  });
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [tempUrl, setTempUrl] = useState("");

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isZooming) {
        // User returned to the page, trigger zoom-out (scale back to normal)
        setIsReturning(true);
        setIsZooming(false);
        
        // Reset returning state after animation
        setTimeout(() => {
          setIsReturning(false);
        }, 400);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isZooming]);

  const handleSaveUrl = () => {
    if (editingApp && tempUrl) {
      const updatedApps = apps.map(app => 
        app.id === editingApp.id ? { ...app, url: tempUrl } : app
      );
      setApps(updatedApps);
      localStorage.setItem("app-urls", JSON.stringify(updatedApps.map(a => ({ id: a.id, url: a.url }))));
      setEditingApp(null);
      setTempUrl("");
    }
  };

  const handleEditApp = (app: App) => {
    setEditingApp(app);
    setTempUrl(app.url);
  };

  const handleResetUrls = () => {
    setApps(defaultApps);
    localStorage.removeItem("app-urls");
    setShowSettings(false);
  };

  const openApp = (appId: string, url: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setIsZooming(true);
    
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  };

  return (
    <motion.div 
      className="h-full bg-background"
      initial={{ scale: 1, opacity: 1 }}
      animate={
        isZooming 
          ? { scale: 1.2, opacity: 0 } 
          : isReturning 
          ? { scale: 1, opacity: 1 } 
          : { scale: 1, opacity: 1 }
      }
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-foreground">Multi-App Launcher</h1>
          <motion.button
            className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center"
            onClick={onLogout}
            data-testid="button-logout"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.button
              onClick={() => setShowSettings(true)}
              className="glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Settings className="text-muted-foreground" size={16} />
            </motion.button>
            <motion.button
              onClick={onLogout}
              className="glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Power className="text-muted-foreground" size={16} />
            </motion.button>
        </div>
      </div>

      {/* App Grid - 5 columns */}
      <div className="p-6 mt-12">
        <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              className="app-icon rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center"
              onClick={(event) => openApp(app.id, app.url, event)}
              data-testid={`app-${app.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center ios-shadow-sm`}>
                <app.icon className="text-white" size={28} />
              </div>
              <span className="text-sm font-medium text-card-foreground">{app.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="glass rounded-3xl p-6 w-96 max-h-[80vh] overflow-y-auto ios-shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">App Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-3">
                {apps.map((app) => (
                  <motion.div
                    key={app.id}
                    className="glass rounded-xl p-3 flex items-center justify-between hover:bg-white/10 cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEditApp(app)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center`}>
                        <app.icon className="text-white" size={20} />
                      </div>
                      <span className="font-medium">{app.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Edit</span>
                  </motion.div>
                ))}
              </div>
              
              <button
                onClick={handleResetUrls}
                className="w-full mt-6 glass rounded-xl p-3 text-red-500 hover:bg-red-500/10 font-medium"
              >
                Reset All URLs
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit URL Modal */}
      <AnimatePresence>
        {editingApp && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setEditingApp(null);
              setTempUrl("");
            }}
          >
            <motion.div
              className="glass rounded-3xl p-6 w-96 ios-shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Edit {editingApp.name}</h2>
                <button
                  onClick={() => {
                    setEditingApp(null);
                    setTempUrl("");
                  }}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">App URL</label>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="w-full glass rounded-xl p-3 bg-white/5 border-none focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingApp(null);
                      setTempUrl("");
                    }}
                    className="flex-1 glass rounded-xl p-3 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUrl}
                    className="flex-1 bg-primary rounded-xl p-3 hover:bg-primary/90 font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
