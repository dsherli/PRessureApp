import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const formValid = username.trim() && password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API}/users/auth/login/`, {
        username,
        password,
      });
      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong, try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#18181b" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl border"
        style={{ backgroundColor: "#09090b", borderColor: "#27272a" }}
      >
        <h1
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#f5f5f5" }}
        >
          Welcome back
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#f5f5f5" }}>
              Username
            </label>
            <input
              type="text"
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border"
              style={{
                backgroundColor: "#27272a",
                color: "#f5f5f5",
                borderColor: "#27272a",
              }}
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage("");
              }} // update state
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#f5f5f5" }}>
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border"
              style={{
                backgroundColor: "#27272a",
                color: "#f5f5f5",
                borderColor: "#27272a",
              }}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }} // update state
            />
          </div>
          {errorMessage && (
            <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg font-semibold py-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#f5f5f5", color: "#18181b" }}
            disabled={!formValid}
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-center" style={{ color: "#f5f5f5" }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline hover:opacity-80"
            style={{ color: "#f5f5f5" }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
