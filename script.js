// Estrelas flutuantes suaves
const sc = document.getElementById('stars'), cores = ['#d9a31a', '#f7dc5c', '#d9352e', '#9cc6e8', '#d9a31a'];
if (sc) {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span'), z = 5 + Math.random() * 10;
    s.className = 'star';
    s.style.cssText = `left:${Math.random() * 100}%;width:${z}px;height:${z}px;--c:${cores[i % 5]};--o:${.4 + Math.random() * .4};--t:${10 + Math.random() * 12}s;--dl:-${Math.random() * 20}s;--x:${(Math.random() - .5) * 40}px`;
    sc.appendChild(s);
  }
}

// Menu Mobile
const bg = document.getElementById('burger'), mn = document.getElementById('menu');
if (bg && mn) {
  bg.onclick = () => {
    const o = mn.classList.toggle('open');
    bg.setAttribute('aria-expanded', o);
  };
  mn.querySelectorAll('a').forEach(a => a.onclick = () => mn.classList.remove('open'));
}

// Lógica Funcional das Abas da Equipe
const tabBtns = document.querySelectorAll('.equipe-tabs .tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabTarget = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const activeContent = document.getElementById(tabTarget);
    if (activeContent) {
      activeContent.classList.add('active');
    }
  });
});

// Controles do Carrossel de Professores
const track = document.getElementById('trackProfessores');
const arrowPrev = document.getElementById('arrowPrev');
const arrowNext = document.getElementById('arrowNext');

if (track && arrowPrev && arrowNext) {
  arrowPrev.addEventListener('click', () => { track.scrollBy({ left: -220, behavior: 'smooth' }); });
  arrowNext.addEventListener('click', () => { track.scrollBy({ left: 220, behavior: 'smooth' }); });
}

// Animação de Revelação
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(e => io.observe(e));

const elAno = document.getElementById('ano');
if (elAno) elAno.textContent = new Date().getFullYear();
const elFooter = document.getElementById('anoFooter');
if (elFooter) elFooter.textContent = new Date().getFullYear();

// Calendário Escolar 2026 (SEED-PR)
const SEED = [
  ['2026-01-01', 'feriado', 'Ano Novo'], ['2026-04-03', 'feriado', 'Paixão de Cristo'], ['2026-04-05', 'feriado', 'Páscoa'], ['2026-04-21', 'feriado', 'Tiradentes'],
  ['2026-05-01', 'feriado', 'Dia do Trabalho'], ['2026-06-04', 'feriado', 'Corpus Christi'], ['2026-09-07', 'feriado', 'Independência'], ['2026-10-12', 'feriado', 'N. Sra. Aparecida'],
  ['2026-11-02', 'feriado', 'Finados'], ['2026-11-15', 'feriado', 'Proclamação da República'], ['2026-11-20', 'feriado', 'Consciência Negra'], ['2026-12-25', 'feriado', 'Natal'],
  ['2026-02-05', 'tri', 'Início do 1º trimestre e das aulas (63 dias letivos)'], ['2026-05-14', 'tri', 'Fim do 1º trimestre'],
  ['2026-05-18', 'tri', 'Início do 2º trimestre (68 dias letivos)'], ['2026-09-04', 'tri', 'Fim do 2º trimestre'],
  ['2026-09-08', 'tri', 'Início do 3º trimestre (70 dias letivos)'], ['2026-12-18', 'tri', 'Fim do 3º trimestre e do ano letivo'],
  ['2026-08-07', 'comem', 'Dia do Funcionário de Escola'], ['2026-08-11', 'comem', 'Dia do Estudante'], ['2026-10-13', 'comem', 'Dia do Professor (antecipado)'],
  ['2026-10-28', 'comem', 'Dia do Servidor Público']
].map(([d, t, n]) => ({ d, t, n, f: 'SEED-PR' }));

const EV = SEED;
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const hoje = new Date(); let ano = hoje.getFullYear(), mes = hoje.getMonth(), sel = null;
const iso = (a, m, d) => `${a}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const pt = d => d.split('-').reverse().join('/');

function mostra(d) {
  sel = d; const l = EV.filter(e => e.d === d);
  document.getElementById('seltit').textContent = pt(d);
  document.getElementById('evs').innerHTML = l.length ? l.map(e => `<div class="ev">${e.n}<small>Fonte: ${e.f}</small></div>`).join('') : '<p class="pend">Nenhum evento oficial cadastrado nesta data.</p>';
  render();
}

function renderMes() {
  document.getElementById('mes').textContent = `${MESES[mes]} ${ano}`;
  const p = new Date(ano, mes, 1).getDay(), n = new Date(ano, mes + 1, 0).getDate(); let h = '';
  for (let i = 0; i < p; i++) h += '<span></span>';
  for (let d = 1; d <= n; d++) {
    const k = iso(ano, mes, d), ts = [...new Set(EV.filter(e => e.d === k).map(e => e.t))], w = new Date(ano, mes, d).getDay();
    const c = [(k === iso(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) ? 'hoje' : ''), (k === sel ? 'sel' : ''), (w % 6 == 0 ? 'fim' : '')].join(' ');
    h += `<button class="${c}" data-d="${k}">${d}<span class="dots">${ts.map(t => `<i class="d ${t}"></i>`).join('')}</span></button>`;
  }
  const D = document.getElementById('days'); D.innerHTML = h; D.querySelectorAll('button').forEach(b => b.onclick = () => mostra(b.dataset.d));
  const pre = `${ano}-${String(mes + 1).padStart(2, '0')}`, L = EV.filter(e => e.d.startsWith(pre));
  document.getElementById('mlist').innerHTML = L.length ? L.sort((a, b) => a.d.localeCompare(b.d)).map(e => `<li><b>${pt(e.d).slice(0, 5)}</b> · ${e.n}</li>`).join('') : '<li>Sem datas oficiais neste mês.</li>';
}

let modo = 'mes';
const $ = i => document.getElementById(i);

function renderAno() {
  $('mes').textContent = ano; let h = '';
  for (let m = 0; m < 12; m++) {
    const p = new Date(ano, m, 1).getDay(), n = new Date(ano, m + 1, 0).getDate(); let g = '';
    for (let i = 0; i < p; i++) g += '<i></i>';
    for (let d = 1; d <= n; d++) {
      const k = iso(ano, m, d), t = EV.find(e => e.d === k);
      g += `<i class="${t ? 'ev-' + t.t : ''}">${d}</i>`;
    }
    h += `<button class="mini" data-m="${m}"><b>${MESES[m]}</b><span>${g}</span></button>`;
  }
  $('anoview').innerHTML = h; $('anoview').querySelectorAll('.mini').forEach(b => b.onclick = () => { mes = +b.dataset.m; modo = 'mes'; render(); });
}

function render() {
  const a = modo === 'ano'; $('anoview').hidden = !a; $('days').hidden = a; document.querySelector('.dow').hidden = a;
  $('vm').classList.toggle('on', !a); $('va').classList.toggle('on', a);
  if (a) { renderAno(); $('mlist').innerHTML = ''; } else renderMes();
}

$('vm').onclick = () => { modo = 'mes'; render(); };
$('va').onclick = () => { modo = 'ano'; render(); };
$('prev').onclick = () => { if (modo === 'ano') ano--; else if (--mes < 0) { mes = 11; ano--; } render(); };
$('next').onclick = () => { if (modo === 'ano') ano++; else if (++mes > 11) { mes = 0; ano++; } render(); };

// Trimestres
(() => {
  const T = [['1º trim.', '2026-02-05', '2026-05-14', '63 dias'], ['2º trim.', '2026-05-18', '2026-09-04', '68 dias'], ['3º trim.', '2026-09-08', '2026-12-18', '70 dias']],
    D = s => new Date(s + 'T12:00'), a0 = D(T[0][1]), a1 = D(T[2][2]), tot = a1 - a0, ag = new Date();
  $('tribar').innerHTML = T.map(([n, i, f, l]) => {
    const w = (D(f) - D(i)) / tot * 100, at = ag >= D(i) && ag <= D(f);
    return `<div class="seg${at ? ' atual' : ''}" style="flex:${w}"><b>${n}</b><span>${pt(i).slice(0, 5)} a ${pt(f).slice(0, 5)} · ${l}</span></div>`;
  }).join('');
})();
render();

// Próximas datas
(() => {
  const t = iso(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const l = SEED.filter(e => e.d >= t).sort((a, b) => a.d.localeCompare(b.d)).slice(0, 4);
  document.getElementById('prox').innerHTML = l.length ? l.map(e => `<li><b>${pt(e.d).slice(0, 5)}</b><span>${e.n}</span></li>`).join('') : '<li>Sem próximas datas.</li>';
})();

// Voltar ao topo
const tp = document.getElementById('topo');
if (tp) {
  tp.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => tp.classList.toggle('on', scrollY > 500), { passive: true });
}

const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) document.querySelectorAll('nav a').forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-40% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => so.observe(s));