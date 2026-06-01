import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

/* ── Attribute categories (FIFA-style) ── */
const CATS = [
  {
    code: "FUL", label: "Fullstack", value: 91,
    subs: [{ name: "React.js", v: 92 }, { name: "Node.js", v: 90 }, { name: "Express.js", v: 91 }],
  },
  {
    code: "CLO", label: "Cloud", value: 88,
    subs: [{ name: "Google Cloud", v: 84 }, { name: "Vercel", v: 93 }, { name: "Supabase", v: 87 }],
  },
  {
    code: "DAT", label: "Database", value: 89,
    subs: [{ name: "MongoDB", v: 89 }, { name: "Supabase", v: 87 }, { name: "SQL", v: 84 }],
  },
  {
    code: "SYS", label: "Systems", value: 86,
    subs: [{ name: "Python", v: 88 }, { name: "C / C++", v: 85 }, { name: "Algorithms", v: 86 }],
  },
  {
    code: "COL", label: "Collab", value: 95,
    subs: [{ name: "Git / GitHub", v: 95 }, { name: "Agile", v: 92 }, { name: "Docs", v: 90 }],
  },
  {
    code: "INF", label: "Infra", value: 84,
    subs: [{ name: "CI / CD", v: 82 }, { name: "Serverless", v: 86 }, { name: "Docker", v: 80 }],
  },
];

/* overall = round average */
const OVERALL = Math.round(CATS.reduce((s, c) => s + c.value, 0) / CATS.length);

/* ── Animated bar ── */
function Bar({ value, delay }: { value: number; delay: number }) {
  return (
    <div className="flex-1 h-[5px] bg-white/8 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d060]"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </div>
  );
}

/* ── Radar / hexagon chart ── */
function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width = 260;
    const H = canvas.height = 260;
    const cx = W / 2, cy = H / 2;
    const R = 100;
    const n = CATS.length;

    let progress = 0;
    let raf = 0;

    const angle = (i: number) => (i / n) * Math.PI * 2 - Math.PI / 2;
    const pt = (i: number, r: number) => ({
      x: cx + r * Math.cos(angle(i)),
      y: cy + r * Math.sin(angle(i)),
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* background rings */
      [0.25, 0.5, 0.75, 1].forEach(frac => {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const p = pt(i, R * frac);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(201,168,76,${frac === 1 ? 0.25 : 0.1})`;
        ctx.lineWidth = frac === 1 ? 1.5 : 1;
        ctx.stroke();
      });

      /* spokes */
      for (let i = 0; i < n; i++) {
        const tip = pt(i, R);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(tip.x, tip.y);
        ctx.strokeStyle = "rgba(201,168,76,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* filled polygon */
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const r = (CATS[i].value / 100) * R * progress;
        const p = pt(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, "rgba(240,208,96,0.5)");
      grad.addColorStop(1, "rgba(201,168,76,0.08)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(240,208,96,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      /* vertex dots */
      for (let i = 0; i < n; i++) {
        const r = (CATS[i].value / 100) * R * progress;
        const p = pt(i, r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#f0d060";
        ctx.fill();
      }

      /* labels (static — don't scale with progress) */
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < n; i++) {
        const p = pt(i, R + 16);
        ctx.fillStyle = "rgba(240,208,96,0.8)";
        ctx.fillText(CATS[i].code, p.x, p.y);
      }
    };

    if (inView) {
      const start = performance.now();
      const duration = 1000;
      const animate = (now: number) => {
        progress = Math.min((now - start) / duration, 1);
        draw();
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    } else {
      progress = 0;
      draw();
    }

    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 260, height: 260 }} />
    </div>
  );
}

/* ── Category block (left panel) ── */
function CatBlock({ cat, delay }: { cat: typeof CATS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay }}
      className="space-y-1.5"
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-bebas text-3xl text-white leading-none">{cat.value}</span>
        <span className="font-bebas text-sm text-[#c9a84c] tracking-widest">{cat.code}</span>
        <span className="font-rajdhani text-xs text-white/30 uppercase tracking-wider ml-auto">{cat.label}</span>
      </div>
      {cat.subs.map((s, i) => (
        <div key={s.name} className="flex items-center gap-2">
          <span className="font-rajdhani text-[10px] text-white/40 w-20 truncate">{s.name}</span>
          <Bar value={s.v} delay={delay + 0.1 + i * 0.08} />
          <span className="font-bebas text-xs text-[#c9a84c]/60 w-5 text-right">{s.v}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bebas fut-text-gradient tracking-wider">Attributes</h2>
          <p className="font-rajdhani text-muted-foreground mt-2 tracking-widest uppercase text-sm">
            Player Statistics — Season 2025
          </p>
        </motion.div>

        {/* FIFA card stats panel */}
        <div className="max-w-4xl mx-auto border border-[#c9a84c]/20 rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.08)]">

          {/* Top bar: overall + position */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="flex items-center gap-6 px-8 py-5 border-b border-[#c9a84c]/15 bg-gradient-to-r from-[#c9a84c]/8 to-transparent"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-bebas text-7xl text-white drop-shadow-[0_0_20px_rgba(201,168,76,0.6)] leading-none">{OVERALL}</span>
              <span className="font-bebas text-xl text-[#c9a84c] tracking-wider ml-1">OVR</span>
            </div>
            <div className="h-12 w-[1px] bg-[#c9a84c]/20" />
            <div>
              <div className="font-bebas text-2xl text-white tracking-widest">PARV MALAV</div>
              <div className="font-rajdhani text-xs text-[#c9a84c]/55 tracking-[0.4em] uppercase">Software Developer · Cloud Engineer</div>
            </div>
            <div className="ml-auto font-rajdhani text-xs text-white/20 tracking-widest uppercase hidden md:block">
              VIT Chennai · India
            </div>
          </motion.div>

          {/* Main body: bars left | radar right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#c9a84c]/10">

            {/* Left — attribute bars */}
            <div className="p-8 space-y-6">
              {CATS.map((cat, i) => (
                <CatBlock key={cat.code} cat={cat} delay={i * 0.08} />
              ))}
            </div>

            {/* Right — radar */}
            <div className="p-8 flex flex-col items-center justify-center gap-4">
              <RadarChart />
              <p className="font-rajdhani text-[10px] text-white/20 tracking-[0.4em] uppercase">Performance Radar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
