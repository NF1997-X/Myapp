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
        className={`password-dot w-4 h-4 rounded-full border-2 border-muted ${
          i < currentPassword.length ? "filled bg-primary" : "bg-transparent"
        }`}
        animate={{
          scale: i < currentPassword.length ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
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
        <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
          <Lock className="text-primary-foreground" size={24} />
        </div>
        <h1 className="text-lg font-medium text-foreground mb-2">Enter Passcode</h1>
        <p className="text-sm text-muted-foreground">Enter your 4-digit passcode to continue</p>
      </div>

      {/* Password Dots Display */}
      <div className="flex space-x-4 mb-8">
        {renderPasswordDots()}
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {numberButtons.flat().map((button, index) => {
          if (button === null) {
            return <div key={index} className="w-16 h-16" />;
          }
          
          if (button === "delete") {
            return (
              <motion.button
                key={index}
                className="number-btn w-16 h-16 rounded-full bg-card border border-border text-card-foreground text-lg hover:bg-accent flex items-center justify-center"
                onClick={clearPassword}
                data-testid="button-delete"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Delete size={20} />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={index}
              className="number-btn w-16 h-16 rounded-full bg-card border border-border text-card-foreground text-lg font-medium hover:bg-accent"
              onClick={() => enterDigit(button.toString())}
              data-testid={`button-digit-${button}`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
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
