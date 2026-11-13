import { readFile, stat } from "node:fs/promises";
import { resolve, dirname, extname, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = new URL("https://matheusmaceu.github.io/");
const errors = [];
const checked = new Map();
const textExtensions = new Set([".html", ".svg", ".css", ".js"]);
const localePages = {
  home: "home.en.js",
  intea: "intea.en.js",
  "smart-waste": "smart-waste.en.js",
};

function label(file) {
  return relative(root, file).split(sep).join("/");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      (match) => [match[1].toLowerCase(), match[2] ?? match[3]],
    ),
  );
}

async function checkReference(reference, origin) {
  // Links externos são verificados pelo HTML; este script não depende da rede.
  if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(reference)) return;

  let url;
  let absolute;
  try {
    url = reference.startsWith("/")
      ? new URL(`.${reference}`, pathToFileURL(`${root}${sep}`))
      : new URL(reference, pathToFileURL(origin));
    absolute = fileURLToPath(url);
  } catch {
    errors.push(`Caminho inválido: ${reference} em ${label(origin)}`);
    return;
  }

  if (absolute !== root && !absolute.startsWith(root + sep)) {
    errors.push(`Referência fora do projeto: ${reference} em ${label(origin)}`);
    return;
  }

  await checkFile(absolute);

  // Além do arquivo SVG, confere o símbolo usado por <use href="...#ícone">.
  if (url.hash && [".html", ".svg"].includes(extname(absolute))) {
    const ids = checked.get(absolute)?.ids;
    const id = decodeURIComponent(url.hash.slice(1));
    if (ids && !ids.has(id)) {
      errors.push(`Destino #${id} ausente em ${label(absolute)}`);
    }
  }
}

async function checkSocialImage(reference, origin) {
  // A URL pública aponta para um arquivo deste projeto; confere-o sem rede.
  try {
    const url = new URL(reference);
    if (url.origin === siteUrl.origin) {
      await checkReference(url.pathname, origin);
      return;
    }
  } catch {
    // Preserva a verificação de referências relativas enquanto o HTML é editado.
  }
  await checkReference(reference, origin);
}

async function checkFile(absolute) {
  if (checked.has(absolute)) return;
  // Marca antes de percorrer dependências para aceitar imports circulares.
  checked.set(absolute, {});

  let source;
  try {
    const file = await stat(absolute);
    if (!file.isFile()) throw new Error("Não é arquivo");
    if (!file.size) errors.push(`Arquivo vazio: ${label(absolute)}`);
    if (!textExtensions.has(extname(absolute))) return;
    source = await readFile(absolute, "utf8");
    checked.get(absolute).source = source;
  } catch {
    errors.push(`Arquivo local ausente: ${label(absolute)}`);
    return;
  }

  const extension = extname(absolute);
  if (extension === ".html" || extension === ".svg") {
    const ids = [...source.matchAll(/\bid=["']([^"']+)["']/g)].map(
      (match) => match[1],
    );
    checked.get(absolute).ids = new Set(ids);
    if (ids.length !== new Set(ids).size) {
      errors.push(`IDs repetidos em ${label(absolute)}`);
    }

    // Inclui o PDF alternativo selecionado pelo idioma, mesmo sem href ativo.
    for (const match of source.matchAll(
      /\b(?:data-cv-en-href|href|src)=["']([^"']+)["']/g,
    )) {
      await checkReference(match[1], absolute);
    }
    if (extension === ".html") {
      // Capas de compartilhamento usam content, por isso não aparecem em href/src.
      for (const match of source.matchAll(/<meta\b[^>]*>/g)) {
        const attrs = attributes(match[0]);
        if (
          ["og:image", "twitter:image"].includes(
            attrs.property || attrs.name,
          ) &&
          attrs.content
        ) {
          await checkSocialImage(attrs.content, absolute);
        }
      }
      checkHtml(source, absolute);
    }
  }

  if (extension === ".css") {
    // Abrange url(...) e @import "...", inclusive nos estilos importados.
    const references = source.matchAll(
      /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)|@import\s+["']([^"']+)["']/g,
    );
    for (const match of references) {
      await checkReference(match[1] ?? match[2], absolute);
    }
  }

  if (extension === ".js") {
    try {
      execFileSync(process.execPath, ["--check", absolute], { stdio: "pipe" });
    } catch {
      errors.push(`Sintaxe JavaScript inválida: ${label(absolute)}`);
    }
    for (const match of source.matchAll(
      /\b(?:import|export)\s+(?:[^"']*?\s+from\s*)?["']([^"']+)["']/g,
    )) {
      await checkReference(match[1], absolute);
    }
    // Os dicionários são carregados sob demanda, mas também precisam existir.
    for (const match of source.matchAll(
      /\bimport\(\s*["']([^"']+)["']\s*\)/g,
    )) {
      await checkReference(match[1], absolute);
    }
  }
}

function checkHtml(source, absolute) {
  const ids = checked.get(absolute).ids;
  const page = label(absolute);
  checkPageMetadata(source, page);
  const html = attributes(source.match(/<html\b[^>]*>/i)?.[0] || "");
  if (!html.lang?.trim()) errors.push(`Idioma do documento ausente: ${page}`);
  for (const landmark of ["main", "h1"]) {
    const matches = [...source.matchAll(new RegExp(`<${landmark}\\b`, "gi"))];
    if (matches.length !== 1) {
      errors.push(`Esperado um único <${landmark}> em ${page}`);
    }
  }
  for (const match of source.matchAll(/<[^!][^>]*>/g)) {
    const attrs = attributes(match[0]);
    if (Number(attrs.tabindex) > 0) {
      errors.push(`Tabindex positivo altera a ordem de navegação: ${page}`);
    }
  }
  for (const match of source.matchAll(/<button\b[^>]*>/gi)) {
    if (!["button", "submit", "reset"].includes(attributes(match[0]).type)) {
      errors.push(`Botão sem type válido: ${page}`);
    }
  }
  for (const match of source.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (attrs.name !== "viewport") continue;
    const content = attrs.content || "";
    if (/user-scalable\s*=\s*(?:no|0)\b/i.test(content)) {
      errors.push(`Viewport impede o zoom do usuário: ${page}`);
    }
    const maximum = content.match(/maximum-scale\s*=\s*([\d.]+)/i);
    if (maximum && Number(maximum[1]) < 2) {
      errors.push(`Viewport limita o zoom a menos de 200%: ${page}`);
    }
  }
  for (const match of source.matchAll(
    /\b(?:aria-controls|aria-labelledby|aria-describedby)=["']([^"']+)["']/g,
  )) {
    for (const id of match[1].trim().split(/\s+/)) {
      if (!ids.has(id)) errors.push(`Referência ARIA sem destino: #${id}`);
    }
  }

  for (const match of source.matchAll(/<a\b[^>]*>/g)) {
    const attrs = attributes(match[0]);
    const rel = new Set((attrs.rel || "").split(/\s+/));
    if (
      attrs.target === "_blank" &&
      (!rel.has("noopener") || !rel.has("noreferrer"))
    ) {
      errors.push(`Link externo sem rel seguro: ${attrs.href}`);
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/g)) {
    const attrs = attributes(match[0]);
    const meaningfulAlt = Boolean(attrs.alt?.trim());
    const decorative = attrs.alt === "" && attrs["aria-hidden"] === "true";
    if (!meaningfulAlt && !decorative) {
      errors.push(
        `Imagem sem texto alternativo ou marcação decorativa: ${attrs.src}`,
      );
    }
    if (!/^\d+$/.test(attrs.width || "") || !/^\d+$/.test(attrs.height || "")) {
      errors.push(`Imagem sem dimensões: ${attrs.src}`);
    }
  }
}

function checkPageMetadata(source, page) {
  const head = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((match) =>
    attributes(match[0]),
  );
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) =>
    attributes(match[0]),
  );
  const canonical = links.filter((link) =>
    (link.rel || "").toLowerCase().split(/\s+/).includes("canonical"),
  );
  const ogUrl = metas.filter((meta) => meta.property === "og:url");
  const expected = new URL(page === "index.html" ? "" : page, siteUrl).href;

  for (const [name, entries, attribute] of [
    ["canonical", canonical, "href"],
    ["og:url", ogUrl, "content"],
  ]) {
    if (entries.length !== 1) {
      errors.push(`Esperado um único ${name} em ${page}`);
    } else if (entries[0][attribute] !== expected) {
      errors.push(`${name} deve ser ${expected} em ${page}`);
    }
  }

  const images = metas.filter((meta) => meta.property === "og:image");
  if (images.length !== 1) {
    errors.push(`Esperado um único og:image em ${page}`);
    return;
  }

  const reference = images[0].content || "";
  try {
    const image = new URL(reference);
    if (
      image.protocol !== "https:" ||
      image.origin !== siteUrl.origin ||
      image.username ||
      image.password ||
      reference.includes("?") ||
      reference.includes("#") ||
      image.href !== reference
    ) {
      throw new Error("URL de imagem inválida");
    }
  } catch {
    errors.push(
      `og:image deve ser uma URL HTTPS absoluta em ${siteUrl.origin}, sem consulta ou fragmento: ${page}`,
    );
  }
}

async function checkTranslations(source, absolute) {
  const body = attributes(source.match(/<body\b[^>]*>/i)?.[0] || "");
  const filename = localePages[body["data-page"]];
  if (!filename) {
    errors.push(
      `Página sem dicionário de idioma conhecido: ${label(absolute)}`,
    );
    return;
  }

  const used = new Set(
    [
      ...source.matchAll(
        /\bdata-i18n(?:-aria-label|-alt|-content|-title)?=["']([^"']+)["']/g,
      ),
    ].map((match) => match[1]),
  );
  try {
    const directory = resolve(root, "js/locales");
    const common = (
      await import(pathToFileURL(resolve(directory, "common.en.js")).href)
    ).default;
    const local = (
      await import(pathToFileURL(resolve(directory, filename)).href)
    ).default;
    const english = { ...common, ...local };
    for (const key of used) {
      if (typeof english[key] !== "string" || !english[key].trim()) {
        errors.push(
          `Tradução inglesa ausente ou vazia: ${key} em ${label(absolute)}`,
        );
      }
    }
    for (const [key, value] of Object.entries(local)) {
      if (!used.has(key))
        errors.push(`Tradução local sem uso: ${key} em ${filename}`);
      if (typeof value !== "string" || !value.trim()) {
        errors.push(`Tradução local inválida: ${key} em ${filename}`);
      }
    }
  } catch (error) {
    errors.push(
      `Não foi possível ler as traduções de ${label(absolute)}: ${error.message}`,
    );
  }
}

await checkFile(resolve(root, "index.html"));
for (const [absolute, file] of checked) {
  if (extname(absolute) === ".html" && file.source) {
    await checkTranslations(file.source, absolute);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verificação concluída: ${checked.size} arquivos locais, dependências CSS/JS, símbolos SVG, âncoras, ARIA, imagens, links seguros, estrutura semântica, traduções e metadados públicos.`,
  );
}
