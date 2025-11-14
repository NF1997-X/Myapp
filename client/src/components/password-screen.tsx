import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Delete } from "lucide-react";

interface PasswordScreenProps {
  onSuccess: () => void;
}

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const correctPassword = "1997";

  const enterDigit = (digit: string) => {
    if (currentPassword.length < 4) {
      const newPassword = currentPassword + digit;
      setCurrentPassword(newPassword);
      
      if (newPassword.length === 4) {
        setTimeout(() => validatePassword(newPassword), 300);
      }
    }
  };

  const clearPassword = () => {
    if (currentPassword.length > 0) {
      setCurrentPassword(currentPassword.slice(0, -1));
      setShowError(false);
    }
  };

  const validatePassword = (password: string) => {
    if (password === correctPassword) {
      onSuccess();
    } else {
      setShowError(true);
      setCurrentPassword("");
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const renderPasswordDots = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <motion.div
        key={i}
        className={`w-4 h-4 rounded-full transition-all ${
          i < currentPassword.length 
            ? "bg-primary scale-110 ios-shadow-sm" 
            : "bg-muted/30 border-2 border-muted"
        }`}
        animate={{
          scale: i < currentPassword.length ? [1, 1.3, 1.1] : 1,
          opacity: i < currentPassword.length ? 1 : 0.5
        }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />
    ));
  };

  const numberButtons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, "delete"]
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-background h-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center ios-shadow-lg">
          <Lock className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Enter Passcode</h1>
        <p className="text-sm text-muted-foreground">Enter your 4-digit passcode to continue</p>
      </div>

      {/* Password Dots Display */}
      <div className="flex space-x-4 mb-12">
        {renderPasswordDots()}
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {numberButtons.flat().map((button, index) => {
          if (button === null) {
            return <div key={index} className="w-20 h-20" />;
          }
          
          if (button === "delete") {
            return (
              <motion.button
                key={index}
                className="w-20 h-20 rounded-full glass text-foreground text-lg hover:bg-white/10 flex items-center justify-center ios-shadow-sm"
                onClick={clearPassword}
                data-testid="button-delete"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Delete size={24} />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={index}
              className="w-20 h-20 rounded-full glass text-foreground text-xl font-semibold hover:bg-white/10 ios-shadow-sm"
              onClick={() => enterDigit(button.toString())}
              data-testid={`button-digit-${button}`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {button}
            </motion.button>
          );
        })}
      </div>

      {showError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-destructive"
          data-testid="text-error"
        >
          Incorrect passcode. Try again.
        </motion.div>
      )}
    </div>
  );
}
