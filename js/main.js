(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  /* Smooth scroll that accounts for the sticky header height. */
  function scrollToHash(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight + 1;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (hash === '#' || hash === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', location.pathname);
      return;
    }
    if (!document.querySelector(hash)) return;
    e.preventDefault();
    scrollToHash(hash);
    history.replaceState(null, '', hash);
  });

  /* Active nav state follows the section in view. */
  if ('IntersectionObserver' in window && sections.length) {
    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { seen[entry.target.id] = entry.intersectionRatio; });
      var best = null;
      sections.forEach(function (s) {
        var r = seen[s.id] || 0;
        if (r > 0 && (!best || r > seen[best.id])) best = s;
      });
      links.forEach(function (l) {
        l.classList.toggle('is-active', !!best && l.getAttribute('href') === '#' + best.id);
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* Toast */
  var toast = document.getElementById('toast');
  var toastTimer;
  function say(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3200);
  }

  /* Resume buttons: only act if the PDF is actually present. */
  var resumeButtons = ['resume-download', 'resume-view']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var resumeReady = null;
  function checkResume() {
    if (resumeReady !== null) return Promise.resolve(resumeReady);
    if (location.protocol === 'file:') { resumeReady = true; return Promise.resolve(true); }
    return fetch('resume/alex-citardi-resume.pdf', { method: 'HEAD' })
      .then(function (r) { resumeReady = r.ok; return resumeReady; })
      .catch(function () { resumeReady = false; return false; });
  }

  resumeButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (resumeReady === true) return;
      e.preventDefault();
      checkResume().then(function (ok) {
        if (ok) { btn.click(); return; }
        say('Add your PDF as resume/alex-citardi-resume.pdf and this button works immediately.');
      });
    });
  });

  /* Project cards: pages are still being built. */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      var title = card.querySelector('.card-title');
      say((title ? title.textContent : 'This project') + ' — project page coming soon.');
    });
  });
})();
