import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const passwordsMatch =
    password.length > 0 &&
    passwordConfirmation.length > 0 &&
    password === passwordConfirmation;

  const formValid =
    username.trim() &&
    email.trim() &&
    dob &&
    password &&
    passwordConfirmation &&
    passwordsMatch;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API}/users/auth/register/`, {
        username,
        email,
        password,
      });
      alert("Registration successful!");
      navigate("/login", { replace: true });
    } catch (error) {
      setError("Something went wrong, try again later");
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
          Let's work.
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
              onChange={(e) => setUsername(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#f5f5f5" }}>
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border"
              style={{
                backgroundColor: "#27272a",
                color: "#f5f5f5",
                borderColor: "#27272a",
              }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#f5f5f5" }}>
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border"
              style={{
                backgroundColor: "#27272a",
                color: "#f5f5f5",
                borderColor: "#27272a",
              }}
              placeholder="DOB"
              value={dob}
              onChange={(e) => setDob(e.target.value)} // update state
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
              onChange={(e) => setPassword(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "#f5f5f5" }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border"
              style={{
                backgroundColor: "#27272a",
                color: "#f5f5f5",
                borderColor: "#27272a",
              }}
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)} // update state
            />
            {passwordConfirmation && !passwordsMatch && (
              <p className="mt-1 text-sm text-rose-300">
                Passwords do not match.
              </p>
            )}
          </div>

          {error && (
            <p
              className="text-sm rounded-md px-3 py-2"
              style={{ backgroundColor: "#2a1b1e", color: "#fca5a5" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg font-semibold py-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#f5f5f5", color: "#18181b" }}
            disabled={!formValid}
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-center" style={{ color: "#f5f5f5" }}>
          Already have an account{" "}
          <Link
            to="/login"
            className="underline hover:opacity-80"
            style={{ color: "#f5f5f5" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
