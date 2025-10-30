import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ClipboardCheck, Dumbbell, Timer } from "lucide-react";

const phases = [
  {
    title: "Warm-up & Primers",
    duration: "10 min",
    focus: "Movement prep",
    exercises: [
      { name: "Bike Tempo", prescription: "6 min @ RPE 5" },
      { name: "Hip Airplanes", prescription: "2 x 8/side" },
      { name: "Cossack Squat", prescription: "2 x 10/side" },
    ],
  },
  {
    title: "Main Lift",
    duration: "28 min",
    focus: "Strength",
    exercises: [
      { name: "Back Squat", prescription: "5 x 3 @ 80% 1RM" },
      { name: "Pause Squat", prescription: "3 x 2 @ 70%" },
    ],
  },
  {
    title: "Accessory & Cool Down",
    duration: "18 min",
    focus: "Hypertrophy",
    exercises: [
      { name: "Leg Press", prescription: "3 x 12" },
      { name: "Nordic Curl", prescription: "3 x 6 (controlled)" },
      { name: "Reverse Lunge", prescription: "2 x 15/side" },
    ],
  },
];

export default function Workout() {
  const { id } = useParams();

  const summary = useMemo(
    () => ({
      day: "Lower Strength",
      totalSets: 17,
      totalVolume: "24,050 lb",
      estimatedDuration: "56 min",
      readiness: "Green • primed to push heavier singles",
    }),
    [],
  );

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-zinc-800 bg-zinc-900/70 px-6 py-6 shadow-inner shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Session ID: {id}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-zinc-50">
              {summary.day}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{summary.readiness}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:text-white">
              <ClipboardCheck className="h-4 w-4" />
              Complete session
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400">
              <Timer className="h-4 w-4" />
              Start timer
            </button>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Total sets
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              {summary.totalSets}
            </dd>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Target volume
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              {summary.totalVolume}
            </dd>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <dt className="uppercase tracking-[0.28em] text-xs text-zinc-500">
              Time on floor
            </dt>
            <dd className="mt-1 text-lg font-semibold text-zinc-50">
              {summary.estimatedDuration}
            </dd>
          </div>
        </dl>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {phases.map(({ title, duration, focus, exercises }) => (
          <article
            key={title}
            className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-zinc-50">{title}</h4>
                <p className="text-sm text-zinc-400">{focus}</p>
              </div>
              <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                {duration}
              </span>
            </div>

            <ul className="mt-5 space-y-4 text-sm">
              {exercises.map(({ name, prescription }) => (
                <li
                  key={name}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                >
                  <p className="font-semibold text-zinc-50">{name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {prescription}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-lg font-semibold text-zinc-50">
            Post-session notes
          </h4>
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
            <Dumbbell className="h-4 w-4" />
            Attach video
          </button>
        </header>
        <textarea
          rows={4}
          placeholder="Log how the session moved, what to adjust next time, cues to remember..."
          className="mt-4 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:outline-none"
        />
      </section>
    </div>
  );
}
