
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;          // 0 = no movement, 1 = full parallax
  className?: string;
  fadeIn?: boolean;
}

export default function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
  fadeIn = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  const y   = useSpring(raw, { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{
          y,
          opacity: fadeIn ? opacity : 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
