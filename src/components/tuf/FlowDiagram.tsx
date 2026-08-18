type Tone = "neutral" | "accent" | "danger";

export type FlowNode = { label: string; tone?: Tone };

const toneClass: Record<Tone, string> = {
  neutral: "border-border text-foreground",
  accent: "border-accent text-accent",
  danger: "border-destructive text-destructive",
};

/**
 * Data-driven flow of boxes joined by arrows. Used for the hero flow,
 * the problem flows and the "where TUF fits" flow.
 */
export function FlowDiagram({
  nodes,
  orientation = "horizontal",
  animate = false,
}: {
  nodes: FlowNode[];
  orientation?: "horizontal" | "vertical";
  animate?: boolean;
}) {
  const vertical = orientation === "vertical";

  return (
    <div
      className={
        vertical
          ? "flex flex-col items-center gap-0"
          : "flex flex-col items-stretch gap-0 sm:flex-row sm:items-center"
      }
    >
      {nodes.map((node, i) => (
        <div
          key={node.label}
          className={
            vertical
              ? "flex flex-col items-center"
              : "flex flex-col items-center sm:flex-row sm:flex-1"
          }
        >
          <div
            className={`w-full min-w-0 border bg-card px-4 py-3 text-center font-mono text-xs tracking-wide sm:text-[0.8rem] ${toneClass[node.tone ?? "neutral"]}`}
          >
            {node.label}
          </div>
          {i < nodes.length - 1 ? (
            <Arrow vertical={vertical} animate={animate} delay={i * 0.45} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Arrow({
  vertical,
  animate,
  delay,
}: {
  vertical: boolean;
  animate: boolean;
  delay: number;
}) {
  if (vertical) {
    return (
      <svg width="16" height="40" viewBox="0 0 16 40" className="text-border" aria-hidden="true">
        <line x1="8" y1="0" x2="8" y2="30" stroke="currentColor" />
        <path d="M8 38 L4 29 L12 29 Z" fill="currentColor" />
        {animate ? (
          <circle
            cx="8"
            cy="0"
            r="2.5"
            className="fill-accent tuf-packet-y"
            style={{ animationDelay: `${delay}s` }}
          />
        ) : null}
      </svg>
    );
  }

  return (
    <>
      <svg
        width="16"
        height="32"
        viewBox="0 0 16 32"
        className="text-border sm:hidden"
        aria-hidden="true"
      >
        <line x1="8" y1="0" x2="8" y2="22" stroke="currentColor" />
        <path d="M8 30 L4 21 L12 21 Z" fill="currentColor" />
      </svg>
      <svg
        height="16"
        viewBox="0 0 48 16"
        preserveAspectRatio="none"
        className="hidden h-4 w-8 shrink-0 text-border sm:block"
        aria-hidden="true"
      >
        <line x1="0" y1="8" x2="40" y2="8" stroke="currentColor" />
        <path d="M46 8 L38 4 L38 12 Z" fill="currentColor" />
        {animate ? (
          <circle
            cx="0"
            cy="8"
            r="3"
            className="fill-accent tuf-packet-x"
            style={{ animationDelay: `${delay}s` }}
          />
        ) : null}
      </svg>
    </>
  );
}
