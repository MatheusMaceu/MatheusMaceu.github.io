import { getMessage, LANGUAGE_EVENT } from "./i18n.js";

export function initNavbar() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!header || !toggle || !nav) return;

  const links = [...nav.querySelectorAll("a")];
  initMobileMenu(header, toggle, nav, links);
  initScrollNavigation(header, links);
}

function initMobileMenu(header, toggle, nav, links) {
  const mobileQuery = window.matchMedia("(max-width: 1024px)");
  const background = [...document.querySelectorAll("main, .site-footer")];
  let isOpen = false;

  function updateToggleLabel() {
    toggle.setAttribute(
      "aria-label",
      isOpen
        ? getMessage("common.menuClose", "Fechar menu")
        : getMessage("common.menuOpen", "Abrir menu"),
    );
  }

  function setOpen(open, restoreFocus = false) {
    open = Boolean(open && mobileQuery.matches);
    isOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    updateToggleLabel();
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-is-open", open);

    // Enquanto o menu está aberto, o conteúdo de fundo não recebe foco.
    background.forEach((element) => {
      element.inert = open;
    });
    if (open) links[0]?.focus();
    else if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener("click", () => setOpen(!isOpen));
  const navigationLinks = [...links, header.querySelector(".wordmark")].filter(
    Boolean,
  );
  navigationLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (!isOpen) return;
      setOpen(false);
      // Ao fechar por uma âncora, o foco acompanha o conteúdo em vez de ficar
      // preso em um link que acabou de desaparecer no menu mobile.
      if (link.pathname !== window.location.pathname || !link.hash) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      const hadTabindex = target.hasAttribute("tabindex");
      if (!hadTabindex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabindex)
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;
    if (event.key === "Escape") setOpen(false, true);
    if (event.key !== "Tab") return;

    // Inclui marca, links e seletor de idioma na ordem natural do cabeçalho.
    // Os demais elementos da página permanecem inertes enquanto o menu está aberto.
    const focusable = [
      ...header.querySelectorAll(
        "a[href], button:not([hidden]):not([disabled])",
      ),
    ];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (isOpen && !header.contains(event.target)) setOpen(false, true);
  });
  mobileQuery.addEventListener("change", () => {
    const focusWillHide =
      mobileQuery.matches && nav.contains(document.activeElement);
    setOpen(false, focusWillHide);
  });
  window.addEventListener(LANGUAGE_EVENT, updateToggleLabel);
  updateToggleLabel();
}

function initScrollNavigation(header, links) {
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean)
    .reverse();
  let scheduled = false;

  function updateScroll() {
    const offset = header.offsetHeight + 130;
    const active = sections.find(
      (section) => section.getBoundingClientRect().top <= offset,
    );
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    links.forEach((link) => {
      if (active && link.hash === `#${active.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    scheduled = false;
  }

  // Agrupa eventos rápidos em uma única leitura de layout por quadro.
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updateScroll();
}
