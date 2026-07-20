// /app/page.tsx

import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { AboutEvent } from "@/components/landing/about-event";
import { AboutUs } from "@/components/landing/about-us";
import { Takeaways } from "@/components/landing/takeaways";
import { EventDetails } from "@/components/landing/event-details";
import { Footer } from "@/components/landing/footer";

export default function LandingPage(): React.JSX.Element {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutEvent />
      <AboutUs />
      <Takeaways />
      <EventDetails />
      <Footer />
    </main>
  );
}