document.addEventListener('DOMContentLoaded', () => {

  // 1. Partículas de Estrelas Sutis (Respeita preferência de movimento reduzido)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const starsContainer = document.getElementById('stars');

  if (starsContainer && !prefersReducedMotion) {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 10}s`;
      star.style.animationDuration = `${8 + Math.random() * 6}s`;
      starsContainer.appendChild(star);
    }
  }

  // 2. Menu Mobile
  const bg = document.getElementById('burger');
  const mn = document.getElementById('menu');

  if (bg && mn) {
    bg.addEventListener('click', () => {
      const isOpen = mn.classList.toggle('open');
      bg.setAttribute('aria-expanded', isOpen);
    });

    mn.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mn.classList.remove('open');
        bg.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Animação de Rolagem Suave (Intersection Observer)
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // 4. Navegação por Abas da Equipe
  const tabBtns = document.querySelectorAll('.tab-btn-custom');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 5. Carrossel de Professores
  const track = document.getElementById('trackProfessores');
  const arrowPrev = document.getElementById('arrowPrev');
  const arrowNext = document.getElementById('arrowNext');

  if (track && arrowPrev && arrowNext) {
    arrowPrev.addEventListener('click', () => track.scrollBy({ left: -240, behavior: 'smooth' }));
    arrowNext.addEventListener('click', () => track.scrollBy({ left: 240, behavior: 'smooth' }));
  }

  // 6. Data e Calendário SEED-PR 2026
  const elAno = document.getElementById('ano');
  if (elAno) elAno.textContent = '2026';
  const elFooter = document.getElementById('anoFooter');
  if (elFooter) elFooter.textContent = '2026';

  const SEED = [
    ['2026-01-01', 'feriado', 'Ano Novo'], ['2026-04-03', 'feriado', 'Paixão de Cristo'], ['2026-04-05', 'feriado', 'Páscoa'], ['2026-04-21', 'feriado', 'Tiradentes'],
    ['2026-05-01', 'feriado', 'Dia do Trabalho'], ['2026-06-04', 'feriado', 'Corpus Christi'], ['2026-09-07', 'feriado', 'Independência'], ['2026-10-12', 'feriado', 'N. Sra. Aparecida'],
    ['2026-11-02', 'feriado', 'Finados'], ['2026-11-15', 'feriado', 'Proclamação da República'], ['2026-11-20', 'feriado', 'Consciência Negra'], ['2026-12-25', 'feriado', 'Natal'],
    ['2026-02-05', 'tri', 'Início do 1º trimestre'], ['2026-05-14', 'tri', 'Fim do 1º trimestre'],
    ['2026-05-18', 'tri', 'Início do 2º trimestre'], ['2026-09-04', 'tri', 'Fim do 2º trimestre'],
    ['2026-09-08', 'tri', 'Início do 3º trimestre'], ['2026-12-18', 'tri', 'Fim do ano letivo'],
    ['2026-08-07', 'comem', 'Dia do Funcionário de Escola'], ['2026-08-11', 'comem', 'Dia do Estudante'], ['2026-10-13', 'comem', 'Dia do Professor']
  ].map(([d, t, n]) => ({ d, t, n, f: 'SEED-PR' }));

  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const hoje = new Date();
  let ano = 2026, mes = 1, sel = null, filtroAtivo = 'todos', modoVisao = 'mensal';

  const iso = (a, m, d) => `${a}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const pt = d => d.split('-').reverse().join('/');

  function mostra(d) {
    sel = d;
    const l = SEED.filter(e => e.d === d);
    const tit = document.getElementById('seltit');
    const box = document.getElementById('evs');
    if (tit) tit.textContent = pt(d);
    if (box) {
      box.innerHTML = l.length 
        ? l.map(e => `<div class="ev-item"><strong>${e.n}</strong><small>${e.f}</small></div>`).join('') 
        : '<p class="empty-state">Nenhum evento cadastrado nesta data.</p>';
    }
    render();
  }

  function renderMes() {
    const elMes = document.getElementById('mes');
    if (elMes) elMes.textContent = `${MESES[mes]} ${ano}`;

    const p = new Date(ano, mes, 1).getDay(), n = new Date(ano, mes + 1, 0).getDate();
    let h = '';
    for (let i = 0; i < p; i++) h += '<span></span>';
    for (let d = 1; d <= n; d++) {
      const k = iso(ano, mes, d);
      const eventosDia = SEED.filter(e => e.d === k);
      const ts = [...new Set(eventosDia.map(e => e.t))];
      const w = new Date(ano, mes, d).getDay();

      const atendeFiltro = filtroAtivo === 'todos' || ts.includes(filtroAtivo);
      const c = [
        (k === iso(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) ? 'hoje' : ''),
        (k === sel ? 'sel' : ''),
        (w % 6 == 0 ? 'fim' : ''),
        (!atendeFiltro && ts.length > 0 ? 'dimmed' : '')
      ].filter(Boolean).join(' ');

      h += `<button class="${c}" data-d="${k}" aria-label="Dia ${d} de ${MESES[mes]}">${d}</button>`;
    }

    const D = document.getElementById('days');
    if (D) {
      D.innerHTML = h;
      D.querySelectorAll('button').forEach(b => b.onclick = () => mostra(b.dataset.d));
    }

    const pre = `${ano}-${String(mes + 1).padStart(2, '0')}`;
    const L = SEED.filter(e => e.d.startsWith(pre) && (filtroAtivo === 'todos' || e.t === filtroAtivo));
    const mlist = document.getElementById('mlist');
    if (mlist) {
      mlist.innerHTML = L.length 
        ? L.sort((a, b) => a.d.localeCompare(b.d)).map(e => `<li><b>${pt(e.d).slice(0, 5)}</b> - ${e.n}</li>`).join('') 
        : '<li>Sem datas correspondentes no mês.</li>';
    }
  }

  function renderAnual() {
    const anoview = document.getElementById('anoview');
    if (!anoview) return;
    let h = '<div class="ano-grid">';
    MESES.forEach((m, idx) => {
      const count = SEED.filter(e => e.d.startsWith(`${ano}-${String(idx + 1).padStart(2, '0')}`)).length;
      h += `
        <div class="ano-mes-card">
          <div class="ano-mes-title">${m}</div>
          <small>${count} evento(s)</small>
        </div>
      `;
    });
    h += '</div>';
    anoview.innerHTML = h;
  }

  function render() {
    if (modoVisao === 'mensal') {
      document.getElementById('days').hidden = false;
      document.getElementById('anoview').hidden = true;
      renderMes();
    } else {
      document.getElementById('days').hidden = true;
      document.getElementById('anoview').hidden = false;
      renderAnual();
    }
  }

  // Alternância Visão Mensal / Anual
  const btnVm = document.getElementById('vm');
  const btnVa = document.getElementById('va');

  if (btnVm && btnVa) {
    btnVm.onclick = () => {
      modoVisao = 'mensal';
      btnVm.classList.add('active'); btnVm.setAttribute('aria-pressed', 'true');
      btnVa.classList.remove('active'); btnVa.setAttribute('aria-pressed', 'false');
      render();
    };
    btnVa.onclick = () => {
      modoVisao = 'anual';
      btnVa.classList.add('active'); btnVa.setAttribute('aria-pressed', 'true');
      btnVm.classList.remove('active'); btnVm.setAttribute('aria-pressed', 'false');
      render();
    };
  }

  // Filtros por Categoria no Calendário
  document.querySelectorAll('.chip-filter').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip-filter').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filtroAtivo = chip.dataset.filter;
      render();
    });
  });

  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  if (btnPrev) btnPrev.onclick = () => { if (--mes < 0) { mes = 11; ano--; } render(); };
  if (btnNext) btnNext.onclick = () => { if (++mes > 11) { mes = 0; ano++; } render(); };

  // 7. Botão Voltar ao Topo
  const tp = document.getElementById('topo');
  if (tp) {
    tp.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
    addEventListener('scroll', () => tp.classList.toggle('on', scrollY > 400), { passive: true });
  }

  render();
});