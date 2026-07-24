// /app/register/page.tsx

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { RegistrationForm } from "@/components/registration-form";
import {
  EVENT_DATE_LABEL,
  EVENT_CITY,
  TAKEAWAYS_SHORT,
} from "@/lib/constants/site";

export default function RegisterPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          {/* Event summary panel */}
          <aside className="lg:sticky lg:top-16 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-widest text-lime-600 dark:text-lime-400">
              FR Shift 2030
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
              Reserve your seat at the table
            </h1>
            <p className="mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
              Curating Boardroom conversations ahead of future — join leaders
              choosing to answer tomorrow&apos;s questions first.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-3">
                <CalendarDays
                  size={18}
                  className="shrink-0 text-lime-600 dark:text-lime-400"
                  aria-hidden="true"
                />
                {EVENT_DATE_LABEL}
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="shrink-0 text-lime-600 dark:text-lime-400"
                  aria-hidden="true"
                />
                {EVENT_CITY}
              </li>
              <li className="flex items-center gap-3">
                <Clock3
                  size={18}
                  className="shrink-0 text-lime-600 dark:text-lime-400"
                  aria-hidden="true"
                />
                3 Hours · 3 Strategic Assets · 3 Years of Clarity
              </li>
            </ul>

            <div className="mt-8 hidden rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 lg:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                What you&apos;ll take away
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                {TAKEAWAYS_SHORT.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500 dark:bg-lime-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
