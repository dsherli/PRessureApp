import { useState } from "react";
import { BellRing, Settings, ShieldCheck, UserRound } from "lucide-react";

export default function Profile() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 text-zinc-100">
            <UserRound className="h-8 w-8" />
          </span>
          <div>
            <h3 className="text-2xl font-semibold text-zinc-50">
              Dillon Sherling
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Training for a 400 lb squat by summer. Current block: Base
              Strength (Week 5 of 8).
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Member since
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              Aug 2024
            </dd>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Preferred units
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              Pounds (lb)
            </dd>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Training split
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              4-day Upper / Lower
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/50 bg-indigo-500/10 text-indigo-200">
              <Settings className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-lg font-semibold text-zinc-50">
                Account details
              </h4>
              <p className="text-sm text-zinc-400">
                Update login information and daytime preferences.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Email
              </span>
              <input
                type="email"
                defaultValue="dillon@example.com"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 focus:border-indigo-400 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Username
              </span>
              <input
                type="text"
                defaultValue="dillonsherling"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 focus:border-indigo-400 focus:outline-none"
              />
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
