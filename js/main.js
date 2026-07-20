document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to prevent re-animating
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Mouse Glow Effect on Surfaces (Cards) - Optimized
  const surfaces = document.querySelectorAll('.surface');
  
  surfaces.forEach(surface => {
    surface.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        const rect = surface.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        surface.style.setProperty('--mouse-x', `${x}px`);
        surface.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  });

  // 3. Active Nav State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('text-primary');
          link.classList.add('text-secondary');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.remove('text-secondary');
            link.classList.add('text-primary');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(section => navObserver.observe(section));

  // 4. Copy Email to Clipboard
  const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
  mailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const email = link.getAttribute('href').replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copiado al portapapeles');
      });
    });
  });

  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
