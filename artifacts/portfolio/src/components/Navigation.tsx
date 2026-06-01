import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Hero", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "History", href: "#experience" },
    { name: "Attributes", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-primary/20 py-4" : "bg-transparent py-6"
      }`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="font-bebas text-3xl md:text-4xl fut-text-gradient tracking-widest" data-testid="link-logo">
          P.M.
        </a>
        
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg font-bebas tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
