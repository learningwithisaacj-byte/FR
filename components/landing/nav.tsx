// /components/landing/nav.tsx

"use client";

import Link from "next/link";

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Register FR Shift 2030", href: "/register" },
  { label: "About the Event", href: "#about-event" },
  { label: "About Us", href: "#about-us" },
  { label: "Contact Us", href: "#contact" },
];

export function Nav(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#hero"
          className="font-[family-name:var(--font-heading)] text-lg font-bold"
        >
          <span className="text-sky-600 dark:text-sky-400">FR</span>{" "}
          <span className="text-lime-600 dark:text-lime-400">SHIFT</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300 sm:flex">
          {NAV_LINKS.map((link) => {
            const isExternalPage = link.href.startsWith("/");

            if (isExternalPage) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-neutral-950 dark:hover:text-neutral-50"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-neutral-950 dark:hover:text-neutral-50"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Primary CTA Button */}
        <Link
          href="/register"
          className="rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 dark:bg-lime-400 dark:hover:bg-lime-300"
        >
          Register
        </Link>
      </div>
    </header>
  );
}