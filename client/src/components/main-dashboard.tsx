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
      className="h-full bg-black flex flex-col"
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
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-tight">App Launcher</h1>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Settings className="text-white" size={18} />
            </motion.button>
            <motion.button
              onClick={onLogout}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Power className="text-white" size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* App Grid - 5 columns */}
      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="grid grid-cols-5 gap-5 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              className="rounded-3xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer text-center bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-colors shadow-lg shadow-black/50"
              onClick={(event) => openApp(app.id, app.url, event)}
              data-testid={`app-${app.id}`}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, y: -6 }}
            >
              <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-lg shadow-black/30`}>
                <app.icon className="text-white" size={32} />
              </div>
              <span className="text-sm font-semibold text-white">{app.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="rounded-3xl p-6 w-96 max-h-[80vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">App Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/20"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-3">
                {apps.map((app) => (
                  <motion.div
                    key={app.id}
                    className="bg-white/10 rounded-xl p-3 flex items-center justify-between hover:bg-white/15 cursor-pointer border border-white/10"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEditApp(app)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center shadow-md shadow-black/30`}>
                        <app.icon className="text-white" size={20} />
                      </div>
                      <span className="font-medium text-white">{app.name}</span>
                    </div>
                    <span className="text-xs text-white/60">Edit</span>
                  </motion.div>
                ))}
              </div>
              
              <button
                onClick={handleResetUrls}
                className="w-full mt-6 bg-red-500/20 rounded-xl p-3 text-red-400 hover:bg-red-500/30 font-medium border border-red-500/30"
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setEditingApp(null);
              setTempUrl("");
            }}
          >
            <motion.div
              className="rounded-3xl p-6 w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Edit {editingApp.name}</h2>
                <button
                  onClick={() => {
                    setEditingApp(null);
                    setTempUrl("");
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/20"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70 mb-2 block">App URL</label>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="w-full rounded-xl p-3 bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary outline-none text-white placeholder-white/40 backdrop-blur-xl"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingApp(null);
                      setTempUrl("");
                    }}
                    className="flex-1 bg-white/10 rounded-xl p-3 hover:bg-white/15 border border-white/20 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUrl}
                    className="flex-1 bg-primary rounded-xl p-3 hover:bg-primary/90 font-medium text-white shadow-lg shadow-primary/30"
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
