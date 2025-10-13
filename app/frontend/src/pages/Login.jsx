import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Welcome back
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 transition-colors"
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
