import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

const defaultColors = ["#22d3ee", "#5eead4", "#a855f7", "#ec4899", "#22d3ee"];

export default function GradientText({
  children,
  className = "",
  colors = defaultColors,
  animationSpeed = 8
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 100%",
        animation: `gradient-text-flow ${animationSpeed}s linear infinite`
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient-text-flow {
              0% { background-position: 0% 50%; }
              100% { background-position: 300% 50%; }
            }
          `
        }}
      />
      {children}
    </span>
  );
}
