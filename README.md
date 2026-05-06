# Journey Projects — Corporate Website

Portfolio and case study site for Journey Projects (journeyprojects.co).

## Stack

- Next.js 15 (static export)
- TypeScript
- Tailwind CSS v4
- Netlify hosting

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Structure

- `app/` — Next.js App Router pages and layouts
- `components/` — shared UI components
- `data/` — structured content data (text, metadata, image references)
- `public/images/` — optimized project images organized by project
- `design/` — briefs and raw assets (gitignored, not shipped)
