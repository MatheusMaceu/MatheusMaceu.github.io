import { initNavbar } from "./navbar.js";
import { initAnimations } from "./animations.js";
import { initProjectPreview } from "./project-preview.js";
import { initI18n } from "./i18n.js";

// Ponto de entrada: cada módulo cuida de uma interação independente.
initNavbar();
initAnimations();
initProjectPreview();
void initI18n();

// Evita manutenção manual do ano no rodapé.
const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
