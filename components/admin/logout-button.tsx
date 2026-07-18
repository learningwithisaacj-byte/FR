// /components/admin/logout-button.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton(): React.JSX.Element {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
    >
      {isLoggingOut ? "Signing out..." : "Log Out"}
    </button>
  );
}