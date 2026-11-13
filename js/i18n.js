import commonEnglish from "./locales/common.en.js";

export const LANGUAGE_EVENT = "portfolio:language-change";
const STORAGE_KEY = "pp2-language";
const pageLoaders = {
  home: () => import("./locales/home.en.js"),
  intea: () => import("./locales/intea.en.js"),
  "smart-waste": () => import("./locales/smart-waste.en.js"),
};
const bindings = [
  ["data-i18n", null],
  ["data-i18n-aria-label", "aria-label"],
  ["data-i18n-alt", "alt"],
  ["data-i18n-content", "content"],
  ["data-i18n-title", "title"],
];
const portugueseRuntime = {
  "common.menuOpen": "Abrir menu",
  "common.menuClose": "Fechar menu",
  "common.switchLanguage": "Mudar idioma para inglês",
  "common.languageChanged": "Idioma alterado para português.",
};

let language = "pt-BR";
let english = commonEnglish;

export function getLanguage() {
  return language;
}

export function getMessage(key, fallback = "") {
  const messages = language === "en" ? english : portugueseRuntime;
  return messages[key] ?? fallback;
}

function savedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pt-BR";
  } catch {
    return "pt-BR";
  }
}

function saveLanguage(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // A troca continua funcionando quando o navegador bloqueia o armazenamento.
  }
}

export async function initI18n() {
  const button = document.querySelector("[data-language-toggle]");
  const loadPage = pageLoaders[document.body.dataset.page];
  if (!button || !loadPage) return;

  try {
    const page = await loadPage();
    english = { ...commonEnglish, ...page.default };
  } catch (error) {
    // O HTML em português e todas as outras interações permanecem disponíveis.
    console.warn("Não foi possível carregar as traduções do portfólio.", error);
    return;
  }

  // O próprio HTML é a fonte em português: não há segunda cópia para manter.
  // Cada vínculo altera apenas texto ou um atributo, preservando links e eventos.
  const originals = bindings.flatMap(([marker, attribute]) =>
    [...document.querySelectorAll(`[${marker}]`)].map((element) => ({
      element,
      attribute,
      key: element.getAttribute(marker),
      value: attribute ? element.getAttribute(attribute) : element.textContent,
    })),
  );
  // Os documentos ficam fora dos dicionários de texto. O link original é a
  // versão em português e também funciona quando JavaScript está desativado.
  const cvLinks = [...document.querySelectorAll("a[data-cv-en-href]")].map(
    (element) => ({
      element,
      href: element.getAttribute("href"),
      download: element.getAttribute("download"),
      englishHref: element.dataset.cvEnHref,
    }),
  );
  const status = document.querySelector("[data-language-status]");

  function applyLanguage(value, announce = false) {
    language = value === "en" ? "en" : "pt-BR";
    document.documentElement.lang = language;

    originals.forEach(({ element, attribute, key, value: original }) => {
      const translated =
        language === "en" ? (english[key] ?? original) : original;
      if (attribute) element.setAttribute(attribute, translated);
      else element.textContent = translated;
    });

    cvLinks.forEach(({ element, href, download, englishHref }) => {
      const isEnglish = language === "en";
      element.setAttribute("href", isEnglish ? englishHref : href);
      element.setAttribute(
        "download",
        isEnglish ? englishHref.split("/").at(-1) : download,
      );
      element.setAttribute("hreflang", language);
    });

    button.textContent = language === "en" ? "PT" : "EN";
    const label = getMessage("common.switchLanguage");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    if (announce && status)
      status.textContent = getMessage("common.languageChanged");

    window.dispatchEvent(
      new CustomEvent(LANGUAGE_EVENT, { detail: { language } }),
    );
  }

  applyLanguage(savedLanguage());
  button.hidden = false;
  button.addEventListener("click", () => {
    const next = language === "en" ? "pt-BR" : "en";
    applyLanguage(next, true);
    saveLanguage(next);
  });
}
