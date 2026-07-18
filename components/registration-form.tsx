    // /components/registration-form.tsx

    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import {
    registerSchema,
    involvementTypeValues,
    industryOptions,
    type RegisterInput,
    } from "@/lib/schemas/register";

    type Step = 1 | 2;

    interface RegisterApiError {
    error: string;
    }

    interface RegisterApiSuccess {
    participantCode: string;
    }

    export function RegistrationForm(): React.JSX.Element {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });

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

    const onSubmit = async (data: RegisterInput): Promise<void> => {
        setSubmitError(null);
        setIsSubmitting(true);
        try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const body = (await response.json()) as RegisterApiError;
            setSubmitError(body.error || "Registration failed. Please try again.");
            return;
        }

        const body = (await response.json()) as RegisterApiSuccess;
        router.push(`/register/success?code=${encodeURIComponent(body.participantCode)}`);
        } catch {
        setSubmitError("Network error. Please try again.");
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-lg space-y-6 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
        >
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span className={step === 1 ? "font-semibold text-neutral-900 dark:text-neutral-50" : ""}>
            Step 1: Personal
            </span>
            <span>/</span>
            <span className={step === 2 ? "font-semibold text-neutral-900 dark:text-neutral-50" : ""}>
            Step 2: Company
            </span>
        </div>

        {step === 1 && (
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Full Name *
                </label>
                <input
                {...register("fullName")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.fullName.message}
                </p>
                )}
            </div>

            <div>
<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
  Work Email ID *
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
    Mobile *
  </label>
  <input
    {...register("mobile")}
    placeholder="+91 98765 43210"
    className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
  />
  {errors.mobile && (
    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
      {errors.mobile.message}
    </p>
  )}
</div>


            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                LinkedIn URL
                </label>
                <input
                {...register("linkedinUrl")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.linkedinUrl && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.linkedinUrl.message}
                </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                How do you see yourself involving in FR Shift 2030? *
                </label>
                <select
                {...register("involvementType")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
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
                {errors.involvementType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.involvementType.message}
                </p>
                )}
            </div>

            <button
                type="button"
                onClick={goToStep2}
                className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
                Next
            </button>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Designation / Current Role *
                </label>
                <input
                {...register("designation")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.designation && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.designation.message}
                </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Organization / Company Name *
                </label>
                <input
                {...register("company")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.company && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.company.message}
                </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Industry / Sector *
                </label>
                <select
                {...register("industry")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
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
                {errors.industry && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.industry.message}
                </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Company Size *
                </label>
                <input
                {...register("companySize")}
                placeholder="e.g. 500-1000"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.companySize && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.companySize.message}
                </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                City *
                </label>
                <input
                {...register("city")}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                />
                {errors.city && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.city.message}
                </p>
                )}
            </div>

            <div className="flex items-start gap-2">
                <input
                type="checkbox"
                id="consent"
                {...register("consent")}
                className="mt-1"
                />
                <label
                htmlFor="consent"
                className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                I consent to FindingRoots contacting me regarding FR Shift 2030.
                </label>
            </div>
            {errors.consent && (
                <p className="text-sm text-red-600 dark:text-red-400">
                {errors.consent.message}
                </p>
            )}

            {submitError && (
                <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
            )}

            <div className="flex gap-3">
                <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                Back
                </button>
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                {isSubmitting ? "Submitting..." : "Register"}
                </button>
            </div>
            </div>
        )}
        </form>
    );
    }