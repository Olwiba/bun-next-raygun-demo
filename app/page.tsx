import Image from "next/image";
import ServerError from "./components/ServerError";
import ClientError from "./components/ClientError";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Raygun Error Tracking Demo
          </h1>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={20}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Tracking Test Suite
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This demo allows you to test Raygun's error tracking capabilities in
            a Next.js application. Use the buttons below to trigger test errors
            that will be reported to your Raygun dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ServerError />
          <ClientError />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Server-side Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Server errors are tracked using a direct API integration with
                Raygun's error tracking API.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-2">
                <li>Errors are caught in server actions</li>
                <li>Error details including stack traces are captured</li>
                <li>Custom metadata is attached to errors</li>
                <li>Server environment information is included</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Client-side Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Client errors are tracked using Raygun4JS injected directly into
                the page.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-2">
                <li>Automatic global error handler for uncaught exceptions</li>
                <li>Manual error reporting for try/catch blocks</li>
                <li>Browser and device information is captured</li>
                <li>Real User Monitoring (RUM) enabled</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
          <p>Created with Next.js and Raygun Error Tracking</p>
        </footer>
      </main>
    </div>
  );
}
