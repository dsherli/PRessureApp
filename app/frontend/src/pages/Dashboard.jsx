import {
  Activity,
  CalendarClock,
  Flame,
  Trophy,
  TrendingUp,
} from "lucide-react";

const metricCards = [
  {
    title: "Weekly Volume",
    value: "42,150 lb",
    change: "+6.2% vs last week",
    icon: Activity,
    accent: "from-indigo-500/20 to-indigo-500/0 text-indigo-300",
  },
  {
    title: "Sessions Logged",
    value: "5",
    change: "+2 completed",
    icon: CalendarClock,
    accent: "from-emerald-500/20 to-emerald-500/0 text-emerald-300",
  },
  {
    title: "Calories Burned",
    value: "3,420 kcal",
    change: "-140 kcal recovery day",
    icon: Flame,
    accent: "from-amber-500/20 to-amber-500/0 text-amber-300",
  },
];

const progressHighlights = [
  {
    lift: "Back Squat",
    improvement: "+15 lb since last block",
    details: "New training max: 285 lb • RPE 8",
  },
  {
    lift: "Bench Press",
    improvement: "+5 lb this week",
    details: "Paused triples felt smooth • RPE 7.5",
  },
  {
    lift: "Deadlift",
    improvement: "Holding steady",
    details: "Focus on speed pulls and bracing mechanics",
  },
];

const upcomingSessions = [
  {
    day: "Tomorrow",
    focus: "Upper Push Power",
    sets: "5 exercises • 18 working sets",
    notes: "Open with speed bench, finish with tri accessory circuit.",
  },
  {
    day: "Saturday",
    focus: "Lower Strength",
    sets: "4 lifts • 15 working sets",
    notes: "Heavy singles on squat then posterior chain work.",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        {metricCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl shadow-black/10 transition-all hover:border-zinc-700 hover:shadow-black/30"
            >
              <div
                className={[
                  "mb-4 inline-flex items-center justify-center rounded-2xl border border-zinc-800 bg-gradient-to-br px-3 py-2 text-sm font-semibold",
                  card.accent,
                ].join(" ")}
              >
                <IconComponent className="mr-2 h-4 w-4" />
                {card.title}
              </div>
              <p className="text-3xl font-semibold text-zinc-50">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{card.change}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 lg:col-span-2">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-50">
              Block Progress
            </h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <TrendingUp className="h-4 w-4" />
              Trending upward
            </span>
          </header>

          <ul className="mt-6 space-y-4">
            {progressHighlights.map(({ lift, improvement, details }) => (
              <li
                key={lift}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-semibold text-zinc-50">
                    {lift}
                  </h4>
                  <span className="text-sm font-medium text-indigo-300">
                    {improvement}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{details}</p>
              </li>
            ))}
          </ul>
        </article>

        <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-lg font-semibold text-zinc-50">
            Upcoming Sessions
          </h3>
          <div className="mt-4 space-y-4">
            {upcomingSessions.map(({ day, focus, sets, notes }) => (
              <div
                key={focus}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {day}
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-100">
                  {focus}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{sets}</p>
                <p className="mt-2 text-sm text-zinc-500">{notes}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-50">
            Personal Records
          </h3>
          <button className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
            View full log
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {progressHighlights.map(({ lift, improvement, details }) => (
            <div
              key={`${lift}-card`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                {lift}
              </p>
              <p className="mt-2 text-xl font-semibold text-zinc-50">
                {improvement}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{details}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
