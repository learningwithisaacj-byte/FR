// /app/register/success/page.tsx

interface SuccessPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function RegisterSuccessPage({
  searchParams,
}: SuccessPageProps): Promise<React.JSX.Element> {
  const { code } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Registration Successful
        </h1>

        {code ? (
          <>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              Your Participant ID
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {code}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Your registration has been received.
          </p>
        )}

        <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="mt-6 border-t border-neutral-200 pt-4 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <p className="font-medium text-neutral-700 dark:text-neutral-300">FR Shift 2030</p>
          <p>July 31st · Innov8, Gachibowli, Hyderabad</p>
        </div>
      </div>
    </main>
  );
}