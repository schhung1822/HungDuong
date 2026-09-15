import type { SVGProps } from "react";

// Same dot size and 12.25 grid step as DotGridIcon, so both icons read as one set
const STEP = 12.25;
const SIZE = 10.25;
const at = (index: number) => 2 + index * STEP;

// Three dotted bars
const MENU_DOTS: Array<[number, number]> = [1.5, 3.5, 5.5].flatMap((row) =>
  Array.from({ length: 8 }, (_, col): [number, number] => [at(col), at(row)])
);

// Two dotted diagonals
const CLOSE_DOTS: Array<[number, number]> = Array.from({ length: 8 }, (_, i): Array<[number, number]> => [
  [at(i), at(i)],
  [at(7 - i), at(i)]
]).flat();

type DotMenuIconProps = SVGProps<SVGSVGElement> & {
  open?: boolean;
};

export default function DotMenuIcon({ open = false, ...props }: DotMenuIconProps) {
  const dots = open ? CLOSE_DOTS : MENU_DOTS;

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g fill="currentColor">
        {dots.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={SIZE} height={SIZE} rx={SIZE / 2} />
        ))}
      </g>
    </svg>
  );
}
