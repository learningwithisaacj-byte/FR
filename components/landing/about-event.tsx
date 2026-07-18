// /components/landing/about-event.tsx

import { BOARD_QUESTIONS, TAKEAWAYS } from "@/lib/constants/event";

export function AboutEvent(): React.JSX.Element {
  return (
    <section className="bg-white py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          <span>3 Hours</span>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span>3 Strategic Assets</span>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span>3 Years of Clarity</span>
        </div>

        <h2 className="mt-4 font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Decisions that can&apos;t wait until tomorrow for the board
        </h2>

        <ul className="mt-8 space-y-4">
          {BOARD_QUESTIONS.map((question, index) => (
            <li
              key={question}
              className="flex gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="font-serif text-2xl font-bold text-sky-500 dark:text-sky-400">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TAKEAWAYS.map((takeaway) => (
            <div
              key={takeaway}
              className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              {takeaway}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}