/* Joy Kids Dayhome — shared site interactions */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const pageName = document.body.dataset.page;

  // Highlight the current top-level page, including gallery event pages.
  if (pageName) {
    const activeLink = document.querySelector(
      `.site-nav a[data-page="${pageName}"]`
    );

    if (activeLink) {
      activeLink.setAttribute("aria-current", "page");
    }
  }

  // Mobile navigation.
  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
      );
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Keep copyright years current across the site.
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // The form is intentionally a visual demo for this static site.
  const contactForm = document.querySelector("[data-static-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent =
        "Thanks for your note! This sample form cannot send yet—please call or email Joy Kids Dayhome directly.";
      formStatus.focus();
    });
  }
});
