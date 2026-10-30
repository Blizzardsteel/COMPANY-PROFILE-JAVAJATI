import './style.css'

// ========================================
// PK. Java Jati - Company Profile Website
// ========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // 1. NAVBAR SCROLL EFFECT
  // Add 'scrolled' class to .navbar when page scrolls past 50px
  // This adds the box-shadow effect
  const navbar = document.querySelector('.navbar') as HTMLElement;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. MOBILE MENU TOGGLE
  // Toggle .active on .hamburger, .nav-menu, and .nav-overlay when hamburger is clicked
  // Close menu when a nav-item link is clicked
  // Close menu when overlay is clicked
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const navMenu = document.querySelector('.nav-menu') as HTMLElement;
  const navOverlay = document.querySelector('.nav-overlay') as HTMLElement;
  const navItems = document.querySelectorAll('.nav-item a');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 3. SMOOTH SCROLL for anchor links
  // Already handled by CSS scroll-behavior: smooth, but we need to handle the offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
      if (target) {
        const offsetTop = (target as HTMLElement).offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. SCROLL ANIMATIONS (AOS-like)
  // Use IntersectionObserver to add 'aos-animate' class when elements with [data-aos] enter viewport
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });

  // 5. PORTFOLIO FILTER
  // When a .filter-btn is clicked:
  // - Remove .active from all filter buttons, add to clicked one
  // - Show/hide .portfolio-item based on data-category matching the filter value
  // - Use data-filter attribute on buttons ("all", "residensial", "komersial", "properti")
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn as HTMLElement).dataset.filter;

      portfolioItems.forEach(item => {
        const category = (item as HTMLElement).dataset.category;
        if (filter === 'all' || category === filter) {
          (item as HTMLElement).classList.remove('hidden');
          // Small delay for animation
          setTimeout(() => {
            (item as HTMLElement).style.opacity = '1';
            (item as HTMLElement).style.transform = 'scale(1)';
          }, 50);
        } else {
          (item as HTMLElement).style.opacity = '0';
          (item as HTMLElement).style.transform = 'scale(0.8)';
          setTimeout(() => {
            (item as HTMLElement).classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  // 6. LIGHTBOX for portfolio images
  // When a .portfolio-item is clicked, show .lightbox with the full image
  // Close lightbox when .lightbox-close is clicked or when clicking outside the image
  const lightbox = document.querySelector('.lightbox') as HTMLElement;
  const lightboxImg = lightbox?.querySelector('img') as HTMLImageElement;
  const lightboxClose = lightbox?.querySelector('.lightbox-close') as HTMLElement;

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img') as HTMLImageElement;
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e: Event) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // 7. COUNTER ANIMATION for stats
  // When .stats section enters viewport, animate numbers from 0 to target
  // Use data-target attribute on .stat-number elements
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(num => {
          const target = parseInt((num as HTMLElement).dataset.target || '0');
          const suffix = (num as HTMLElement).dataset.suffix || '';
          let current = 0;
          const increment = target / 60; // 60 frames
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            (num as HTMLElement).textContent = Math.floor(current) + suffix;
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 8. FORM HANDLING
  // Basic form validation and WhatsApp redirect
  const contactForm = document.querySelector('.contact-form form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const nama = formData.get('nama') as string;
      const whatsapp = formData.get('whatsapp') as string;
      const kebutuhan = formData.get('kebutuhan') as string;
      const kayu = formData.get('kayu') as string;
      const lokasi = formData.get('lokasi') as string;
      const pesan = formData.get('pesan') as string;

      // Use whatsapp variable in the message
      let message = `Halo PK. Java Jati,%0A%0A`;
      message += `Saya *${nama}* (WA: ${whatsapp}) ingin meminta penawaran.%0A%0A`;
      if (kebutuhan) message += `📋 Kebutuhan: ${kebutuhan}%0A`;
      if (kayu) message += `🪵 Jenis Kayu: ${kayu}%0A`;
      if (lokasi) message += `📍 Lokasi: ${lokasi}%0A`;
      if (pesan) message += `%0A💬 Detail:%0A${pesan}%0A`;
      message += `%0ATerima kasih.`;

      // Open WhatsApp with pre-filled message
      // GANTI: nomor WhatsApp
      const waNumber = '6281234567890';
      window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
      
      // Show success feedback
      const submitBtn = contactForm.querySelector('.form-submit') as HTMLButtonElement;
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Mengarahkan ke WhatsApp...';
        submitBtn.style.background = '#25D366';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

  // 9. ACTIVE NAV LINK on scroll
  // Highlight the current section's nav link as user scrolls
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if ((item as HTMLAnchorElement).getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // 10. NAVBAR HIDE/SHOW on scroll (optional enhancement)
  // Hide navbar when scrolling down, show when scrolling up
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // Add transition for navbar hide/show
  navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

});
