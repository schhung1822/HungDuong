import { useState, useEffect, useRef } from "react";
import type { Key, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Animation trigger delay in ms
  duration?: number; // Animation duration in ms
  origin?: "top" | "bottom" | "left" | "right"; // Direction of slide
  distance?: string; // Travel distance of the element
  key?: Key;
}

/**
 * ScrollReveal Component inspired by reactbits.dev
 * Handles elegant viewport entrance animations, with reduced-motion awareness.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 600,
  origin = "bottom",
  distance = "24px"
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect OS settings for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before element enters
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTranslateStyle = () => {
    if (isVisible) return "translate(0, 0)";
    switch (origin) {
      case "top": return `translate(0, -${distance})`;
      case "left": return `translate(-${distance}, 0)`;
      case "right": return `translate(${distance}, 0)`;
      case "bottom":
      default: return `translate(0, ${distance})`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTranslateStyle(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {children}
    </div>
  );
}
