# 🚀 Website Centralizer

> **Next.js 15 + TinaCMS + GoHighLevel Bridge**  
> Apple-style parallax marketing chassis — fully CMS-editable, GHL-integrated, n8n automation-ready.

---

## ✨ Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router + Turbopack) |
| CMS | TinaCMS (self-hosted, local filesystem) |
| Animations | Framer Motion (parallax, spring physics) |
| Styling | Tailwind CSS 3 |
| CRM | GoHighLevel (GHLEmbed component) |
| Automation | n8n webhook bridge (`lib/n8n-bridge.ts`) |
| Deploy | Docker / Dokploy on Server C |

---

## 🛠 Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Start dev server (TinaCMS + Next.js)
npm run dev
```

TinaCMS admin panel: **http://localhost:3000/admin**  
Next.js app: **http://localhost:3000**

---

## 🏗 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

### Dokploy Deployment (Server C)

1. In Dokploy → **New Application** → **GitHub**
2. Select repo: `ElectusMedical/website-centralizer`
3. Branch: `main`
4. Build command: `npm run build`
5. Start command: `npm start`
6. Port: `3000`
7. Add environment variables from `.env.example`

---

## 📦 Components

### `<GHLEmbed />` — GoHighLevel Embed

```tsx
// Option A: Raw embed code from GHL
<GHLEmbed embedCode={`<div class="hl_form">...</div><script>...</script>`} />

// Option B: Direct URL
<GHLEmbed src="https://api.leadconnectorhq.com/widget/form/FORM_ID" type="form" />

// Option C: Calendar booking
<GHLEmbed src="https://api.leadconnectorhq.com/widget/booking/CALENDAR_ID" type="calendar" height={800} />
```

### `<ParallaxHero />` — Apple-style Hero

```tsx
<ParallaxHero
  title="Your Headline
Second Line"
  subtitle="Supporting copy here"
  ctaLabel="Get Started"
  ctaUrl="/#contact"
/>
```

### `<ParallaxSection />` — Reusable Parallax Wrapper

```tsx
<ParallaxSection speed={0.3} fadeIn>
  <YourContent />
</ParallaxSection>
```

---

## 🔗 n8n Automation Bridge

```ts
import { sendToN8n, captureGHLLead } from "@/lib/n8n-bridge";

// Send any event to n8n
await sendToN8n("lead-capture", { name, email, phone });

// Convenience: GHL lead capture
await captureGHLLead({ name, email, phone, source: "homepage-form" });
```

Set `NEXT_PUBLIC_N8N_BASE_URL` in your environment to point at Server A.

---

## 📝 TinaCMS Content Editing

Content lives in `content/pages/*.mdx`.  
Edit visually at `/admin` or directly in the filesystem.

Each page supports:
- Title, subtitle, CTA
- Hero background image
- Rich text body
- **GHL embed code** (form/calendar per-page)
- SEO meta description

---

## 🌐 GHL Tracking Script

Set `NEXT_PUBLIC_GHL_LOCATION_ID` in your environment variables.  
The tracking snippet is pre-wired in `app/layout.tsx`.

---

*Built with ❤️ by ElectusMedical*
