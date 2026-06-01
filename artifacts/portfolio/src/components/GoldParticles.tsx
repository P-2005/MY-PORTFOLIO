import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleOffset: number;
}

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const cursor = { x: -9999, y: -9999 };
    let raf = 0;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    /* ── more particles, wider variety ── */
    const COUNT    = 200;
    const REPEL_R  = 220;
    const MAX_SPD  = 5;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:             Math.random() * W(),
      y:             Math.random() * H(),
      vx:            (Math.random() - 0.5) * 0.4,
      vy:            (Math.random() - 0.5) * 0.4,
      size:          0.5 + Math.random() * 2.2,
      alpha:         0.1 + Math.random() * 0.45,
      baseAlpha:     0.1 + Math.random() * 0.45,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W(), H());

      /* no cursor ring — repulsion effect only visible through particle movement */

      for (const p of particles) {
        const dx   = p.x - cursor.x;
        const dy   = p.y - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_R && dist > 0.5) {
          /* stronger repulsion — clearly visible */
          const t_ = 1 - dist / REPEL_R;
          const strength = t_ * t_ * 0.35;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
          /* brighten dramatically near cursor */
          const targetAlpha = Math.min(1, p.baseAlpha + t_ * 0.75);
          p.alpha += (targetAlpha - p.alpha) * 0.2;
        } else {
          const twinkle = p.baseAlpha + Math.sin(t * 0.018 + p.twinkleOffset) * 0.12;
          p.alpha += (twinkle - p.alpha) * 0.04;
        }

        /* damping + drift */
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPD) { p.vx = (p.vx / spd) * MAX_SPD; p.vy = (p.vy / spd) * MAX_SPD; }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)   p.x = W();
        if (p.x > W()) p.x = 0;
        if (p.y < 0)   p.y = H();
        if (p.y > H()) p.y = 0;

        const a = Math.max(0, Math.min(1, p.alpha));

        /* core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a})`;
        ctx.fill();

        /* glow halo on all particles near cursor or large ones */
        const nearCursor = dist < REPEL_R;
        if (p.size > 1.2 || nearCursor) {
          const haloR = p.size * (nearCursor ? 6 : 4);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
          grad.addColorStop(0, `rgba(240,208,96,${a * (nearCursor ? 0.5 : 0.3)})`);
          grad.addColorStop(1, "rgba(240,208,96,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };
    const onLeave = () => { cursor.x = -9999; cursor.y = -9999; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
