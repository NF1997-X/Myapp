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
        className={`w-5 h-5 rounded-full ${
          i < currentPassword.length 
            ? "bg-primary shadow-lg shadow-primary/50" 
            : "bg-white/10 backdrop-blur-xl border-2 border-white/30"
        }`}
        initial={false}
        animate={{
          scale: i < currentPassword.length ? 1 : 1,
          opacity: i < currentPassword.length ? 1 : 0.6
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
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
    <div className="flex flex-col items-center justify-center bg-black h-full">
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary via-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
          <Lock className="text-white" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Enter Passcode</h1>
        <p className="text-base text-white/60">Enter your 4-digit passcode to continue</p>
      </div>

      {/* Password Dots Display */}
      <div className="flex space-x-5 mb-16">
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
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl text-white text-lg hover:bg-white/20 flex items-center justify-center border border-white/20 shadow-lg shadow-black/30"
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
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl text-white text-xl font-semibold hover:bg-white/20 border border-white/20 shadow-lg shadow-black/30"
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
          className="text-sm text-red-400"
          data-testid="text-error"
        >
          Incorrect passcode. Try again.
        </motion.div>
      )}
    </div>
  );
}
