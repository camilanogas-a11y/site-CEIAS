/* =====================================================
   HEADER
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   MENU MOBILE
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");


menuButton.addEventListener("click", () => {

    const aberto =
        menu.classList.toggle("mobile-open");

    if (aberto) {

        menu.style.display = "flex";

        menu.style.position = "fixed";

        menu.style.top = "82px";

        menu.style.left = "14px";

        menu.style.right = "14px";

        menu.style.padding = "25px";

        menu.style.flexDirection = "column";

        menu.style.alignItems = "flex-start";

        menu.style.background =
            "rgba(255,253,248,.98)";

        menu.style.borderRadius = "24px";

        menu.style.boxShadow =
            "0 20px 60px rgba(16,35,63,.18)";

    } else {

        menu.removeAttribute("style");

    }

});


/* Fecha o menu quando clicar em algum link */

document
    .querySelectorAll("#menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("mobile-open");

            if (window.innerWidth <= 1050) {
                menu.removeAttribute("style");
            }

        });

    });


/* =====================================================
   ANIMAÇÕES AO ROLAR
===================================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });


/* =====================================================
   MODAL DOS EVENTOS
===================================================== */

const modal =
    document.getElementById("eventModal");

const modalContent =
    document.getElementById("modalContent");

const closeModal =
    document.getElementById("closeModal");


const eventos = {

    primavera: {

        titulo: "🌼 Primavera Fest",

        texto:
            "Aqui você pode colocar a programação oficial, " +
            "data, horário, atividades, apresentações e demais " +
            "informações do Primavera Fest."
    },

    cultural: {

        titulo: "🎨 Semana Cultural",

        texto:
            "Aqui você pode apresentar a programação oficial " +
            "da Semana Cultural, incluindo apresentações, " +
            "oficinas, exposições, projetos e atividades."
    }

};


document
    .querySelectorAll(".event-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const evento =
                button.dataset.event;

            const dados =
                eventos[evento];

            modalContent.innerHTML = `

                <span class="eyebrow">
                    EVENTO DO COLÉGIO
                </span>

                <h3>
                    ${dados.titulo}
                </h3>

                <p>
                    ${dados.texto}
                </p>

                <br>

                <p>
                    <strong>
                        Em breve:
                    </strong>
                    programação completa.
                </p>

            `;

            modal.classList.add("active");

        });

    });


closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* =====================================================
   FORMULÁRIO
===================================================== */

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


form.addEventListener("submit", event => {

    event.preventDefault();

    formMessage.textContent =
        "Mensagem preenchida com sucesso! " +
        "Para receber mensagens de verdade, " +
        "será necessário conectar este formulário " +
        "a um serviço de envio ou backend.";

    formMessage.classList.add("show");

    form.reset();

});


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const topButton =
    document.getElementById("topButton");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   ANO DO FOOTER
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =====================================================
   GALERIA
===================================================== */

document
    .querySelectorAll(".gallery-item")
    .forEach(item => {

        item.addEventListener("click", () => {

            const imagem =
                item.querySelector("img");

            if (!imagem) return;

            if (!imagem.getAttribute("src")) return;

            window.open(
                imagem.src,
                "_blank"
            );

        });

    });
