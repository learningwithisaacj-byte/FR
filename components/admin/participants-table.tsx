// /components/admin/participants-table.tsx

import type { Participant, RegistrationStatus } from "@/types/participant";

interface ParticipantsTableProps {
  participants: Participant[];
  isLoading: boolean;
  onStatusChange: (participantId: string, status: RegistrationStatus) => void;
  updatingId: string | null;
}

const STATUS_OPTIONS: RegistrationStatus[] = ["PENDING", "CONFIRMED", "CANCELLED"];

const STATUS_BADGE_CLASSES: Record<RegistrationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  CONFIRMED: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ParticipantsTable({
  participants,
  isLoading,
  onStatusChange,
  updatingId,
}: ParticipantsTableProps): React.JSX.Element {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Loading participants...
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        No participants found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
        <thead className="bg-neutral-50 dark:bg-neutral-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Company
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Designation
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Industry
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Registered
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-neutral-900">
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                {participant.participantCode}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                {participant.fullName}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                {participant.company}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                {participant.designation}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                {participant.industry}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASSES[participant.status]}`}
                  >
                    {participant.status}
                  </span>
                  <select
                    value={participant.status}
                    disabled={updatingId === participant.id}
                    onChange={(event) =>
                      onStatusChange(participant.id, event.target.value as RegistrationStatus)
                    }
                    className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                {formatDate(participant.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}