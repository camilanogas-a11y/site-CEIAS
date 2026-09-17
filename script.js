document.addEventListener('DOMContentLoaded', () => {

    // 1. EFITO DE SOMBRA NO MENU AO ROLAR
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. FILTRO DE EQUIPE E FUNCIONÁRIOS
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cardsMembros = document.querySelectorAll('.card-membro');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const categoria = button.getAttribute('data-filter');

            cardsMembros.forEach(card => {
                if (categoria === 'todos' || card.classList.contains(categoria)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 3. ANIMAÇÃO DE MOVIMENTO AO ROLAR A PÁGINA (SCROLL REVEAL)
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});