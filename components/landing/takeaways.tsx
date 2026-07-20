// /components/landing/takeaways.tsx

import { TAKEAWAYS } from "@/lib/constants/event";

export function Takeaways(): React.JSX.Element {
  return (
    <section
      id="takeaways"
      className="scroll-mt-24 bg-neutral-50 py-16 dark:bg-neutral-900 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          The 3 Takeaways
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TAKEAWAYS.map((takeaway, index) => (
            <div
              key={takeaway}
              className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-lime-500 dark:text-lime-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}