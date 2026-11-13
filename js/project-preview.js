export function initProjectPreview() {
  const openers = document.querySelectorAll("[data-project-preview-open]");
  const previews = new Map();

  openers.forEach((opener) => {
    const dialog = document.getElementById(opener.dataset.projectPreviewOpen);
    const panel = dialog?.querySelector(".project-preview-panel");
    const closeButton = dialog?.querySelector("[data-project-preview-close]");

    // Sem suporte ao diálogo, a captura continua visível e o controle fica oculto.
    if (!panel || !closeButton || typeof dialog.showModal !== "function")
      return;

    if (!previews.has(dialog)) {
      const preview = { opener: null };
      previews.set(dialog, preview);

      closeButton.addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (event) => {
        // Cliques na imagem ou nos controles pertencem ao painel, não ao fundo.
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener("close", () => {
        const hasOpenPreview = [...previews.keys()].some((item) => item.open);
        document.body.classList.toggle(
          "project-preview-is-open",
          hasOpenPreview,
        );

        // O diálogo nativo mantém o foco e aceita Escape; a volta é ao botão usado.
        if (preview.opener?.isConnected) preview.opener.focus();
        preview.opener = null;
      });
    }

    opener.hidden = false;
    opener.addEventListener("click", () => {
      if (dialog.open) return;
      previews.get(dialog).opener = opener;
      dialog.showModal();
      document.body.classList.add("project-preview-is-open");
    });
  });
}
