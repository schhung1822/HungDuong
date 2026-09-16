import type { ReactNode } from "react";
import { projectsData } from "../data/projects";

const imagesPerColumn = 11;
const thumbnailPool = projectsData.map((project) => project.thumbnail);

const columnFrom = (offset: number) =>
  Array.from(
    { length: imagesPerColumn },
    (_, index) => thumbnailPool[(offset + index) % thumbnailPool.length]
  );

const columns = {
  outerLeft: columnFrom(0),
  innerLeft: columnFrom(6),
  innerRight: columnFrom(13),
  outerRight: columnFrom(20)
};

const bandMask = (direction: "to right" | "to left") =>
  `linear-gradient(${direction}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 38%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0) 100%)`;

const coreFogMask =
  "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 14%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.5) 86%, rgba(0,0,0,0) 100%)";

interface BackdropColumnProps {
  images: string[];
  direction: "up" | "down";
  duration: string;
  delay: string;
  className?: string;
}

function BackdropColumn({ images, direction, duration, delay, className = "" }: BackdropColumnProps) {
  return (
    <div className={`h-full flex-1 overflow-hidden ${className}`}>
      <div
        className={`project-backdrop-track ${direction === "down" ? "project-backdrop-down" : "project-backdrop-up"}`}
        style={{ animationDuration: duration, animationDelay: delay }}
      >
        {[0, 1, 2].map((copyIndex) => (
          <div className="project-backdrop-group" key={copyIndex}>
            {images.map((image, imageIndex) => (
              <div
                className="aspect-video overflow-hidden rounded-xl border border-black/[0.06] bg-white p-1 shadow-sm"
                key={`${copyIndex}-${imageIndex}-${image}`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SideBand({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  const mask = bandMask(side === "left" ? "to right" : "to left");

  return (
    <div
      className={`absolute inset-y-0 flex w-[160px] gap-3 sm:w-[292px] lg:w-[clamp(300px,25vw,420px)] ${
        side === "left" ? "left-3 sm:left-4 lg:left-6" : "right-3 sm:right-4 lg:right-6"
      }`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {children}
    </div>
  );
}

export default function ProjectThumbnailBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f0eee8]" aria-hidden="true">
      <div className="absolute -left-40 top-[7%] h-[520px] w-[520px] rounded-full bg-neutral-400/15 blur-[130px]" />
      <div className="absolute -right-36 bottom-[5%] h-[460px] w-[460px] rounded-full bg-white/80 blur-[130px]" />

      <SideBand side="left">
        <BackdropColumn images={columns.outerLeft} direction="up" duration="46s" delay="-8s" />
        <BackdropColumn
          images={columns.innerLeft}
          direction="down"
          duration="38s"
          delay="-21s"
          className="hidden sm:block"
        />
      </SideBand>

      <SideBand side="right">
        <BackdropColumn
          images={columns.innerRight}
          direction="down"
          duration="42s"
          delay="-15s"
          className="hidden sm:block"
        />
        <BackdropColumn images={columns.outerRight} direction="up" duration="50s" delay="-30s" />
      </SideBand>

      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div
        className="absolute inset-0 backdrop-blur-[9px]"
        style={{
          background:
            "linear-gradient(to right, rgba(240,238,232,0) 0%, rgba(240,238,232,0.58) 26%, rgba(240,238,232,0.86) 50%, rgba(240,238,232,0.58) 74%, rgba(240,238,232,0) 100%)",
          maskImage: coreFogMask,
          WebkitMaskImage: coreFogMask
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(240,238,232,0.97)_0%,rgba(240,238,232,0)_18%,rgba(240,238,232,0)_78%,rgba(240,238,232,0.96)_100%)]" />
    </div>
  );
}
