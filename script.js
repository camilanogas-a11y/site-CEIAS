document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Loader Acelerado
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.classList.add('hidden');
        }
    }, 900);

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Menu Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
    }

    // 4. Accordion Interativo (Espaço da Família)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            
            const icon = header.querySelector('.icon');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '−' : '+';
            }
        });
    });

    // 5. Validação do Formulário de Contato
    const contactForm = document.getElementById('school-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.innerHTML = '<p style="color: green; margin-top: 10px;">✦ Mensagem enviada com sucesso! A equipe pedagógica retornará em breve.</p>';
            contactForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});