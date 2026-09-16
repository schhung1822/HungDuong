import { useEffect, useState } from "react";
import Header from "./components/Header";
import Seo from "./components/Seo";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ScrollToTop from "./components/ScrollToTop";

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

  // overflow-x-clip (not hidden) so sticky children like the Experience rail keep working
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-200 flex flex-col font-sans overflow-x-clip antialiased">

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

            {/* Combined profile and expertise section */}
            <About />

            {/* Services and delivery approach */}
            <Services />

            {/* Featured projects and complete portfolio */}
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

      {/* Floating language toggle */}
      <LanguageSwitcher />

      {/* Floating scroll-to-top with reading progress */}
      <ScrollToTop />
    </div>
  );
}
