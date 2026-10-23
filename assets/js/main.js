/* Arte da Pedra Marmoraria | LP QH4 Growth */
(function () {
  'use strict';
  var WA_NUMBER = '5547996268042';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.dataLayer = window.dataLayer || [];
  function track(ev, data) {
    var o = { event: ev };
    for (var k in data) o[k] = data[k];
    window.dataLayer.push(o);
  }

  doc.classList.add('js');
  function loaded() { requestAnimationFrame(function () { doc.classList.add('is-loaded'); }); }
  if (document.readyState === 'complete') loaded(); else window.addEventListener('load', loaded);
  setTimeout(loaded, 1800);

  /* Header sólido ao rolar */
  var topo = document.getElementById('topo');
  function onScroll() { topo.classList.toggle('is-solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Parallax leve na foto do hero */
  var par = document.querySelector('[data-parallax] img');
  if (par && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        par.style.transform = 'translate3d(0,' + (y * -0.12) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Rastreamento dos cliques de WhatsApp */
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.addEventListener('click', function () {
      track('whatsapp_click', { cta_location: a.getAttribute('data-cta') || 'desconhecido' });
    });
  });

  /* Ambientes */
  var ROOMS = {
    cozinhas: { t: 'Cozinhas', d: 'Bancadas, ilhas e frontões cortados sob medida, com recorte para cuba e cooktop.', img: ['assets/img/cozinha-cuba-inox.webp', 'Bancada de cozinha em pedra clara com cuba de inox'], cta: 'Orçar minha cozinha' },
    banheiros: { t: 'Banheiros', d: 'Bancadas com cuba de apoio ou com a cuba esculpida na própria pedra.', img: ['assets/img/banheiro-bancada-led.webp', 'Bancada branca de banheiro com cuba de apoio e espelho com LED'], cta: 'Orçar meu banheiro' },
    lavanderias: { t: 'Lavanderias', d: 'Bancadas sob medida para a lavanderia, no mesmo acabamento da cozinha e dos banheiros.', img: ['assets/img/copa-granito-preto.webp', 'Bancada de lavanderia em pedra preta com tanque de inox'], cta: 'Orçar minha lavanderia' },
    gourmet: { t: 'Áreas gourmet', d: 'Balcões, bancadas e o entorno da churrasqueira em pedra, para a área que mais recebe gente em casa.', img: ['assets/img/area-gourmet.webp', 'Área gourmet com balcão de pedra e churrasqueira revestida'], cta: 'Orçar minha área gourmet' },
    cubas: { t: 'Cubas esculpidas', d: 'A cuba esculpida na própria pedra da bancada, sem emendas aparentes, para banheiros e lavabos.', img: ['assets/img/cuba-esculpida.webp', 'Cuba esculpida em pedra branca com veios cinza e metais dourados'], cta: 'Orçar minha cuba esculpida' }
  };
  var tabs = document.querySelectorAll('[data-room]');
  var fig = document.querySelector('.rooms__fig');
  var rImg = document.getElementById('room-img');
  var rBlank = document.getElementById('room-blank');
  var rTitle = document.getElementById('room-title');
  var rDesc = document.getElementById('room-desc');
  var rCta = document.getElementById('room-cta');
  var rCtaTxt = document.getElementById('room-cta-txt');
  var panel = document.getElementById('p-room');

  function setRoom(btn, focus) {
    var key = btn.getAttribute('data-room');
    var r = ROOMS[key];
    if (!r) return;
    tabs.forEach(function (b) {
      var on = b === btn;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', btn.id);
    if (focus) btn.focus();
    fig.classList.add('is-swapping');
    setTimeout(function () {
      if (r.img) {
        rImg.hidden = false; rBlank.hidden = true;
        rImg.src = r.img[0]; rImg.alt = r.img[1];
      } else {
        rImg.hidden = true; rBlank.hidden = false;
      }
      rTitle.textContent = r.t;
      rDesc.textContent = r.d;
      rCtaTxt.textContent = r.cta;
      rCta.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Olá! Vim pelo site e quero orçamento para ' + r.t.toLowerCase() + '.');
      fig.classList.remove('is-swapping');
    }, reduce ? 0 : 220);
    btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  }
  tabs.forEach(function (b, i) {
    b.tabIndex = b.getAttribute('aria-selected') === 'true' ? 0 : -1;
    b.addEventListener('click', function () { setRoom(b); track('ambiente_click', { ambiente: b.getAttribute('data-room') }); });
    b.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); setRoom(n, true); }
    });
  });
  /* Pré-carrega as fotos dos ambientes */
  window.addEventListener('load', function () {
    Object.keys(ROOMS).forEach(function (k) { if (ROOMS[k].img) { var i = new Image(); i.src = ROOMS[k].img[0]; } });
  });

  /* Vídeo: toca só quando aparece na tela */
  var vid = document.querySelector('.story video');
  if (vid && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !reduce) { vid.preload = 'auto'; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
        else vid.pause();
      });
    }, { threshold: 0.35 }).observe(vid);
  }

  /* Filtro de obras */
  var chips = document.querySelectorAll('.chip');
  var works = Array.prototype.slice.call(document.querySelectorAll('.work'));
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-filter');
      chips.forEach(function (x) { var on = x === c; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      works.forEach(function (w) {
        var show = f === 'todas' || w.getAttribute('data-cat') === f;
        w.classList.toggle('is-hidden', !show);
        w.classList.remove('is-pop');
        if (show && !reduce) { void w.offsetWidth; w.classList.add('is-pop'); }
      });
    });
  });

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var current = 0, lastFocus = null;
  function visible() { return works.filter(function (w) { return !w.classList.contains('is-hidden'); }); }
  function show(idx) {
    var list = visible();
    if (!list.length) return;
    current = (idx + list.length) % list.length;
    var w = list[current], im = w.querySelector('img');
    lbImg.src = w.getAttribute('data-full');
    lbImg.alt = im.alt;
    lbCap.textContent = w.querySelector('span').textContent;
  }
  function openLb(w) {
    lastFocus = w;
    show(visible().indexOf(w));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lb-close').focus();
    track('galeria_abrir', { foto: w.getAttribute('data-full') });
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  works.forEach(function (w) { w.addEventListener('click', function () { openLb(w); }); });
  document.getElementById('lb-close').addEventListener('click', closeLb);
  document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') {
      var f = lb.querySelectorAll('button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    sx = null;
  });

  /* Formulário: monta a mensagem e abre o WhatsApp */
  var form = document.getElementById('lead-form');
  var btn = document.getElementById('f-submit');
  var hint = document.getElementById('f-hint');
  var tel = document.getElementById('f-whats');

  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 0) out = '(' + d.slice(0, 2);
    if (d.length >= 3) out += ') ' + (d.length > 10 ? d.slice(2, 7) + '-' + d.slice(7) : d.slice(2, 6) + (d.length > 6 ? '-' + d.slice(6) : ''));
    tel.value = out;
  });

  function check() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    hint.textContent = ok ? 'Tudo certo. O WhatsApp abre com a sua mensagem.' : 'Preencha os campos acima para liberar o envio.';
    hint.classList.toggle('is-ok', ok);
  }
  form.addEventListener('input', check);
  form.addEventListener('change', check);
  form.querySelectorAll('input, select').forEach(function (el) {
    el.addEventListener('blur', function () {
      var f = el.closest('.field');
      if (f && el.value) f.classList.toggle('is-bad', !el.checkValidity());
    });
  });
  check();

  var started = false;
  form.addEventListener('focusin', function () { if (!started) { started = true; track('form_start', {}); } });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { check(); return; }
    var fd = new FormData(form);
    var lines = [
      'Olá! Vim pelo site da Arte da Pedra e quero um orçamento.',
      '',
      'Nome: ' + fd.get('nome').trim(),
      'WhatsApp: ' + fd.get('whatsapp'),
      'Cidade da obra: ' + fd.get('cidade').trim(),
      'Ambiente: ' + fd.get('ambiente'),
      'Projeto/medidas: ' + fd.get('base')
    ];
    var msg = (fd.get('mensagem') || '').trim();
    if (msg) lines.push('Detalhes: ' + msg);
    track('form_submit', { ambiente: fd.get('ambiente'), cidade: fd.get('cidade').trim() });
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    /* Passa pela página de obrigado (conversão no GTM/Google Ads) e ela redireciona pro WhatsApp */
    try { sessionStorage.setItem('adp_wa_url', url); } catch (err) {}
    window.location.href = 'obrigado.html?wa=' + encodeURIComponent(url);
  });
})();
