
"use client";
import { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";

export default function BuilderPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !editorRef.current) return;
    initializedRef.current = true;

    let editor: import("grapesjs").Editor | null = null;

    const initEditor = async () => {
      const grapesjs = (await import("grapesjs")).default;
      const webpagePlugin = (await import("grapesjs-preset-webpage")).default;

      editor = grapesjs.init({
        container: editorRef.current!,
        fromElement: false,
        height: "100vh",
        width: "auto",
        storageManager: {
          type: "local",
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
          options: {
            local: { key: "website-centralizer-builder" },
          },
        },
        plugins: [webpagePlugin],

        canvas: {
          styles: [
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
          ],
        },
        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet",  width: "768px", widthMedia: "768px" },
            { name: "Mobile",  width: "375px", widthMedia: "480px" },
          ],
        },
      });

      // ── Load saved content or set a starter template ──────────────────────
      const saved = localStorage.getItem("website-centralizer-builder-html");
      if (!saved) {
        editor.setComponents(`
          <section style="padding: 120px 40px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h1 style="font-size: 64px; font-weight: 800; margin: 0 0 24px; line-height: 1.1;">Build Something <span style="background: linear-gradient(90deg,#38bdf8,#818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Remarkable.</span></h1>
            <p style="font-size: 20px; color: #94a3b8; max-width: 600px; line-height: 1.7;">Your high-performance marketing site. Edit this page in the builder, embed GHL forms, and automate with n8n.</p>
            <a href="#contact" style="margin-top: 40px; display: inline-block; padding: 16px 40px; background: #0ea5e9; color: white; border-radius: 50px; font-weight: 600; font-size: 16px; text-decoration: none;">Get Started</a>
          </section>
        `);
        editor.setStyle(`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, system-ui, sans-serif; }
        `);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy();
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-950">
      {/* Builder Topbar */}
      <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center px-4
                      bg-gray-900 border-b border-gray-800 pointer-events-none">
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          ✦ Website Centralizer — Visual Builder
        </span>
      </div>
      {/* GrapesJS mounts here */}
      <div ref={editorRef} className="pt-10 w-full h-full" />
    </div>
  );
}
