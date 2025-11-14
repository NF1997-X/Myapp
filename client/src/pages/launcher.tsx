import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordScreen from "@/components/password-screen";
import LoadingScreen from "@/components/loading-screen";
import MainDashboard from "@/components/main-dashboard";

type AppState = "password" | "loading" | "dashboard";

export default function Launcher() {
  // Check if user is already authenticated
  const [appState, setAppState] = useState<AppState>(() => {
    const isAuthenticated = localStorage.getItem("launcher-authenticated");
    return isAuthenticated === "true" ? "dashboard" : "password";
  });
  

  const handlePasswordSuccess = () => {
    // Save authentication state
    localStorage.setItem("launcher-authenticated", "true");
    setAppState("loading");
    setTimeout(() => {
      setAppState("dashboard");
    }, 2000);
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("launcher-authenticated");
    setAppState("password");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0"
          >
            <PasswordScreen onSuccess={handlePasswordSuccess} />
          </motion.div>
        )}

        {appState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0"
          >
            <LoadingScreen />
          </motion.div>
        )}

        {appState === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0"
          >
            <MainDashboard onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
