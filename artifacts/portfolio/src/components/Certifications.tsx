import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const CERTS = [
  {
    title: "Google Cloud Course",
    issuer: "Google",
    icon: "☁️",
    color: "#4285F4",
    glow: "rgba(66,133,244,0.4)",
    badge: "CLOUD",
    year: "2024",
    back: "Completed Google's official cloud fundamentals curriculum covering compute, storage, networking, and core GCP services including Cloud Run and BigQuery.",
  },
  {
    title: "National Financial Literacy",
    issuer: "NISM",
    icon: "📊",
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.4)",
    badge: "QUALIFIED · COLLEGE ROUND",
    year: "2024",
    back: "Cleared the NISM National Financial Literacy examination and qualified for the College Round — demonstrating strong knowledge of markets, investments, and personal finance.",
  },
  {
    title: "Hardware, OS & Networking",
    issuer: "Udemy",
    icon: "🖥️",
    color: "#a435f0",
    glow: "rgba(164,53,240,0.4)",
    badge: "SYSTEMS",
    year: "2024",
    back: "In-depth coverage of computer architecture, operating system internals, TCP/IP networking, and troubleshooting — building a solid systems-level foundation.",
  },
  {
    title: "C / C++ Programming",
    issuer: "IT Campus",
    icon: "⚙️",
    color: "#00b4d8",
    glow: "rgba(0,180,216,0.4)",
    badge: "PROGRAMMING",
    year: "2024",
    back: "Comprehensive training in C and C++ covering pointers, memory management, OOP principles, and algorithm implementation — the roots of all systems programming.",
  },
];

function FlipCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -15 }}
      transition={{ duration: 0.6, delay: index * 0.13, ease: "easeOut" }}
      className="relative h-64 cursor-pointer select-none"
      style={{ perspective: 900 }}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl pointer-events-none"
        animate={inView ? {
          boxShadow: [
            `0 0 10px 2px ${cert.glow}`,
            `0 0 26px 8px ${cert.glow}`,
            `0 0 10px 2px ${cert.glow}`,
          ],
        } : { boxShadow: "none" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />

      {/* Flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-5 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Shimmer sweep on enter */}
          <motion.div
            className="absolute inset-0 -skew-x-12 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${cert.color}20 50%, transparent 100%)` }}
            initial={{ x: "-100%" }}
            animate={inView ? { x: "220%" } : { x: "-100%" }}
            transition={{ duration: 0.85, delay: 0.3 + index * 0.13, ease: "easeOut" }}
          />

          {/* Badge + year */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-bebas text-[9px] tracking-[0.28em] px-2 py-0.5 rounded border"
              style={{ color: cert.color, borderColor: `${cert.color}50`, background: `${cert.color}12` }}
            >
              {cert.badge}
            </span>
            <span className="font-rajdhani text-[10px] text-white/20 tracking-widest">{cert.year}</span>
          </div>

          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl border-2"
            style={{
              borderColor: `${cert.color}55`,
              background: `radial-gradient(circle, ${cert.color}18 0%, transparent 70%)`,
              boxShadow: `0 0 14px ${cert.color}28`,
            }}
            animate={inView ? { rotate: [0, 8, -8, 0] } : {}}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.13 }}
          >
            {cert.icon}
          </motion.div>

          {/* Title */}
          <h3 className="font-bebas text-xl text-white tracking-wider leading-tight mb-1">{cert.title}</h3>
          <p className="font-rajdhani text-xs tracking-[0.22em] uppercase mb-3" style={{ color: cert.color }}>
            {cert.issuer}
          </p>

          {/* Divider */}
          <div className="h-[1px]" style={{ background: `linear-gradient(to right, ${cert.color}50, transparent)` }} />

          {/* Flip hint */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1">
            <span className="font-rajdhani text-[9px] tracking-widest text-white/20">TAP TO FLIP</span>
            <motion.span
              className="text-[9px]"
              style={{ color: `${cert.color}60` }}
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >⟳</motion.span>
          </div>

          {/* Certified stamp */}
          <motion.div
            className="absolute bottom-3 left-4"
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={inView ? { scale: 1, rotate: -10, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.55 + index * 0.13 }}
          >
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `${cert.color}55`, background: `${cert.color}10` }}
            >
              <span className="font-bebas text-[7px] tracking-[0.1em] text-center leading-tight" style={{ color: cert.color }}>
                CERTI<br />FIED
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border overflow-hidden flex flex-col p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${cert.color}40`,
            background: `linear-gradient(135deg, ${cert.color}14 0%, #0a0a0a 60%)`,
          }}
        >
          {/* Back shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${cert.color}12 0%, transparent 65%)`,
            }}
          />

          {/* Back header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{cert.icon}</span>
            <div>
              <p className="font-bebas text-sm text-white tracking-widest leading-none">{cert.title}</p>
              <p className="font-rajdhani text-[9px] tracking-widest uppercase" style={{ color: cert.color }}>{cert.issuer}</p>
            </div>
          </div>

          <div className="h-[1px] mb-3" style={{ background: `linear-gradient(to right, ${cert.color}50, transparent)` }} />

          {/* Description */}
          <p className="font-rajdhani text-xs text-white/60 leading-relaxed flex-1">{cert.back}</p>

          {/* Verified badge */}
          <div
            className="mt-3 self-end flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bebas tracking-widest"
            style={{ borderColor: `${cert.color}50`, color: cert.color, background: `${cert.color}10` }}
          >
            ✓ VERIFIED
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

function TrophyIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <path d="M10 4h12v10a6 6 0 01-12 0V4z" fill="url(#tg2)" />
      <path d="M10 4H6a2 2 0 000 4h4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      <path d="M22 4h4a2 2 0 010 4h-4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      <rect x="14" y="20" width="4" height="5" fill="#c9a84c" opacity="0.7" />
      <path d="M11 25h10" stroke="#f0d060" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="tg2" x1="10" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d060" /><stop offset="1" stopColor="#c9a84c" />
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
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
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
              animate={headerInView ? { rotate: [0, -12, 10, -5, 0] } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            ><TrophyIcon /></motion.div>
            <h2 className="text-5xl font-bebas fut-text-gradient tracking-wider">Honours</h2>
            <motion.div
              animate={headerInView ? { rotate: [0, 12, -10, 5, 0] } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="scale-x-[-1]"
            ><TrophyIcon /></motion.div>
          </div>
          <p className="font-rajdhani text-muted-foreground tracking-widest uppercase text-sm">
            Certifications &amp; Achievements — tap any card to reveal details
          </p>
          <motion.div
            className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent"
            initial={{ width: 0 }}
            animate={headerInView ? { width: "240px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
        </motion.div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {CERTS.map((cert, i) => (
            <FlipCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

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
