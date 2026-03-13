# Desktop Web App Screenshots Generator

Gerador de screenshots promocionais para **web apps desktop (SaaS)**.

Este projeto reúne diretrizes e automações para criar peças visuais de marketing (não apenas prints de interface), com foco em layouts de navegador desktop e exportação em PNG.

![Exemplo de saída promocional](example.png)

## 1) Descrição do projeto

O objetivo é facilitar a criação de screenshots promocionais para páginas de venda, landing pages, redes sociais, pitch decks e materiais comerciais de produtos SaaS/web.

A proposta é:

- manter composição visual focada em desktop
- reutilizar capturas reais da aplicação
- exportar imagens finais em tamanhos desktop padronizados

---

## 2) O que ele gera

O fluxo gera (ou orienta a gerar):

- slides promocionais com estética de anúncio
- composições com mockup de janela de navegador
- PNGs finais para diferentes resoluções desktop

Também oferece **captura automática opcional** via Playwright para obter screenshots direto de uma URL antes da composição.

---

## 3) Casos de uso

- lançamento de funcionalidades (feature highlights)
- banners e hero sections para landing pages
- materiais comerciais para times de Sales/CS
- criativos para anúncios de produto
- apresentações para investidores/parceiros
- documentação visual de roadmap/releases

---

## 4) Tecnologias utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- React
- html-to-image (exportação PNG)
- Playwright (opcional para captura automática)

---

## 5) Como instalar

### Requisitos

- Node.js 18+
- npm, pnpm, yarn ou bun

### Dependências (projeto alvo)

```bash
npm install
```

### Dependência opcional para captura automática

```bash
npm i -D playwright
npx playwright install chromium
```

---

## 6) Como rodar localmente

```bash
npm run dev
```

Depois abra a URL exibida no terminal (normalmente `http://localhost:3000`).

---

## 7) Como gerar screenshots

Existem dois fluxos:

### A) Fluxo manual (continua suportado)

1. Coloque screenshots da aplicação em `public/screenshots-desktop/`
2. Monte os layouts promocionais no gerador
3. Exporte os PNGs finais

### B) Fluxo opcional com captura automática (Playwright)

1. Rode a captura informando URL, viewport e tema
2. Salve o arquivo em `public/screenshots-desktop/auto/`
3. Reutilize o PNG capturado na composição visual existente

Exemplo:

```bash
node scripts/capture-webapp-screenshot.mjs \
  --url https://seu-app.com \
  --viewport 1920x1080 \
  --theme dark \
  --output public/screenshots-desktop/auto/home-dark.png
```

Parâmetros disponíveis:

- `--url` (obrigatório)
- `--viewport` (`WxH`, ex: `1600x900`, `1920x1080`, `1440x1024`)
- `--theme` (`light` ou `dark`)
- `--output` (path do PNG de saída)
- `--wait-ms` (espera extra para conteúdo dinâmico)
- `--full-page` (captura página inteira)

---

## 8) Presets disponíveis

| Preset | Resolução |
|--------|-----------|
| Desktop HD | 1600 x 900 |
| Desktop FHD | 1920 x 1080 |
| Desktop 5:4 | 1440 x 1024 |

---

## 9) Estrutura básica do projeto

```text
project/
├── public/
│   ├── app-icon.png
│   └── screenshots-desktop/
│       ├── home.png
│       ├── dashboard.png
│       ├── table.png
│       ├── analytics.png
│       └── auto/                     # capturas automáticas opcionais
├── scripts/
│   └── capture-webapp-screenshot.mjs # captura Playwright opcional
├── src/app/
│   ├── layout.tsx
│   └── page.tsx
└── package.json
```

> Observação: este repositório atual contém principalmente documentação, skill e script de captura.

---

## 10) Limitações atuais

- páginas com login/MFA podem exigir automação adicional
- tema claro/escuro depende da app respeitar `prefers-color-scheme`
- páginas com polling/lazy loading podem precisar ajuste de `--wait-ms`
- alguns sites podem bloquear automação headless
- a qualidade final depende da qualidade dos screenshots de entrada e da composição visual

---

## 11) Próximos passos sugeridos

- adicionar exemplos prontos de layouts (dashboard/table/analytics)
- incluir presets extras para canais específicos (ads/social/hero banners)
- criar pipeline de exportação em lote com nomenclatura padronizada
- adicionar validação visual automática (ex.: cortes, contraste, overflow)
- suportar captura autenticada (cookies/storage state) no script
- publicar templates de copy por tipo de produto SaaS

---

## Licença

MIT
