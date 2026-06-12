    // ── SCROLL ──
    window.addEventListener('scroll', () => {
      document.body.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── MOBILE/TABLET NAV ──
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
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

    // ── GALLERY LIGHTBOX (CAROUSEL) ──
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      const img = galleryImages[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
    lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      else if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });

    // ── SERMON CARDS CLICK ──
    document.querySelectorAll('.sermon-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const videoId = card.dataset.videoId;
        const url = videoId ? `https://www.youtube.com/watch?v=${videoId}` : 'https://www.youtube.com/@CFC-p/videos';
        window.open(url, '_blank');
      });
    });
  