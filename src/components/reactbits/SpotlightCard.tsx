import { useState, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // e.g. "rgba(255, 255, 255, 0.05)"
  borderColor?: string; // e.g. "rgba(255, 255, 255, 0.25)"
  id?: string;
}

/**
 * SpotlightCard component inspired by reactbits.dev
 * Captures mouse coordinates and draws a radial gradient glow following the cursor.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.05)", // Default soft white spotlight
  borderColor = "rgba(255, 255, 255, 0.25)", // Default white border glow
  id
}: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative rounded-2xl overflow-hidden border border-neutral-800/70 bg-neutral-900/30 transition-colors duration-300 hover:border-neutral-700 ${className}`}
    >
      {/* Spotlight overlay */}
      {isFocused && (
        <>
          {/* Background spotlight */}
          <div
            className="absolute -inset-px pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
            }}
          />
          {/* Border spotlight overlay */}
          <div
            className="absolute -inset-px pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 80%)`,
              maskImage: "linear-gradient(black, black)",
              WebkitMaskImage: "linear-gradient(black, black)",
              maskComposite: "exclude",
              WebkitMaskComposite: "destination-out",
              padding: "1px",
              borderRadius: "inherit"
            }}
          />
        </>
      )}

      {/* Content wrapper */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
}
