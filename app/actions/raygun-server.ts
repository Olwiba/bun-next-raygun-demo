"use server";

// Instead of using the raygun SDK, we'll make a direct API call
// This avoids the module resolution issues with Next.js server actions

export async function triggerServerError() {
  try {
    throw new Error("Test server error from Next.js app");
  } catch (error) {
    if (error instanceof Error) {
      await sendToRaygun(error);
    }
    // Re-throw for client to handle if needed
    throw error;
  }
}

async function sendToRaygun(error: Error) {
  try {
    const raygunApiKey = process.env.NEXT_PUBLIC_RAYGUN_API_KEY;

    if (!raygunApiKey) {
      console.error("Raygun API key not found in environment variables");
      return false;
    }

    const payload = {
      occurredOn: new Date().toISOString(),
      details: {
        error: {
          message: error.message,
          stack: error.stack,
          className: error.name,
        },
        environment: {
          processorCount: 1,
          architecture: "x64",
          osVersion: "Node.js " + process.version,
          windowBoundsWidth: 0,
          windowBoundsHeight: 0,
        },
        client: {
          name: "raygun-node-next",
          version: "1.0.0",
        },
        tags: ["server-side", "next.js"],
        userCustomData: {
          serverSide: true,
          framework: "Next.js",
        },
        request: {
          hostName: "localhost",
          url: "/api/server-error",
          httpMethod: "POST",
          isSecure: false,
          ipAddress: "127.0.0.1",
        },
      },
    };

    const response = await fetch("https://api.raygun.com/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ApiKey": raygunApiKey,
      },
      body: JSON.stringify(payload),
    });

    console.log("Raygun server response:", response.status);

    return response.ok;
  } catch (err) {
    console.error("Failed to send error to Raygun API:", err);
    return false;
  }
}
