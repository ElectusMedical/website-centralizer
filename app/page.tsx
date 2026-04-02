
import Navigation     from "@/components/Navigation";
import ParallaxHero   from "@/components/ParallaxHero";
import ParallaxSection from "@/components/ParallaxSection";
import GHLEmbed       from "@/components/GHLEmbed";
import Footer         from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <ParallaxHero
        title="Build Something
Remarkable."
        subtitle="A high-performance marketing chassis built with Next.js 15, TinaCMS, and cinematic animations. Fully editable. Infinitely scalable."
        ctaLabel="Get Started Free"
        ctaUrl="/#contact"
      />

      {/* ── 2. Services ──────────────────────────────────────────────────── */}
      <section id="services" className="section-pad bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <ParallaxSection speed={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Everything You Need
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                A complete marketing infrastructure — CMS, animations, CRM, and automation.
              </p>
            </div>
          </ParallaxSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Visual CMS",
                desc: "Edit every word, image, and section directly in TinaCMS — no code required.",
              },
              {
                icon: "⚡",
                title: "Apple-style Animations",
                desc: "Framer Motion parallax layers, smooth scroll, and cinematic transitions.",
              },
              {
                icon: "🔗",
                title: "CRM Integration",
                desc: "GoHighLevel forms and calendars embedded natively. Leads flow to your pipeline automatically.",
              },
            ].map((card, i) => (
              <ParallaxSection key={i} speed={0.15 + i * 0.05} fadeIn>
                <div className="glass p-8 hover:-translate-y-2 transition-transform duration-300 cursor-default">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. About / Features strip ────────────────────────────────────── */}
      <section id="about" className="section-pad bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <ParallaxSection speed={0.25}>
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <span className="text-brand-500 font-semibold text-sm tracking-widest uppercase">The Stack</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Built to Last.
                </h2>
                <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                  Next.js 15 App Router, TinaCMS with local filesystem,
                  Framer Motion, Tailwind CSS, and a direct bridge to n8n
                  for powerful marketing automation.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Next.js 15 (App Router + Turbopack)",
                    "TinaCMS — self-hosted, filesystem mode",
                    "Framer Motion parallax animations",
                    "GoHighLevel CRM integration",
                    "n8n webhook automation bridge",
                    "Dokploy-ready Docker deployment",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
                  <div className="relative w-full h-full glass rounded-3xl flex items-center justify-center">
                    <span className="text-8xl">🚀</span>
                  </div>
                </div>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* ── 4. Contact / GHL Form ─────────────────────────────────────────── */}
      <section id="contact" className="section-pad bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6">
          <ParallaxSection speed={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Let&apos;s Connect
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Fill out the form below and we&apos;ll be in touch shortly.
              </p>
            </div>
            {/* Replace embedCode or src with your actual GHL embed */}
            <GHLEmbed
              type="form"
              height={550}
              showPlaceholder
              // src="https://api.leadconnectorhq.com/widget/form/YOUR_FORM_ID"
              // embedCode={`YOUR GHL EMBED HTML`}
            />
          </ParallaxSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
