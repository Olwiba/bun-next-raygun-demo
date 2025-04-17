"use client";

import { useEffect, useState } from "react";
import {
  initRaygunClient,
  sendRaygunClientError,
} from "../utils/raygun-client";

export default function ClientError() {
  const [initialized, setInitialized] = useState(false);
  const [caughtSuccess, setCaughtSuccess] = useState(false);
  const [uncaughtSuccess, setUncaughtSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a custom function to check if Raygun is loaded
    const checkRaygun = () => {
      if (typeof window !== "undefined" && "rg4js" in window) {
        setInitialized(true);
        return true;
      }
      return false;
    };

    const loadRaygun = async () => {
      // Only initialize if not already done
      if (!checkRaygun()) {
        setLoading(true);
        await initRaygunClient();

        // Check again after initialization
        const checkInterval = setInterval(() => {
          if (checkRaygun()) {
            clearInterval(checkInterval);
            setLoading(false);
          }
        }, 500); // Check every 500ms

        // Clear interval after 10 seconds max
        setTimeout(() => {
          clearInterval(checkInterval);
          setLoading(false);
        }, 10000);
      }
    };

    loadRaygun();
  }, []);

  const handleTestClientError = () => {
    try {
      setCaughtSuccess(false);
      // Deliberately cause an error
      throw new Error("Test client error from Next.js app");
    } catch (error) {
      if (error instanceof Error) {
        sendRaygunClientError(error);
        setCaughtSuccess(true);
        // Reset success message after 3 seconds
        setTimeout(() => setCaughtSuccess(false), 3000);
      }
    }
  };

  // Alternative method to cause an uncaught error
  const triggerUncaughtError = () => {
    setUncaughtSuccess(true);
    // This will be caught by Raygun's global error handler
    try {
      setTimeout(() => {
        // Intentional error that will be caught by Raygun
        throw new Error("Uncaught test error from Next.js app");
      }, 10);

      // Show success for 3 seconds (the error is expected to be caught by Raygun)
      setTimeout(() => setUncaughtSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to trigger uncaught error:", error);
      setUncaughtSuccess(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
        Client-side Error Testing
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Test Raygun's client-side error tracking capabilities.
      </p>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <button
            onClick={handleTestClientError}
            className={`w-full rounded-md py-2 px-4 font-medium text-white transition ${
              initialized
                ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!initialized || loading}
          >
            {loading ? "Initializing..." : "Test Caught Error"}
          </button>

          {caughtSuccess && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              ✅
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={triggerUncaughtError}
            className={`w-full rounded-md py-2 px-4 font-medium text-white transition ${
              initialized
                ? "bg-purple-500 hover:bg-purple-600 active:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!initialized || loading}
          >
            Test Uncaught Error
          </button>

          {uncaughtSuccess && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              ✅
            </div>
          )}
        </div>
      </div>

      {!initialized && !loading && (
        <div className="text-amber-600 dark:text-amber-400 text-sm">
          Raygun client loading failed. Please reload the page.
        </div>
      )}
    </div>
  );
}
