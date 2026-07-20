// /components/landing/nav.tsx

"use client";

import Link from "next/link";

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "About the Event", href: "#about-event" },
  { label: "About FindingRoots", href: "#about-us" },
  { label: "Takeaways", href: "#takeaways" },
];

export function Nav(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#hero"
          className="font-[family-name:var(--font-heading)] text-lg font-bold"
        >
          <span className="text-sky-400">FR</span>{" "}
          <span className="text-lime-400">SHIFT</span>
        </Link>

        <nav className="hidden gap-8 text-sm text-neutral-300 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-neutral-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/register"
          className="rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-lime-300"
        >
          Register
        </Link>
      </div>
    </header>
  );
}