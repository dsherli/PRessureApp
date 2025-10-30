import { CalendarDays, LineChart, Trophy } from "lucide-react";

const historyEntries = [
  {
    date: "Mon • Feb 17",
    session: "Upper Pull Hypertrophy",
    duration: "54 min",
    volume: "18,240 lb",
    highlight: "Weighted pull-up triple felt strong.",
  },
  {
    date: "Wed • Feb 19",
    session: "Lower Strength",
    duration: "62 min",
    volume: "25,180 lb",
    highlight: "Squat paused doubles @ 260 lb — smooth bar speed.",
  },
  {
    date: "Fri • Feb 21",
    session: "Full Body Power",
    duration: "48 min",
    volume: "16,420 lb",
    highlight: "Hang clean PR at 205 lb.",
  },
];

export default function History() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-zinc-800 bg-zinc-900/70 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Training block overview
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-zinc-50">
              Session history
            </h3>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:text-white">
            <CalendarDays className="h-4 w-4" />
            Filter by date
          </button>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Review previous workouts, track how volume and intensity evolved, and
          spot the sessions that moved the needle.
        </p>
      </header>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-lg font-semibold text-zinc-50">
            Last seven sessions
          </h4>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400">
            <LineChart className="h-4 w-4" />
            View block analytics
          </button>
        </header>
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800">
          <table className="min-w-full divide-y divide-zinc-800 text-sm">
            <thead className="bg-zinc-900/60 text-xs uppercase tracking-[0.25em] text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Session</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Volume</th>
                <th className="px-4 py-3 text-left">Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              {historyEntries.map(
                ({ date, session, duration, volume, highlight }) => (
                  <tr key={session}>
                    <td className="px-4 py-4 text-zinc-400">{date}</td>
                    <td className="px-4 py-4 font-medium text-zinc-50">
                      {session}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">{duration}</td>
                    <td className="px-4 py-4 text-zinc-300">{volume}</td>
                    <td className="px-4 py-4 text-zinc-400">{highlight}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
        <header className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/10 text-amber-300">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h4 className="text-lg font-semibold text-zinc-50">
              Most impactful sessions
            </h4>
            <p className="text-sm text-zinc-400">
              These workouts produced the biggest jumps in performance metrics.
            </p>
          </div>
        </header>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {historyEntries.map(({ session, highlight, duration }) => (
            <article
              key={`${session}-highlight`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {duration}
              </p>
              <p className="mt-2 text-base font-semibold text-zinc-50">
                {session}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{highlight}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
