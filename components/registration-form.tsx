// /components/registration-form.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  registerSchema,
  involvementTypeValues,
  industryOptions,
  type RegisterInput,
} from "@/lib/schemas/register";
import { EVENT_DATE_LABEL } from "@/lib/constants/site";

type Step = 1 | 2;

interface RegisterApiError {
  error: string;
}

interface RegisterApiSuccess {
  participantCode: string;
}

const DESIGNATION_OPTIONS = [
  "Manager / Senior Manager",
  "AVP / VP",
  "C-Suite / Top Management",
  "Any other : Please Mention",
];

const inputBase =
  "mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:outline-none focus:ring-2 focus:ring-lime-500/40 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-500";
const inputValid =
  "border-neutral-300 focus:border-lime-500 dark:border-neutral-700 dark:focus:border-lime-400";
const inputInvalid =
  "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500/70";

function inputClass(hasError: boolean): string {
  return `${inputBase} ${hasError ? inputInvalid : inputValid}`;
}

function FieldError({ message }: { message?: string }): React.JSX.Element | null {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

function StepBadge({
  number,
  label,
  active,
  done,
}: {
  number: number;
  label: string;
  active: boolean;
  done: boolean;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition ${
          done
            ? "bg-lime-500 text-neutral-950 dark:bg-lime-400"
            : active
              ? "bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
        }`}
        aria-hidden="true"
      >
        {done ? "✓" : number}
      </span>
      <span
        className={`text-sm ${
          active || done
            ? "font-semibold text-neutral-900 dark:text-neutral-50"
            : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function RegistrationForm(): React.JSX.Element {
  const [step, setStep] = useState<Step>(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [customDesignation, setCustomDesignation] = useState<string>("");
  const [success, setSuccess] = useState<{
    participantCode: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const selectedDesignation = watch("designation");

  const goToStep2 = async (): Promise<void> => {
    const valid = await trigger([
      "fullName",
      "email",
      "mobile",
      "linkedinUrl",
      "involvementType",
    ]);
    if (valid) {
      setStep(2);
    }
  };

  // On step 1, Enter should advance to step 2 — not submit the whole form
  // (which would silently fail on the still-hidden step 2 fields).
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (step === 1 && e.key === "Enter") {
      e.preventDefault();
      void goToStep2();
    }
  };

  const onSubmit = async (data: RegisterInput): Promise<void> => {
    setSubmitError(null);
    setIsSubmitting(true);

    const payload = { ...data };

    // Default companySize to "0" if empty
    if (!payload.companySize || payload.companySize.trim() === "") {
      payload.companySize = "0";
    }

    // Assign custom designation if "Any other" was selected
    if (payload.designation === "Any other : Please Mention") {
      payload.designation = customDesignation.trim() || "Other";
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json()) as RegisterApiError;
        setSubmitError(body.error || "Registration failed. Please try again.");
        return;
      }

      const body = (await response.json()) as RegisterApiSuccess;
      reset();
      setCustomDesignation("");
      setStep(1);
      setSuccess({ participantCode: body.participantCode, email: data.email });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
      >
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <StepBadge number={1} label="Personal" active={step === 1} done={step === 2} />
            <div
              className="mx-4 h-px flex-1 bg-neutral-200 dark:bg-neutral-800"
              aria-hidden="true"
            />
            <StepBadge number={2} label="Company" active={step === 2} done={false} />
          </div>
          <div
            className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={2}
            aria-label={`Step ${step} of 2`}
          >
            <div
              className={`h-full rounded-full bg-lime-500 transition-all duration-300 dark:bg-lime-400 ${step === 1 ? "w-1/2" : "w-full"}`}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Full Name <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <input
                id="fullName"
                autoComplete="name"
                placeholder="Your full name"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
                className={inputClass(!!errors.fullName)}
              />
              <FieldError message={errors.fullName?.message} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Work Email ID <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
              />
              {!errors.email && (
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Company email only — personal addresses (Gmail, Yahoo, etc.)
                  aren&apos;t accepted.
                </p>
              )}
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Mobile <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 9876543210"
                {...register("mobile")}
                aria-invalid={!!errors.mobile}
                className={inputClass(!!errors.mobile)}
              />
              <FieldError message={errors.mobile?.message} />
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                LinkedIn URL{" "}
                <span className="font-normal text-neutral-400 dark:text-neutral-500">
                  (optional)
                </span>
              </label>
              <input
                id="linkedinUrl"
                type="url"
                autoComplete="url"
                placeholder="https://linkedin.com/in/you"
                {...register("linkedinUrl")}
                aria-invalid={!!errors.linkedinUrl}
                className={inputClass(!!errors.linkedinUrl)}
              />
              <FieldError message={errors.linkedinUrl?.message} />
            </div>

            <div>
              <label htmlFor="involvementType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                How do you see yourself involving in FR Shift 2030?{" "}
                <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <select
                id="involvementType"
                {...register("involvementType")}
                aria-invalid={!!errors.involvementType}
                className={inputClass(!!errors.involvementType)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                {involvementTypeValues.map((value) => (
                  <option key={value} value={value}>
                    {value.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <FieldError message={errors.involvementType?.message} />
            </div>

            <button
              type="button"
              onClick={goToStep2}
              className="w-full rounded-lg bg-lime-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:bg-lime-400 dark:hover:bg-lime-300"
            >
              Continue to company details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Current Role <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <select
                id="designation"
                {...register("designation")}
                aria-invalid={!!errors.designation}
                className={inputClass(!!errors.designation)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select your role
                </option>
                {DESIGNATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {selectedDesignation === "Any other : Please Mention" && (
                <input
                  type="text"
                  value={customDesignation}
                  onChange={(e) => setCustomDesignation(e.target.value)}
                  placeholder="Please mention your role"
                  className={`${inputClass(false)} mt-2`}
                />
              )}

              <FieldError message={errors.designation?.message} />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Organization / Company Name{" "}
                <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <input
                id="company"
                autoComplete="organization"
                placeholder="Company name"
                {...register("company")}
                aria-invalid={!!errors.company}
                className={inputClass(!!errors.company)}
              />
              <FieldError message={errors.company?.message} />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Industry / Sector <span className="text-lime-600 dark:text-lime-400">*</span>
              </label>
              <select
                id="industry"
                {...register("industry")}
                aria-invalid={!!errors.industry}
                className={inputClass(!!errors.industry)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an industry
                </option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError message={errors.industry?.message} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Company Size{" "}
                  <span className="font-normal text-neutral-400 dark:text-neutral-500">
                    (optional)
                  </span>
                </label>
                <input
                  id="companySize"
                  placeholder="e.g. 500-1000"
                  {...register("companySize")}
                  aria-invalid={!!errors.companySize}
                  className={inputClass(!!errors.companySize)}
                />
                <FieldError message={errors.companySize?.message} />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  City <span className="text-lime-600 dark:text-lime-400">*</span>
                </label>
                <input
                  id="city"
                  autoComplete="address-level2"
                  placeholder="e.g. Hyderabad"
                  {...register("city")}
                  aria-invalid={!!errors.city}
                  className={inputClass(!!errors.city)}
                />
                <FieldError message={errors.city?.message} />
              </div>
            </div>

            {/* Implied Consent Disclaimer */}
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              By registering, you agree to allow FindingRoots to contact you
              with event updates and details.
            </p>

            {submitError && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400"
              >
                {submitError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="w-1/3 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-2/3 items-center justify-center gap-2 rounded-lg bg-lime-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 disabled:opacity-60 dark:bg-lime-400 dark:hover:bg-lime-300"
              >
                {isSubmitting && (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Success Modal */}
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-success-title"
          onClick={() => setSuccess(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle2
              size={44}
              className="mx-auto text-lime-500 dark:text-lime-400"
              aria-hidden="true"
            />
            <h3
              id="registration-success-title"
              className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
              You&apos;re registered!
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              See you at FR Shift 2030 on {EVENT_DATE_LABEL}.
            </p>

            <div className="mt-5 rounded-xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
              <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Your participant code
              </p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-wide text-neutral-900 dark:text-lime-400">
                {success.participantCode}
              </p>
            </div>

            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              A confirmation email with your code is on its way to{" "}
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {success.email}
              </span>
              . Keep the code handy for check-in.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSuccess(null)}
                className="w-1/2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Close
              </button>
              <Link
                href="/"
                className="flex w-1/2 items-center justify-center rounded-lg bg-lime-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400 dark:bg-lime-400 dark:hover:bg-lime-300"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
