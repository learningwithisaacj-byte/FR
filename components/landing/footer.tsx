// /components/landing/footer.tsx

import Link from "next/link";
import { Globe, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBERS,
  EVENT_CITY,
  EVENT_VENUE,
  SOCIAL_LINKS,
} from "@/lib/constants/site";

export function Footer(): React.JSX.Element {
  return (
    <section id="contact" className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      {/* Contact Us Hero Header */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
          Have questions about <span className="font-semibold text-sky-600 dark:text-sky-400">FR</span>{" "}
          <span className="font-semibold text-lime-600 dark:text-lime-400">SHIFT</span>? Get in touch with our team directly.
        </p>
      </div>

      {/* Main Contact Grid Cards */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Phone Numbers Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
              <Phone size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Call Us
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Mon-Fri during business hours
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {CONTACT_PHONE_NUMBERS.map((number) => (
                <li key={number}>
                  <a
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="transition hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Support Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-100 text-lime-600 dark:bg-lime-950 dark:text-lime-400">
              <Mail size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Email Support
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              We usually respond within 24 hours
            </p>
            <div className="mt-3 text-sm font-medium">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="break-all text-neutral-700 transition hover:text-lime-600 dark:text-neutral-300 dark:hover:text-lime-400"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Location & Venue Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <MapPin size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Event Venue
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Join us live at the location
            </p>
            <address className="mt-3 text-sm font-medium not-italic text-neutral-700 dark:text-neutral-300">
              {EVENT_VENUE}
              <br />
              {EVENT_CITY}
            </address>
          </div>

          {/* Official Website & Socials Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Globe size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Website & Socials
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Connect with FindingRoots
            </p>
            
            <a
              href={SOCIAL_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-neutral-700 transition hover:text-amber-600 dark:text-neutral-300 dark:hover:text-amber-400"
            >
              www.findingrootshr.com
            </a>

            {/* Social Icons */}
            <div className="mt-3 flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md bg-neutral-100 p-2 text-neutral-600 transition hover:bg-sky-100 hover:text-sky-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-sky-950 dark:hover:text-sky-400"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-md bg-neutral-100 p-2 text-neutral-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-950 dark:hover:text-red-400"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-md bg-neutral-100 p-2 text-neutral-600 transition hover:bg-blue-100 hover:text-blue-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t mt-50 border-neutral-200 bg-white py-6 dark:border-neutral-900 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-neutral-500 sm:flex-row dark:text-neutral-500">
          <div>
            <span className="font-bold text-sky-600 dark:text-sky-400">FR</span>{" "}
            <span className="font-bold text-lime-600 dark:text-lime-400">SHIFT</span> — Curating Boardroom Conversations Ahead of Future.
          </div>
          <div>
            © {new Date().getFullYear()} FindingRoots Private Limited. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}