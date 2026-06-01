export default function PlayerWalkout() {
  const rays = [-52, -38, -24, -12, 0, 12, 24, 38, 52];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {/* ── Tunnel mouth glow (deep behind the figure) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 55% at 50% 72%, rgba(255,255,255,0.07) 0%, rgba(240,208,96,0.09) 25%, transparent 65%)",
        }}
      />

      {/* ── Stadium light cone (fan from below center) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-full"
        style={{
          background:
            "conic-gradient(from 258deg at 50% 105%, transparent 0deg, rgba(240,208,96,0.04) 6deg, rgba(255,255,255,0.06) 12deg, rgba(240,208,96,0.04) 18deg, transparent 24deg, transparent 312deg, rgba(240,208,96,0.04) 318deg, rgba(255,255,255,0.06) 324deg, rgba(240,208,96,0.04) 330deg, transparent 336deg)",
        }}
      />

      {/* ── Animated light rays fanning out from figure ── */}
      {rays.map((angle, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: "18%",
            left: "50%",
            width: "1px",
            height: "75vh",
            background:
              "linear-gradient(to top, rgba(240,208,96,0.22) 0%, rgba(240,208,96,0.06) 55%, transparent 100%)",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${angle}deg)`,
            animation: `rayPulse ${2.2 + i * 0.18}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* ── Player silhouette ── full-height so figure towers above the card ── */}
      <div
        className="absolute inset-x-0 bottom-0 flex justify-center player-figure"
        style={{
          height: "92vh",
          filter: "drop-shadow(0 0 40px rgba(240,208,96,0.7)) drop-shadow(0 0 15px rgba(240,208,96,0.45))",
        }}
      >
        <svg
          viewBox="0 0 120 290"
          style={{ height: "100%", width: "auto" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="60" cy="26" r="19" fill="#0a0a0a" stroke="#c9a84c" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="54" y="43" width="12" height="12" rx="3" fill="#0a0a0a" />

          {/* Torso */}
          <path
            d="M34 55 Q60 51 86 55 L90 125 Q60 130 30 125 Z"
            fill="#0a0a0a"
            stroke="#c9a84c"
            strokeWidth="1"
          />

          {/* Left arm */}
          <g className="arm-l">
            <path
              d="M36 65 Q22 98 14 128"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M36 65 Q22 98 14 128"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Right arm */}
          <g className="arm-r">
            <path
              d="M84 65 Q98 98 106 128"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M84 65 Q98 98 106 128"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Left leg */}
          <g className="leg-l">
            <path
              d="M48 124 Q40 185 28 240"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M48 124 Q40 185 28 240"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Left boot */}
            <ellipse cx="24" cy="244" rx="20" ry="9" fill="#0a0a0a" stroke="#c9a84c" strokeWidth="1" />
          </g>

          {/* Right leg */}
          <g className="leg-r">
            <path
              d="M72 124 Q80 185 92 240"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M72 124 Q80 185 92 240"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Right boot */}
            <ellipse cx="96" cy="244" rx="20" ry="9" fill="#0a0a0a" stroke="#c9a84c" strokeWidth="1" />
          </g>

          {/* Jersey number (subtle) */}
          <text
            x="60"
            y="98"
            textAnchor="middle"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="26"
            fill="rgba(201,168,76,0.35)"
          >
            92
          </text>
        </svg>
      </div>

      {/* ── Ground shadow under player ── */}
      <div
        className="absolute"
        style={{
          bottom: "4%",
          left: "50%",
          width: "220px",
          height: "22px",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.25) 0%, transparent 72%)",
          animation: "groundPulse 6s ease-in-out infinite",
          filter: "blur(6px)",
        }}
      />

      {/* ── Outer stadium darkness vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
