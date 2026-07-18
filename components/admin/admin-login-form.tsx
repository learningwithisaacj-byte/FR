// /components/admin-login-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/schemas/login";

interface LoginApiError {
  error: string;
}

export function AdminLoginForm(): React.JSX.Element {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput): Promise<void> => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = (await response.json()) as LoginApiError;
        setSubmitError(body.error || "Login failed. Please try again.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-4 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
        Admin Login
      </h1>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}