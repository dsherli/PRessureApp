import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formValid = username.trim() && password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API}/users/auth/login/`, {
        username,
        password,
      });
      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError("Something went wrong, try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Welcome back
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Username
            </label>
            <input
              type="username"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // update state
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 transition-colors"
            disabled={!formValid}
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-300 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
