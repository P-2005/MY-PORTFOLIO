import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "SMASH.CLUB",
    description: "Production-grade badminton management platform for clubs, academies, and individual players. Engineered tournament modules (Single Elimination, Double Elimination, Round Robin), an advanced ELO ranking engine with tiered badges from Bronze to Diamond, live BWF international news streaming, and a cinematic dark UI with real-time Supabase sync.",
    stack: "MongoDB · Express · React · Node.js · Supabase · Vercel",
    github: "https://github.com/P-2005",
    live: "https://badminton-club-app-taupe.vercel.app",
    isSpecial: true,
    year: "2024"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bebas text-white tracking-wider">
            Career <span className="fut-text-gradient">Highlights</span>
          </h2>
          <p className="font-rajdhani text-muted-foreground mt-2 tracking-widest uppercase text-sm">
            Transfer Market — Featured Transfers
          </p>
        </motion.div>

        {/* Single card centred */}
        <div className="flex justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ rotateY: 180, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
              className="relative group w-full max-w-xl"
              data-testid={`card-project-${index}`}
            >
              <div className="absolute -inset-1 bg-gradient-to-b from-[#c9a84c] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

              <div className="relative h-full bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-2xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#c9a84c]/60">

                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                {project.isSpecial && (
                  <div className="absolute top-4 right-[-30px] bg-gradient-to-r from-[#c9a84c] to-[#f0d060] text-black font-bebas px-10 py-1 rotate-45 origin-center shadow-lg z-10 text-sm tracking-widest">
                    SPECIAL CARD
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bebas text-3xl text-white">{project.title}</h3>
                    <span className="font-rajdhani text-xs text-[#c9a84c]/60 uppercase tracking-widest border border-[#c9a84c]/20 px-2 py-0.5 rounded">{project.year}</span>
                  </div>
                  <p className="font-rajdhani text-muted-foreground text-base mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-rajdhani text-[#c9a84c] uppercase tracking-widest mb-4">
                    {project.stack}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="p-2 bg-white/5 rounded-full hover:bg-[#c9a84c]/20 hover:text-[#f0d060] transition-colors text-white"
                      aria-label="GitHub" data-testid={`link-github-${index}`}>
                      <Github size={20} />
                    </a>
                    {project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noreferrer"
                        className="p-2 bg-white/5 rounded-full hover:bg-[#c9a84c]/20 hover:text-[#f0d060] transition-colors text-white"
                        aria-label="Live Demo" data-testid={`link-live-${index}`}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
