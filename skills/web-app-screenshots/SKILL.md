---
name: web-app-screenshots
description: Use when creating desktop SaaS/web app promotional screenshot generators with Next.js, TypeScript, Tailwind, and html-to-image.
---

# Desktop Web App Screenshots Skill

## Scope

This skill is **desktop web app only**.

- Use browser-window mockups and desktop compositions.
- Do not use mobile/iPhone/App Store framing.

## Goal

Build a Next.js page that generates promotional desktop screenshots as ads (not product documentation) and exports PNGs.

## 1) Inputs to collect

### Required

1. Desktop screenshot files (PNG)
2. Logo/app icon
3. Brand colors (accent/text/background)
4. Font preference
5. Prioritized feature list
6. Number of slides
7. Style direction

### Optional

8. Decorative/floating PNG components
9. Localization requirements
10. Constraints and mandatory copy

## 2) Project setup

Keep the stack unchanged:

- Next.js
- TypeScript
- Tailwind
- html-to-image
- single generator page in `src/app/page.tsx`

Package manager priority: `bun > pnpm > yarn > npm`.

## 3) Reusable components (desktop)

Prefer reusable blocks:

- `BrowserWindowMockup`
- `FeatureSlide`
- `DashboardPreview`
- `DataTablePreview`
- `AnalyticsPreview`

Support layouts for:

- dashboards
- tables/data grids
- analytics/charts
- sidebar + topbar + card interfaces

## 4) Required export presets

- `1600x900`
- `1920x1080`
- `1440x1024`

Example type:

```ts
type ExportPreset = {
  id: "desktop-hd" | "desktop-fhd" | "desktop-5x4";
  label: string;
  width: number;
  height: number;
};
```

## 5) PNG export pipeline

Preserve current export logic with `html-to-image`:

- render offscreen
- move on-screen before capture
- call `toPng` twice (warmup + final)
- scale/resize by preset when needed
- deterministic filenames (e.g. `01-hero-1920x1080.png`)

## 6) Naming conventions

Use only desktop/web terminology in labels, texts, helpers, and docs:

- “web app screenshots”
- “desktop screenshots”
- “browser window mockup”

Avoid mobile/App Store/iPhone naming.

## 7) QA

Before delivery:

- one core message per slide
- varied composition between adjacent slides
- all required desktop presets export correctly
- no clipped UI/text in final PNGs
- project runs locally (`npm run dev` or equivalent)
