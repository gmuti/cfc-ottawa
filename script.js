    // ── SCROLL ──
    window.addEventListener('scroll', () => {
      document.body.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── REVEAL ──
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // ── BILINGUAL ──
    let lang = 'fr';
    function setLang(l) {
      lang = l;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === l));
      document.documentElement.lang = l;
      document.querySelectorAll('[data-' + l + ']').forEach(el => {
        const val = el.getAttribute('data-' + l);
        if (!val) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.placeholder = val; }
        else if (el.tagName === 'OPTION') { el.textContent = val; }
        else { el.innerHTML = val; }
      });
    }

    // ── FORM ──
    document.getElementById('submitBtn').addEventListener('click', function() {
      const btn = this;
      btn.textContent = lang === 'fr' ? '✓ Message envoyé !' : '✓ Message sent!';
      btn.style.background = '#2a7a3a';
      setTimeout(() => {
        btn.textContent = lang === 'fr' ? 'Envoyer le message' : 'Send message';
        btn.style.background = '';
      }, 3500);
    });

    // ── SERMON CARDS CLICK ──
    document.querySelectorAll('.sermon-card').forEach(card => {
      card.addEventListener('click', () => {
        window.open('https://www.youtube.com/@CFC-p/videos', '_blank');
      });
    });
  