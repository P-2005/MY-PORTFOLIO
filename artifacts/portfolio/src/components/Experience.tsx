import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024",
    side: "left",
    badge: "🎓",
    title: "Signed to VIT Chennai",
    role: "B.Tech Computer Science · Class of 2028",
    detail:
      "Enrolled in Computer Science Engineering at Vellore Institute of Technology, Chennai. Began competitive programming, full-stack development, and building side projects from the ground up.",
    tag: "TRANSFER",
    tagColor: "#3b82f6",
  },
  {
    year: "2025",
    side: "right",
    badge: "🏆",
    title: "Content Lead",
    role: "VIT Chennai",
    detail:
      "Appointed Content Lead, driving digital strategy, content creation pipelines, and growth initiatives across platforms. Blending storytelling with technical precision.",
    tag: "CAPTAIN",
    tagColor: "#f0d060",
  },
  {
    year: "2026",
    side: "left",
    badge: "⚽",
    title: "SMASH.CLUB — Launch",
    role: "Founder · Full-Stack Engineer",
    detail:
      "Shipped a production-grade badminton management platform used by clubs and academies. Features: tournament brackets (SE/DE/RR), ELO ranking engine with tiered badges, live BWF news, and real-time Supabase sync.",
    tag: "HAT-TRICK",
    tagColor: "#c9a84c",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c9a84c]/25 to-transparent hidden md:block" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bebas text-white tracking-wider">
            Transfer <span className="fut-text-gradient">History</span>
          </h2>
          <p className="font-rajdhani text-muted-foreground mt-2 tracking-widest uppercase text-sm">
            Career Timeline — Full Record
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {timeline.map((item, index) => {
            const isLeft = item.side === "left";
            return (
              <div key={index} className="relative flex items-start mb-16 last:mb-0">

                {/* Year badge — centred on the vertical line */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-14 h-14 rounded-full border-2 border-[#c9a84c] bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                  >
                    <span className="font-bebas text-sm text-[#f0d060] tracking-wider">{item.year}</span>
                  </motion.div>
                </div>

                {/* Left slot */}
                <div className={`w-full md:w-[calc(50%-40px)] ${isLeft ? "md:pr-10" : "md:invisible"}`}>
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                      className="md:text-right"
                    >
                      <Card item={item} />
                    </motion.div>
                  )}
                </div>

                {/* Spacer for centre line */}
                <div className="hidden md:block w-20 flex-shrink-0" />

                {/* Right slot */}
                <div className={`w-full md:w-[calc(50%-40px)] ${!isLeft ? "md:pl-10" : "md:invisible"}`}>
                  {!isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    >
                      <Card item={item} />
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: typeof timeline[0] }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${item.tagColor}, transparent)` }} />

      <div className="relative bg-[#0d0d0d] border border-[#c9a84c]/15 rounded-xl p-6 group-hover:border-[#c9a84c]/40 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_ease] pointer-events-none" />

        {/* Year badge (mobile only) */}
        <div className="md:hidden mb-3 inline-block font-bebas text-xs text-[#c9a84c] border border-[#c9a84c]/30 px-2 py-0.5 rounded tracking-widest">
          {item.year}
        </div>

        <div className="mb-3">
          <span className="font-bebas text-[10px] tracking-[0.3em] px-2 py-0.5 rounded"
            style={{ color: item.tagColor, border: `1px solid ${item.tagColor}40`, background: `${item.tagColor}10` }}>
            {item.tag}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{item.badge}</span>
          <h3 className="font-bebas text-xl text-white tracking-wide">{item.title}</h3>
        </div>

        <p className="font-rajdhani text-xs text-[#c9a84c]/60 uppercase tracking-widest mb-3">{item.role}</p>
        <p className="font-rajdhani text-sm text-white/50 leading-relaxed">{item.detail}</p>
      </div>
    </div>
  );
}
