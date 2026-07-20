// /components/landing/footer.tsx

import Link from "next/link";
import { Globe, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBERS,
  EVENT_CITY,
  EVENT_VENUE,
  SOCIAL_LINKS,
} from "@/lib/constants/site";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-heading)] text-lg font-bold">
            <span className="text-sky-600 dark:text-sky-400">FR</span>{" "}
            <span className="text-lime-600 dark:text-lime-400">SHIFT</span>
          </p>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-500">
            Curating Boardroom Conversations Ahead of Future.
          </p>

          <div className="mt-5 flex gap-4">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FindingRoots on LinkedIn"
              className="text-neutral-600 transition hover:text-lime-600 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={SOCIAL_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FindingRoots website"
              className="text-neutral-600 transition hover:text-lime-600 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <Globe size={20} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FindingRoots on Facebook"
              className="text-neutral-600 transition hover:text-lime-600 dark:text-neutral-400 dark:hover:text-lime-400"
            >
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            {CONTACT_PHONE_NUMBERS.map((number) => (
              <li key={number} className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${number.replace(/\s/g, "")}`} className="transition hover:text-neutral-950 dark:hover:text-neutral-50">
                  {number}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-neutral-950 dark:hover:text-neutral-50">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
            Venue
          </p>
          <div className="mt-4 flex gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>
              {EVENT_VENUE}
              <br />
              {EVENT_CITY}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-neutral-200 px-6 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-900 dark:text-neutral-600">
        © {new Date().getFullYear()} FindingRoots Private Limited. All rights reserved.
      </div>
    </footer>
  );
}