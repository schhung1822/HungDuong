interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // Shimmer cycle speed in seconds
  className?: string;
}

/**
 * ShinyText Component inspired by reactbits.dev
 * Applies a scanning shine gradient animation across text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = ""
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-400 bg-[length:200%_auto] select-none ${className}`}
      style={{
        animation: `shimmer-text-scan ${speed}s linear infinite`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-text-scan {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}} />
      {text}
    </span>
  );
}
