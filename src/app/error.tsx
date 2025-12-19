"use client";

import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development only.
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
    // In production, you could log to an error reporting service here.
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">
          Something went wrong.
        </h1>
        <p className="text-[#666] mb-8">
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#ff6b00] text-white rounded-full font-medium hover:bg-[#ff9500] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ff6b00] text-[#ff6b00] rounded-full font-medium hover:bg-[#fff5eb] transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-[#666] mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="bg-[#f5f5f5] p-4 rounded-lg text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

