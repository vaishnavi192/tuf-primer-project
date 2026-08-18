import { roles, type Role } from "./data";

const BOX_W = 130;
const BOX_H = 44;

function Node({
  x,
  y,
  w = 200,
  label,
  muted,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  muted?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={BOX_H}
        className={muted ? "fill-card stroke-border" : "fill-card stroke-border"}
      />
      <text
        x={x + w / 2}
        y={y + BOX_H / 2 + 4}
        textAnchor="middle"
        className={`font-mono text-[11px] ${muted ? "fill-[var(--muted-foreground)]" : "fill-[var(--foreground)]"}`}
      >
        {label}
      </text>
    </g>
  );
}

function Line({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-border" />;
}

export function ArchitectureDiagram({
  selected,
  onSelect,
}: {
  selected: Role["id"] | null;
  onSelect: (id: Role["id"]) => void;
}) {
  const width = 620;
  const centerX = width / 2;

  return (
    <svg
      viewBox={`0 0 ${width} 480`}
      className="w-full"
      role="img"
      aria-label="TUF architecture: repository, TUF metadata, the four roles, client, software update"
    >
      <Node x={centerX - 100} y={0} label="Repository" />
      <Line x1={centerX} y1={44} x2={centerX} y2={84} />
      <Node x={centerX - 100} y={84} label="TUF Metadata" />

      {/* metadata -> role bus */}
      <Line x1={centerX} y1={128} x2={centerX} y2={158} />
      <Line x1={70} y1={158} x2={width - 70} y2={158} />

      {roles.map((role, i) => {
        const cols = 2;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col === 0 ? 70 : width - 70 - BOX_W;
        const y = 190 + row * 68;
        const active = selected === role.id;
        return (
          <g key={role.id} className="cursor-pointer" onClick={() => onSelect(role.id)}>
            <Line x1={x + BOX_W / 2} y1={158} x2={x + BOX_W / 2} y2={y} />
            <rect
              x={x}
              y={y}
              width={BOX_W}
              height={BOX_H}
              className={`transition-all duration-200 ${
                active
                  ? "fill-secondary stroke-accent"
                  : "fill-card stroke-border hover:stroke-[var(--foreground)]"
              }`}
              strokeWidth={active ? 1.5 : 1}
            />
            <text
              x={x + BOX_W / 2}
              y={y + BOX_H / 2 + 4}
              textAnchor="middle"
              className={`pointer-events-none font-mono text-[11px] uppercase tracking-wider transition-colors ${
                active ? "fill-[var(--accent)]" : "fill-[var(--foreground)]"
              }`}
            >
              {role.name}
            </text>
          </g>
        );
      })}

      {/* roles -> client */}
      <Line x1={70 + BOX_W / 2} y1={302} x2={70 + BOX_W / 2} y2={332} />
      <Line x1={width - 70 - BOX_W / 2} y1={302} x2={width - 70 - BOX_W / 2} y2={332} />
      <Line x1={70 + BOX_W / 2} y1={332} x2={width - 70 - BOX_W / 2} y2={332} />
      <Line x1={centerX} y1={332} x2={centerX} y2={362} />

      <Node x={centerX - 100} y={362} label="Client" />
      <Line x1={centerX} y1={406} x2={centerX} y2={436} />
      <g>
        <rect
          x={centerX - 100}
          y={436}
          width={200}
          height={BOX_H}
          className="fill-card stroke-accent"
        />
        <text
          x={centerX}
          y={436 + BOX_H / 2 + 4}
          textAnchor="middle"
          className="font-mono text-[11px] fill-[var(--accent)]"
        >
          Software Update
        </text>
      </g>
    </svg>
  );
}
