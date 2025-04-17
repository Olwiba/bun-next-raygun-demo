"use client";

import { useState } from "react";
import { triggerServerError } from "../actions/raygun-server";

export default function ServerError() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTestServerError = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await triggerServerError();

      // If no error thrown, something went wrong
      setError("Expected error was not thrown");
    } catch (err) {
      setSuccess(true);
      setError(err instanceof Error ? err.message : "Unknown server error");

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
        Server-side Error Testing
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Test Raygun's server-side error tracking capabilities.
      </p>

      <div className="relative">
        <button
          onClick={handleTestServerError}
          className={`w-full rounded-md py-2 px-4 font-medium text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Test Server Error"}
        </button>

        {success && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            ✅
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm">
          <div className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Server Response:
          </div>
          <div className="font-mono text-red-600 dark:text-red-400 break-all">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
