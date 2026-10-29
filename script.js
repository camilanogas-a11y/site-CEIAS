// Recuperação das Estrelas Flutuantes Suaves na Capa
const sc = document.getElementById('stars'), cores = ['#f4c92e', '#f7dc5c', '#d9352e', '#9cc6e8', '#f4c92e'];
if (sc) {
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span'), z = 5 + Math.random() * 12;
    s.className = 'star';
    s.style.cssText = `left:${Math.random() * 100}%;width:${z}px;height:${z}px;--c:${cores[i % 5]};--o:${.25 + Math.random() * .35};--t:${10 + Math.random() * 14}s;--dl:-${Math.random() * 18}s;--x:${(Math.random() - .5) * 60}px`;
    sc.appendChild(s);
  }
}

// Menu Mobile Responsivo
const bg = document.getElementById('burger'), mn = document.getElementById('menu');
if (bg && mn) {
  bg.onclick = () => {
    const o = mn.classList.toggle('open');
    bg.setAttribute('aria-expanded', o);
  };
  mn.querySelectorAll('a').forEach(a => a.onclick = () => mn.classList.remove('open'));
}

// Observer de Revelação Rolar
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(e => io.observe(e));

// Atualização Dinâmica dos Anos
const elAno = document.getElementById('ano');
if (elAno) elAno.textContent = new Date().getFullYear();
const elFooter = document.getElementById('anoFooter');
if (elFooter) elFooter.textContent = new Date().getFullYear();

// Calendário Escolar Oficial 2026 (SEED-PR)
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

const ESCOLA = []; 
const EV = SEED.concat(ESCOLA.map(e => ({ ...e, f: 'Colégio' })));
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const hoje = new Date(); let ano = hoje.getFullYear(), mes = hoje.getMonth(), sel = null;
const iso = (a, m, d) => `${a}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const pt = d => d.split('-').reverse().join('/');

function mostra(d) {
  sel = d; const l = EV.filter(e => e.d === d);
  document.getElementById('seltit').textContent = pt(d);
  document.getElementById('evs').innerHTML = l.length ? l.map(e => `<div class="ev">${e.n}<small>Fonte: ${e.f}</small></div>`).join('') : '<p class="pend">Nenhum evento oficial cadastrado para esta data.</p>';
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

function render() {
  const a = modo === 'ano'; $('days').hidden = a; document.querySelector('.dow').hidden = a;
  $('vm').classList.toggle('on', !a); $('va').classList.toggle('on', a);
  renderMes();
}

if ($('vm')) $('vm').onclick = () => { modo = 'mes'; render(); };
if ($('va')) $('va').onclick = () => { modo = 'ano'; render(); };
if ($('prev')) $('prev').onclick = () => { if (--mes < 0) { mes = 11; ano--; } render(); };
if ($('next')) $('next').onclick = () => { if (++mes > 11) { mes = 0; ano++; } render(); };

// Trimestres 2026
(() => {
  const T = [['1º trim.', '2026-02-05', '2026-05-14', '63d'], ['2º trim.', '2026-05-18', '2026-09-04', '68d'], ['3º trim.', '2026-09-08', '2026-12-18', '70d']],
    D = s => new Date(s + 'T12:00'), a0 = D(T[0][1]), a1 = D(T[2][2]), tot = a1 - a0, ag = new Date();
  const tb = $('tribar');
  if (tb) {
    tb.innerHTML = T.map(([n, i, f, l]) => {
      const w = (D(f) - D(i)) / tot * 100, at = ag >= D(i) && ag <= D(f);
      return `<div class="seg${at ? ' atual' : ''}" style="flex:${w}"><b>${n}</b><span>${pt(i).slice(0, 5)} a ${pt(f).slice(0, 5)} · ${l}</span></div>`;
    }).join('');
  }
})();
render();

// Próximas Datas
(() => {
  const t = iso(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const l = SEED.filter(e => e.d >= t).sort((a, b) => a.d.localeCompare(b.d)).slice(0, 4);
  const px = document.getElementById('prox');
  if (px) px.innerHTML = l.length ? l.map(e => `<li><b>${pt(e.d).slice(0, 5)}</b><span>${e.n}</span></li>`).join('') : '<li>Sem próximas datas cadastradas.</li>';
})();

// Voltar ao topo e Navegação Ativa
const tp = document.getElementById('topo');
if (tp) {
  tp.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => tp.classList.toggle('on', scrollY > 500), { passive: true });
}

const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) document.querySelectorAll('nav a').forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-40% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => so.observe(s));