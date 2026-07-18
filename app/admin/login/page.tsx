// /app/admin/login/page.tsx

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      <AdminLoginForm />
    </main>
  );
}