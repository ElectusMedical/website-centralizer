import { defineConfig } from "tinacms";
import { pageCollection } from "./collections/page";

export default defineConfig({
  // Hardcoded local mode — no cloud auth, no network fetch during build
  clientId: "local",
  token: "local",
  branch: "main",
  localMode: true,
  contentApiUrlOverride: "/api/graphql",

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
