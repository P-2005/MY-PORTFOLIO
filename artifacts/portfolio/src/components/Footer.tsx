import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/P-2005", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/parv-malav-69927940b", label: "LinkedIn" },
  { icon: Mail, href: "mailto:parvmalav666@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#050505] border-t border-[#c9a84c]/10 overflow-hidden">
      {/* Gold gradient bar at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <motion.a href="#hero"
          whileHover={{ scale: 1.05 }}
          className="font-bebas text-3xl fut-text-gradient tracking-widest"
        >
          P.M.
        </motion.a>

        {/* Centre copy */}
        <div className="text-center">
          <p className="font-rajdhani text-white/30 text-sm tracking-widest">
            Built with ⚽ &nbsp;by&nbsp;
            <span className="text-[#c9a84c] font-semibold">Parv Malav</span>
          </p>
          <p className="font-rajdhani text-white/15 text-xs tracking-[0.3em] uppercase mt-0.5">
            VIT Chennai · India · 2025
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {links.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-9 h-9 rounded-full bg-white/5 border border-[#c9a84c]/15 flex items-center justify-center text-white/40 hover:text-[#f0d060] hover:border-[#c9a84c]/50 hover:shadow-[0_0_12px_rgba(201,168,76,0.35)] transition-all"
              aria-label={label}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
