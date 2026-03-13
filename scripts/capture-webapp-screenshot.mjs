#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function loadPlaywright() {
  try {
    const mod = await import("playwright");
    return mod;
  } catch {
    console.error(
      "Playwright não está instalado. Instale com: npm i -D playwright && npx playwright install chromium"
    );
    process.exit(1);
  }
}

function parseArgs(argv) {
  const result = {
    url: "",
    width: 1920,
    height: 1080,
    theme: "light",
    output: "public/screenshots-desktop/auto/capture.png",
    waitMs: 1200,
    fullPage: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--url" && next) {
      result.url = next;
      i += 1;
      continue;
    }

    if (token === "--viewport" && next) {
      const [w, h] = next.toLowerCase().split("x");
      const width = Number(w);
      const height = Number(h);
      if (!Number.isFinite(width) || !Number.isFinite(height)) {
        throw new Error("Formato de viewport inválido. Use, por exemplo: 1920x1080");
      }
      result.width = width;
      result.height = height;
      i += 1;
      continue;
    }

    if (token === "--theme" && next) {
      if (!["light", "dark"].includes(next)) {
        throw new Error("Tema inválido. Use --theme light ou --theme dark");
      }
      result.theme = next;
      i += 1;
      continue;
    }

    if (token === "--output" && next) {
      result.output = next;
      i += 1;
      continue;
    }

    if (token === "--wait-ms" && next) {
      const waitMs = Number(next);
      if (!Number.isFinite(waitMs) || waitMs < 0) {
        throw new Error("--wait-ms inválido");
      }
      result.waitMs = waitMs;
      i += 1;
      continue;
    }

    if (token === "--full-page") {
      result.fullPage = true;
      continue;
    }

    if (token === "--help" || token === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  if (!result.url) {
    throw new Error("URL obrigatória. Use --url https://seu-app.com");
  }

  return result;
}

function printHelp() {
  console.log(`\nCaptura automática de screenshot desktop com Playwright\n\nUso:\n  node scripts/capture-webapp-screenshot.mjs \\\n    --url https://example.com \\\n    --viewport 1920x1080 \\\n    --theme light \\\n    --output public/screenshots-desktop/auto/home.png\n\nOpções:\n  --url <url>            URL da aplicação (obrigatório)\n  --viewport <WxH>       Viewport, ex: 1920x1080 (default: 1920x1080)\n  --theme <light|dark>   Tema preferido (default: light)\n  --output <path>        Arquivo de saída PNG\n  --wait-ms <number>     Delay após load para UI assentar (default: 1200)\n  --full-page            Captura página completa\n`);
}

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv);
  const { chromium } = await loadPlaywright();

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: args.width, height: args.height },
      colorScheme: args.theme,
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    await page.goto(args.url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(args.waitMs);

    const outPath = path.resolve(args.output);
    await ensureDir(outPath);

    await page.screenshot({
      path: outPath,
      fullPage: args.fullPage,
      type: "png",
    });

    console.log(`Screenshot salvo em: ${outPath}`);
    console.log(
      "Use este PNG no fluxo existente apontando para public/screenshots-desktop/..."
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`Erro: ${error.message}`);
  process.exit(1);
});
