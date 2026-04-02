
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
//   - OR clientId / token are missing from environment
// ─────────────────────────────────────────────────────────────────────────────
const isLocal =
  process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
  !process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  !process.env.TINA_TOKEN;

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local";
const token    = process.env.TINA_TOKEN                 || "local";
const branch   = process.env.TINA_BRANCH
              || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
              || "main";

export default defineConfig({
  // ── Local mode skips all Tina Cloud auth requirements ──────────────────
  ...(isLocal ? {} : { branch, clientId, token }),

  localMode: isLocal,

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
