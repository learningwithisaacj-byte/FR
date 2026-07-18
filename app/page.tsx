// /app/page.tsx

import { Hero } from "@/components/landing/hero";
import { AboutEvent } from "@/components/landing/about-event";
import { AboutUs } from "@/components/landing/about-us";
import { EventDetails } from "@/components/landing/event-details";

export default function LandingPage(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <AboutEvent />
      <AboutUs />
      <EventDetails />
    </main>
  );
}