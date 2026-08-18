import { steps } from "./data";

export function Stepper({
  current,
  onChange,
}: {
  current: number;
  onChange: (i: number) => void;
}) {
  const step = steps[current]!;

  return (
    <div className="border border-border bg-card">
      <ol className="flex divide-x divide-border border-b border-border">
        {steps.map((s, i) => (
          <li key={s.title} className="flex-1">
            <button
              type="button"
              onClick={() => onChange(i)}
              aria-current={i === current}
              className={`w-full px-2 py-3 font-mono text-xs transition-colors ${
                i === current
                  ? "bg-secondary text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ol>

      <div key={current} className="tuf-fade-in px-6 py-10 md:px-10">
        <p className="font-mono text-xs tracking-widest text-accent">
          STEP {current + 1} / {steps.length}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{step.body}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, current - 1))}
          disabled={current === 0}
          className="border border-border px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="border border-border px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
