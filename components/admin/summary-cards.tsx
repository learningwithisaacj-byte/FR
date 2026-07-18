// /components/admin/summary-cards.tsx

import type { DashboardCounts } from "@/types/participant";

interface SummaryCardsProps {
  counts: DashboardCounts | null;
  isLoading: boolean;
}

interface CardDefinition {
  label: string;
  value: number | null;
  accentClass: string;
}

export function SummaryCards({ counts, isLoading }: SummaryCardsProps): React.JSX.Element {
  const cards: CardDefinition[] = [
    { label: "Total Registrations", value: counts?.total ?? null, accentClass: "text-neutral-900 dark:text-neutral-50" },
    { label: "Today's Registrations", value: counts?.today ?? null, accentClass: "text-blue-600 dark:text-blue-400" },
    { label: "Pending", value: counts?.pending ?? null, accentClass: "text-amber-600 dark:text-amber-400" },
    { label: "Confirmed", value: counts?.confirmed ?? null, accentClass: "text-green-600 dark:text-green-400" },
    { label: "Cancelled", value: counts?.cancelled ?? null, accentClass: "text-red-600 dark:text-red-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{card.label}</p>
          <p className={`mt-1 text-2xl font-bold ${card.accentClass}`}>
            {isLoading || card.value === null ? "—" : card.value}
          </p>
        </div>
      ))}
    </div>
  );
}