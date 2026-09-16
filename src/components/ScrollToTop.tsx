import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n";
import { surface } from "./surface";

const RADIUS = 21.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const REVEAL_OFFSET = 400; // Appears once the visitor has scrolled past the hero

/**
 * Floating scroll-to-top control pinned to the bottom-right corner.
 * The ring around it doubles as a reading-progress indicator.
 */
export default function ScrollToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrolled > REVEAL_OFFSET);
      setProgress(scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title={t("footer.top")}
      aria-label={t("footer.top")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full text-neutral-400 transition-all duration-300 ease-out hover:text-white sm:bottom-6 sm:right-8 ${surface} ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="text-white/70 transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <ArrowUp className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
