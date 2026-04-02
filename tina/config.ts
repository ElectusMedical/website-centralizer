
import { defineConfig } from "tinacms";
import { pageCollection } from "./collections/page";

// ─────────────────────────────────────────────────────────────────────────────
// Local / Self-hosted Mode Detection
//
// TinaCMS runs in one of two modes:
//   1. LOCAL  — reads/writes directly from the filesystem (no auth needed)
//   2. CLOUD  — uses Tina Cloud (requires clientId + token from app.tina.io)
//
// Local mode is active when:
//   - TINA_PUBLIC_IS_LOCAL=true  (explicit override)
//   - SKIP_TINA_CLOUD_CHECK=true (Docker build override)
//   - OR clientId / token are missing from environment
// ─────────────────────────────────────────────────────────────────────────────
const isLocal =
  process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
  process.env.SKIP_TINA_CLOUD_CHECK === "true" ||
  !process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  !process.env.TINA_TOKEN;

const clientId = isLocal ? "local" : (process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local");
const token    = isLocal ? "local" : (process.env.TINA_TOKEN                 || "local");
const branch   = process.env.TINA_BRANCH
              || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
              || "main";

export default defineConfig({
  // ── Local mode: bypass all Tina Cloud auth & network checks ────────────
  ...(isLocal ? {} : { branch, clientId, token }),

  localMode: isLocal,

  // Override the content API URL — in local mode point to local server,
  // preventing any outbound 401 calls to Tina Cloud during build.
  ...(isLocal ? { contentApiUrlOverride: "http://localhost:4001/graphql" } : {}),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [pageCollection],
  },
});
