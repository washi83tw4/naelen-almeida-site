document.addEventListener("DOMContentLoaded", () => {

  const menuButton =
    document.querySelector("[data-menu-button]");

  const mobileMenu =
    document.querySelector("[data-mobile-menu]");

  const mobileLinks =
    document.querySelectorAll(".mobile-nav a");

  const currentYear =
    document.querySelector("#current-year");


  // =====================================================
  // MENU MOBILE
  // =====================================================

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        mobileMenu.classList.toggle("active");

      menuButton.classList.toggle("active", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // =====================================================
  // ANO DO RODAPÉ
  // =====================================================

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  // =====================================================
  // WHATSAPP
  // =====================================================

  const whatsappButton =
    document.querySelector("#whatsapp-button");


  if (whatsappButton) {

    whatsappButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();


        /*
        COLOQUE O NÚMERO REAL AQUI.

        Exemplo:
        5547999999999

        Apenas números:
        55 + DDD + número
        */

        const numero =
          "55COLOQUEONUMERO";


        const mensagem =
          encodeURIComponent(
            "Olá! Vim pelo site e gostaria de saber mais sobre os tratamentos e agendar uma avaliação."
          );


        if (
          numero.includes("COLOQUEONUMERO")
        ) {

          alert(
            "Configure o número do WhatsApp no arquivo js/script.js."
          );

          return;

        }


        const url =
          `https://wa.me/${numero}?text=${mensagem}`;


        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }

});