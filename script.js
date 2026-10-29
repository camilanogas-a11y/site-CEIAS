// Controle das Abas da Equipe com Animação
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => {
      c.classList.remove('active');
      c.hidden = true;
    });

    btn.classList.add('active');
    const activeContent = document.getElementById(target);
    if (activeContent) {
      activeContent.hidden = false;
      // Pequeno timeout para disparar a animação CSS de Fade In
      setTimeout(() => {
        activeContent.classList.add('active');
      }, 20);
    }
  });
});

// Carrossel de Professores
const track = document.getElementById('trackProfessores');
const arrowPrev = document.getElementById('arrowPrev');
const arrowNext = document.getElementById('arrowNext');

if (track && arrowPrev && arrowNext) {
  arrowPrev.addEventListener('click', () => {
    track.scrollBy({ left: -240, behavior: 'smooth' });
  });
  arrowNext.addEventListener('click', () => {
    track.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

// Animação ao rolar a página (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.sec, .reveal').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});