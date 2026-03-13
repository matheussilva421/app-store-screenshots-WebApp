---
name: web-app-screenshots
description: Use when building desktop web app screenshot pages, generating exportable SaaS marketing screenshots, or creating programmatic screenshot generators with Next.js + html-to-image.
---

# Web App Screenshots Generator

## Overview

Build a Next.js page that renders desktop SaaS/web-app promotional screenshots as **advertisements** (not UI documentation) and exports them via `html-to-image` at required resolutions.

## Core Principle

**Screenshots are ads, not docs.** Each slide should sell one clear outcome.

## Step 1: Ask the User These Questions

Before writing code, collect these inputs:

### Required

1. **Desktop screenshots** — “Where are your desktop/web app screenshots (PNG)?”
2. **App icon/logo** — “Where is your logo or app icon PNG?”
3. **Brand colors** — “Accent, text, and background preferences?”
4. **Font** — “Which font should we use?”
5. **Feature priorities** — “Top 3–6 benefits in order of importance?”
6. **Number of slides** — “How many promotional screenshots do you want?”
7. **Style direction** — “Minimal, bold, dark, light, enterprise, playful, etc.?”

### Optional

8. **UI components** — “Any floating PNG components/cards to decorate slides?”
9. **Localization** — “Need versions in multiple languages?”
10. **Constraints** — “Anything to avoid or enforce?”

## Step 2: Set Up the Project

Keep stack and workflow:
- Next.js + TypeScript + Tailwind
- `html-to-image` for PNG export
- single-file generator in `src/app/page.tsx`

### Detect package manager

Use priority: `bun > pnpm > yarn > npm`.

### Scaffold (if needed)

```bash
# bun
bunx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
bun add html-to-image

# pnpm
pnpx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
pnpm add html-to-image

# yarn
yarn create next-app . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
yarn add html-to-image

# npm
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
npm install html-to-image
```

### Expected structure

```text
project/
├── public/
│   ├── app-icon.png
│   └── screenshots-desktop/
│       ├── home.png
│       ├── dashboard.png
│       ├── table.png
│       └── analytics.png
├── src/app/
│   ├── layout.tsx
│   └── page.tsx
└── package.json
```

## Step 3: Use Reusable Desktop Components

Create reusable components and vary slide composition:

- `BrowserWindowMockup` (desktop browser frame)
- `FeatureSlide` (headline + supporting copy + visual)
- `MetricCard`, `DataTablePreview`, `AnalyticsPreview` (optional reusable blocks)

Supported UI themes for visuals:
- dashboards
- tables/data grids
- analytics/metrics
- sidebar/topbar/cards interfaces

## Step 4: Desktop Presets

Provide these export presets:

- `1600x900`
- `1920x1080`
- `1440x1024`

Suggested type:

```ts
type ExportPreset = {
  id: "desktop-hd" | "desktop-fhd" | "desktop-5x4";
  label: string;
  width: number;
  height: number;
};
```

## Step 5: Export Pipeline (Preserve Existing Logic)

Keep `html-to-image` flow and PNG generation:

- render each slide in offscreen container
- temporarily move on-screen before capture
- keep the double-call trick (`toPng` twice)
- optionally scale to target preset via canvas
- use deterministic filenames (`01-hero-1920x1080.png`)

## Step 6: Copy and Naming

Use “web app screenshots” / “desktop screenshots” terminology across:

- page titles
- labels and buttons
- comments and helper names
- documentation

Avoid App Store / iPhone-only naming unless explicitly needed for backward compatibility.

## Step 7: QA Checklist

Before hand-off:

- one clear message per slide
- no repeated layout in adjacent slides
- desktop presets export successfully (1600x900, 1920x1080, 1440x1024)
- no clipped text/visuals after export
- project runs locally with `npm run dev` (or equivalent)

## Common Mistakes

- Treating screenshots as full product tours instead of promo assets
- Reusing identical layouts slide after slide
- Overly dense copy on wide desktop canvases
- Breaking export quality by changing away from `html-to-image`
