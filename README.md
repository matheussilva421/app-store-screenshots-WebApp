# Web App Screenshots Generator

A skill for AI-powered coding agents (Claude Code, Cursor, Windsurf, etc.) that generates production-ready promotional screenshots for desktop SaaS/web apps. It scaffolds a Next.js project, designs marketing-style screenshots, and exports PNGs at desktop presets.

![Example output — Bloom coffee tracking app](example.png)

## What it does

- Asks you about your product brand, features, and visual direction
- Scaffolds a minimal Next.js project (or works inside an existing one)
- Designs each screenshot as an **advertisement** (not a UI dump)
- Generates desktop-focused compositions for common SaaS UI types:
  - dashboards
  - tables/data grids
  - analytics/graphs
  - sidebar + topbar + cards layouts
- Uses desktop browser-window mockups (instead of iPhone/device frames)
- Exports PNGs with a reusable `html-to-image` workflow

## Install

### Using npx skills (recommended)

```bash
npx skills add ParthJadhav/app-store-screenshots
```

Install globally:

```bash
npx skills add ParthJadhav/app-store-screenshots -g
```

Install for a specific agent:

```bash
npx skills add ParthJadhav/app-store-screenshots -a claude-code
```

## Usage

Trigger with prompts like:

```text
Build web app screenshots for my SaaS dashboard
```

or

```text
Create desktop marketing screenshots for my web app and export in 1920x1080, 1600x900, and 1440x1024
```

## Scaffolded structure

```text
project/
├── public/
│   ├── app-icon.png
│   └── screenshots-desktop/
│       ├── home.png
│       ├── analytics.png
│       └── ...
├── src/app/
│   ├── layout.tsx
│   └── page.tsx
└── package.json
```

The generator remains a single `page.tsx` file. Open the dev server, review slides, and click to export PNG assets.

## Desktop export presets

| Preset | Resolution |
|--------|------------|
| Desktop HD | 1600 x 900 |
| Desktop FHD | 1920 x 1080 |
| Desktop 5:4 | 1440 x 1024 |

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- html-to-image
- React

## Requirements

- Node.js 18+
- bun, pnpm, yarn, or npm

## License

MIT
