"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF8] px-4 text-[#282323]">
        <h1 className="mb-2 text-2xl font-semibold text-[#720016]">
          Something went wrong
        </h1>
        <p className="mb-6 max-w-md text-center text-sm opacity-80">
          Please refresh the page or try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[#720016] px-6 py-3 text-sm font-medium text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
