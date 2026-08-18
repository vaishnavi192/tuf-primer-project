# TUF Explainer — Static Single-Page Site

A frontend-only, single-page educational site that teaches TUF (The Update Framework) through diagrams and light interaction. No backend, no data layer, no animation libraries.

## What gets built

One page at `/` with seven stacked sections, anchored nav, and smooth scrolling:

1. **Hero** — headline "Software updates shouldn't have to be trusted blindly.", subheadline, "Understand TUF" CTA that scrolls to the architecture section. Inline SVG flow `Developer → Repository → Update → Client` with a CSS-animated packet travelling the line, then an attacker node fading in and tapping the repository.
2. **The Problem** — two side-by-side SVG flows: the honest path, and the compromised path ending in "malicious / stale update". Two or three short lines of copy only.
3. **Where TUF Fits** — vertical flow `Developer → Software Repository → TUF Metadata → Client → Verified Update` plus the one-sentence explanation from the brief.
4. **TUF Architecture** (main interactive piece) — one SVG diagram: Repository → TUF Metadata → the four roles → Client → Software Update. Root / Targets / Snapshot / Timestamp are clickable; the selected role highlights (accent stroke, dimmed siblings) and its question appears in a panel beside the diagram. Roles come from a single data array, so one component renders all four.
5. **Update Verification** — 5-step stepper with Previous / Next, step dots, and a fade transition between steps.
6. **Security Concepts** — three compact cards (Key Compromise, Integrity, Freshness) with an SVG icon each, expanding on click/hover to reveal the detail line.
7. **Final Summary** — "TUF in 30 seconds" with five terms (Trust, Integrity, Consistency, Freshness, Compromise resilience), then "Ready to go deeper?" and two outbound link buttons: "Read TUF Documentation" and "Watch the Explainer".

## Design direction

Dark neutral technical aesthetic: near-black background, off-white text, muted grey secondary text, one restrained accent (cool cyan/teal) used only for highlights and active state. 1px hairline borders, square-ish corners, generous vertical rhythm, monospace for labels and diagram nodes, clean sans for prose. Transitions limited to opacity/transform, 150–300ms. No gradients, glassmorphism, blobs, or stock art.

## Technical notes

- Rewrite `src/routes/index.tsx` as the page; add its own `head()` with a TUF-specific title, description, og/twitter tags.
- Tokens (background, foreground, muted, accent, border) defined in `src/styles.css` as semantic variables; components use token classes only — no hardcoded colors. Fonts loaded via `<link>` in `src/routes/__root.tsx`.
- New files kept minimal, roughly: `src/components/tuf/Section.tsx` (shared section shell: id, eyebrow, heading, children), `FlowDiagram.tsx` (data-driven node/arrow SVG flow reused by hero, problem, and "where it fits"), `ArchitectureDiagram.tsx` (the interactive role diagram), `Stepper.tsx`, `ConceptCard.tsx`, and `src/components/tuf/data.ts` holding roles, steps, concepts, and summary terms.
- Local `useState` only (selected role, current step, expanded card). No router state, no queries, no dependencies added.
- Fully static and deployable as-is.

## Out of scope

Backend, auth, database, API calls, extra pages, animation libraries, and any section not listed above.
