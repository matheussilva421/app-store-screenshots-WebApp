# Desktop Web App Screenshots Generator

Toolkit/skill para agentes de código gerarem **screenshots promocionais de web apps desktop (SaaS)** com Next.js + TypeScript + Tailwind, exportando PNG com `html-to-image`.

![Exemplo de saída promocional](example.png)

## Escopo (desktop only)

Este projeto é **exclusivamente desktop web apps**.

- ✅ Foco: dashboards, tabelas, analytics, layouts com sidebar/topbar/cards
- ✅ Mockup principal: janela de navegador desktop
- ✅ Exportação PNG em presets desktop
- ❌ Sem fluxo/App Store/iPhone/mobile

## O que ele faz

- Coleta briefing de branding, estilo e prioridades de features
- Gera slides promocionais (cada slide vende uma ideia)
- Usa componentes reutilizáveis para layouts desktop
- Exporta screenshots em PNG mantendo o pipeline com `html-to-image`

## Estrutura esperada

```text
project/
├── public/
│   ├── app-icon.png
│   └── screenshots-desktop/
│       ├── home.png
│       ├── dashboard.png
│       ├── table.png
│       ├── analytics.png
│       └── ...
├── src/app/
│   ├── layout.tsx
│   └── page.tsx
└── package.json
```

## Presets desktop de exportação

| Preset | Resolução |
|--------|-----------|
| Desktop HD | 1600 x 900 |
| Desktop FHD | 1920 x 1080 |
| Desktop 5:4 | 1440 x 1024 |

## Execução local

```bash
npm install
npm run dev
```

> Também funciona com `bun`, `pnpm` ou `yarn`.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- html-to-image
- React

## Licença

MIT
