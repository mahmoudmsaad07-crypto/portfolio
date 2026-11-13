/**
 * MAHMOUD SAAD — PORTFOLIO JAVASCRIPT
 * Powers preloader, smooth scrolling, active nav indicator,
 * 3D draggable carousel, filters, custom cursor, accordion,
 * and bilingual language toggle (EN <-> AR).
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. PRELOADER (FAST & RESPONSIVE)
  // =========================================================================
  function hidePreloader() {
    document.body.classList.add('loaded');
    const ld = document.getElementById('ld');
    if (ld) {
      setTimeout(() => {
        ld.style.display = 'none';
      }, 400);
    }
  }

  // Dismiss quickly on load or fallback after 600ms
  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 700);


  // =========================================================================
  // 2. STICKY NAV & ACTIVE SECTION INDICATOR
  // =========================================================================
  const navIndicator = document.getElementById('nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateNavIndicator() {
    if (!navIndicator) return;
    const activeLink = document.querySelector('.nav-item.active');
    if (!activeLink) return;

    const parentRect = activeLink.parentElement.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - parentRect.left}px`;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateNavIndicator();
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-50px 0px -40% 0px'
  });

  sections.forEach(sec => sectionObserver.observe(sec));
  window.addEventListener('resize', updateNavIndicator);


  // =========================================================================
  // 3. BILINGUAL SUPPORT (EN <-> AR)
  // =========================================================================
  const langToggleBtn = document.getElementById('lang-toggle');
  const langLabel = langToggleBtn ? langToggleBtn.querySelector('.lang-label') : null;
  const mqTrack = document.getElementById('mq-track');
  let currentLang = localStorage.getItem('mahmoud_portfolio_lang') || 'en';

  const arMarqueeContent = `
    <span>استراتيجيات سوشيال ميديا ✦</span>
    <span>إعلانات ممولة عالية التحويل ✦</span>
    <span>إنتاج ريلز وفيديوهات قصيرة ✦</span>
    <span>بناء الهوية البصرية وتصميم العبوات ✦</span>
    <span>تصوير تجاري احترافي ✦</span>
    <span>نمو ومبيعات سريعة ✦</span>
    <span>إدارة حملات متكاملة ✦</span>
    <span>استراتيجيات سوشيال ميديا ✦</span>
    <span>إعلانات ممولة عالية التحويل ✦</span>
    <span>إنتاج ريلز وفيديوهات قصيرة ✦</span>
    <span>بناء الهوية البصرية وتصميم العبوات ✦</span>
    <span>تصوير تجاري احترافي ✦</span>
    <span>نمو ومبيعات سريعة ✦</span>
    <span>إدارة حملات متكاملة ✦</span>
  `;

  const enMarqueeContent = `
    <span>SOCIAL MEDIA STRATEGY ✦</span>
    <span>HIGH-CONVERTING ADS ✦</span>
    <span>REELS & SHORT-FORM VIDEO ✦</span>
    <span>BRAND IDENTITY & PACKAGING ✦</span>
    <span>COMMERCIAL PHOTOGRAPHY ✦</span>
    <span>GROWTH HACKING ✦</span>
    <span>CAMPAIGN MANAGEMENT ✦</span>
    <span>SOCIAL MEDIA STRATEGY ✦</span>
    <span>HIGH-CONVERTING ADS ✦</span>
    <span>REELS & SHORT-FORM VIDEO ✦</span>
    <span>BRAND IDENTITY & PACKAGING ✦</span>
    <span>COMMERCIAL PHOTOGRAPHY ✦</span>
    <span>GROWTH HACKING ✦</span>
    <span>CAMPAIGN MANAGEMENT ✦</span>
  `;

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mahmoud_portfolio_lang', lang);
    const isAr = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    if (langLabel) {
      langLabel.textContent = isAr ? 'English' : 'عربي';
    }

    if (mqTrack) {
      mqTrack.innerHTML = isAr ? arMarqueeContent : enMarqueeContent;
    }

    const translatableElements = document.querySelectorAll('[data-en][data-ar]');
    translatableElements.forEach(el => {
      const text = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (text) {
        el.textContent = text;
      }
    });

    if (window.portfolioCarousel) {
      window.portfolioCarousel.updateTitleLanguage();
    }

    updateNavIndicator();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
    });
  }


  // =========================================================================
  // 4. MOBILE MENU OVERLAY
  // =========================================================================
  const menuBtn = document.getElementById('menu-btn');
  const mobNav = document.getElementById('mob-nav');
  const mobLinks = document.querySelectorAll('.mob-item');
  let isMenuOpen = false;

  function toggleMenu(forceClose = false) {
    isMenuOpen = forceClose ? false : !isMenuOpen;
    if (mobNav) {
      mobNav.classList.toggle('open', isMenuOpen);
      mobNav.setAttribute('aria-hidden', !isMenuOpen);
    }
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', isMenuOpen);
      const menuText = menuBtn.querySelector('.menu-text');
      if (menuText) {
        const isAr = currentLang === 'ar';
        menuText.textContent = isMenuOpen 
          ? (isAr ? 'إغلاق' : 'CLOSE') 
          : (isAr ? 'القائمة' : 'MENU');
      }
    }
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => toggleMenu());
  }

  mobLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) toggleMenu(true);
  });


  // =========================================================================
  // 5. CUSTOM CURSOR
  // =========================================================================
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const interactiveElements = document.querySelectorAll('.card, .btn-whatsapp, .tool-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('show'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('show'));
    });
  }


  // =========================================================================
  // 6. PORTFOLIO CAROUSEL (DRAGGABLE & CATEGORY FILTERING)
  // =========================================================================
  class PortfolioCarousel {
    constructor() {
      this.rail = document.getElementById('portfolio-rail');
      this.track = document.getElementById('portfolio-track');
      this.cards = Array.from(document.querySelectorAll('.card'));
      this.prevBtn = document.getElementById('btn-prev');
      this.nextBtn = document.getElementById('btn-next');
      this.progressBar = document.querySelector('#carousel-progress-bar i');
      this.counter = document.getElementById('carousel-counter');
      this.activeTitle = document.getElementById('active-work-title');
      
      this.currentIndex = 0;
      this.isDown = false;
      this.startX = 0;
      this.scrollLeft = 0;

      if (this.rail && this.track) {
        this.init();
      }
    }

    init() {
      this.rail.addEventListener('mousedown', (e) => this.handleDragStart(e));
      window.addEventListener('mousemove', (e) => this.handleDragMove(e));
      window.addEventListener('mouseup', () => this.handleDragEnd());

      this.rail.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: true });
      this.rail.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: true });
      this.rail.addEventListener('touchend', () => this.handleDragEnd());

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.scrollByCards(-1));
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.scrollByCards(1));

      this.rail.addEventListener('scroll', () => {
        this.updateProgressAndCounter();
      }, { passive: true });

      this.updateProgressAndCounter();
    }

    getVisibleCards() {
      return this.cards.filter(c => c.style.display !== 'none');
    }

    handleDragStart(e) {
      this.isDown = true;
      this.rail.classList.add('grabbing');
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      this.startX = pageX - this.rail.offsetLeft;
      this.scrollLeft = this.rail.scrollLeft;
    }

    handleDragMove(e) {
      if (!this.isDown) return;
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      const x = pageX - this.rail.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      this.rail.scrollLeft = this.scrollLeft - walk;
    }

    handleDragEnd() {
      if (!this.isDown) return;
      this.isDown = false;
      this.rail.classList.remove('grabbing');
      this.snapToNearest();
    }

    snapToNearest() {
      const visible = this.getVisibleCards();
      if (!visible.length) return;
      const cardWidth = visible[0].offsetWidth + 24;
      const targetIndex = Math.round(this.rail.scrollLeft / cardWidth);
      this.currentIndex = Math.max(0, Math.min(targetIndex, visible.length - 1));
      this.rail.scrollTo({
        left: this.currentIndex * cardWidth,
        behavior: 'smooth'
      });
      this.updateProgressAndCounter();
    }

    scrollByCards(direction) {
      const visible = this.getVisibleCards();
      if (!visible.length) return;
      const cardWidth = visible[0].offsetWidth + 24;
      const isRtl = document.documentElement.dir === 'rtl';
      const dirMultiplier = isRtl ? -direction : direction;

      this.currentIndex = Math.max(0, Math.min(this.currentIndex + dirMultiplier, visible.length - 1));
      this.rail.scrollTo({
        left: this.currentIndex * cardWidth,
        behavior: 'smooth'
      });
      this.updateProgressAndCounter();
    }

    updateProgressAndCounter() {
      const visible = this.getVisibleCards();
      const total = visible.length;
      if (!total) return;

      const cardWidth = visible[0].offsetWidth + 24;
      const activeIdx = Math.max(0, Math.min(Math.round(this.rail.scrollLeft / cardWidth), total - 1));
      
      if (this.counter) {
        const curNum = String(activeIdx + 1).padStart(2, '0');
        const totNum = String(total).padStart(2, '0');
        this.counter.textContent = `${curNum} / ${totNum}`;
      }

      if (this.activeTitle && visible[activeIdx]) {
        const card = visible[activeIdx];
        const isAr = currentLang === 'ar';
        const title = isAr ? card.getAttribute('data-title-ar') : card.getAttribute('data-title-en');
        if (title) this.activeTitle.textContent = title;
      }

      if (this.progressBar) {
        const maxScroll = this.rail.scrollWidth - this.rail.clientWidth;
        const progressPct = maxScroll > 0 ? (this.rail.scrollLeft / maxScroll) * 100 : 0;
        this.progressBar.style.width = `${Math.max(5, Math.min(100, progressPct))}%`;
      }
    }

    updateTitleLanguage() {
      const visible = this.getVisibleCards();
      if (visible[this.currentIndex] && this.activeTitle) {
        const card = visible[this.currentIndex];
        const isAr = currentLang === 'ar';
        const title = isAr ? card.getAttribute('data-title-ar') : card.getAttribute('data-title-en');
        if (title) this.activeTitle.textContent = title;
      }
    }

    filter(category) {
      this.cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-cat') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      this.currentIndex = 0;
      this.rail.scrollLeft = 0;
      this.updateProgressAndCounter();
    }
  }

  const carousel = new PortfolioCarousel();
  window.portfolioCarousel = carousel;

  const filterBtns = document.querySelectorAll('.fil');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      carousel.filter(cat);
    });
  });


  // =========================================================================
  // 7. SERVICES ACCORDION
  // =========================================================================
  const servicesSection = document.getElementById('services');
  const serviceItems = document.querySelectorAll('.svc');

  serviceItems.forEach(item => {
    const head = item.querySelector('.svc-head');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      serviceItems.forEach(s => s.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
        const color = item.getAttribute('data-color');
        if (servicesSection && color) {
          servicesSection.style.backgroundColor = color;
        }
      } else {
        if (servicesSection) {
          servicesSection.style.backgroundColor = 'var(--cream)';
        }
      }
    });
  });


  // =========================================================================
  // 8. ANIMATED COUNTER ON SCROLL
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let counterStarted = false;

  function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;

    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '+';
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = `${current}${suffix}`;
      }, 35);
    });
  }

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  // =========================================================================
  // 9. CASE STUDY MODAL INTERACTION
  // =========================================================================
  const caseModal = document.getElementById('case-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCat = document.getElementById('modal-cat');
  const modalTitle = document.getElementById('modal-title');
  const modalResult = document.getElementById('modal-result');

  function openCaseStudy(card) {
    if (!caseModal) return;
    const cat = card.querySelector('.card-cat')?.textContent || 'CAMPAIGN';
    const isAr = currentLang === 'ar';
    const title = (isAr ? card.getAttribute('data-title-ar') : card.getAttribute('data-title-en')) || card.querySelector('.card-title')?.textContent;
    const result = card.querySelector('.card-result')?.textContent || 'High ROI';

    if (modalCat) modalCat.textContent = cat;
    if (modalTitle) modalTitle.textContent = title;
    if (modalResult) modalResult.textContent = result;

    caseModal.classList.add('open');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!caseModal) return;
    caseModal.classList.remove('open');
    caseModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openCaseStudy(card));
  });

  if (modalClose) modalClose.addEventListener('click', closeCaseStudy);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCaseStudy);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCaseStudy();
  });

  // =========================================================================
  // 10. FAQ ACCORDION INTERACTION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(f => f.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // =========================================================================
  // 11. SMOOTH SCROLLING
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 9. INITIALIZE LOCAL STORAGE LANGUAGE
  // =========================================================================
  applyLanguage(currentLang);
  setTimeout(updateNavIndicator, 200);

});
