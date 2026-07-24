// /app/admin/dashboard/page.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { SummaryCards } from "@/components/admin/summary-cards";
import { ParticipantsTable } from "@/components/admin/participants-table";
import { LogoutButton } from "@/components/admin/logout-button";

import type {
  DashboardCounts,
  Participant,
  ParticipantsResponse,
  RegistrationStatus,
} from "@/types/participant";

const STATUS_FILTER_OPTIONS: Array<RegistrationStatus | "ALL"> = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
];

function exportToCsv(participants: Participant[]): void {
  const headers = [
    "Participant Code",
    "Name",
    "Email",
    "Mobile",
    "LinkedIn URL",
    "Designation",
    "Company",
    "Industry",
    "Company Size",
    "City",
    "Involvement",
    "Consent",
    "Status",
    "Registered At",
  ];

  const rows = participants.map((participant) => [
    participant.participantCode,
    participant.fullName,
    participant.email,
    participant.mobile,
    participant.linkedinUrl ?? "",
    participant.designation,
    participant.company,
    participant.industry,
    participant.companySize,
    participant.city,
    participant.involvementType,
    participant.consent ? "Yes" : "No",
    participant.status,
    participant.createdAt,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fr-shift-2030-participants-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboardPage(): React.JSX.Element {
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [countsLoading, setCountsLoading] = useState<boolean>(true);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "ALL">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const fetchCounts = useCallback(async (): Promise<void> => {
    setCountsLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard", { credentials: "include" });
      if (!response.ok) {
        throw new Error("Failed to load dashboard counts");
      }
      const data = (await response.json()) as DashboardCounts;
      setCounts(data);
    } catch {
      setError("Could not load dashboard summary.");
    } finally {
      setCountsLoading(false);
    }
  }, []);

  const fetchParticipants = useCallback(async (): Promise<void> => {
    setParticipantsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("pageSize", "20");
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }
      if (statusFilter !== "ALL") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`/api/admin/participants?${params.toString()}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load participants");
      }
      const data = (await response.json()) as ParticipantsResponse;
      setParticipants(data.participants);
      setTotalPages(data.pagination.totalPages);
    } catch {
      setError("Could not load participants.");
    } finally {
      setParticipantsLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    void fetchCounts();
  }, [fetchCounts]);

  useEffect(() => {
    void fetchParticipants();
  }, [fetchParticipants]);

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: RegistrationStatus | "ALL"): void => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleStatusChange = async (
    participantId: string,
    status: RegistrationStatus
  ): Promise<void> => {
    setUpdatingId(participantId);
    setError(null);
    try {
      const response = await fetch(`/api/admin/participants/${participantId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === participantId ? { ...participant, status } : participant
        )
      );
      void fetchCounts();
    } catch {
      setError("Could not update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Admin Dashboard
          </h1>
          <LogoutButton />
        </div>

        <SummaryCards counts={counts} isLoading={countsLoading} />

        {error && (
          <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <input
              type="text"
              placeholder="Search name, company, email, code..."
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-full max-w-sm rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
            />
            <select
              value={statusFilter}
              onChange={(event) =>
                handleStatusFilterChange(event.target.value as RegistrationStatus | "ALL")
              }
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
            >
              {STATUS_FILTER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "ALL" ? "All Statuses" : option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => exportToCsv(participants)}
            disabled={participants.length === 0}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Export CSV (current page)
          </button>
        </div>

        <ParticipantsTable
          participants={participants}
          isLoading={participantsLoading}
          onStatusChange={handleStatusChange}
          updatingId={updatingId}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}