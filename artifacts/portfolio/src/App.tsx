import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [revealComplete, setRevealComplete] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Particles />

      {/* Nav only appears after card reveal */}
      <AnimatePresence>
        {revealComplete && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero onRevealComplete={() => setRevealComplete(true)} />

        {/* Portfolio content slides in after reveal */}
        <AnimatePresence>
          {revealComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-hex">
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {revealComplete && <Footer />}
    </div>
  );
}

export default App;
