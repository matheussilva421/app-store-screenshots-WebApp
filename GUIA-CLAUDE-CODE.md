# Guia detalhado: como usar este repositório com Claude Code

Este guia mostra, de forma prática, como usar o **Claude Code** para operar este projeto de geração de screenshots promocionais de web apps desktop.

> Contexto: o repositório atual é enxuto e contém principalmente documentação, uma skill (`skills/web-app-screenshots/SKILL.md`) e um script de captura automática via Playwright (`scripts/capture-webapp-screenshot.mjs`).

---

## 1) O que existe hoje na codebase

Arquivos-chave:

- `README.md`: visão geral do projeto, stack, fluxo manual e fluxo opcional de captura automática.
- `scripts/capture-webapp-screenshot.mjs`: CLI Node.js para capturar screenshot de uma URL com Playwright.
- `skills/web-app-screenshots/SKILL.md`: instruções de escopo e padrões para evoluir um gerador de screenshots desktop (Next.js + TS + Tailwind + html-to-image).

Em outras palavras: você já tem as **diretrizes** e a **automação de captura**, mesmo sem uma aplicação Next completa neste repositório.

---

## 2) Pré-requisitos para usar com Claude Code

No ambiente local (ou container) com Claude Code:

1. Node.js 18+
2. Um gerenciador de pacotes (npm, pnpm, yarn ou bun)
3. (Opcional) Playwright instalado para captura automática

Comandos úteis:

```bash
npm install
npm i -D playwright
npx playwright install chromium
```

> Se Playwright não estiver instalado, o script de captura sai com erro e já orienta como instalar.

---

## 3) Fluxo recomendado no Claude Code

Use este fluxo quando quiser produzir screenshots promocionais com ajuda do Claude Code.

### Etapa A — Alinhar objetivo e insumos

Peça ao Claude Code para consolidar:

- URL da aplicação (se haverá captura automática)
- presets desejados (`1600x900`, `1920x1080`, `1440x1024`)
- tema (`light`/`dark`)
- lista de features prioritárias
- direção visual (mais institucional, mais “ad”, etc.)

Prompt sugerido:

```text
Analise o repositório e monte um plano para gerar 5 screenshots promocionais desktop,
com foco em: [objetivo]. Use os presets 1600x900 e 1920x1080.
```

### Etapa B — Capturar screenshot base (opcional)

Se você quer screenshot real da aplicação para reaproveitar depois:

```bash
node scripts/capture-webapp-screenshot.mjs \
  --url https://seu-app.com \
  --viewport 1920x1080 \
  --theme dark \
  --output public/screenshots-desktop/auto/home-dark.png
```

Parâmetros suportados:

- `--url` (obrigatório)
- `--viewport WxH` (ex.: `1920x1080`)
- `--theme light|dark`
- `--output caminho.png`
- `--wait-ms` para aguardar UI dinâmica
- `--full-page` para página inteira

### Etapa C — Pedir evolução de produto (quando aplicável)

Se você quiser transformar este repositório em uma app completa de geração de peças:

1. peça ao Claude Code para criar o app Next.js com TypeScript e Tailwind
2. mantenha o escopo desktop/web
3. implemente exportação PNG com `html-to-image`
4. reutilize as capturas em `public/screenshots-desktop/`

Prompt sugerido:

```text
Implemente uma página Next.js em src/app/page.tsx para gerar peças promocionais desktop,
com presets 1600x900, 1920x1080 e 1440x1024, usando html-to-image para exportar PNG.
Reaproveite screenshots em public/screenshots-desktop e preserve o fluxo opcional de
captura automática com o script existente.
```

### Etapa D — Validar com checks objetivos

Peça ao Claude Code para executar checks mínimos:

- lint/typecheck/testes (quando existirem)
- validação do script de captura (`--help` e execução real)
- validação de saída de arquivos na pasta esperada

---

## 4) Como “conversar” melhor com Claude Code neste projeto

Para obter resultados consistentes:

- Dê prompts com **resultado esperado** (ex.: “quero 6 peças para landing page de analytics”).
- Inclua **restrições** (ex.: “sem mobile”, “terminologia desktop/web”).
- Defina **critérios de aceite** (ex.: “arquivos em PNG, nomes determinísticos, sem clipping”).
- Peça sempre o formato de resposta: **Resumo + Diff + Comandos executados + Próximos passos**.

Exemplo de prompt forte:

```text
Faça as alterações mínimas para adicionar captura dark/light por parâmetro no script,
sem quebrar compatibilidade. Depois rode os checks e me entregue:
1) resumo, 2) arquivos alterados, 3) comandos executados e status, 4) riscos.
```

---

## 5) Playbook de tarefas comuns (com prompts prontos)

### 5.1 Ajustar tempo de espera para páginas dinâmicas

```text
Atualize a documentação com recomendações práticas de --wait-ms para páginas com lazy loading,
polling e animações. Inclua exemplos de comando.
```

### 5.2 Diagnosticar falhas de captura

```text
Investigue por que o script de captura falha na URL X.
Adicione logs objetivos (sem ruído), mantenha a CLI compatível,
e proponha fallback quando networkidle não estabilizar.
```

### 5.3 Evoluir docs para onboarding de time

```text
Crie um guia de onboarding para designers e marketing usarem este repositório,
com fluxo manual e automático, checklist de qualidade e naming padrão.
```

### 5.4 Preparar template de automação CI

```text
Crie um workflow de CI que valide Node setup, lint e execução de
node scripts/capture-webapp-screenshot.mjs --help.
```

---

## 6) Entendendo o script de captura (resumo técnico)

O script `capture-webapp-screenshot.mjs`:

1. faz parse dos argumentos de CLI
2. valida URL, viewport, tema e opções extras
3. carrega Playwright dinamicamente
4. abre Chromium headless com viewport e `colorScheme`
5. navega para URL (`waitUntil: networkidle`)
6. aguarda `--wait-ms`
7. garante diretório de saída
8. salva PNG no caminho definido

Isso já cobre o caso mais comum de captura de tela de web app para reutilização em peças promocionais.

---

## 7) Boas práticas para outputs de marketing

- Use uma mensagem principal por slide/peça.
- Evite repetir composições muito similares em peças consecutivas.
- Prefira capturas com dados visualmente “limpos” (sem estados quebrados).
- Verifique contraste, recorte e legibilidade de textos.
- Padronize nomenclatura de arquivos por tema + resolução + ordem.

Exemplo de naming:

- `01-hero-dark-1920x1080.png`
- `02-dashboard-light-1600x900.png`

---

## 8) Limitações que o Claude Code deve considerar

- Páginas autenticadas (login/MFA) podem exigir automação adicional.
- `dark/light` depende de como a app trata `prefers-color-scheme`.
- Apps com conteúdo assíncrono podem precisar ajuste fino em `--wait-ms`.
- Alguns domínios bloqueiam automação headless.

Ao pedir mudanças ao Claude Code, peça também um plano de mitigação desses pontos.

---

## 9) Checklist final de uso no dia a dia

- [ ] Dependências instaladas
- [ ] Captura base executada (quando necessário)
- [ ] Presets desktop definidos
- [ ] Mensagens de cada peça aprovadas
- [ ] Export em PNG validado
- [ ] Nomes de arquivo padronizados
- [ ] Revisão visual final (sem clipping/overflow)

---

## 10) Resumo executivo

Com Claude Code, este repositório funciona muito bem como:

1. **base de documentação e padrão técnico** para screenshots desktop,
2. **ferramenta de captura automática** com Playwright,
3. **ponto de partida** para evoluir um gerador Next.js completo.

Se quiser, o próximo passo natural é pedir ao Claude Code para scaffoldar a aplicação Next.js completa e conectar o fluxo de exportação PNG com presets desktop já definidos.
