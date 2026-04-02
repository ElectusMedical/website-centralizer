
/**
 * n8n Automation Bridge
 * ─────────────────────────────────────────────────────────────────────────────
 * Sends lead / event data to n8n webhooks running on Server A.
 *
 * Environment variables:
 *   NEXT_PUBLIC_N8N_BASE_URL   — e.g. http://SERVER_A_IP:5678
 *   N8N_WEBHOOK_SECRET         — optional shared secret for HMAC auth
 *
 * Usage:
 *   import { sendToN8n } from "@/lib/n8n-bridge";
 *
 *   // Fire-and-forget from a Server Action or API Route:
 *   await sendToN8n("lead-capture", { name, email, phone, source });
 *
 *   // With type safety:
 *   await sendToN8n<LeadPayload>("lead-capture", payload);
 */

const N8N_BASE_URL  = process.env.NEXT_PUBLIC_N8N_BASE_URL  || "";
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || "";

/** Supported n8n webhook event types */
export type N8nEventType =
  | "lead-capture"       // New lead from GHL form
  | "contact-form"       // Generic contact form submission
  | "booking-confirmed"  // GHL calendar booking confirmed
  | "page-view"          // Optional: track high-value page views
  | string;              // Extensible

export interface N8nWebhookPayload<T = Record<string, unknown>> {
  event:     N8nEventType;
  timestamp: string;
  source:    string;
  data:      T;
}

/**
 * Send data to an n8n webhook.
 * @param event    - Matches the webhook path segment in n8n: /webhook/{event}
 * @param data     - Arbitrary payload object
 * @param options  - Optional overrides (url, timeout)
 */
export async function sendToN8n<T = Record<string, unknown>>(
  event:   N8nEventType,
  data:    T,
  options?: {
    baseUrl?: string;
    timeout?: number;
  }
): Promise<{ ok: boolean; status?: number; error?: string }> {
  const baseUrl = options?.baseUrl || N8N_BASE_URL;

  if (!baseUrl) {
    console.warn("[n8n-bridge] NEXT_PUBLIC_N8N_BASE_URL is not set — skipping webhook.");
    return { ok: false, error: "N8N_BASE_URL not configured" };
  }

  const url: string = `${baseUrl.replace(/\/$/, "")}/webhook/${event}`;

  const payload: N8nWebhookPayload<T> = {
    event,
    timestamp: new Date().toISOString(),
    source:    process.env.NEXT_PUBLIC_SITE_URL || "website-centralizer",
    data,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Optional HMAC signature for webhook security
  if (WEBHOOK_SECRET) {
    const body   = JSON.stringify(payload);
    const { createHmac } = await import("crypto");
    const sig    = createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex");
    headers["x-n8n-signature"] = `sha256=${sig}`;
  }

  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), options?.timeout || 8000);

  try {
    const res = await fetch(url, {
      method:  "POST",
      headers,
      body:    JSON.stringify(payload),
      signal:  controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[n8n-bridge] Webhook ${event} failed: ${res.status} ${text}`);
      return { ok: false, status: res.status, error: text };
    }

    return { ok: true, status: res.status };
  } catch (err) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[n8n-bridge] Webhook ${event} error: ${message}`);
    return { ok: false, error: message };
  }
}

/**
 * Convenience: capture a lead from a GHL form submission
 */
export async function captureGHLLead(payload: {
  name?:   string;
  email?:  string;
  phone?:  string;
  source?: string;
  formId?: string;
  [key: string]: unknown;
}) {
  return sendToN8n("lead-capture", {
    ...payload,
    crm: "gohighlevel",
    capturedAt: new Date().toISOString(),
  });
}
