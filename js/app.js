document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll progress indicator
  window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simulate form submission
      console.log('Form submitted:', { name, email, message });

      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Mensaje Enviado!';
      submitBtn.style.backgroundColor = '#81c784';

      setTimeout(() => {
        submitBtn.textContent = 'Enviar Mensaje';
        submitBtn.style.backgroundColor = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Add hover effects to glass cards
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.backdropFilter = 'blur(16px)';
      card.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.backdropFilter = 'blur(10px)';
      card.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
  });
});
