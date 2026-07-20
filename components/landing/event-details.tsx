// /components/landing/event-details.tsx

import Link from "next/link";
import { CountdownTimer } from "@/components/landing/countdown-timer";
import { EVENT_CITY, EVENT_VENUE } from "@/lib/constants/site";

export function EventDetails(): React.JSX.Element {
  return (
    <section id="event-details" className="scroll-mt-24 bg-neutral-50 py-24 dark:bg-neutral-950 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-600 dark:text-lime-400">
          FR Shift 2030
        </p>

        <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl">
          The countdown has begun
        </h2>

        <div className="mt-12">
          <CountdownTimer />
        </div>

        <p className="mt-12 text-neutral-600 dark:text-neutral-400">
          {EVENT_VENUE}
          <br />
          {EVENT_CITY}
        </p>

        <Link
          href="/register"
          className="mt-8 inline-block rounded-md bg-lime-500 px-8 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 dark:bg-lime-400 dark:hover:bg-lime-300"
        >
          Register Now
        </Link>
      </div>
    </section>
  );
}