import { defineConfig } from "tinacms";
import { pageCollection } from "./collections/page";

export default defineConfig({
  // ── Hardcoded local mode — no cloud auth, no abstraction ──────────────
  clientId: "local",
  token: "local",
  branch: "main",
  localMode: true,
  contentApiUrlOverride: "http://localhost:4001/graphql",

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
