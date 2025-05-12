document.addEventListener("DOMContentLoaded", function() {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Simulate skeleton loading
  const contentPlaceholders = document.querySelectorAll(".content-placeholder");
  contentPlaceholders.forEach(placeholder => {
    const skeletonWrapper = placeholder.querySelector(".skeleton-card-wrapper");
    const content = placeholder.querySelector(".game-card-content");

    if (skeletonWrapper && content) {
      skeletonWrapper.style.display = "block";
      content.style.display = "none";

      const delay = 800 + Math.random() * 700;
      setTimeout(() => {
        skeletonWrapper.style.opacity = "0";
        skeletonWrapper.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
          skeletonWrapper.style.display = "none";
          content.style.display = "flex"; // Ensure flex display for content
          content.style.opacity = "0";

          setTimeout(() => {
            content.style.opacity = "1";
            content.style.transition = "opacity 0.5s ease";
          }, 50);
        }, 500);
      }, delay);
    }
  });

  // Scroll progress indicator
  window.addEventListener("scroll", function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    document.querySelector(".scroll-progress").style.width = scrollProgress + "%";
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjusted for sticky header
          behavior: "smooth"
        });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.textContent;

      // Add processing state
      submitBtn.classList.add("processing");
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      // Simulate network delay
      setTimeout(() => {
        console.log("Form submitted:", { name, email, message });

        // Remove processing state
        submitBtn.classList.remove("processing");

        // Add success state
        submitBtn.textContent = "Mensaje Enviado"; // Text without icon, icon comes from ::after
        submitBtn.classList.add("btn-success", "success-animation");

        // Revert after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.classList.remove("btn-success", "success-animation");
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1000); // Simulate 1 second delay for sending
    });
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;
  const lightModeIcon = "🌙"; // Icon for switching to dark mode
  const darkModeIcon = "☀️"; // Icon for switching to light mode

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = darkModeIcon;
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      darkModeToggle.textContent = lightModeIcon;
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      applyTheme("light");
    } else {
      applyTheme("dark");
    }
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
});
