"use client";

// Declare rg4js as a global function type
declare global {
  interface Window {
    rg4js: (command: string, data?: any) => void;
  }
}

// Simple flag to track initialization
let initialized = false;

export const initRaygunClient = async () => {
  if (typeof window === "undefined" || initialized) {
    return; // Don't initialize if we're not in the browser or already initialized
  }

  try {
    // Load the Raygun script directly
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.raygun.io/raygun4js/raygun.min.js";

    script.onload = () => {
      if (window.rg4js) {
        window.rg4js("apiKey", process.env.NEXT_PUBLIC_RAYGUN_API_KEY);
        window.rg4js("enableCrashReporting", true);
        window.rg4js("enableRealUserMonitoring", true);
        window.rg4js("attach");
        initialized = true;
        console.log("Raygun client initialized successfully");
      }
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error("Failed to initialize Raygun client:", error);
  }
};

export const sendRaygunClientError = (error: Error) => {
  if (typeof window !== "undefined" && "rg4js" in window) {
    window.rg4js("send", {
      error: error,
      customData: { source: "manual trigger" },
      tags: ["test-error", "client-side"],
    });
    console.log("Error sent to Raygun:", error.message);
  } else {
    console.error(
      "Raygun client not initialized, could not send error:",
      error.message
    );
  }
};
