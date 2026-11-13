export function initAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  // O conteúdo nasce visível: sem suporte ou com movimento reduzido, nada é ocultado.
  if (motionQuery.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.classList.remove("is-pending");
        // Cada elemento aparece uma vez; deixa de ser observado em seguida.
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
  );

  elements.forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
  motionQuery.addEventListener("change", (event) => {
    if (!event.matches) return;
    // A preferência pode mudar enquanto a página já está aberta.
    observer.disconnect();
    elements.forEach((element) => element.classList.remove("is-pending"));
  });
}
