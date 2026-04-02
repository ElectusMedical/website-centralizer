
"use client";
import { useEffect, useRef } from "react";

type EmbedType = "form" | "calendar" | "survey" | "chat";

interface GHLEmbedProps {
  /**
   * The full HTML embed code copied from GHL → Sites → Funnels/Forms/Calendar.
   * Paste the <div> + <script> block from GHL here.
   */
  embedCode?: string;

  /**
   * Convenience: pass just the form/calendar URL from GHL instead of raw HTML.
   * The component will build a responsive iframe for you.
   */
  src?: string;

  /**
   * Type of GHL element (informational / future styling hooks)
   */
  type?: EmbedType;

  /** Height for iframe mode. Default: 600 */
  height?: number;

  /** Additional CSS classes */
  className?: string;

  /** Show a branded loading placeholder while GHL scripts load */
  showPlaceholder?: boolean;
}

/**
 * GHLEmbed — Universal GoHighLevel Embed Component
 *
 * Usage examples:
 *
 * 1. Raw embed code from GHL:
 *    <GHLEmbed embedCode={`<div class="hl_form-iframe-container">...</div><script>...</script>`} />
 *
 * 2. Direct URL (iframe mode):
 *    <GHLEmbed src="https://api.leadconnectorhq.com/widget/form/FORM_ID" type="form" />
 *
 * 3. Calendar booking widget:
 *    <GHLEmbed src="https://api.leadconnectorhq.com/widget/booking/CALENDAR_ID" type="calendar" height={800} />
 */
export default function GHLEmbed({
  embedCode,
  src,
  type      = "form",
  height    = 600,
  className = "",
  showPlaceholder = true,
}: GHLEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedCode || !containerRef.current) return;

    // Inject raw HTML (GHL embed snippets contain inline scripts)
    containerRef.current.innerHTML = embedCode;

    // Re-execute any <script> tags injected via innerHTML
    const scripts = containerRef.current.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [embedCode]);

  // ── Placeholder (no embed code or src yet) ───────────────────────────────
  if (!embedCode && !src) {
    if (!showPlaceholder) return null;
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4
                    rounded-2xl border-2 border-dashed border-brand-500/30
                    bg-brand-50/50 dark:bg-brand-950/20 text-center
                    p-10 ${className}`}
        style={{ minHeight: height }}
      >
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293
                 l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            GHL {type.charAt(0).toUpperCase() + type.slice(1)} — Not Configured
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Add your embed code via TinaCMS or pass the <code>src</code> / <code>embedCode</code> prop.
          </p>
        </div>
      </div>
    );
  }

  // ── iframe mode (src provided) ────────────────────────────────────────────
  if (src) {
    return (
      <div className={`w-full overflow-hidden rounded-2xl ${className}`}>
        <iframe
          src={src}
          style={{ width: "100%", height, border: "none", borderRadius: "1rem" }}
          title={`GHL ${type} embed`}
          allow="camera; microphone; autoplay; encrypted-media"
          loading="lazy"
        />
      </div>
    );
  }

  // ── Raw embed code mode ───────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`w-full ghl-embed-container ${className}`}
    />
  );
}
