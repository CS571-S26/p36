import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { registerUser } from "../../api/auth";

function SignupForm({ toLogin, onClose, redirectOnAuth = true }: {
  toLogin: () => void;
  onClose: () => void;
  redirectOnAuth?: boolean;
}) {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const pwConfirmRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const pwConfirm = pwConfirmRef.current?.value;

    if (!username || !email || !password || !pwConfirm) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email!)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 7) {
      setError("Your password should be at least 7 characters long.");
      return;
    }

    if (password !== pwConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await registerUser(username, email, password);
      setError("");
      login(data.username, data.token);
      onClose();
      if (redirectOnAuth) navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  }

  return (
    <div className="text-gray-700">
      <h2 className="text-xl font-medium mb-8 text-center">Create your CompShare Account</h2>

      <div className="mb-4">
        <input ref={usernameRef} id="username"
          placeholder="Username"
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-4">
        <input ref={emailRef} id="email" type="email" placeholder="Email" 
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-4">
        <input ref={passwordRef} id="password" type="password" placeholder="Password" 
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-10">
        <input ref={pwConfirmRef} id="confirmPassword" type="password" placeholder="Confirm Password" 
          onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center font-light">
          {error}
        </p>
      )}

      <button onClick={handleSignup}
        className="block w-full text-center font-medium bg-sky-600 text-white rounded-4xl py-2 hover:bg-sky-700 transition mb-4 hover:cursor-pointer"
      >
        Sign up
      </button>
      
      <p className="text-center text-sm font-light">
        Already have an account?{" "}
        <button
          type="button"
          onClick={toLogin}
          className="text-sky-600 font-medium hover:cursor-pointer hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}
export default SignupForm;
