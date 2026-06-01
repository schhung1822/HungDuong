import type { ReactNode } from "react";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * Aurora component inspired by reactbits.dev
 * Renders a slow-moving, high-end colorful gradient aura as background.
 */
export default function Aurora({
  colorStops = ["#06b6d4", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"],
  className = "",
  children
}: AuroraProps) {
  return (
    <div className={`relative overflow-hidden w-full h-full bg-slate-950 ${className}`}>
      {/* Aurora Waves Wrapper */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 blur-[100px] md:opacity-40">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes aurora-move-1 {
            0% { transform: translate(-30%, -20%) rotate(0deg) scale(1); }
            50% { transform: translate(10%, 15%) rotate(180deg) scale(1.3); }
            100% { transform: translate(-30%, -20%) rotate(360deg) scale(1); }
          }
          @keyframes aurora-move-2 {
            0% { transform: translate(25%, 30%) rotate(0deg) scale(1.2); }
            50% { transform: translate(-15%, -25%) rotate(180deg) scale(0.9); }
            100% { transform: translate(25%, 30%) rotate(360deg) scale(1.2); }
          }
          @keyframes aurora-move-3 {
            0% { transform: translate(-10%, 40%) rotate(0deg) scale(0.8); }
            50% { transform: translate(20%, -10%) rotate(180deg) scale(1.4); }
            100% { transform: translate(-10%, 40%) rotate(360deg) scale(0.8); }
          }
          .aurora-blob-1 {
            animation: aurora-move-1 25s infinite alternate ease-in-out;
          }
          .aurora-blob-2 {
            animation: aurora-move-2 30s infinite alternate ease-in-out;
          }
          .aurora-blob-3 {
            animation: aurora-move-3 22s infinite alternate ease-in-out;
          }
        `}} />
        
        {/* Color Blobs */}
        <div 
          className="aurora-blob-1 absolute w-[600px] h-[600px] rounded-full mix-blend-screen opacity-70"
          style={{
            background: `radial-gradient(circle, ${colorStops[0]} 0%, transparent 70%)`,
            top: "-15%",
            left: "-10%"
          }}
        />
        <div 
          className="aurora-blob-2 absolute w-[700px] h-[700px] rounded-full mix-blend-screen opacity-70"
          style={{
            background: `radial-gradient(circle, ${colorStops[1]} 0%, transparent 70%)`,
            bottom: "-20%",
            right: "-10%"
          }}
        />
        <div 
          className="aurora-blob-3 absolute w-[500px] h-[500px] rounded-full mix-blend-screen opacity-60"
          style={{
            background: `radial-gradient(circle, ${colorStops[2]} 0%, transparent 65%)`,
            top: "30%",
            left: "25%"
          }}
        />
        {/* Optional secondary colors if provided */}
        {colorStops[3] && (
          <div 
            className="aurora-blob-1 absolute w-[400px] h-[400px] rounded-full mix-blend-screen opacity-50"
            style={{
              background: `radial-gradient(circle, ${colorStops[3]} 0%, transparent 65%)`,
              bottom: "10%",
              left: "-5%"
            }}
          />
        )}
      </div>

      {/* Grid overlay for tech look */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] md:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Subtle radial dark mask to frame content */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#090d16_90%)] pointer-events-none opacity-80" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
