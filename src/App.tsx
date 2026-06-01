import { useEffect, useState } from "react";
import Header from "./components/Header";
import Seo from "./components/Seo";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProduct from "./components/FeaturedProduct";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const projectDetailMatch = hash.match(/^#project\/(.+)$/);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash;
      setHash(nextHash);

      window.setTimeout(() => {
        const projectMatch = nextHash.match(/^#project\/(.+)$/);
        if (projectMatch) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const target = nextHash ? document.getElementById(nextHash.slice(1)) : null;
        if (target) {
          window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        }
      }, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-200 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-400 overflow-x-hidden antialiased">
      {/* Background radial soft light to frame application */}
      <div className="absolute inset-0 dot-grid z-0 pointer-events-none opacity-60" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden z-0">
        <div className="aurora-bg opacity-70" />
        <div className="aurora-bg-2 opacity-70" />
      </div>

      <Seo projectId={projectDetailMatch ? decodeURIComponent(projectDetailMatch[1]) : undefined} />

      {/* Navigation Header */}
      <Header />

      {/* Continuous Single Page Sections content flow */}
      <main className="flex-grow relative z-10">
        {projectDetailMatch ? (
          <ProjectDetail projectId={decodeURIComponent(projectDetailMatch[1])} />
        ) : (
          <>
            {/* Hero presentation space */}
            <Hero />

            {/* Informational Profile Sections */}
            <About />

            {/* Interactive Skills section */}
            <Skills />

            {/* Flagship Product Segment */}
            <FeaturedProduct />

            {/* Interactive Grid Portfolio */}
            <Projects />

            {/* Professional Milestones */}
            <Experience />

            {/* Call to Action Contact Form */}
            <Contact />
          </>
        )}
      </main>

      {/* Footer navigation and credentials */}
      <Footer />
    </div>
  );
}
