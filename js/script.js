/* =========================================================
   NAÉLEN ALMEIDA
   SCRIPT.JS COMPLETO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     1. ELEMENTOS
  ======================================================= */

  const menuButton =
    document.querySelector("[data-menu-button]");

  const mobileMenu =
    document.querySelector("[data-mobile-menu]");

  const mobileLinks =
    document.querySelectorAll(
      "[data-mobile-menu] a"
    );

  const whatsappButtons =
    document.querySelectorAll(
      ".js-whatsapp"
    );

  const currentYear =
    document.querySelector(
      "#current-year"
    );

  const header =
    document.querySelector(
      ".site-header"
    );


  /* =======================================================
     2. MENU MOBILE
  ======================================================= */

  function closeMobileMenu() {

    if (!menuButton || !mobileMenu) {
      return;
    }

    mobileMenu.classList.remove(
      "active"
    );

    menuButton.classList.remove(
      "active"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function openMobileMenu() {

    if (!menuButton || !mobileMenu) {
      return;
    }

    mobileMenu.classList.add(
      "active"
    );

    menuButton.classList.add(
      "active"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  if (menuButton && mobileMenu) {

    menuButton.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const isOpen =
          mobileMenu.classList.contains(
            "active"
          );


        if (isOpen) {

          closeMobileMenu();

        } else {

          openMobileMenu();

        }

      }
    );


    /* Fecha ao clicar em algum link */

    mobileLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            closeMobileMenu();

          }
        );

      }
    );


    /* Fecha ao clicar fora */

    document.addEventListener(
      "click",
      (event) => {

        const clickedInsideMenu =
          mobileMenu.contains(
            event.target
          );

        const clickedMenuButton =
          menuButton.contains(
            event.target
          );


        if (
          !clickedInsideMenu &&
          !clickedMenuButton
        ) {

          closeMobileMenu();

        }

      }
    );


    /* Fecha com ESC */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeMobileMenu();

        }

      }
    );


    /* Fecha se voltar para desktop */

    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth > 1040
        ) {

          closeMobileMenu();

        }

      }
    );

  }


  /* =======================================================
     3. WHATSAPP
  ======================================================= */

  /*
     TROQUE SOMENTE O NÚMERO ABAIXO.

     Formato:
     55 + DDD + número

     Exemplo:
     5547999999999

     NÃO use:
     +
     espaços
     traços
     parênteses
  */

  const whatsappNumber =
    "5547999999999";


  const whatsappMessage =
    "Olá! Vim pelo site da Naélen Almeida e gostaria de saber mais sobre os tratamentos e agendar uma avaliação.";


  const encodedMessage =
    encodeURIComponent(
      whatsappMessage
    );


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


  function showNotification(message) {
    let toast = document.getElementById("ui-notification-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ui-notification-toast";
      toast.style.position = "fixed";
      toast.style.bottom = "24px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.backgroundColor = "#53301e";
      toast.style.color = "#fffaf4";
      toast.style.padding = "14px 24px";
      toast.style.borderRadius = "8px";
      toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      toast.style.zIndex = "9999";
      toast.style.fontFamily = "Montserrat, sans-serif";
      toast.style.fontSize = "14px";
      toast.style.textAlign = "center";
      toast.style.maxWidth = "90vw";
      toast.style.transition = "opacity 0.3s ease";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.display = "block";
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.style.display = "none";
      }, 300);
    }, 4000);
  }

  whatsappButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();


          /*
             Evita mandar para o número
             de exemplo por engano.
          */

          if (
            whatsappNumber ===
            "5547999999999"
          ) {

            showNotification(
              "Configure o número real do WhatsApp da clínica no arquivo js/script.js antes de publicar."
            );

            return;

          }


          const link = document.createElement("a");
          link.href = whatsappURL;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.click();

        }
      );

    }
  );


  /* =======================================================
     4. ANO AUTOMÁTICO
  ======================================================= */

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     5. SCROLL SUAVE PARA LINKS INTERNOS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          /*
             Botões de WhatsApp usam href="#".
             Eles são tratados separadamente.
          */

          if (
            link.classList.contains(
              "js-whatsapp"
            )
          ) {

            return;

          }


          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const targetElement =
            document.querySelector(
              targetId
            );


          if (!targetElement) {

            return;

          }


          event.preventDefault();


          targetElement.scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

        }
      );

    }
  );


  /* =======================================================
     6. HEADER COM SOMBRA AO ROLAR
  ======================================================= */

  function updateHeaderOnScroll() {

    if (!header) {

      return;

    }


    if (
      window.scrollY > 20
    ) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  updateHeaderOnScroll();


  window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    {
      passive: true
    }
  );


  /* =======================================================
     7. EVITA LINKS "#" SUBIREM A PÁGINA
  ======================================================= */

  const emptyLinks =
    document.querySelectorAll(
      'a[href="#"]:not(.js-whatsapp)'
    );


  emptyLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

        }
      );

    }
  );


  /* =======================================================
     8. ACCORDION DE DÚVIDAS (FAQ)
  ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionButton =
      item.querySelector(".faq-question");

    if (!questionButton) {
      return;
    }

    questionButton.addEventListener("click", () => {
      const isAlreadyActive =
        item.classList.contains("active");

      // Fecha outros itens para foco limpo
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherBtn =
            otherItem.querySelector(".faq-question");
          if (otherBtn) {
            otherBtn.setAttribute("aria-expanded", "false");
          }
        }
      });

      if (isAlreadyActive) {
        item.classList.remove("active");
        questionButton.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        questionButton.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* =======================================================
     9. ANIMAÇÕES SUAVES NO SCROLL (INTERSECTION OBSERVER)
  ======================================================= */

  const animatedSelectors = [
    ".section-heading-copy",
    ".treatment-card",
    ".results-copy",
    ".results-gallery",
    ".structure-content-copy",
    ".structure-main-image",
    ".structure-mini-card",
    ".location-copy",
    ".location-details",
    ".location-media",
    ".faq-header",
    ".faq-item",
    ".final-cta-image",
    ".final-cta-copy",
  ].join(", ");

  const scrollElements =
    document.querySelectorAll(animatedSelectors);

  if ("IntersectionObserver" in window) {
    const scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    scrollElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  } else {
    // Fallback gracioso imediato
    scrollElements.forEach((el) => {
      el.classList.add("is-revealed");
    });
  }


});