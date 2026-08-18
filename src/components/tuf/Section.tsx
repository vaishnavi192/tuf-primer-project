import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="font-mono text-xs tracking-widest text-accent">{index}</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {lead}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
