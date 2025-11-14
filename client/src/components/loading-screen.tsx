import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center bg-background h-full">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto">
            <motion.div
              className="absolute inset-0 bg-primary rounded-full pulse-ring"
              animate={{
                scale: [0.33, 2.33],
                opacity: [1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1]
              }}
            />
            <motion.div
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center rotate-in"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Rocket className="text-primary-foreground" size={24} />
            </motion.div>
          </div>
        </div>
        <h2 className="text-lg font-medium text-foreground mb-2">Launching App</h2>
        <p className="text-sm text-muted-foreground mb-4">Please wait while we load your applications</p>
        <motion.div
          className="loading-spinner w-6 h-6 border-2 border-muted border-t-primary rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
