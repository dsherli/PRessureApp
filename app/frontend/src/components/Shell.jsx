import React from "react";
import { Outlet } from "react-router-dom";
import { Dumbbell, User, BarChart2 } from "lucide-react";

export default function Shell({ children }) {
  return (
    <div
      className="flex h-screen flex-col"
      style={{ backgroundColor: "#18181b" }}
    >
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#18181b", borderColor: "#27272a" }}
      >
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#f5f5f5" }}
        >
          PRessure
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: "#27272a", color: "#f5f5f5" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </header>
      <main
        className="flex-1 overflow-auto p-8"
        style={{ backgroundColor: "#18181b" }}
      >
        <Outlet />
      </main>
      <nav
        className="border-t flex items-center justify-around px-4 py-3"
        style={{ backgroundColor: "#09090b", borderColor: "#27272a" }}
      >
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#27272a", color: "#f5f5f5" }}
          >
            <BarChart2 className="w-6 h-6 text-zinc-100" />
          </div>
          <span className="text-xs" style={{ color: "#71717a" }}>
            Stats
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#27272a", color: "#f5f5f5" }}
          >
            <Dumbbell className="w-6 h-6 text-zinc-100" />
          </div>
          <span className="text-xs" style={{ color: "#71717a" }}>
            Workout
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#27272a", color: "#f5f5f5" }}
          >
            <User className="w-6 h-6 text-zinc-100" />
          </div>
          <span className="text-xs" style={{ color: "#71717a" }}>
            Profile
          </span>
        </button>
      </nav>
    </div>
  );
}
