import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

type LoginFormProps = {
  toSignUp: () => void;
};

function LoginForm({ toSignUp }: LoginFormProps) {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // User doesn't enter username or pin
    if (!username || !password) {
        setError("Please fill out all fields.");
        return;
    }

    // TODO: make POST request using fetch

    setError("");
    login(username); // sets the user in context
    navigate("/");
  };

  return (
    <div className="text-gray-700">
      <h2 className="text-2xl font-medium mb-8 w-full text-center">Log in to your CompShare Account</h2>

      <div className="mb-4">
        <input id="username" placeholder="Username"
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>
      <div className="mb-10">
        <input id="password" type="password" placeholder="Password"
          className="shadow border border-gray-300 rounded-xl w-full py-2 px-3 font-light placeholder:font-light"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center font-light">
          {error}
        </p>
      )}

      <button onClick={handleLogin}
        className="block w-full text-center font-medium bg-sky-600 text-white rounded-4xl py-2 hover:bg-sky-700 transition mb-4"
      >
        Log in
      </button>
      
      <p className="text-center text-sm font-light">
        New to CompShare?{" "}
        <button
          type="button"
          onClick={toSignUp}
          className="text-sky-600 font-medium hover:cursor-pointer hover:underline"
        >
          Sign up
        </button>
      </p>
      

    </div>
  );
}
export default LoginForm;