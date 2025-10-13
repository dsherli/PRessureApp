import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export default function Register() {
  const [name, setName] = useState("");
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
    name.trim() &&
    email.trim() &&
    dob &&
    password &&
    passwordConfirmation &&
    passwordsMatch;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API}/users/auth/register/`, {
        username: name,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Let's work.
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update state
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="DOB"
              value={dob}
              onChange={(e) => setDob(e.target.value)} // update state
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
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            <p className="text-sm text-rose-400 bg-rose-900/40 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 transition-colors"
            disabled={!formValid}
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
