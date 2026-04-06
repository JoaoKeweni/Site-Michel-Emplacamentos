/* ============================================
   Michel Emplacamentos - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === Elements ===
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTop');
  const formElement = document.getElementById('formElement');
  const formSuccess = document.getElementById('formSuccess');

  // === Header Scroll Effect ===
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (currentScroll > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNav();

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // === Active Navigation Link ===
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // === Mobile Menu Toggle ===
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // === Scroll To Top ===
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === Scroll Reveal Animations ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === Phone Mask ===
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  // === Form Submission ===
  if (formElement) {
    formElement.addEventListener('submit', (e) => {
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const servico = document.getElementById('servico').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !message || !servico) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Por favor, insira um e-mail válido.');
        return;
      }

      // Submit form natively (allow browser to POST to FormSubmit.co)
      const submitBtn = formElement.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Enviando...';
      // Do not disable button instantly to allow form submission to complete naturally
    });
  }

  // === Counter Animation (Hero Stats) ===
  const statNumbers = document.querySelectorAll('.hero-stat .number');

  function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const target = parseInt(text.replace(/\D/g, ''));

    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 2000;
    const stepTime = duration / (target / increment);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let display = current.toString();
      if (hasPlus) display += '+';
      if (hasPercent) display += '%';
      element.textContent = display;
    }, stepTime);
  }

  // Observe hero stats for animation
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => animateCounter(stat));
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
  }

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === Company Slider ===
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDotsContainer = document.getElementById('sliderDots');

  if (sliderTrack && sliderDotsContainer) {
    const slides = sliderTrack.querySelectorAll('img');
    const slideCount = slides.length;
    let currentSlide = 0;

    // Create dots
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoSlide(); // Reset auto-slide timer when manually clicked
      });
      sliderDotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      currentSlide = index;
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    // Auto slide
    let autoSlideInterval;

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slideCount;
        goToSlide(nextSlide);
      }, 4000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();
  }

  // === Initialize ===
  handleScroll();
});
