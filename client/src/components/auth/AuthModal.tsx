import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm"

function AuthModal({ open, onClose, redirectOnAuth = true }: {
  open: boolean;
  onClose: () => void;
  redirectOnAuth?: boolean;
}) {
  const [mode, setMode] = useState("login");

  useEffect(() => {
    if (!open) setMode("login");
  }, [open]);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-10 w-115"
        onClick={(e) => e.stopPropagation()}
      >

        {mode === "login" ? (
          <LoginForm
            toSignUp={() => setMode("signup")}
            onClose={onClose}
            redirectOnAuth={redirectOnAuth}
          />
        ) : (
          <SignupForm
            toLogin={() => setMode("login")}
            onClose={onClose}
            redirectOnAuth={redirectOnAuth}
          />
        )}

      </div>
    </div>
  );
}

export default AuthModal;
