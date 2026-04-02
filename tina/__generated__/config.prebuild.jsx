// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/page.ts
var pageCollection = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") return "/";
      return `/${document._sys.filename}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Page Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subtitle / Hero Tagline"
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "CTA Button Label"
    },
    {
      type: "string",
      name: "ctaUrl",
      label: "CTA Button URL"
    },
    {
      type: "string",
      name: "metaDescription",
      label: "Meta Description (SEO)",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "heroImage",
      label: "Hero Background Image"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Page Body",
      isBody: true
    },
    // GHL Integration Fields
    {
      type: "object",
      name: "ghl",
      label: "GoHighLevel Integration",
      fields: [
        {
          type: "string",
          name: "embedCode",
          label: "GHL Form/Calendar Embed Code",
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "embedType",
          label: "Embed Type",
          options: ["form", "calendar", "survey", "chat"]
        }
      ]
    }
  ]
};

// tina/config.ts
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true" || !process.env.NEXT_PUBLIC_TINA_CLIENT_ID || !process.env.TINA_TOKEN;
var clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local";
var token = process.env.TINA_TOKEN || "local";
var branch = process.env.TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  // ── Local mode skips all Tina Cloud auth requirements ──────────────────
  ...isLocal ? {} : { branch, clientId, token },
  localMode: isLocal,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [pageCollection]
  }
});
export {
  config_default as default
};
