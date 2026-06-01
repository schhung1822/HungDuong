import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";
const KEYFRAMES_ID = "pc-keyframes";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) => Number.parseFloat(value.toFixed(precision));
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

export default function ProfileCard({
  avatarUrl = "/avatar.webp",
  iconUrl = "/iconpattern.webp",
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowSize = "50%",
  className = "",
  enableTilt = true,
  name = "Dương Mạnh Hùng",
  title = "Web Developer",
  onContactClick
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (document.getElementById(KEYFRAMES_ID)) return;
    const style = document.createElement("style");
    style.id = KEYFRAMES_ID;
    style.textContent = `
      @keyframes pc-holo-bg {
        0% { background-position: 0 var(--background-y), 0 0, center; }
        100% { background-position: 0 var(--background-y), 90% 90%, center; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
        "--card-opacity": "1"
      };

      Object.entries(properties).forEach(([key, value]) => wrap.style.setProperty(key, value));
    };

    const step = (timestamp: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = timestamp;
      const delta = (timestamp - lastTs) / 1000;
      lastTs = timestamp;
      const tau = timestamp < initialUntil ? 0.6 : 0.14;
      const k = 1 - Math.exp(-delta / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        rafId = null;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (event: PointerEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add("active", "entering");
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => shell.classList.remove("entering"), ANIMATION_CONFIG.ENTER_TRANSITION_MS);
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove("active");
        wrapRef.current?.style.setProperty("--card-opacity", "0");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };

    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    tiltEngine.setImmediate(initialX, ANIMATION_CONFIG.INITIAL_Y_OFFSET);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [enableTilt, tiltEngine, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  const cardRadius = "30px";
  const cardStyle = useMemo(
    () =>
      ({
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
        "--behind-glow-color": behindGlowColor,
        "--behind-glow-size": behindGlowSize,
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--pointer-from-center": "0",
        "--pointer-from-top": "0.5",
        "--pointer-from-left": "0.5",
        "--card-opacity": "0",
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--background-x": "50%",
        "--background-y": "50%",
        "--card-radius": cardRadius,
        "--sunpillar-clr-1": "hsl(2, 100%, 73%)",
        "--sunpillar-clr-2": "hsl(53, 100%, 69%)",
        "--sunpillar-clr-3": "hsl(93, 100%, 69%)",
        "--sunpillar-clr-4": "hsl(176, 100%, 76%)",
        "--sunpillar-clr-5": "hsl(228, 100%, 74%)",
        "--sunpillar-clr-6": "hsl(283, 100%, 73%)"
      }) as CSSProperties,
    [behindGlowColor, behindGlowSize, grainUrl, iconUrl, innerGradient]
  );

  const shineStyle: CSSProperties = {
    maskImage: "var(--icon)",
    maskMode: "luminance",
    maskRepeat: "repeat",
    maskSize: "150%",
    maskPosition: "top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))",
    filter: "brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5)",
    animation: "pc-holo-bg 18s linear infinite",
    mixBlendMode: "color-dodge",
    transform: "translate3d(0, 0, 1px)",
    zIndex: 3,
    backgroundImage: `
      repeating-linear-gradient(0deg,
        var(--sunpillar-clr-1) 5%,
        var(--sunpillar-clr-2) 10%,
        var(--sunpillar-clr-3) 15%,
        var(--sunpillar-clr-4) 20%,
        var(--sunpillar-clr-5) 25%,
        var(--sunpillar-clr-6) 30%,
        var(--sunpillar-clr-1) 35%),
      repeating-linear-gradient(-45deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,29%,66%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12%),
      radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,0%,0.1) 12%,hsla(0,0%,0%,0.15) 20%,hsla(0,0%,0%,0.25) 120%)
    `,
    gridArea: "1 / -1",
    borderRadius: cardRadius,
    pointerEvents: "none"
  };

  const glareStyle: CSSProperties = {
    transform: "translate3d(0, 0, 1.1px)",
    backgroundImage: "radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248, 25%, 80%) 12%, hsla(207, 40%, 30%, 0.8) 90%)",
    mixBlendMode: "overlay",
    filter: "brightness(0.8) contrast(1.2)",
    zIndex: 4,
    gridArea: "1 / -1",
    borderRadius: cardRadius,
    pointerEvents: "none"
  };

  return (
    <div ref={wrapRef} className={`relative touch-none ${className}`.trim()} style={{ perspective: "500px", ...cardStyle }}>
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: "radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))",
            filter: "blur(50px) saturate(1.1)",
            opacity: "calc(0.8 * var(--card-opacity))"
          }}
        />
      )}

      <div ref={shellRef} className="relative z-[1]">
        <section
          className="grid relative overflow-hidden"
          style={{
            height: "min(72svh, 520px)",
            minHeight: "460px",
            aspectRatio: "0.718",
            borderRadius: cardRadius,
            boxShadow: "rgba(0,0,0,0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px",
            transition: "transform 1s ease",
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            background: "rgba(0,0,0,0.9)",
            backfaceVisibility: "hidden"
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transition = "none";
            event.currentTarget.style.transform = "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transition = shellRef.current?.classList.contains("entering") ? "transform 180ms ease-out" : "transform 1s ease";
            event.currentTarget.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <div
            className="absolute inset-0 grid"
            style={{
              backgroundImage: "var(--inner-gradient)",
              backgroundColor: "rgba(0,0,0,0.9)",
              borderRadius: cardRadius,
              gridArea: "1 / -1"
            }}
          >
            <div className="absolute inset-0" style={shineStyle} />
            <div className="absolute inset-0" style={glareStyle} />

            <div
              className="relative overflow-visible"
              style={{
                mixBlendMode: "luminosity",
                transform: "translateZ(2px)",
                gridArea: "1 / -1",
                borderRadius: cardRadius,
                pointerEvents: "none",
                backfaceVisibility: "hidden"
              }}
            >
              <img
                className="absolute left-1/2 bottom-[-1px] w-full will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={`${name} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: "50% 100%",
                  transform: "translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0)",
                  borderRadius: cardRadius,
                  backfaceVisibility: "hidden"
                }}
              />
            </div>

            <div
              className="relative z-[5] max-h-full overflow-hidden text-center"
              style={{
                transform: "translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)",
                mixBlendMode: "luminosity",
                gridArea: "1 / -1",
                pointerEvents: "none"
              }}
            >
              <div className="absolute top-12 flex w-full flex-col px-6">
                <h3 className="m-0 text-[24px] font-semibold text-white md:text-[30px]">{name}</h3>
                <p className="mx-auto mt-1 max-w-[260px] text-sm font-semibold text-white/70">{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
