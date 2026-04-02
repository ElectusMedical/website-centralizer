
import { defineConfig } from "tinacms";
import { pageCollection } from "./collections/page";

export default defineConfig({
  // Self-hosted local filesystem mode
  // For cloud: set clientId and token from app.tina.io
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
