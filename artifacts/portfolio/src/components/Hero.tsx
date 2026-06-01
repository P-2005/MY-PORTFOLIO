import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import FUTCard from "./FUTCard";
import GoldParticles from "./GoldParticles";

const PHASE = {
  BLACKOUT:   0,
  NATION:     1,
  VIT:        2,
  CARD:       3,
  NAME:       4,
  TRANSITION: 5,
} as const;
type Phase = (typeof PHASE)[keyof typeof PHASE];

/* ─── VIT Chennai Emblem ─── */
function VITEmblem() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Shield crest */}
      <div className="relative w-32 h-36 flex items-center justify-center"
        style={{ filter: "drop-shadow(0 0 30px rgba(201,168,76,0.8))" }}>
        <svg width="128" height="144" viewBox="0 0 128 144" fill="none">
          {/* Shield border */}
          <path d="M64 4 L120 24 L120 88 Q120 130 64 142 Q8 130 8 88 L8 24 Z"
            fill="url(#vitGold)" stroke="#f0d060" strokeWidth="2" />
          <defs>
            <linearGradient id="vitGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1408" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
          </defs>
          {/* Inner shield line */}
          <path d="M64 12 L112 28 L112 88 Q112 124 64 136 Q16 124 16 88 L16 28 Z"
            fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
          {/* VIT text */}
          <text x="64" y="70" textAnchor="middle" fill="#f0d060"
            fontSize="32" fontWeight="bold" fontFamily="Arial" letterSpacing="4">VIT</text>
          {/* Divider line */}
          <line x1="28" y1="80" x2="100" y2="80" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
          {/* Stars row */}
          {[-24, -12, 0, 12, 24].map((offset, i) => (
            <text key={i} x={64 + offset} y="100" textAnchor="middle"
              fill="#c9a84c" fontSize="10" fontFamily="Arial">★</text>
          ))}
          {/* Est. year */}
          <text x="64" y="120" textAnchor="middle" fill="rgba(201,168,76,0.5)"
            fontSize="8" fontFamily="Arial" letterSpacing="3">EST. 1984</text>
        </svg>
      </div>
    </div>
  );
}


/* ─── Indian Flag ─── */
function IndianFlag() {
  return (
    <div className="w-44 h-28 flex flex-col overflow-hidden rounded-sm border border-white/10 shadow-[0_0_40px_rgba(255,153,51,0.6)]">
      <div className="flex-1 bg-[#FF9933]" />
      <div className="flex-1 bg-white flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#000080" strokeWidth="1.2" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line key={i}
                x1={12 + 2.5 * Math.cos(angle)} y1={12 + 2.5 * Math.sin(angle)}
                x2={12 + 9.5 * Math.cos(angle)} y2={12 + 9.5 * Math.sin(angle)}
                stroke="#000080" strokeWidth="0.8" strokeLinecap="round" />
            );
          })}
          <circle cx="12" cy="12" r="2" fill="#000080" />
        </svg>
      </div>
      <div className="flex-1 bg-[#138808]" />
    </div>
  );
}

/* ─── Shockwave rings ─── */
function Shockwave() {
  return (
    <>
      {[0, 0.12, 0.24].map((delay, i) => (
        <motion.div key={i}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f0d060] pointer-events-none"
          initial={{ width: 10, height: 10, opacity: 0.9 }}
          animate={{ width: 600, height: 600, opacity: 0 }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ─── Spark burst on flag slam ─── */
function SparkBurst({ sparks }: { sparks: { angle: number; dist: number; size: number }[] }) {
  return (
    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {sparks.map((s, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-[#f0d060]"
          style={{ width: s.size, height: s.size }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
            y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
            opacity: 0,
          }}
          transition={{ duration: 0.55, delay: i * 0.015, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Lightning bolt ─── */
function LightningBolt({ d, delay, color }: { d: string; delay: number; color: string }) {
  const id = `glow-${delay}`;
  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      viewBox="0 0 1280 720" preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0.6, 0] }}
      transition={{ duration: 0.55, delay, times: [0, 0.08, 0.45, 0.75, 1] }}
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path d={d} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"
        filter={`url(#${id})`}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.18, delay }} />
      <motion.path d={d} stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.9 }} animate={{ pathLength: 1, opacity: 0 }}
        transition={{ duration: 0.22, delay }} />
    </motion.svg>
  );
}

/* ─── Lens flare ─── */
function LensFlare() {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 0] }}
      transition={{ duration: 0.7, times: [0, 0.1, 0.5, 1] }}>
      <div className="w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(160,210,255,0.2) 35%, transparent 65%)" }} />
    </motion.div>
  );
}

/* ─── Falling gold particles (phase 4) ─── */
function FallingParticles({ particles }: { particles: { x: number; delay: number; size: number; dur: number }[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-[#f0d060]"
          style={{ left: `${p.x}%`, top: -8, width: p.size, height: p.size }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: "100vh", opacity: 0 }}
          transition={{ duration: p.dur, delay: p.delay, ease: "linear" }} />
      ))}
    </div>
  );
}

const LIGHTNING_BOLTS = [
  { d: "M-60,178 L180,152 L340,194 L500,168 L660,200 L820,166 L990,196 L1160,174 L1340,184", delay: 0,    color: "#90c8ff" },
  { d: "M-60,358 L200,338 L370,374 L540,348 L700,378 L860,350 L1030,372 L1190,354 L1340,362", delay: 0.07, color: "#b0d8ff" },
  { d: "M1340,518 L1120,496 L970,530 L820,508 L670,536 L520,514 L370,538 L220,518 L60,528 L-60,524", delay: 0.14, color: "#a0b8ff" },
  { d: "M-60,268 L280,248 L540,268 L800,250 L1060,270 L1340,256", delay: 0.04, color: "#ffffff" },
  { d: "M-60,440 L240,424 L480,448 L720,428 L960,448 L1200,432 L1340,440", delay: 0.10, color: "#80b0ff" },
];

export default function Hero({ onRevealComplete }: { onRevealComplete?: () => void }) {
  const [phase, setPhase] = useState<Phase>(PHASE.BLACKOUT);
  const shakeControls = useAnimation();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sparks = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      angle: i * (360 / 16),
      dist: 70 + Math.floor(i * 3.7) % 60,
      size: 2 + (i % 3),
    })), []);

  const fallingParticles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      x: (i * 3.7) % 100,
      delay: (i * 0.07) % 0.8,
      size: 2 + (i % 3),
      dur: 1.2 + (i % 5) * 0.2,
    })), []);

  /* advance one phase per click */
  const advance = useCallback(() => {
    setPhase(prev => {
      if (prev >= PHASE.NAME) {
        /* final click → transition out */
        setTimeout(() => onRevealComplete?.(), 650);
        return PHASE.TRANSITION;
      }
      const next = (prev + 1) as Phase;
      if (next === PHASE.NATION) {
        setTimeout(() => shakeControls.start({
          x: [-5, 5, -4, 4, -2, 2, -1, 1, 0],
          transition: { duration: 0.45, ease: "easeOut" },
        }), 350);
      }
      return next;
    });
  }, [shakeControls, onRevealComplete]);

  const complete = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setPhase(PHASE.TRANSITION);
    setTimeout(() => onRevealComplete?.(), 650);
  }, [onRevealComplete]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <>
      {/* ══ WALKOUT OVERLAY ══ */}
      <AnimatePresence>
        {phase < PHASE.TRANSITION && (
          <motion.div key="overlay"
            className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
            onClick={advance}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          >
            {/* SKIP — always visible, stops propagation so it doesn't also advance */}
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={e => { e.stopPropagation(); complete(); }}
              className="fixed top-5 right-6 z-[200] font-bebas text-xs tracking-[0.35em] text-[#c9a84c]/50 hover:text-[#c9a84c] border border-[#c9a84c]/20 hover:border-[#c9a84c]/50 px-4 py-2 transition-all cursor-pointer"
              data-testid="button-skip"
            >
              SKIP
            </motion.button>

            {/* TAP hint — shown during BLACKOUT and between phases */}
            {phase < PHASE.NAME && (
              <motion.div
                key={`tap-${phase}`}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-1 pointer-events-none"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-5 h-5 border-2 border-[#c9a84c]/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/70" />
                </motion.div>
                <span className="font-bebas text-[10px] tracking-[0.4em] text-[#c9a84c]/40">
                  {phase === PHASE.BLACKOUT ? "CLICK TO BEGIN" : "CLICK TO CONTINUE"}
                </span>
              </motion.div>
            )}

            {/* Animated background */}
            <motion.div className="absolute inset-0"
              animate={{
                background: phase <= PHASE.NATION
                  ? "radial-gradient(ellipse at 50% 60%, #0c0b08 0%, #000000 100%)"
                  : "radial-gradient(ellipse at 50% 50%, #0d1520 0%, #07090f 55%, #000000 100%)",
              }}
              transition={{ duration: 0.9 }}
            />


            {/* Shaking container */}
            <motion.div animate={shakeControls} className="absolute inset-0">

              {/* ── PHASE 0: Pure black ── */}
              {/* nothing rendered */}

              {/* ── PHASE 1: NATION SLAM ── */}
              <AnimatePresence>
                {phase === PHASE.NATION && (
                  <motion.div key="nation"
                    className="absolute inset-0 flex flex-col items-center justify-center z-20"
                    exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.25 } }}
                  >
                    <Shockwave />
                    <SparkBurst sparks={sparks} />

                    {/* Smoky glow behind flag */}
                    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full blur-3xl"
                      style={{ background: "radial-gradient(ellipse, rgba(255,200,80,0.18) 0%, transparent 70%)" }} />

                    <motion.div
                      initial={{ y: -320, rotate: -10, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                    >
                      <IndianFlag />
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, letterSpacing: "0.05em", y: 20 }}
                      animate={{ opacity: 1, letterSpacing: "0.55em", y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="font-bebas text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-[#f0d060] mt-8 drop-shadow-[0_0_40px_rgba(240,208,96,0.65)]"
                    >
                      INDIA
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      className="font-rajdhani text-[#c9a84c]/55 tracking-[0.5em] uppercase text-sm mt-2"
                    >
                      Kota, Rajasthan
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── PHASE 2: VIT CHENNAI SLAM + LIGHTNING (simultaneous) ── */}
              <AnimatePresence>
                {phase === PHASE.VIT && (
                  <motion.div key="vit"
                    className="absolute inset-0 flex flex-col items-center justify-center z-20"
                    exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.25 } }}
                  >
                    {/* Lightning fires the moment VIT slams in */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div className="absolute inset-0 bg-white"
                        initial={{ opacity: 0.7 }} animate={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 }} />
                      {LIGHTNING_BOLTS.map((b, i) => <LightningBolt key={i} {...b} />)}
                      <LensFlare />
                      {Array.from({ length: 18 }).map((_, i) => (
                        <motion.div key={i}
                          className="absolute w-1 h-1 rounded-full bg-[#a0d0ff]"
                          style={{ left: `${(i * 5.7) % 100}%`, top: `${20 + (i * 8.3) % 60}%` }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
                          transition={{ duration: 0.4, delay: 0.08 + i * 0.03 }} />
                      ))}
                    </div>

                    <Shockwave />
                    <SparkBurst sparks={sparks} />

                    {/* Glow behind crest */}
                    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full blur-3xl"
                      style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.22) 0%, transparent 70%)" }} />

                    <motion.div
                      initial={{ y: -340, rotate: 8, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 210, damping: 15, delay: 0.08 }}
                    >
                      <VITEmblem />
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, letterSpacing: "0.05em", y: 20 }}
                      animate={{ opacity: 1, letterSpacing: "0.5em", y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="font-bebas text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-[#f0d060] mt-6 drop-shadow-[0_0_40px_rgba(240,208,96,0.65)]"
                    >
                      VIT CHENNAI
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      className="font-rajdhani text-[#c9a84c]/55 tracking-[0.5em] uppercase text-sm mt-2"
                    >
                      Class of 2028
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── PHASE 3: CARD REVEAL ── */}
              <AnimatePresence>
                {(phase === PHASE.CARD || phase === PHASE.NAME) && (
                  <motion.div key="card-reveal"
                    className="absolute inset-0 flex items-center justify-center z-20"
                    style={{ perspective: 1400 }}
                    exit={{ scale: 0.08, opacity: 0, rotateY: 45, transition: { duration: 0.4, ease: "easeIn" } }}
                  >
                    {/* Pulsing glow halo behind card */}
                    <motion.div className="absolute w-80 h-[500px] rounded-full pointer-events-none"
                      animate={{ boxShadow: [
                        "0 0 60px 20px rgba(201,168,76,0.2)",
                        "0 0 120px 50px rgba(201,168,76,0.45)",
                        "0 0 60px 20px rgba(201,168,76,0.2)",
                      ]}}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                      initial={{ y: "100vh", rotateY: -90, opacity: 0 }}
                      animate={{ y: 0, rotateY: 0, opacity: 1 }}
                      transition={{ duration: 1.3, delay: 0.1, type: "spring", stiffness: 55, damping: 13 }}
                    >
                      <FUTCard holographic />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── PHASE 4: NAME EXPLOSION ── */}
              {phase === PHASE.NAME && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 pb-20 flex flex-col items-center z-30 pointer-events-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FallingParticles particles={fallingParticles} />

                  <motion.h1
                    className="font-bebas text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#f0d060] via-white to-[#c9a84c] tracking-widest glitch-name drop-shadow-[0_0_35px_rgba(240,208,96,0.7)]"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  >
                    PARV MALAV
                  </motion.h1>

                  <motion.p
                    className="font-rajdhani text-[#c9a84c]/65 tracking-[0.4em] uppercase text-sm mt-3"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Software Developer&nbsp;•&nbsp;Cloud Engineer
                  </motion.p>
                </motion.div>
              )}

            </motion.div>{/* end shaking container */}

            {/* White flash on transition exit */}
            {phase === PHASE.TRANSITION && (
              <motion.div className="absolute inset-0 bg-white z-50 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, times: [0, 0.3, 1] }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ REGULAR HERO (always rendered beneath, revealed after overlay exits) ══ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GoldParticles />
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FUTCard holographic />
          </motion.div>
          <p className="font-rajdhani text-lg md:text-2xl text-[#c9a84c]/70 tracking-widest text-center">
            Serverless by choice. Limitless by design.
          </p>
          <a href="#about"
            className="font-bebas text-[#c9a84c]/40 tracking-[0.5em] text-sm flex flex-col items-center gap-1 hover:text-[#c9a84c]/70 transition-colors"
            data-testid="link-scroll-down"
          >
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
            <span>SCROLL</span>
          </a>
        </div>
      </section>
    </>
  );
}
