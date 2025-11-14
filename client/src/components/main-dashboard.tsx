import { motion, AnimatePresence } from "framer-motion";
import { Power, Clock, Route, Map, MessageSquare, Video, FolderOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface MainDashboardProps {
  onLogout: () => void;
}

const apps = [
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [trackX, setTrackX] = useState(0);
  
  // Split apps into pages (4 apps per page)
  const appsPerPage = 4;
  const totalPages = Math.ceil(apps.length / appsPerPage);
  const pageWidth = 340; // Optimized width for layout
  
  // Split apps into pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    apps.slice(pageIndex * appsPerPage, (pageIndex + 1) * appsPerPage)
  );

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

  // Animate to specific page
  const animateToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setTrackX(-pageWidth * pageIndex);
  };

  // Handle drag end with velocity-based snapping
  const handleDragEnd = (event: any, info: any) => {
    const velocity = info.velocity.x;
    const distance = info.offset.x;
    
    let newPage = currentPage;
    
    // Velocity-based snapping
    if (Math.abs(velocity) > 800) {
      newPage = velocity > 0 ? Math.max(0, currentPage - 1) : Math.min(totalPages - 1, currentPage + 1);
    } 
    // Distance-based snapping
    else if (Math.abs(distance) > pageWidth / 4) {
      newPage = distance > 0 ? Math.max(0, currentPage - 1) : Math.min(totalPages - 1, currentPage + 1);
    }
    
    animateToPage(newPage);
    
    // Keep isDragging true for a short period to prevent accidental clicks
    dragTimeoutRef.current = setTimeout(() => {
      setIsDragging(false);
      isDraggingRef.current = false;
    }, 300);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    isDraggingRef.current = true;
    
    // Clear any existing timeout
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
  };

  const openApp = (appId: string, url: string, event?: React.MouseEvent) => {
    // Always prevent event propagation first
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Prevent app launch during drag - check both state and ref
    if (isDragging || isDraggingRef.current) {
      return;
    }
    
    setIsZooming(true);
    
    // Add zoom-in animation delay before navigation
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  };

  // Update track position when currentPage changes
  useEffect(() => {
    setTrackX(-pageWidth * currentPage);
  }, [currentPage, pageWidth]);

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
            <Power className="text-muted-foreground" size={16} />
          </motion.button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className="p-6 mt-12 overflow-hidden">
        <div className="relative" style={{ width: pageWidth, margin: '0 auto' }}>
          <motion.div
            className="flex"
            style={{ 
              width: pageWidth * totalPages,
              touchAction: 'pan-y'
            }}
            animate={{ x: trackX }}
            drag="x"
            dragConstraints={{
              left: -(pageWidth * (totalPages - 1)),
              right: 0
            }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-testid="carousel-track"
          >
            {pages.map((pageApps, pageIndex) => (
              <div
                key={pageIndex}
                className="grid grid-cols-2 gap-4"
                style={{ width: pageWidth, flexShrink: 0 }}
                data-testid={`page-${pageIndex}`}
              >
                {pageApps.map((app, appIndex) => (
                  <motion.div
                    key={app.id}
                    className="app-icon rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center"
                    onClick={(event) => openApp(app.id, app.url, event)}
                    data-testid={`app-${app.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (pageIndex * appsPerPage + appIndex) * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98, y: -2 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    style={{ 
                      pointerEvents: (isDragging || isDraggingRef.current) ? 'none' : 'auto',
                      opacity: (isDragging || isDraggingRef.current) ? 0.6 : 1
                    }}
                  >
                    <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center`}>
                      <app.icon className="text-white" size={28} />
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{app.name}</span>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer with functional pagination */}
      {totalPages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === index ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => animateToPage(index)}
                data-testid={`pagination-${index}`}
                whileTap={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
