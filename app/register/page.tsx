// /app/register/page.tsx

import { RegistrationForm } from "@/components/registration-form";

export default function RegisterPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-8 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Register for FR Shift 2030
        </h1>
        <RegistrationForm />
      </div>
    </main>
  );
}