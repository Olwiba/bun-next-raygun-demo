<div align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img alt="Next.js logo" src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
  </a>
  <h1>Bun + Next.js + Raygun Demo</h1>

<a href="https://bun.sh"><img alt="Powered by Bun" src="https://img.shields.io/badge/Powered%20by-Bun-black?style=for-the-badge&logo=bun"></a>
<a href="https://nextjs.org"><img alt="Built with Next.js" src="https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js"></a>
<a href="https://raygun.com"><img alt="Error tracking by Raygun" src="https://img.shields.io/badge/Error%20Tracking-Raygun-blue?style=for-the-badge"></a>

</div>

## Overview

This demo application showcases how to implement Raygun error tracking in a Next.js application running on Bun. It demonstrates both client-side and server-side error reporting using environment variables for configuration.

## Architecture

The application demonstrates a modern approach to error tracking in Next.js applications:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0070f3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#0070f3', 'lineColor': '#666', 'secondaryColor': '#f8f9fa', 'tertiaryColor': '#e9ecef', 'edgeLabelBackground': '#ffffff' }}}%%
graph TD
    A[Client-Side App] -->|<span style='color:black;font-weight:bold'>Error occurs</span>| B[raygun-client.ts]
    B -->|<span style='color:black;font-weight:bold'>Reports via Browser SDK</span>| C[Raygun API]

    D[Server-Side App] -->|<span style='color:black;font-weight:bold'>Error occurs</span>| E[raygun-server.ts]
    E -->|<span style='color:black;font-weight:bold'>Reports via Custom API Call</span>| C

    style A fill:#0070f3,stroke:#0055b3,color:#fff,stroke-width:2px
    style D fill:#0070f3,stroke:#0055b3,color:#fff,stroke-width:2px
    style B fill:#e9f5ff,stroke:#0070f3,color:#000,stroke-width:1px,font-weight:bold
    style E fill:#e6f7e6,stroke:#28a745,color:#000,stroke-width:1px,font-weight:bold
    style C fill:#232f3e,stroke:#000,color:#fff,stroke-width:2px
```

## Key Features

- **Client-side error tracking** using the Raygun Browser SDK
- **Server-side error tracking** using custom fetch implementation for Server Actions
- **Environment variable configuration** for secure API key management
- **Bun runtime support** for improved development experience

## Setup

1. Clone this repository
2. Create **.env.local** file with your Raygun API key:
   ```bash
   cp .env.example .env.local
   ```
   Edit the **.env.local** file with your Raygun API key:
   ```
   NEXT_PUBLIC_RAYGUN_API_KEY=your_api_key_here
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Run the development server:
   ```bash
   bun run dev
   ```
5. Open http://localhost:3000 to view the application

## Implementation Details

### Server-Side Error Tracking

Instead of using the Raygun SDK (which has compatibility issues with Next.js Server Actions), this demo implements a custom solution in `app/actions/raygun-server.ts` that makes direct API calls to Raygun.

### Client-Side Error Tracking

Client-side error tracking is implemented in two ways:

1. Inline script in `app/layout.tsx` for global error tracking
2. Dynamic loading in `app/utils/raygun-client.ts` for more advanced use cases

### Environment Variables

All Raygun API keys are stored in environment variables:

- `NEXT_PUBLIC_RAYGUN_API_KEY` - accessible from both client and server

## Usage Examples

### Triggering a Test Error

The application includes functions to test both client and server error reporting:

```javascript
// Client-side error test
import { sendRaygunClientError } from "@/app/utils/raygun-client";
sendRaygunClientError(new Error("Test client error"));

// Server-side error test
import { triggerServerError } from "@/app/actions/raygun-server";
await triggerServerError();
```
