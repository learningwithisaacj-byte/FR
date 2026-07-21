// /components/landing/hero.tsx

import Link from "next/link";
import { StairsGraphic } from "@/components/landing/stairs-graphic";
import Image from "next/image";

export function Hero(): React.JSX.Element {
  return (
    <section id="hero" className="relative overflow-hidden bg-white dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="order-2 lg:order-1">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl">
            Curating Boardroom Conversations
          </h1>

          <p className="mt-3 text-xl text-neutral-700 dark:text-neutral-300 sm:text-2xl">
            Ahead of <span className="text-lime-600 dark:text-lime-400">Future!</span>
          </p>

          <p className="mt-6 max-w-md text-neutral-600 dark:text-neutral-400">
            An invitation to think beyond today&apos;s decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-md bg-lime-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 dark:bg-lime-400 dark:hover:bg-lime-300"
            >
              Register for FR Shift 2030
            </Link>
          </div>

          <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-500">
            3 Hours · 3 Strategic Assets · 3 Years of Clarity
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <Image
            src="/fr-shift-hero1.png"
            alt="FR Shift 2030 — a staircase of years from 2026 to 2030 lit in neon, representing the path to future readiness"
            width={640}
            height={1067}
            priority
            className="h-auto w-full max-w-sm drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}