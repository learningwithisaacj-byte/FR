// /components/landing/stairs-graphic.tsx

const STEPS: Array<{ year: string; color: string }> = [
  { year: "2026", color: "#38bdf8" },
  { year: "2027", color: "#a3e635" },
  { year: "2028", color: "#facc15" },
  { year: "2029", color: "#fb923c" },
  { year: "2030", color: "#ec4899" },
];

export function StairsGraphic(): React.JSX.Element {
  return (
    <div className="flex flex-col items-end gap-8">
      <p className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-sky-400">FR</span>{" "}
        <span className="text-lime-400">SHIFT</span>
      </p>

      <svg
        viewBox="0 0 320 260"
        className="w-full max-w-sm"
        role="img"
        aria-label="A staircase representing the years 2026 to 2030, each step lit in a different color"
      >
        {STEPS.map((step, index) => {
          const stepWidth = 260 - index * 40;
          const stepHeight = 32;
          const y = 260 - (index + 1) * stepHeight;
          const x = 320 - stepWidth;

          return (
            <g key={step.year}>
              <rect
                x={x}
                y={y}
                width={stepWidth}
                height={stepHeight}
                rx={4}
                fill={step.color}
                opacity={0.9}
              />
              <text
                x={x + stepWidth / 2}
                y={y + stepHeight / 2 + 5}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0a0a0a"
              >
                {step.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}