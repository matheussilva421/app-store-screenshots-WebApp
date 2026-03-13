# Desktop Web App Screenshots Generator

Toolkit/skill para agentes de código gerarem **screenshots promocionais de web apps desktop (SaaS)** com Next.js + TypeScript + Tailwind, exportando PNG com `html-to-image`.

![Exemplo de saída promocional](example.png)

## Escopo (desktop only)

Este projeto é **exclusivamente desktop web apps**.

- ✅ Foco: dashboards, tabelas, analytics, layouts com sidebar/topbar/cards
- ✅ Mockup principal: janela de navegador desktop
- ✅ Exportação PNG em presets desktop
- ✅ Captura automática opcional de screenshots via Playwright
- ❌ Sem suporte a layouts mobile

## O que ele faz

- Coleta briefing de branding, estilo e prioridades de features
- Gera slides promocionais (cada slide vende uma ideia)
- Usa componentes reutilizáveis para layouts desktop
- Exporta screenshots em PNG mantendo o pipeline com `html-to-image`
- Permite captura automática opcional de telas de uma URL para reutilização no layout promocional

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
│       └── auto/              # capturas automáticas opcionais
├── scripts/
│   └── capture-webapp-screenshot.mjs
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

## Captura automática opcional (Playwright)

> O fluxo manual (imagens locais/enviadas) continua funcionando normalmente.

### 1) Instalar dependências no projeto alvo

```bash
npm i -D playwright
npx playwright install chromium
```

### 2) Executar a captura

```bash
node scripts/capture-webapp-screenshot.mjs \
  --url https://seu-app.com \
  --viewport 1920x1080 \
  --theme dark \
  --output public/screenshots-desktop/auto/home-dark.png
```

### 3) Reutilizar na composição visual existente

Use o PNG gerado em `public/screenshots-desktop/...` como qualquer screenshot manual no layout promocional atual.

### Opções disponíveis

- `--url` (obrigatório)
- `--viewport` (`WxH`, ex: `1600x900`, `1920x1080`, `1440x1024`)
- `--theme` (`light` ou `dark`)
- `--output` (arquivo de saída PNG)
- `--wait-ms` (delay extra após carregamento)
- `--full-page` (captura página inteira)

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
- Playwright (opcional para captura automática)
- React

## Limitações conhecidas

- Login, MFA e fluxos protegidos podem exigir adaptação do script.
- Tema claro/escuro depende da aplicação respeitar `prefers-color-scheme`.
- Conteúdo dinâmico/lazy pode exigir ajuste em `--wait-ms`.
- Alguns sites bloqueiam automação ou precisam de headers/cookies específicos.

## Licença

MIT
