import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  url: string;
}

interface BottomNavigationProps {
  apps: NavigationItem[];
  activeTab?: string;
  onAppClick?: (appId: string, url: string) => void;
}

export default function BottomNavigation({ 
  apps,
  activeTab = "", 
  onAppClick 
}: BottomNavigationProps) {
  const [active, setActive] = useState(activeTab);

  const handleAppClick = (id: string, url: string) => {
    setActive(id);
    onAppClick?.(id, url);
  };

  // Function to convert Tailwind color classes to hex
  const getColorFromClass = (colorClass: string): string => {
    const colorMap: { [key: string]: string } = {
      'bg-destructive': '#FF3B30',
      'bg-chart-1': '#007AFF',
      'bg-chart-2': '#34C759',
      'bg-chart-3': '#FF9500',
      'bg-chart-4': '#5AC8FA',
      'bg-chart-5': '#FF2D55',
      'bg-green-500': '#10B981',
      'bg-purple-500': '#A855F7',
      'bg-blue-600': '#2563EB',
    };
    return colorMap[colorClass] || '#007AFF';
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* iPhone-style navigation bar */}
      <div className="mx-auto max-w-7xl px-2 pb-safe">
        <div className="relative mb-2">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-[24px] border border-white/20 shadow-2xl" />
          
          {/* Navigation items - Centered */}
          <div className="relative flex items-center justify-center gap-1 px-2 py-2">
            {apps.map((app) => {
              const Icon = app.icon;
              const isActive = active === app.id;
              const hexColor = getColorFromClass(app.color);
              
              return (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id, app.url)}
                  className="relative flex flex-col items-center justify-center p-2 flex-shrink-0 transition-transform active:scale-95"
                >
                  {/* Active indicator background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-[16px]"
                      style={{ backgroundColor: hexColor + "20" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Icon with background */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="relative z-10"
                  >
                    <div 
                      className="w-14 h-14 rounded-[18px] flex items-center justify-center shadow-lg"
                      style={{ 
                        backgroundColor: hexColor,
                        boxShadow: isActive ? `0 4px 12px ${hexColor}40` : '0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Icon
                        size={26}
                        strokeWidth={2}
                        className="text-white"
                      />
                    </div>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* iPhone home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
