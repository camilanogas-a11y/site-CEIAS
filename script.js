/* =====================================================
   HEADER SCROLL
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

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
    const aberto = menu.classList.toggle("mobile-open");

    if (aberto) {
        menu.style.display = "flex";
        menu.style.position = "fixed";
        menu.style.top = "82px";
        menu.style.left = "14px";
        menu.style.right = "14px";
        menu.style.padding = "25px";
        menu.style.flexDirection = "column";
        menu.style.alignItems = "flex-start";
        menu.style.background = "rgba(255,255,255,.98)";
        menu.style.borderRadius = "20px";
        menu.style.boxShadow = "0 20px 60px rgba(0,31,63,.18)";
    } else {
        menu.removeAttribute("style");
    }
});

document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("mobile-open");

        if (window.innerWidth <= 1050) {
            menu.removeAttribute("style");
        }
    });
});


/* =====================================================
   ANIMAÇÕES AO ROLAR (REVEAL)
===================================================== */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* =====================================================
   MODAL DO CALENDÁRIO SEED / PR
===================================================== */

const modal = document.getElementById("eventModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

const dadosCalendario = {
    semestre1: {
        titulo: "📅 1º Semestre Letivo — SEED/PR",
        texto: "• <strong>Fevereiro:</strong> Início das aulas e Semana Pedagógica.<br>" +
               "• <strong>Abril:</strong> Encerramento do 1º Bimestre e Conselho de Classe.<br>" +
               "• <strong>Maio:</strong> Aplicação da Prova Paraná.<br>" +
               "• <strong>Julho:</strong> Fechamento do 2º Bimestre e consolidação das notas."
    },
    recesso: {
        titulo: "☀️ Recesso Escolar de Julho",
        texto: "• Período de recesso para os estudantes.<br>" +
               "• Dias de estudo e planejamento continuado para os professores e equipe pedagógica da rede estadual."
    },
    semestre2: {
        titulo: "🎓 2º Semestre Letivo e Encerramento",
        texto: "• <strong>Agosto:</strong> Início das atividades do 3º Bimestre.<br>" +
               "• <strong>Outubro:</strong> Conselho de Classe do 3º Bimestre.<br>" +
               "• <strong>Dezembro:</strong> Encerramento das aulas do 4º Bimestre, exames finais e conselho de classe final."
    }
};

document.querySelectorAll(".calendar-btn").forEach(button => {
    button.addEventListener("click", () => {
        const chave = button.dataset.periodo;
        const dados = dadosCalendario[chave];

        modalContent.innerHTML = `
            <span class="eyebrow">CALENDÁRIO OFICIAL SEED/PR</span>
            <h3>${dados.titulo}</h3>
            <p>${dados.texto}</p>
            <br>
            <p><small>* Sujeito a alterações conforme orientações da SEED/PR e NRE Área Metropolitana Sul.</small></p>
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
   FORMULÁRIO DE CONTATO
===================================================== */

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", event => {
    event.preventDefault();

    formMessage.textContent = "Mensagem registrada com sucesso! A secretaria do C.E.I.A.S. retornará o seu contato em breve.";
    formMessage.classList.add("show");

    form.reset();
});


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const topButton = document.getElementById("topButton");

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

document.getElementById("year").textContent = new Date().getFullYear();


/* =====================================================
   GALERIA DE FOTOS
===================================================== */

document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const imagem = item.querySelector("img");

        if (!imagem || !imagem.getAttribute("src")) return;

        window.open(imagem.src, "_blank");
    });
});