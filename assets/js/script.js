// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document
  .querySelectorAll(
    ".skill-category, .timeline-item, .stat-item, .spotify-container, .tech-slider, .tool-card"
  )
  .forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tech Slider Infinite Animation
class TechSlider {
  constructor() {
    this.track = document.querySelector(".tech-track");
    this.items = document.querySelectorAll(".tech-item");
    this.isAnimating = false;
    this.speed = 2; // pixels per frame
    this.currentPosition = 0;

    if (this.track) {
      this.init();
    }
  }

  init() {
    // Set up initial position
    this.track.style.transform = "translateX(0px)";
    this.track.style.transition = "none";

    // Start animation
    this.startAnimation();

    // Add hover controls
    this.addHoverControls();
  }

  startAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animate();
  }

  stopAnimation() {
    this.isAnimating = false;
  }

  animate() {
    if (!this.isAnimating) return;

    // Move position
    this.currentPosition -= this.speed;

    // Get track width (half because we duplicated items)
    const trackWidth = this.track.scrollWidth / 2;

    // Reset position when we've moved one full cycle
    if (Math.abs(this.currentPosition) >= trackWidth) {
      this.currentPosition = 0;
    }

    // Apply transform
    this.track.style.transform = `translateX(${this.currentPosition}px)`;

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }

  // addHoverControls() {
  //   const slider = document.querySelector(".tech-slider");

  //   if (slider) {
  //     slider.addEventListener("mouseenter", () => {
  //       this.stopAnimation();
  //     });

  //     slider.addEventListener("mouseleave", () => {
  //       this.startAnimation();
  //     });
  //   }
  // }
}

// Initialize tech slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TechSlider();
});

// Mobile Navigation Burger Menu
class MobileNavigation {
  constructor() {
    this.burgerMenu = document.getElementById("burgerMenu");
    this.navLinks = document.getElementById("navLinks");
    this.body = document.body;
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    // Add event listener for burger menu click
    this.burgerMenu.addEventListener("click", () => {
      this.toggleMenu();
    });

    // Close menu when clicking on navigation links
    this.navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (this.isMenuOpen) {
          this.closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.navLinks.contains(e.target) &&
        !this.burgerMenu.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.burgerMenu.classList.add("active");
    this.navLinks.classList.add("active");
    this.body.classList.add("menu-open");
    this.isMenuOpen = true;

    // Set focus to the first menu item for accessibility
    setTimeout(() => {
      const firstLink = this.navLinks.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }, 300);
  }

  closeMenu() {
    this.burgerMenu.classList.remove("active");
    this.navLinks.classList.remove("active");
    this.body.classList.remove("menu-open");
    this.isMenuOpen = false;
  }
}

// Initialize mobile navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = new MobileNavigation();
  window.mobileNav = mobileNav; // Make it globally accessible for debugging
});

// Contact Form Enhancement
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.messageDiv = document.getElementById("formMessage");
    this.originalBtnText = "Send Message";

    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        this.handleSubmit(e);
      });

      // Add real-time validation
      this.addValidation();

      // Add intersection observer for form animation
      this.addScrollAnimation();
    }
  }

  addValidation() {
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute("required") && !value) {
      isValid = false;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    if (!isValid) {
      field.style.borderColor = "#ef4444";
      field.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.1)";
    }
  }

  clearFieldError(field) {
    field.style.borderColor = "#e5e7eb";
    field.style.boxShadow = "none";
  }

  handleSubmit(e) {
    e.preventDefault();

    // Show loading state
    this.setLoadingState(true);

    // Create FormData
    const formData = new FormData(this.form);

    // Submit form
    fetch(this.form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.showMessage(
            "Thank you! Your message has been sent successfully. I'll get back to you soon.",
            "success"
          );
          this.form.reset();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        this.showMessage(
          "Oops! Something went wrong. Please try again or email me directly.",
          "error"
        );
      })
      .finally(() => {
        this.setLoadingState(false);
      });
  }

  setLoadingState(loading) {
    if (loading) {
      this.submitBtn.classList.add("loading");
      this.submitBtn.textContent = "Sending...";
      this.submitBtn.disabled = true;
    } else {
      this.submitBtn.classList.remove("loading");
      this.submitBtn.textContent = this.originalBtnText;
      this.submitBtn.disabled = false;
    }
  }

  showMessage(text, type) {
    this.messageDiv.textContent = text;
    this.messageDiv.className = `form-message ${type}`;
    this.messageDiv.classList.add("show");

    // Auto hide after 5 seconds and refresh page if success
    setTimeout(() => {
      this.messageDiv.classList.remove("show");
      if (type === "success") {
        window.location.reload();
      }
    }, 5000);
  }

  addScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Animate form container
    const formContainer = document.querySelector(".contact-form-container");
    if (formContainer) {
      formContainer.style.opacity = "0";
      formContainer.style.transform = "translateY(30px)";
      formContainer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(formContainer);
    }

    // Animate form header
    const formHeader = document.querySelector(".form-header");
    if (formHeader) {
      formHeader.style.opacity = "0";
      formHeader.style.transform = "translateY(20px)";
      formHeader.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      setTimeout(() => observer.observe(formHeader), 200);
    }
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = new ContactForm();
  window.contactForm = contactForm; // Make it globally accessible

  // Initialize Show More Tools button - This is now handled by WebTools class
  // const showMoreBtn = document.getElementById("showMoreBtn");
  // if (showMoreBtn) {
  //   showMoreBtn.addEventListener("click", toggleMoreTools);
  //   console.log("Show More Tools button initialized");
  // } else {
  //   console.error("Show More Tools button not found");
  // }
});

// Toggle More Tools Function
function toggleMoreTools() {
  console.log("toggleMoreTools called");

  const hiddenTools = document.querySelectorAll(".hidden-tool");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const showMoreText = document.getElementById("showMoreText");
  const showMoreIcon = document.getElementById("showMoreIcon");

  console.log("Elements found:", {
    hiddenTools: hiddenTools.length,
    showMoreBtn: showMoreBtn,
    showMoreText: showMoreText,
    showMoreIcon: showMoreIcon,
  });

  const isExpanded = showMoreBtn.classList.contains("expanded");
  console.log("Is expanded:", isExpanded);

  if (isExpanded) {
    console.log("Hiding tools");
    // Hide tools
    hiddenTools.forEach((tool, index) => {
      setTimeout(() => {
        tool.classList.remove("show");
        tool.style.display = "none";
      }, index * 100);
    });

    showMoreBtn.classList.remove("expanded");
    showMoreText.textContent = "Show More Tools";
    showMoreIcon.className = "fas fa-chevron-down";
  } else {
    console.log("Showing tools");
    // Show tools
    hiddenTools.forEach((tool, index) => {
      setTimeout(() => {
        tool.style.display = "block";
        tool.classList.add("show");
      }, index * 100);
    });

    showMoreBtn.classList.add("expanded");
    showMoreText.textContent = "Show Less Tools";
    showMoreIcon.className = "fas fa-chevron-up";
  }
}
