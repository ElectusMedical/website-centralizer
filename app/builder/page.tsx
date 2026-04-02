"use client";
import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";

// Professional seed template — loaded only on first visit
const SEED_TEMPLATE = {
  html: `
    <body>
      <nav style="position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;background:rgba(15,23,42,0.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="font-size:20px;font-weight:800;background:linear-gradient(90deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">YourBrand</div>
        <div style="display:flex;gap:32px;">
          <a href='#services' style="color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;">Services</a>
          <a href='#about' style="color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;">About</a>
          <a href='#contact' style="color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;">Contact</a>
          <a href='#contact' style="padding:8px 20px;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:white;border-radius:20px;text-decoration:none;font-size:14px;font-weight:600;">Get Started</a>
        </div>
      </nav>

      <section style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);padding:120px 40px 80px;text-align:center;">
        <div style="display:inline-block;padding:6px 16px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);border-radius:20px;margin-bottom:24px;">
          <span style="color:#38bdf8;font-size:12px;font-weight:600;letter-spacing:0.1em;">INTRODUCING THE PLATFORM</span>
        </div>
        <h1 style="font-size:72px;font-weight:900;line-height:1.05;color:white;margin:0 0 24px;max-width:900px;">Build Something <br><span style="background:linear-gradient(90deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Remarkable.</span></h1>
        <p style="font-size:20px;color:#94a3b8;max-width:600px;line-height:1.7;margin:0 0 48px;">The all-in-one platform for marketing teams who refuse to compromise on speed, design, or results.</p>
        <div style="display:flex;gap:16px;">
          <a href='#contact' style="padding:16px 40px;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:white;border-radius:50px;font-weight:700;font-size:16px;text-decoration:none;">Start Free Trial</a>
          <a href='#services' style="padding:16px 40px;background:rgba(255,255,255,0.05);color:white;border-radius:50px;font-weight:600;font-size:16px;text-decoration:none;border:1px solid rgba(255,255,255,0.15);">See How It Works</a>
        </div>
      </section>

      <section id="services" style="padding:100px 40px;background:#0f172a;">
        <div style="max-width:1100px;margin:0 auto;">
          <h2 style="text-align:center;font-size:44px;font-weight:800;color:white;margin:0 0 16px;">Everything You Need</h2>
          <p style="text-align:center;color:#64748b;font-size:18px;margin:0 0 64px;">One platform. Zero compromises.</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
            <div style="padding:32px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
              <div style="font-size:32px;margin-bottom:16px;">⚡</div>
              <h3 style="color:white;font-size:20px;font-weight:700;margin:0 0 12px;">Lightning Fast</h3>
              <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0;">Deploy in minutes, not months. Our platform is built for speed from the ground up.</p>
            </div>
            <div style="padding:32px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
              <div style="font-size:32px;margin-bottom:16px;">🎯</div>
              <h3 style="color:white;font-size:20px;font-weight:700;margin:0 0 12px;">Precision Targeting</h3>
              <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0;">Reach the right audience at the right time with AI-powered campaign tools.</p>
            </div>
            <div style="padding:32px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
              <div style="font-size:32px;margin-bottom:16px;">📊</div>
              <h3 style="color:white;font-size:20px;font-weight:700;margin:0 0 12px;">Real Analytics</h3>
              <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0;">Make decisions with data. Live dashboards that actually make sense.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style="padding:100px 40px;background:linear-gradient(135deg,#0ea5e9,#6366f1);text-align:center;">
        <h2 style="font-size:48px;font-weight:900;color:white;margin:0 0 16px;">Ready to Launch?</h2>
        <p style="font-size:18px;color:rgba(255,255,255,0.8);margin:0 0 40px;">Join 500+ teams already growing with our platform.</p>
        <a href="mailto:hello@yourbrand.com" style="display:inline-block;padding:18px 48px;background:white;color:#0ea5e9;border-radius:50px;font-weight:800;font-size:18px;text-decoration:none;">Get In Touch</a>
      </section>

      <footer style="padding:40px;background:#020617;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
        <p style="color:#475569;font-size:14px;margin:0;">© 2026 YourBrand. Built with Website Centralizer.</p>
      </footer>
    </body>
  `,
  css: `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Inter, system-ui, -apple-system, sans-serif; background: #0f172a; }
    a { cursor: pointer; }
    @media (max-width: 768px) {
      h1 { font-size: 42px !important; }
      nav div:last-child { display: none; }
      div[style*="grid-template-columns:repeat(3"] { grid-template-columns: 1fr !important; }
      div[style*="display:flex;gap:16px"] { flex-direction: column; align-items: center; }
    }
  `
};

export default function BuilderPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const editorInstanceRef = useRef<import("grapesjs").Editor | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = async () => {
    const editor = editorInstanceRef.current;
    if (!editor) return;
    setSaveStatus("saving");
    try {
      const payload = {
        html:       editor.getHtml(),
        css:        editor.getCss(),
        components:  editor.getComponents(),
        styles:     editor.getStyle(),
        savedAt:    new Date().toISOString(),
      };
      const res = await fetch("/api/save-design", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      setSaveStatus(res.ok ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    } finally {
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  useEffect(() => {
    if (initializedRef.current || !editorRef.current) return;
    initializedRef.current = true;

    let editor: import("grapesjs").Editor | null = null;

    const initEditor = async () => {
      const grapesjs      = (await import("grapesjs")).default;
      const webpagePlugin = (await import("grapesjs-preset-webpage")).default;

      editor = grapesjs.init({
        container: editorRef.current!,
        fromElement: false,
        height: "100vh",
        width:  "auto",
        storageManager: {
          type:    "local",
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
          options: { local: { key: "wc-builder-v2" } },
        },
        plugins: [webpagePlugin],
        canvas: {
          styles: [
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
          ],
        },
        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet",  width: "768px",  widthMedia: "768px" },
            { name: "Mobile",  width: "375px",  widthMedia: "480px" },
          ],
        },
      });

      editorInstanceRef.current = editor;

      // Load saved design or seed template
      const hasSaved = localStorage.getItem("wc-builder-v2-html");
      if (!hasSaved) {
        editor.setComponents(SEED_TEMPLATE.html);
        editor.setStyle(SEED_TEMPLATE.css);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy();
        initializedRef.current = false;
        editorInstanceRef.current = null;
      }
    };
  }, []);

  const statusLabel = {
    idle:   "💾 Save to Server",
    saving: "⏳ Saving…",
    saved:  "✅ Saved!",
    error:  "❌ Error — Retry",
  }[saveStatus];

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-950 relative">
      {/* Topbar */}
      <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-4
                      bg-gray-900 border-b border-gray-800">
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase select-none">
          ✦ Website Centralizer — Visual Builder
        </span>
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="text-xs font-semibold px-3 py-1 rounded-md transition-all
                     bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white"
        >
          {statusLabel}
        </button>
      </div>
      {/* GrapesJS canvas */}
      <div ref={editorRef} className="pt-10 w-full h-full" />
    </div>
  );
}
