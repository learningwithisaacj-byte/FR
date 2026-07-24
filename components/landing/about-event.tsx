// /components/landing/about-event.tsx

import { BOARD_QUESTIONS } from "@/lib/constants/event";

const STATS: Array<{ value: string; label: string }> = [
  { value: "3", label: "Hours" },
  { value: "3", label: "Strategic Assets" },
  { value: "3", label: "Years of Clarity" },
];

export function AboutEvent(): React.JSX.Element {
  return (
    <section
      id="about-event"
      className="scroll-mt-24 bg-white py-16 dark:bg-neutral-950 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          About the Event
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="font-[family-name:var(--font-heading)] text-4xl font-bold text-sky-500 dark:text-sky-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-12 font-[family-name:var(--font-heading)] text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Decisions that can&apos;t wait until tomorrow for the board
        </h3>

        <ul className="mt-6 space-y-4">
          {BOARD_QUESTIONS.map((question, index) => (
            <li
              key={question}
              className="flex gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-sky-500 dark:text-sky-400">
                {index + 1}
              </span>
              <span className="pt-1 text-neutral-800 dark:text-neutral-200">{question}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-lg text-neutral-700 dark:text-neutral-300">
          Some organizations wait until these questions become urgent.
          <br />
          <span className="font-semibold text-neutral-900 dark:text-neutral-50">
            The leaders in this room choose to answer them first.
          </span>
        </p>
      </div>
    </section>
  );
}