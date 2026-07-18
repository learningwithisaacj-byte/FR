// /components/landing/event-details.tsx

import Link from "next/link";
import { EVENT_CITY, EVENT_DATE, EVENT_VENUE } from "@/lib/constants/event";

export function EventDetails(): React.JSX.Element {
  return (
    <section className="bg-neutral-950 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
          FR Shift 2030
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-neutral-50 sm:text-4xl">
          {EVENT_DATE}
        </h2>
        <p className="mt-2 text-neutral-400">
          {EVENT_VENUE}
          <br />
          {EVENT_CITY}
        </p>

        <Link
          href="/register"
          className="mt-8 inline-block rounded-md bg-lime-400 px-8 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-lime-300"
        >
          Register Now
        </Link>
      </div>
    </section>
  );
}