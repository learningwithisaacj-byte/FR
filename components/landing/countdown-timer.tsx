"use client";

import { useEffect, useState } from "react";
import { EVENT_DATE_ISO } from "@/lib/constants/site";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeRemaining(): TimeRemaining {
  const total = Math.max(0, new Date(EVENT_DATE_ISO).getTime() - Date.now());

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({
  value,
  label,
}: CountdownUnitProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer(): React.JSX.Element {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    getTimeRemaining()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      <CountdownUnit value={remaining.days} label="Days" />
      <CountdownUnit value={remaining.hours} label="Hours" />
      <CountdownUnit value={remaining.minutes} label="Minutes" />
      <CountdownUnit value={remaining.seconds} label="Seconds" />
    </div>
  );
}