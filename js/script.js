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
          window.innerWidth > 980
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

            alert(
              "Coloque o número real do WhatsApp da clínica no arquivo js/script.js antes de publicar."
            );

            return;

          }


          window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
          );

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


});