import { motion, AnimatePresence } from "framer-motion";
import { Power, Clock, Route, Map, MessageSquare, Video, FolderOpen, Settings, X, LucideIcon, Home, Image, Download } from "lucide-react";
import { useState, useEffect } from "react";
import BottomNavigation from "./bottom-navigation";

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
  },
  { 
    id: "home", 
    name: "Home", 
    icon: Home, 
    color: "bg-green-500",
    url: "https://example.com"
  },
  { 
    id: "gallery", 
    name: "Gallery", 
    icon: Image, 
    color: "bg-purple-500",
    url: "https://example.com/gallery"
  }
];

export default function MainDashboard({ onLogout }: MainDashboardProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apps, setApps] = useState<App[]>(() => {
    const saved = localStorage.getItem("app-urls");
    const savedOrder = localStorage.getItem("app-order");
    let baseApps = defaultApps;
    
    if (saved) {
      try {
        const savedApps = JSON.parse(saved);
        baseApps = defaultApps.map(defaultApp => {
          const savedApp = savedApps.find((a: any) => a.id === defaultApp.id);
          return savedApp ? { ...defaultApp, url: savedApp.url } : defaultApp;
        });
      } catch (e) {
        baseApps = defaultApps;
      }
    }
    
    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder);
        const orderedApps = order
          .map((id: string) => baseApps.find(app => app.id === id))
          .filter((app: App | undefined): app is App => app !== undefined);
        const newApps = baseApps.filter(app => !order.includes(app.id));
        return [...orderedApps, ...newApps];
      } catch (e) {
        return baseApps;
      }
    }
    return baseApps;
  });
  const [draggedApp, setDraggedApp] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [tempUrl, setTempUrl] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeUrl, setShowChangeUrl] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [urlEditList, setUrlEditList] = useState<{[key: string]: string}>({});

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

  // PWA Installation Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPwaPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    }
    
    setDeferredPrompt(null);
    setShowPwaPrompt(false);
  };

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

  const handleShowChangeUrl = () => {
    // Initialize URL edit list with current URLs
    const currentUrls: {[key: string]: string} = {};
    apps.forEach(app => {
      currentUrls[app.id] = app.url;
    });
    setUrlEditList(currentUrls);
    setShowSettings(false);
    setShowChangeUrl(true);
  };

  const handleSaveAllUrls = () => {
    const updatedApps = apps.map(app => ({
      ...app,
      url: urlEditList[app.id] || app.url
    }));
    setApps(updatedApps);
    localStorage.setItem("app-urls", JSON.stringify(updatedApps.map(a => ({ id: a.id, url: a.url }))));
    setShowChangeUrl(false);
    setUrlEditList({});
  };

  const handleResetUrls = () => {
    setApps(defaultApps);
    localStorage.removeItem("app-urls");
    setShowSettings(false);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    
    // Check current password
    const storedPassword = localStorage.getItem("app-password") || "1234";
    if (currentPassword !== storedPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }
    
    if (!newPassword || newPassword.length !== 4) {
      setPasswordError("New password must be 4 digits");
      return;
    }
    
    if (!/^\d{4}$/.test(newPassword)) {
      setPasswordError("New password must contain only numbers");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    localStorage.setItem("app-password", newPassword);
    setShowChangePassword(false);
    setShowSettings(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    alert("Password changed successfully!");
  };

  const handleDragStart = (appId: string) => {
    setDraggedApp(appId);
  };

  const handleDragOver = (e: React.DragEvent, targetAppId: string) => {
    e.preventDefault();
    if (!draggedApp || draggedApp === targetAppId) return;

    const draggedIndex = apps.findIndex(app => app.id === draggedApp);
    const targetIndex = apps.findIndex(app => app.id === targetAppId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newApps = [...apps];
    const [removed] = newApps.splice(draggedIndex, 1);
    newApps.splice(targetIndex, 0, removed);

    setApps(newApps);
  };

  const handleDragEnd = () => {
    if (draggedApp) {
      const order = apps.map(app => app.id);
      localStorage.setItem("app-order", JSON.stringify(order));
    }
    setDraggedApp(null);
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
      className="h-full bg-black flex flex-col relative overflow-hidden"
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
      {/* Animated Space Background */}
      <div className="absolute inset-0 stars-background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="meteor"></div>
        <div className="meteor meteor-delay-1"></div>
        <div className="meteor meteor-delay-2"></div>
      </div>
      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showPwaPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="px-4 py-3 bg-blue-600/90 backdrop-blur-sm border-b border-blue-500/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download size={20} className="text-white" />
                <div>
                  <p className="text-white font-medium text-sm">Install App</p>
                  <p className="text-blue-100 text-xs">Add to home screen for native experience</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstallPwa}
                  className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={() => setShowPwaPrompt(false)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Grid - 4 columns */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10 pb-32 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {apps.filter(app => !['expired', 'routes', 'mapper'].includes(app.id)).map((app, index) => (
            <motion.div
              key={app.id}
              draggable
              onDragStart={() => handleDragStart(app.id)}
              onDragOver={(e) => handleDragOver(e, app.id)}
              onDragEnd={handleDragEnd}
              className={`rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-move text-center hover:bg-white/10 transition-colors ${
                draggedApp === app.id ? 'opacity-50' : 'opacity-100'
              }`}
              onClick={(event) => {
                if (!draggedApp) {
                  openApp(app.id, app.url, event);
                }
              }}
              data-testid={`app-${app.id}`}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: draggedApp === app.id ? 0.5 : 1, 
                scale: 1 
              }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, y: -6 }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${app.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-black/30`}>
                <app.icon className="text-white" size={24} />
              </div>
              <span className="text-xs sm:text-sm font-semibold !text-white line-clamp-2">{app.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="rounded-3xl p-4 sm:p-6 w-[90vw] sm:w-96 max-h-[80vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">App Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/20"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleShowChangeUrl}
                  className="w-full bg-green-500/20 rounded-xl p-3 text-green-400 hover:bg-green-500/30 font-medium border border-green-500/30 flex items-center justify-center gap-2"
                >
                  <Settings size={16} />
                  Change URLs
                </button>
                
                <button
                  onClick={() => {
                    setShowSettings(false);
                    setShowChangePassword(true);
                  }}
                  className="w-full bg-blue-500/20 rounded-xl p-3 text-blue-400 hover:bg-blue-500/30 font-medium border border-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Power size={16} />
                  Change Password
                </button>
                
                <button
                  onClick={handleResetUrls}
                  className="w-full bg-red-500/20 rounded-xl p-3 text-red-400 hover:bg-red-500/30 font-medium border border-red-500/30 flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Reset All URLs
                </button>
                
                <button
                  onClick={() => {
                    setShowSettings(false);
                    onLogout();
                  }}
                  className="w-full bg-orange-500/20 rounded-xl p-3 text-orange-400 hover:bg-orange-500/30 font-medium border border-orange-500/30 flex items-center justify-center gap-2"
                >
                  <Power size={16} />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change URLs Modal */}
      <AnimatePresence>
        {showChangeUrl && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowChangeUrl(false);
              setUrlEditList({});
            }}
          >
            <motion.div
              className="rounded-3xl p-4 sm:p-6 w-[90vw] sm:w-[500px] max-h-[80vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Change URLs</h2>
                <button
                  onClick={() => {
                    setShowChangeUrl(false);
                    setUrlEditList({});
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/20"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                {apps.map((app) => (
                  <div key={app.id} className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center shadow-md shadow-black/30`}>
                        <app.icon className="text-white" size={20} />
                      </div>
                      <span className="font-medium text-white">{app.name}</span>
                    </div>
                    <input
                      type="text"
                      value={urlEditList[app.id] || app.url}
                      onChange={(e) => setUrlEditList(prev => ({ ...prev, [app.id]: e.target.value }))}
                      className="w-full rounded-xl p-3 bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary outline-none text-white placeholder-white/40 backdrop-blur-xl text-sm"
                      placeholder="https://example.com"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowChangeUrl(false);
                    setUrlEditList({});
                  }}
                  className="flex-1 bg-white/10 rounded-xl p-3 hover:bg-white/15 border border-white/20 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAllUrls}
                  className="flex-1 bg-primary rounded-xl p-3 hover:bg-primary/90 font-medium text-white shadow-lg shadow-primary/30"
                >
                  Save All URLs
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit URL Modal */}
      <AnimatePresence>
        {editingApp && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setEditingApp(null);
              setTempUrl("");
            }}
          >
            <motion.div
              className="rounded-3xl p-4 sm:p-6 w-[90vw] sm:w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Edit {editingApp.name}</h2>
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

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePassword && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowChangePassword(false);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setPasswordError("");
            }}
          >
            <motion.div
              className="rounded-3xl p-4 sm:p-6 w-[90vw] sm:w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Change Password</h2>
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/20"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPasswordError("");
                    }}
                    maxLength={4}
                    className="w-full rounded-xl p-3 bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary outline-none text-white placeholder-white/40 backdrop-blur-xl"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-2 block">New Password (4 digits)</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    maxLength={4}
                    className="w-full rounded-xl p-3 bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary outline-none text-white placeholder-white/40 backdrop-blur-xl"
                    placeholder="Enter 4 digits"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    maxLength={4}
                    className="w-full rounded-xl p-3 bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary outline-none text-white placeholder-white/40 backdrop-blur-xl"
                    placeholder="Confirm new password"
                  />
                </div>
                
                {passwordError && (
                  <p className="text-sm text-red-400">{passwordError}</p>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowChangePassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordError("");
                    }}
                    className="flex-1 bg-white/10 rounded-xl p-3 hover:bg-white/15 border border-white/20 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
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

      {/* Bottom Navigation */}
      <BottomNavigation 
        apps={[
          ...apps.filter(app => ['expired', 'routes', 'mapper'].includes(app.id)),
          {
            id: "settings",
            name: "Settings",
            icon: Settings,
            color: "bg-blue-600",
            url: "#settings"
          }
        ]}
        onAppClick={(appId, url) => {
          if (appId === "settings") {
            setShowSettings(true);
          } else {
            openApp(appId, url);
          }
        }}
      />
    </motion.div>
  );
}
