import { motion } from "framer-motion";

const text = "Full-stack developer focused on scalable web applications and cloud-based systems. Experienced with MERN stack, Supabase, and real-time architectures through production-grade projects involving tournament systems, ranking engines, and responsive UI engineering.";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bebas fut-text-gradient mb-6 tracking-wider text-center">Player Profile</h2>

            <div className="font-rajdhani text-xl leading-relaxed text-muted-foreground mb-10 text-center">
              <p>
                {text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.04, delay: index * 0.012 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6 border border-[#c9a84c]/20 bg-[#c9a84c]/5 rounded-xl hover-elevate"
              >
                <div className="text-2xl font-bebas text-[#f0d060] leading-tight">3rd Year</div>
                <div className="text-lg font-bebas text-[#f0d060]">B.Tech Student</div>
                <div className="text-xs font-rajdhani text-muted-foreground uppercase tracking-widest mt-1">VIT Chennai · 2026</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6 border border-[#c9a84c]/20 bg-[#c9a84c]/5 rounded-xl hover-elevate"
              >
                <div className="text-2xl font-bebas text-[#f0d060] leading-tight">Content Lead</div>
                <div className="text-lg font-bebas text-[#f0d060]">@ VIT Chennai</div>
                <div className="text-xs font-rajdhani text-muted-foreground uppercase tracking-widest mt-1">Strategy · Creation · Growth</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
