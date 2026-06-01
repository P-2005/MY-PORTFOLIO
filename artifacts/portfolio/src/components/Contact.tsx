import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const socials = [
  {
    icon: Mail,
    href: "mailto:parvmalav666@gmail.com",
    label: "Email",
    delay: 0.1
  },
  {
    icon: Github,
    href: "https://github.com/P-2005",
    label: "GitHub",
    delay: 0.2
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/parv-malav-69927940b",
    label: "LinkedIn",
    delay: 0.3
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10 overflow-hidden">
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-[#c9a84c]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl md:text-7xl font-bebas text-white tracking-widest mb-4">
            Make A <span className="fut-text-gradient">Signing</span>
          </h2>
          <p className="text-xl font-rajdhani text-muted-foreground max-w-xl mx-auto mb-3">
            Looking for a new addition to your squad? Let's negotiate a contract.
          </p>
          <p className="font-rajdhani text-[#c9a84c]/70 text-sm tracking-widest mb-12 uppercase">
            Kota, Rajasthan, India &nbsp;·&nbsp; +91 91193 27821
          </p>

          <div className="flex justify-center items-center gap-6 mb-12">
            {socials.map(({ icon: Icon, href, label, delay }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", bounce: 0.5, delay }}
                className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#c9a84c]/30 flex items-center justify-center text-white hover:border-[#c9a84c] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-all group"
                aria-label={label}
                data-testid={`link-contact-${label.toLowerCase()}`}
              >
                <Icon className="group-hover:text-[#f0d060] transition-colors" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="mailto:parvmalav666@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative overflow-hidden group font-bebas text-2xl tracking-widest text-black bg-gradient-to-r from-[#c9a84c] to-[#f0d060] px-12 py-4 rounded-sm shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:shadow-[0_0_30px_rgba(201,168,76,0.8)] transition-all duration-300"
            data-testid="button-sign"
          >
            <span className="relative z-10">SIGN PLAYER</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
