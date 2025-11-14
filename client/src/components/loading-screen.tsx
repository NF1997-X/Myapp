import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center bg-background h-full">
      <div className="text-center">
        <div className="relative mb-8 w-24 h-24 mx-auto">
          {/* Multiple pulse rings */}
          <motion.div
            className="absolute inset-0 bg-primary/30 rounded-full"
            animate={{
              scale: [1, 2.5],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-primary/40 rounded-full"
            animate={{
              scale: [1, 2.2],
              opacity: [0.7, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3
            }}
          />
          <motion.div
            className="absolute inset-0 bg-primary/50 rounded-full"
            animate={{
              scale: [1, 1.8],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.6
            }}
          />
          
          {/* Icon with gradient */}
          <motion.div
            className="relative w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center ios-shadow-lg"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              rotate: 0, 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Rocket className="text-white" size={40} />
          </motion.div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Launching App</h2>
        <p className="text-sm text-muted-foreground mb-6">Please wait while we load your applications</p>
        <motion.div
          className="w-8 h-8 border-3 border-muted/30 border-t-primary rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
