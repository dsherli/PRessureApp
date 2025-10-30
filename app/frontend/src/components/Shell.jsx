import React from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { BarChart2, Clock4, Dumbbell, User } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: BarChart2,
    description: "High level overview and quick metrics.",
  },
  {
    label: "History",
    to: "/history",
    icon: Clock4,
    description: "Review past sessions and personal records.",
  },
  {
    label: "Profile",
    to: "/profile",
    icon: User,
    description: "Account details and preferences.",
  },
];

export default function Shell() {
  const { pathname } = useLocation();

  const pageTitle =
    navItems.find((item) => pathname.startsWith(item.to))?.label ||
    (pathname.startsWith("/workout") ? "Workout" : "PRessure");

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-72 flex-none border-r border-zinc-800 bg-zinc-950 px-6 py-8 lg:flex lg:flex-col">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
              PRessure
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              Build stronger habits.
            </h1>
            <p className="mt-3 text-sm text-zinc-400">
              Track daily effort, celebrate PRs, and plan the next block with
              ease.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-zinc-800 text-zinc-50 shadow-inner shadow-black/30"
                        : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-50",
                    ].join(" ")
                  }
                >
                  <IconComponent className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-10 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Today's focus
            </p>
            <p className="text-sm text-zinc-300">
              Review your latest lifts, then queue tomorrow’s workout so you hit
              the gym ready.
            </p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400">
              <Dumbbell className="h-4 w-4" />
              Log a workout
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950 px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                PRessure
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
                {pageTitle}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Keep stacking progress—consistency beats intensity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:text-white sm:inline-flex">
                Export progress
              </button>
              <button className="h-11 w-11 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-100 transition-colors hover:border-zinc-500 hover:text-white">
                <User className="mx-auto h-5 w-5" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-zinc-900 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto w-full max-w-6xl pb-24 lg:pb-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 border-t border-zinc-800 bg-zinc-950/95 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-6">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 text-xs font-medium transition-transform",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-100 hover:scale-[1.03]",
                  ].join(" ")
                }
              >
                <span
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition-colors",
                    "bg-zinc-900 text-zinc-300",
                  ].join(" ")}
                >
                  <IconComponent className="h-5 w-5" />
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
