
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

interface ParallaxHeroProps {
  title?:    string;
  subtitle?: string;
  ctaLabel?: string;
  ctaUrl?:   string;
}

export default function ParallaxHero({
  title    = "Build Something
Remarkable.",
  subtitle = "A high-performance marketing chassis built with Next.js 15, TinaCMS, and cinematic animations.",
  ctaLabel = "Get Started",
  ctaUrl   = "/#contact",
}: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers — each at different depth
  const bgY     = useSpring(useTransform(scrollYProgress, [0, 1], ["0%",  "40%"]), { stiffness: 60, damping: 18 });
  const midY    = useSpring(useTransform(scrollYProgress, [0, 1], ["0%",  "20%"]), { stiffness: 70, damping: 20 });
  const fgY     = useSpring(useTransform(scrollYProgress, [0, 1], ["0%",  "10%"]), { stiffness: 80, damping: 22 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Layer 1: Deep Background Gradient (slowest) ── */}
      <motion.div
        style={{ y: bgY, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </motion.div>

      {/* ── Layer 2: Floating Orbs (medium speed) ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-float [animation-delay:2s]" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-float [animation-delay:4s]" />
      </motion.div>

      {/* ── Layer 3: Grid Overlay ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* ── Layer 4: Foreground Content (fastest — least parallax) ── */}
      <motion.div
        style={{ y: fgY, opacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             border border-white/10 bg-white/5 backdrop-blur-sm
                             text-xs font-semibold text-brand-300 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Powered by Next.js 15 + TinaCMS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]"
          >
            {title.split("\n").map((line, i) => (
              <span key={i} className={`block ${i > 0 ? "gradient-text" : ""}` }>{line}</span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={ctaUrl}
              className="inline-flex items-center justify-center gap-2
                         px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-400
                         text-white font-semibold text-base
                         transition-all duration-300
                         shadow-[0_0_30px_rgba(14,165,233,0.4)]
                         hover:shadow-[0_0_50px_rgba(14,165,233,0.6)]
                         hover:-translate-y-1"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2
                         px-8 py-4 rounded-full border border-white/10
                         bg-white/5 hover:bg-white/10 backdrop-blur-sm
                         text-white font-semibold text-base
                         transition-all duration-300 hover:-translate-y-1"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
