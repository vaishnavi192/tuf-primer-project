import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ArchitectureDiagram } from "../components/tuf/ArchitectureDiagram";
import { ConceptCards } from "../components/tuf/ConceptCard";
import { FlowDiagram } from "../components/tuf/FlowDiagram";
import { Section } from "../components/tuf/Section";
import { Stepper } from "../components/tuf/Stepper";
import { roles, summary, type Role } from "../components/tuf/data";

const TITLE = "TUF — Verifying software updates you can't trust blindly";
const DESCRIPTION =
  "A visual introduction to The Update Framework: why signed update metadata matters, and what Root, Targets, Snapshot and Timestamp each do.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["problem", "Problem"],
  ["fit", "Where it fits"],
  ["architecture", "Architecture"],
  ["verification", "Verification"],
  ["security", "Security"],
  ["summary", "Summary"],
] as const;

function Index() {
  const [selected, setSelected] = useState<Role["id"] | null>("root");
  const [step, setStep] = useState(0);
  const [openConcept, setOpenConcept] = useState<string | null>("compromise");

  const role = roles.find((r) => r.id === selected) ?? null;

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <a href="#top" className="font-mono text-sm tracking-widest text-foreground">
            TUF<span className="text-accent">.</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <div id="top" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <p className="font-mono text-xs tracking-widest text-accent">THE UPDATE FRAMEWORK</p>
        <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
          Software updates shouldn't have to be trusted blindly.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          TUF helps software systems verify that an update is trustworthy, even when parts of the
          update infrastructure have been compromised.
        </p>
        <a
          href="#architecture"
          className="mt-10 inline-block border border-accent px-5 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Understand TUF →
        </a>

        <div className="mt-16 border border-border bg-card p-6 md:p-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            the usual path
          </p>
          <div className="mt-6">
            <FlowDiagram
              animate
              nodes={[
                { label: "Developer" },
                { label: "Repository" },
                { label: "Update" },
                { label: "Client", tone: "accent" },
              ]}
            />
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-destructive">
              … and an attacker in the middle
            </p>
            <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:justify-center">
              <div className="border border-destructive px-4 py-3 font-mono text-xs text-destructive">
                Attacker
              </div>
              <svg
                width="120"
                height="16"
                viewBox="0 0 120 16"
                className="text-destructive"
                aria-hidden="true"
              >
                <line x1="0" y1="8" x2="112" y2="8" stroke="currentColor" strokeDasharray="4 4" />
                <path d="M118 8 L110 4 L110 12 Z" fill="currentColor" />
              </svg>
              <div className="border border-border bg-secondary px-4 py-3 font-mono text-xs text-foreground">
                Repository
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Nothing in this picture lets the client tell a good update from a bad one.
            </p>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <Section
        id="problem"
        index="01"
        title="The problem"
        lead="Clients usually accept whatever the repository serves them. If the repository, a mirror or a signing key is compromised, the client installs the attacker's software — or is quietly held back on an old, vulnerable version."
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              expected
            </p>
            <div className="mt-8">
              <FlowDiagram
                orientation="vertical"
                nodes={[
                  { label: "Developer" },
                  { label: "Repository" },
                  { label: "Client", tone: "accent" },
                ]}
              />
            </div>
          </div>
          <div className="bg-card p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-destructive">
              compromised
            </p>
            <div className="mt-8">
              <FlowDiagram
                orientation="vertical"
                nodes={[
                  { label: "Attacker", tone: "danger" },
                  { label: "Compromised Repository", tone: "danger" },
                  { label: "Malicious / stale update", tone: "danger" },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* WHERE TUF FITS */}
      <Section
        id="fit"
        index="02"
        title="Where TUF fits"
        lead="TUF adds security metadata around software updates and gives the client information it can use to decide whether an update is trustworthy."
      >
        <div className="border border-border bg-card p-8 md:p-12">
          <FlowDiagram
            animate
            orientation="vertical"
            nodes={[
              { label: "Developer" },
              { label: "Software Repository" },
              { label: "TUF Metadata", tone: "accent" },
              { label: "Client" },
              { label: "Verified Update", tone: "accent" },
            ]}
          />
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section
        id="architecture"
        index="03"
        title="TUF architecture"
        lead="Responsibility is split across four signing roles. Select one to see the question it answers."
      >
        <div className="grid gap-px border border-border bg-border lg:grid-cols-[1.2fr_1fr]">
          <div className="bg-card p-8">
            <ArchitectureDiagram selected={selected} onSelect={setSelected} />
          </div>
          <div className="bg-card p-8">
            {role ? (
              <div key={role.id} className="tuf-fade-in">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {role.name}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  “{role.question}”
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role.detail}</p>
              </div>
            ) : null}
            <ul className="mt-10 space-y-px border-t border-border pt-6">
              {roles.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(r.id)}
                    className={`flex w-full items-baseline justify-between gap-4 border-b border-border/60 py-3 text-left font-mono text-xs transition-colors ${
                      selected === r.id
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="uppercase tracking-widest">{r.name}</span>
                    <span className="text-right normal-case">{r.question}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* VERIFICATION */}
      <Section
        id="verification"
        index="04"
        title="Update verification"
        lead="What the client actually does when an update is offered."
      >
        <Stepper current={step} onChange={setStep} />
      </Section>

      {/* SECURITY */}
      <Section
        id="security"
        index="05"
        title="Security concepts"
        lead="Three properties that make the difference between trusting infrastructure and verifying it."
      >
        <ConceptCards
          openId={openConcept}
          onToggle={(id) => setOpenConcept((prev) => (prev === id ? null : id))}
        />
      </Section>

      {/* SUMMARY */}
      <Section id="summary" index="06" title="TUF in 30 seconds">
        <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {summary.map((s) => (
            <div key={s.term} className="bg-card p-6">
              <dt className="font-mono text-xs uppercase tracking-widest text-accent">{s.term}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.line}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 border-t border-border pt-10">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Ready to go deeper?
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://theupdateframework.io/docs/overview/"
              target="_blank"
              rel="noreferrer"
              className="border border-accent px-5 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Read TUF Documentation
            </a>
            <a
              href="https://www.youtube.com/results?search_query=the+update+framework+explained"
              target="_blank"
              rel="noreferrer"
              className="border border-border px-5 py-2.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Watch the Explainer
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="font-mono text-xs text-muted-foreground">
            An educational prototype about The Update Framework. Static, unaffiliated.
          </p>
        </div>
      </footer>
    </main>
  );
}
