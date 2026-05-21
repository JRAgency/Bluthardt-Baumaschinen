const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const modal = document.querySelector("#legal-modal");
const modalContent = document.querySelector("[data-modal-content]");

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Menü öffnen");
  });
});

document.querySelector(".inquiry-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Anfrage über die Demo-Website: ${data.get("topic") || "Allgemein"}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.get("name") || ""}`,
      `E-Mail: ${data.get("email") || ""}`,
      `Telefon: ${data.get("phone") || ""}`,
      `Anliegen: ${data.get("topic") || ""}`,
      "",
      "Nachricht:",
      data.get("message") || ""
    ].join("\n")
  );

  window.location.href = `mailto:info@baumaschinen-bluthardt.de?subject=${subject}&body=${body}`;
});

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const template = document.querySelector(`#${button.dataset.modal}-template`);
    if (!template || !modal || !modalContent) return;

    modalContent.innerHTML = "";
    modalContent.append(template.content.cloneNode(true));
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close")?.focus();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((trigger) => {
  trigger.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
