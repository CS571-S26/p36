import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type LoginFormProps = {
  toLogin: () => void;
};

function SignupForm({ toLogin }: LoginFormProps) {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const pwConfirmRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const [error, setError] = useState("");

  function handleSignup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const pwConfirm = pwConfirmRef.current?.value;

    if (!username || !password || !pwConfirm) {
      setError("Please fill out all fields.");
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

    // POST request

    setError("");
    login(username); // logs in after signup
    navigate("/");
  }

  return (
    <div className="text-gray-700">
      <h2 className="text-2xl font-medium mb-8 text-center">Create your <br/> CompShare Account</h2>

      <div className="mb-4">
        <input id="username" ref={usernameRef}
          placeholder="Username"
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-4">
        <input id="password" type="password" placeholder="Password" ref={passwordRef}
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-10">
        <input id="confirmPassword" type="password" placeholder="Confirm Password" ref={pwConfirmRef}
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center font-light">
          {error}
        </p>
      )}

      <button onClick={handleSignup}
        className="block w-full text-center font-medium bg-sky-600 text-white rounded-4xl py-2 hover:bg-sky-700 transition mb-4"
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