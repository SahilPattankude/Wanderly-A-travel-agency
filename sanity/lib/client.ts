import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isSanityConfigured = Boolean(projectId);

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-08-13",
      // Bypass the CDN so Studio publications appear immediately.
      useCdn: false,
    })
  : null;
