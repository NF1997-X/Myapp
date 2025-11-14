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
    }, 2500);
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("launcher-authenticated");
    setAppState("password");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence initial={false}>
        {appState === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
          >
            <PasswordScreen onSuccess={handlePasswordSuccess} />
          </motion.div>
        )}

        {appState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
          >
            <LoadingScreen />
          </motion.div>
        )}

        {appState === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0"
          >
            <MainDashboard onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
