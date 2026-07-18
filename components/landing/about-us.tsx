// /components/landing/about-us.tsx

import Image from "next/image";

export function AboutUs(): React.JSX.Element {
  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-900 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Image
          src="/finding-roots-logo.png"
          alt="FindingRoots — HR Consulting, Corporate Training, Coaching and Mentoring"
          width={160}
          height={80}
          className="h-14 w-auto"
        />

        <h2 className="mt-6 font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
          About FindingRoots
        </h2>

        <div className="mt-6 space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>
            FindingRoots is an award-winning Full Stack HR Consulting firm, recognized among
            India&apos;s fastest-growing HR brands and featured across 10+ national and global
            media platforms.
          </p>
          <p>
            As part of our flagship annual leadership initiative, we invite a select group of
            CEOs, GCC Heads, CHROs, Business Leaders, and Board Advisors to an exclusive
            3-hour Boardroom Conversation.
          </p>
          <p>
            The challenge isn&apos;t a lack of information — it&apos;s creating the clarity to
            make the right strategic decisions before they become urgent. There are no
            presentations, no sales pitches, no product demonstrations. Only meaningful
            conversations with leaders who are shaping the future of business.
          </p>
        </div>
      </div>
    </section>
  );
}