import { concepts } from "./data";

function Icon({ name }: { name: "key" | "hash" | "clock" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };
  if (name === "key")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="4" />
        <path d="M11 11l9 9M17 17l2-2M14 14l2-2" />
      </svg>
    );
  if (name === "hash")
    return (
      <svg {...common}>
        <path d="M5 9h14M5 15h14M10 4l-2 16M16 4l-2 16" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ConceptCards({
  openId,
  onToggle,
}: {
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-px border border-border bg-border md:grid-cols-3">
      {concepts.map((c) => {
        const open = openId === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onToggle(c.id)}
            aria-expanded={open}
            className={`group bg-card p-6 text-left transition-colors hover:bg-secondary ${
              open ? "bg-secondary" : ""
            }`}
          >
            <span className={open ? "text-accent" : "text-muted-foreground"}>
              <Icon name={c.icon} />
            </span>
            <h3 className="mt-4 font-mono text-xs uppercase tracking-widest text-foreground">
              {c.title}
            </h3>
            <div
              className={`grid transition-all duration-300 ${
                open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
            {!open ? (
              <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground/70">
                click to expand
              </p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
