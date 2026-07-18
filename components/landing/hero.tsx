// /components/landing/hero.tsx

import Image from "next/image";
import Link from "next/link";

export function Hero(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-sky-400">
            <span className="text-sky-400">FR</span>
            <span className="text-lime-400">SHIFT</span>
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-neutral-50 sm:text-5xl lg:text-6xl">
            Curating Boardroom Conversations
          </h1>

          <p className="mt-3 text-xl text-neutral-300 sm:text-2xl">
            Ahead of <span className="text-lime-400">Future!</span>
          </p>

          <p className="mt-6 max-w-md text-neutral-400">
            An invitation to think beyond today&apos;s decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-lime-300"
            >
              Register for FR Shift 2030
            </Link>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            3 Hours · 3 Strategic Assets · 3 Years of Clarity
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <Image
            src="/fr-shift-poster.png"
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