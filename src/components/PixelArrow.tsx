const SHAPES = {
  "up-right": [
    [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [5, 1], [6, 1],
    [4, 2], [6, 2],
    [3, 3], [6, 3],
    [2, 4], [6, 4],
    [1, 5],
    [0, 6],
  ],
  down: [
    [3, 0], [3, 1], [3, 2],
    [0, 3], [3, 3], [6, 3],
    [1, 4], [3, 4], [5, 4],
    [2, 5], [3, 5], [4, 5],
    [3, 6],
  ],
} as const;

type Props = {
  dir: keyof typeof SHAPES;
  className?: string;
};

/** 7×7 pixel arrow drawn with crisp 1-unit squares; inherits currentColor. */
export function PixelArrow({ dir, className }: Props) {
  const d = SHAPES[dir].map(([x, y]) => `M${x} ${y}h1v1h-1z`).join("");

  return (
    <svg
      viewBox="0 0 7 7"
      width="1em"
      height="1em"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
