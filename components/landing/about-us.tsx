// /components/landing/about-us.tsx

import Image from "next/image";
import { ABOUT_US_QUESTIONS } from "@/lib/constants/event";

export function AboutUs(): React.JSX.Element {
  return (
    <section
      id="about-us"
      className="scroll-mt-24 bg-white py-16 dark:bg-neutral-950 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Image
          src="/FR-Logo.png"
          alt="FindingRoots — HR Consulting, Corporate Training, Coaching and Mentoring"
          width={160}
          height={80}
          className="h-14 w-auto"
        />

        <h2 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          About Us
        </h2>

        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          An Invitation to Think Beyond Today&apos;s Decisions
        </p>

        <div className="mt-6 space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>
            FindingRoots is an award-winning Full Stack HR Consulting Company, recognized among
            India&apos;s fastest-growing HR brands and featured across 10+ national and global
            media platforms.
          </p>
          <p>
            As part of our flagship annual leadership initiative, we invite a select group of
            CEOs, GCC Heads, CHROs, Business Leaders, and Board Advisors to an exclusive
            3-hour Boardroom Conversation.
          </p>
          <p>Every leadership team today is asking the same questions:</p>

          <ul className="ml-5 list-disc space-y-1">
            {ABOUT_US_QUESTIONS.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>

          <p>The challenge isn&apos;t a lack of information.</p>
          <p>It&apos;s creating the clarity to make the right strategic decisions before they become urgent.</p>
          <p>
            This boardroom conversation has been carefully curated to bring together
            exceptional business leaders, diverse perspectives, proven frameworks, and
            practical insights that help you anticipate change — not simply react to it.
          </p>
          <p>
            In just three hours, you will gain strategic thinking, leadership perspectives, and
            decision frameworks designed to provide clarity for the next three years of your
            business journey.
          </p>
          <p className="font-semibold text-neutral-900 dark:text-neutral-50">
            There are no presentations. No sales pitches. No product demonstrations.
          </p>
          <p>Only meaningful conversations with leaders who are shaping the future of business.</p>
          <p>
            Every minute of these 3 Hours has been intentionally designed to respect your time,
            challenge your thinking, and leave you with ideas that influence decisions long
            after the session concludes.
          </p>
          <p>
            Because the best strategic decisions are rarely made in isolation — they emerge from
            the right conversations, with the right people, at the right time.
          </p>
        </div>
      </div>
    </section>
  );
}