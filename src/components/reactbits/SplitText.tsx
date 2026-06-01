import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  fromY?: number;
  threshold?: number;
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 650,
  stagger = 36,
  fromY = 34,
  threshold = 0.2,
  once = true
}: SplitTextProps) {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  let letterIndex = 0;

  return (
    <span ref={elementRef} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-flex whitespace-nowrap mr-[0.24em]" aria-hidden="true">
          {[...word].map((char, charIndex) => {
            const index = letterIndex;
            letterIndex += 1;

            return (
              <span
                key={`${word}-${char}-${charIndex}`}
                className="inline-block bg-inherit bg-clip-text text-transparent will-change-transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translate3d(0,0,0) rotate(0deg)" : `translate3d(0,${fromY}px,0) rotate(3deg)`,
                  filter: isVisible ? "blur(0)" : "blur(8px)",
                  transitionProperty: "opacity, transform, filter",
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${delay + index * stagger}ms`,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
