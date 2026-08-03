"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="heading-serif mb-2 text-2xl font-semibold text-maroon-deep">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm text-charcoal/70">
        Please refresh the page or try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
