
"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About",    href: "/#about" },
  { label: "Contact",  href: "/#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold gradient-text">
          Centralizer
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300
                           hover:text-brand-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold
                     transition-all duration-200 shadow-lg shadow-brand-500/30
                     hover:shadow-brand-500/50 hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}
