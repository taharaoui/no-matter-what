# No Matter What — Café · Galerie · Boutique

A premium Montréal-based coffee shop, art gallery, and boutique concept. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Brand

- **Tagline:** No Matter What
- **Story:** Three generations, one family — a café, gallery, and boutique built on continuity through change.
- **Aesthetic references:** % Arabica, Aesop, Kinfolk — premium minimalism, warm restraint.

## Project structure

\`\`\`
src/
  app/                # Routes (App Router)
  components/
    layout/           # Header, footer, nav, shared shell
    sections/         # Page sections (hero, story, menu, gallery, boutique, contact)
    ui/                # Small reusable primitives (buttons, cards, etc.)
  lib/                 # Utilities, constants, data
public/
  images/              # Static image assets
\`\`\`

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Notes

- \`node_modules\` is git-ignored from the start — this repo replaces an earlier one where dependency files got committed into history.
