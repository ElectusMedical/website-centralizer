"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const glassCard = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Feature data ─────────────────────────────────────────────────────────────
const features = [
  { icon: "⚡", title: "Instant Deployment",   desc: "From idea to live site in minutes. One click. No friction. Full power." },
  { icon: "🎨", title: "Visual Builder",        desc: "Drag, drop, and design. The GrapesJS canvas gives you full creative control." },
  { icon: "🔗", title: "GHL Integration",       desc: "GoHighLevel forms and funnels embedded natively. Your CRM, your way." },
  { icon: "🤖", title: "n8n Automation",        desc: "Webhooks to n8n. Automate lead capture, notifications, and data sync." },
  { icon: "📊", title: "Real Analytics",        desc: "Know what works. Live tracking wired directly into your marketing stack." },
  { icon: "🔒", title: "Secure & Private",      desc: "Self-hosted on your infrastructure. Your data never leaves your server." },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "<30s",   label: "Deploy time" },
  { value: "100%",   label: "Self-hosted" },
  { value: "∞",      label: "Pages & sites" },
  { value: "0",      label: "Vendor lock-in" },
];

export default function Home() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const orb1Y  = useTransform(scrollY, [0, 600], [0, -120]);
  const orb2Y  = useTransform(scrollY, [0, 600], [0,  80]);
  const heroY  = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <main className="relative bg-[#020617] min-h-screen overflow-x-hidden">

      {/* ── Ambient animated orbs ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <motion.div style={{ y: orb1Y }}
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full
                     bg-gradient-to-br from-sky-500/20 to-indigo-600/10
                     blur-[120px] animate-pulse-slow" />
        <motion.div style={{ y: orb2Y }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full
                     bg-gradient-to-tl from-violet-600/20 to-fuchsia-500/10
                     blur-[100px] animate-pulse-slow" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px]
                        rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50
                   border-b border-white/[0.06]
                   bg-[rgba(2,6,23,0.7)] backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-black text-xl tracking-tight
                           bg-gradient-to-r from-sky-400 to-indigo-400
                           bg-clip-text text-transparent">
            ✦ Website Centralizer
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Builder", "Contact"].map((item) => (
              <a key={item}
                href={item === "Builder" ? "/builder" : `#${item.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
                {item}
              </a>
            ))}
            <a href="/builder"
              className="text-sm font-semibold px-4 py-2 rounded-full
                         bg-gradient-to-r from-sky-500 to-indigo-600
                         hover:from-sky-400 hover:to-indigo-500
                         text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25">
              Open Builder →
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center
                   px-6 pt-24 pb-16 text-center">
        <motion.div style={{ y: heroY }} className="w-full flex flex-col items-center">

          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border border-sky-500/30 bg-sky-500/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-semibold text-sky-300 tracking-widest uppercase">
              Self-Hosted Marketing Platform
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-6xl md:text-8xl font-black leading-[1.03] text-white mb-6
                       max-w-5xl tracking-tight">
            Build Sites That{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500
                             bg-clip-text text-transparent">
              Convert.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            The all-in-one visual builder for marketing teams.
            GrapesJS canvas. GHL-native. n8n-automated.
            Fully self-hosted on your infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row gap-4 mb-20">
            <a href="/builder"
              className="group px-8 py-4 rounded-full font-bold text-white text-base
                         bg-gradient-to-r from-sky-500 to-indigo-600
                         hover:from-sky-400 hover:to-indigo-500
                         transition-all hover:shadow-2xl hover:shadow-indigo-500/30
                         hover:-translate-y-0.5 active:translate-y-0">
              Open Visual Builder
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#features"
              className="px-8 py-4 rounded-full font-semibold text-slate-300 text-base
                         border border-white/10 bg-white/[0.04] backdrop-blur-sm
                         hover:bg-white/[0.08] hover:text-white
                         transition-all hover:-translate-y-0.5">
              See Features
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="grid grid-cols-2 md:grid-cols-4 gap-px
                       rounded-2xl overflow-hidden border border-white/[0.06]
                       bg-white/[0.06] backdrop-blur-sm w-full max-w-3xl">
            {stats.map((s) => (
              <div key={s.label}
                className="flex flex-col items-center py-6 px-4 bg-[#020617]/60">
                <span className="text-3xl font-black text-white mb-1">{s.value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-4">Everything In One Place</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              No more juggling 10 tools. One platform, full control.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                variants={glassCard} initial="hidden"
                whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-8 rounded-2xl
                           border border-white/[0.08] bg-white/[0.03]
                           backdrop-blur-sm hover:bg-white/[0.06]
                           hover:border-indigo-500/30
                           transition-colors cursor-default">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                                transition-opacity duration-500
                                bg-gradient-to-br from-indigo-500/5 to-transparent" />
                <div className="relative">
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative p-12 rounded-3xl text-center
                       border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm
                       overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-500/10" />
            <div className="relative">
              <h2 className="text-5xl font-black text-white mb-4">Ready to Launch?</h2>
              <p className="text-slate-400 text-lg mb-10">
                Get access to the platform and start building today.
              </p>
              <a href="/builder"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full
                           font-bold text-white text-lg
                           bg-gradient-to-r from-sky-500 to-indigo-600
                           hover:from-sky-400 hover:to-indigo-500
                           transition-all hover:shadow-2xl hover:shadow-indigo-500/40
                           hover:-translate-y-1 active:translate-y-0">
                Start Building →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <span className="font-black text-sm tracking-tight
                           bg-gradient-to-r from-sky-400 to-indigo-400
                           bg-clip-text text-transparent">
            ✦ Website Centralizer
          </span>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} — Built different. Built yours.
          </p>
          <a href="/builder"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Open Builder →
          </a>
        </div>
      </footer>

    </main>
  );
}
