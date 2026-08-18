# TUF Explained

Build a frontend-only TUF educational website prototype.

IMPORTANT:

- This is a lightweight MVP, not a full production application.

- FRONTEND ONLY. No backend, database, authentication, APIs, or external services.

- Use only static content.

- Reuse components aggressively.

- Keep the codebase small and simple.

- Do NOT generate unnecessary files, dependencies, libraries, animations, or infrastructure.

- Prioritize the visual experience over feature complexity.

- Do not rebuild the project architecture unnecessarily if an existing React/Tailwind structure is available.

- Do not add features that are not explicitly requested.

- Make the website deployable as a static site.

GOAL:

Teach a developer who knows nothing about TUF:

What is TUF?

→ Why is it needed?

→ Where does TUF fit?

→ How does it work?

→ What are Root, Targets, Snapshot and Timestamp?

→ Why does this protect software updates?

DESIGN:

Create a polished technical education website.

It should feel like a serious open-source technical project, not an AI-generated SaaS landing page.

Use:

- clean typography

- dark/neutral technical aesthetic

- restrained accent colors

- thin borders

- generous whitespace

- simple SVG icons

- technical diagrams

- subtle animations

Avoid:

- gradients everywhere

- glassmorphism

- excessive rounded cards

- stock illustrations

- 3D graphics

- decorative blobs

- generic SaaS sections

- excessive text

CORE SECTIONS:

1. HERO

Headline:

"Software updates shouldn't have to be trusted blindly."

Subheadline:

"TUF helps software systems verify that an update is trustworthy, even when parts of the update infrastructure have been compromised."

CTA:

"Understand TUF"

Show a simple animated flow:

Developer → Repository → Update → Client

Then show an attacker attempting to modify the update.

2. THE PROBLEM

Visually demonstrate:

Developer

↓

Repository

↓

Client

Then:

Attacker

↓

Compromised Repository

↓

Malicious / stale update

Keep the explanation short.

3. WHERE TUF FITS

Show:

Developer

↓

Software Repository

↓

TUF Metadata

↓

Client

↓

Verified Update

Explain:

"TUF adds security metadata around software updates and gives the client information it can use to decide whether an update is trustworthy."

4. TUF ARCHITECTURE

This is the main interactive section.

Create one clean SVG architecture diagram:

Repository

      ↓

TUF Metadata

      ↓

Root

Targets

Snapshot

Timestamp

      ↓

Client

      ↓

Software Update

Make Root, Targets, Snapshot and Timestamp clickable.

Clicking a role should highlight it and show:

ROOT

"Who do we trust?"

TARGETS

"Which software should I receive?"

SNAPSHOT

"Do the metadata pieces belong together?"

TIMESTAMP

"Is this metadata fresh?"

5. UPDATE VERIFICATION

Create a simple stepper with 5 steps, NOT 8:

1. Client requests an update

2. Receives TUF metadata

3. Verifies signatures and metadata

4. Checks freshness and target integrity

5. Accepts the update

Use Previous / Next controls.

6. SECURITY CONCEPTS

Create three compact interactive cards:

KEY COMPROMISE

TUF limits the impact of compromised keys through separated roles, thresholds and key rotation.

INTEGRITY

Hashes allow the client to detect modified software.

FRESHNESS

Timestamp metadata helps detect stale metadata and freeze attacks.

7. FINAL SUMMARY

"TUF in 30 seconds"

Show:

Trust

Integrity

Consistency

Freshness

Compromise resilience

Then:

"Ready to go deeper?"

Buttons:

"Read TUF Documentation"

"Watch the Explainer"

INTERACTION:

Only implement:

- smooth scrolling

- role highlighting

- simple diagram animation

- architecture reveal

- 5-step verification stepper

Do NOT implement:

- backend

- authentication

- databases

- API calls

- complex state management

- elaborate game mechanics

- unnecessary animations

TECHNICAL:

React + TypeScript + Tailwind.

Use CSS transitions and simple SVGs instead of animation libraries wherever possible.

Make the architecture diagram a reusable React component.

Make role explanations data-driven so the same component renders Root, Targets, Snapshot and Timestamp.

Keep the implementation concise and readable.

MOST IMPORTANT:

The website should communicate TUF through visual explanation and interaction rather than large amounts of text.

Build the MVP now. Do not over-engineer it.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tuf-primer-project.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c5b01bb9-8296-4e18-b21b-0a8164159929).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
