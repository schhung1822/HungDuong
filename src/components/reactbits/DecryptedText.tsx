import { useState, useEffect, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  scrambleCharacters?: string;
  animateOn?: "hover" | "view";
}

/**
 * DecryptedText Component inspired by reactbits.dev
 * Handles hacker-style letter scrambling and decoding reveal.
 */
export default function DecryptedText({
  text,
  speed = 40,
  delay = 0,
  className = "",
  scrambleCharacters = "QWERTYUIOPASDFGHJKLZXCVBNM<>?/[]{}!@#$%^&*()_+=-",
  animateOn = "view"
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const isRevealed = useRef(false);

  useEffect(() => {
    if (animateOn === "view" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isRevealed.current) {
            triggerScramble();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else if (animateOn === "hover" && isHovered) {
      triggerScramble();
    } else {
      setDisplayText(text);
    }
  }, [text, isHovered, animateOn]);

  const triggerScramble = () => {
    isRevealed.current = true;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    let frame = 0;
    const originalText = text;
    const totalFrames = originalText.length * 3; // Number of scramble steps per letter

    const run = () => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * originalText.length);

      let currentText = "";
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealedCount) {
          currentText += originalText[i];
        } else {
          // If the character in original text is space, skip scrambling it
          if (originalText[i] === " ") {
            currentText += " ";
          } else {
            const randomIndex = Math.floor(Math.random() * scrambleCharacters.length);
            currentText += scrambleCharacters[randomIndex];
          }
        }
      }

      setDisplayText(currentText);

      if (frame < totalFrames) {
        // limit frames processing rate
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(run);
        }, speed / 2);
      } else {
        setDisplayText(originalText);
      }
    };

    setTimeout(() => {
      animationRef.current = requestAnimationFrame(run);
    }, delay);
  };

  return (
    <span
      ref={containerRef}
      className={`font-mono inline-block duration-200 ${className}`}
      onMouseEnter={() => animateOn === "hover" && setIsHovered(true)}
      onMouseLeave={() => animateOn === "hover" && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
}
