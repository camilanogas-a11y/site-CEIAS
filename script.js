// Controle das Abas da Equipe
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
      setTimeout(() => activeContent.classList.add('active'), 20);
    }
  });
});

// Carrossel
const track = document.getElementById('trackProfessores');
const arrowPrev = document.getElementById('arrowPrev');
const arrowNext = document.getElementById('arrowNext');
if (track && arrowPrev && arrowNext) {
  arrowPrev.addEventListener('click', () => track.scrollBy({ left: -240, behavior: 'smooth' }));
  arrowNext.addEventListener('click', () => track.scrollBy({ left: 240, behavior: 'smooth' }));
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
    btn.querySelector('span').textContent = item.classList.contains('active') ? '−' : '+';
  });
});

// Acessibilidade: Tamanho da Fonte
let fontPercent = 100;
document.getElementById('btnFontIncrease').onclick = () => { if (fontPercent < 130) fontPercent += 10; document.documentElement.style.fontSize = fontPercent + '%'; };
document.getElementById('btnFontDecrease').onclick = () => { if (fontPercent > 80) fontPercent -= 10; document.documentElement.style.fontSize = fontPercent + '%'; };
document.getElementById('btnFontReset').onclick = () => { fontPercent = 100; document.documentElement.style.fontSize = '100%'; };

// Acessibilidade: Alto Contraste
document.getElementById('btnContrast').onclick = () => document.body.classList.toggle('contrast');

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.sec').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});