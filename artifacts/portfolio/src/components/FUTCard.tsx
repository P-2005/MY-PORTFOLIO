import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export default function FUTCard({ holographic = false }: { holographic?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 220, damping: 22 });

  const foilX = useTransform(mx, [0, 1], [0, 100]);
  const foilY = useTransform(my, [0, 1], [0, 100]);
  const bgPos = useMotionTemplate`${foilX}% ${foilY}%`;

  const glareX = useTransform(mx, [0, 1], [-60, 120]);
  const glareY = useTransform(my, [0, 1], [-60, 120]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); setHovered(false); };

  return (
    /* Square card */
    <motion.div
      ref={ref}
      className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] preserve-3d cursor-pointer drop-shadow-[0_16px_40px_rgba(201,168,76,0.5)]"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* ── FRONT ── */}
      <div className="absolute inset-0 backface-hidden rounded-2xl border-[3px] border-[#c9a84c] overflow-hidden shadow-[inset_0_0_24px_rgba(201,168,76,0.15)]">

        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a0a] bg-hex" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 65%)" }} />

        {/* Holographic foil */}
        {holographic && (
          <motion.div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(125deg,
                rgba(255,0,128,0.22) 0%, rgba(255,200,0,0.22) 16%,
                rgba(0,255,140,0.22) 33%, rgba(0,190,255,0.22) 50%,
                rgba(120,0,255,0.22) 67%, rgba(255,0,200,0.22) 83%,
                rgba(255,0,128,0.22) 100%)`,
              backgroundSize: "280% 280%",
              backgroundPosition: bgPos,
              mixBlendMode: "screen",
              opacity: hovered ? 0.85 : 0.35,
              transition: "opacity 0.3s",
            }}
          />
        )}

        {/* Specular glare */}
        {holographic && hovered && (
          <div className="absolute inset-0 rounded-2xl z-[21] pointer-events-none overflow-hidden">
            <motion.div className="absolute w-28 h-28 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 60%)",
                x: glareX, y: glareY, translateX: "-50%", translateY: "-50%",
              }}
            />
          </div>
        )}

        {/* ── Card content ── */}
        <div className="absolute inset-0 z-10 flex flex-col p-4 md:p-5">

          {/* Top row: rating / position / badge */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col items-center leading-none">
              <span className="font-bebas text-[#f0d060] text-4xl md:text-5xl leading-none drop-shadow-[0_0_10px_rgba(240,208,96,0.8)]">75</span>
              <span className="font-bebas text-[#c9a84c] text-sm tracking-widest">SCE</span>
              {/* Shuttlecock */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-1 opacity-80">
                <ellipse cx="12" cy="19" rx="4" ry="3" fill="#c9a84c" />
                <line x1="12" y1="16" x2="6"  y2="4"  stroke="#f0d060" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="9"  y2="3"  stroke="#f0d060" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12" y2="2"  stroke="#f0d060" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="15" y2="3"  stroke="#f0d060" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="18" y2="4"  stroke="#f0d060" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M6 4 Q12 1 18 4" stroke="#c9a84c" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Top-right: card type label */}
            <div className="font-bebas text-[10px] tracking-[0.3em] text-[#c9a84c]/30 text-right leading-tight">
              <div>GOLD</div>
              <div>SPECIAL</div>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center my-2">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#c9a84c] overflow-hidden shadow-[0_0_20px_rgba(201,168,76,0.5),0_0_40px_rgba(201,168,76,0.2)]">
              <img
                src="/parv-photo.png"
                alt="Parv Malav"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-3">
            <div className="font-bebas text-white text-xl md:text-2xl tracking-[0.2em] leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              PARV MALAV
            </div>
            <div className="font-rajdhani text-[10px] text-[#c9a84c]/50 tracking-[0.3em] uppercase mt-0.5">
              Software Dev · Cloud Engineer
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-3" />

          {/* Links row */}
          <div className="flex items-center justify-center gap-4 flex-1">
            <a href="https://linkedin.com/in/parv-malav-69927940b" target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-1 group"
              onClick={e => e.stopPropagation()} aria-label="LinkedIn">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0077b5]/80 group-hover:bg-[#0077b5] flex items-center justify-center transition-colors border border-white/10 shadow-[0_0_10px_rgba(0,119,181,0.4)]">
                <Linkedin size={15} className="text-white" />
              </div>
              <span className="font-bebas text-[9px] text-white/30 tracking-widest group-hover:text-white/60 transition-colors">IN</span>
            </a>
            <a href="https://github.com/P-2005" target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-1 group"
              onClick={e => e.stopPropagation()} aria-label="GitHub">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/8 group-hover:bg-white/18 flex items-center justify-center transition-colors border border-white/10">
                <Github size={15} className="text-white" />
              </div>
              <span className="font-bebas text-[9px] text-white/30 tracking-widest group-hover:text-white/60 transition-colors">GH</span>
            </a>
            <a href="https://badminton-club-app-taupe.vercel.app" target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-1 group"
              onClick={e => e.stopPropagation()} aria-label="SMASH.CLUB">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c9a84c]/15 group-hover:bg-[#c9a84c]/35 flex items-center justify-center transition-colors border border-[#c9a84c]/30 shadow-[0_0_10px_rgba(201,168,76,0.25)]">
                <ExternalLink size={15} className="text-[#f0d060]" />
              </div>
              <span className="font-bebas text-[9px] text-[#c9a84c]/40 tracking-widest group-hover:text-[#c9a84c]/80 transition-colors">LIVE</span>
            </a>
          </div>

        </div>


        {/* Gold corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c9a84c]/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c9a84c]/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c9a84c]/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c9a84c]/40 rounded-br-sm pointer-events-none" />
      </div>

      {/* ── BACK ── */}
      <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-[#0a0a0a] rounded-2xl border-[3px] border-[#c9a84c] bg-hex">
        <div className="w-16 h-16 border-4 border-[#c9a84c] rounded-full flex items-center justify-center opacity-25">
          <span className="font-bebas text-2xl text-[#c9a84c]">FUT</span>
        </div>
      </div>
    </motion.div>
  );
}
