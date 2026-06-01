import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CERTS = [
  {
    title: "Google Cloud Course",
    issuer: "Google",
    icon: "☁️",
    color: "#4285F4",
    glow: "rgba(66,133,244,0.4)",
    badge: "CLOUD",
    year: "2024",
  },
  {
    title: "National Financial Literacy",
    issuer: "NISM",
    icon: "📊",
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.4)",
    badge: "QUALIFIED · COLLEGE ROUND",
    year: "2024",
  },
  {
    title: "Hardware, OS & Networking",
    issuer: "Udemy",
    icon: "🖥️",
    color: "#a435f0",
    glow: "rgba(164,53,240,0.4)",
    badge: "SYSTEMS",
    year: "2024",
  },
  {
    title: "C / C++ Programming",
    issuer: "IT Campus",
    icon: "⚙️",
    color: "#00b4d8",
    glow: "rgba(0,180,216,0.4)",
    badge: "PROGRAMMING",
    year: "2024",
  },
];

/* Shimmer sweep animation on each card */
function ShimmerCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -20 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className="relative group"
      style={{ perspective: 800 }}
    >
      {/* Outer glow ring — pulses when in view */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl"
        animate={inView ? {
          boxShadow: [
            `0 0 12px 2px ${cert.glow}`,
            `0 0 28px 8px ${cert.glow}`,
            `0 0 12px 2px ${cert.glow}`,
          ],
        } : { boxShadow: "none" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-6 h-full">

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 -skew-x-12 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${cert.color}22 50%, transparent 100%)`,
          }}
          initial={{ x: "-100%" }}
          animate={inView ? { x: "220%" } : { x: "-100%" }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.12, ease: "easeOut" }}
        />

        {/* Top: badge + year */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-bebas text-[9px] tracking-[0.3em] px-2 py-1 rounded border"
            style={{ color: cert.color, borderColor: `${cert.color}50`, background: `${cert.color}12` }}
          >
            {cert.badge}
          </span>
          <span className="font-rajdhani text-[10px] text-white/20 tracking-widest">{cert.year}</span>
        </div>

        {/* Icon in gold circle */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border-2 text-2xl"
          style={{
            borderColor: `${cert.color}60`,
            background: `radial-gradient(circle, ${cert.color}18 0%, transparent 70%)`,
            boxShadow: `0 0 16px ${cert.color}30`,
          }}
          animate={inView ? { rotate: [0, 8, -8, 0] } : {}}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
        >
          {cert.icon}
        </motion.div>

        {/* Title */}
        <h3 className="font-bebas text-xl text-white tracking-wider leading-tight mb-1">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="font-rajdhani text-xs tracking-[0.25em] uppercase" style={{ color: cert.color }}>
          {cert.issuer}
        </p>

        {/* Divider */}
        <div
          className="w-full h-[1px] mt-4"
          style={{ background: `linear-gradient(to right, ${cert.color}50, transparent)` }}
        />

        {/* Certified stamp */}
        <motion.div
          className="absolute bottom-4 right-4 flex items-center justify-center"
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={inView ? { scale: 1, rotate: -10, opacity: 1 } : { scale: 0, rotate: -15, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.55 + index * 0.12 }}
        >
          <div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: `${cert.color}60`, background: `${cert.color}10` }}
          >
            <span className="font-bebas text-[8px] tracking-[0.15em] text-center leading-tight" style={{ color: cert.color }}>
              CERTI<br />FIED
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Trophy SVG */
function TrophyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 4h12v10a6 6 0 01-12 0V4z" fill="url(#tg)" />
      <path d="M10 4H6a2 2 0 000 4h4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      <path d="M22 4h4a2 2 0 010 4h-4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      <rect x="14" y="20" width="4" height="5" fill="#c9a84c" opacity="0.7" />
      <path d="M11 25h10" stroke="#f0d060" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="tg" x1="10" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d060" />
          <stop offset="1" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, amount: 0.5 });

  return (
    <section id="certifications" className="py-24 relative z-10 bg-[#080808]">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={headerInView ? { rotate: [0, -10, 10, -5, 0] } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TrophyIcon />
            </motion.div>
            <h2 className="text-5xl font-bebas fut-text-gradient tracking-wider">Honours</h2>
            <motion.div
              animate={headerInView ? { rotate: [0, 10, -10, 5, 0] } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="scale-x-[-1]"
            >
              <TrophyIcon />
            </motion.div>
          </div>
          <p className="font-rajdhani text-muted-foreground tracking-widest uppercase text-sm">
            Certifications &amp; Achievements
          </p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent"
            initial={{ width: 0 }}
            animate={headerInView ? { width: "240px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {CERTS.map((cert, i) => (
            <ShimmerCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* Bottom flavour text */}
        <motion.p
          className="text-center font-rajdhani text-xs text-white/15 tracking-[0.4em] uppercase mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          Continuously upgrading — Season 2025
        </motion.p>
      </div>
    </section>
  );
}
