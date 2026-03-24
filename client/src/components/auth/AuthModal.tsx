import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm"

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState("login");

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-10 w-115"
        onClick={(e) => e.stopPropagation()}
      >

        {mode === "login" ? (
          <LoginForm toSignUp={() => setMode("signup")} />
        ) : (
          <SignupForm toLogin={() => setMode("login")} />
        )}

      </div>
    </div>
  );
}

export default AuthModal;