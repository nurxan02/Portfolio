// Slider Functionality
class ProjectSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.totalSlides = this.slides.length;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    // Ensure first slide is active
    this.updateSlider();

    // Add event listeners
    this.addEventListeners();

    // Start auto-slide
    this.startAutoSlide();

    // Pause auto-slide when user interacts
    this.addInteractionListeners();
  }

  addEventListeners() {
    // Next button
    this.nextBtn.addEventListener("click", () => {
      this.nextSlide();
      this.resetAutoSlide();
    });

    // Previous button
    this.prevBtn.addEventListener("click", () => {
      this.prevSlide();
      this.resetAutoSlide();
    });

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.isSliderVisible()) {
        if (e.key === "ArrowLeft") {
          this.prevSlide();
          this.resetAutoSlide();
        } else if (e.key === "ArrowRight") {
          this.nextSlide();
          this.resetAutoSlide();
        }
      }
    });

    // Touch/swipe support
    this.addTouchSupport();
  }

  addInteractionListeners() {
    const sliderContainer = document.querySelector(".slider-container");

    // Pause on hover
    sliderContainer.addEventListener("mouseenter", () => {
      this.pauseAutoSlide();
    });

    // Resume on leave
    sliderContainer.addEventListener("mouseleave", () => {
      this.startAutoSlide();
    });

    // Pause when tab loses focus
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.pauseAutoSlide();
      } else {
        this.startAutoSlide();
      }
    });
  }

  addTouchSupport() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    let startX = 0;
    let startY = 0;
    let isSwaping = false;

    sliderWrapper.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwaping = true;
    });

    sliderWrapper.addEventListener("touchmove", (e) => {
      if (!isSwaping) return;
      e.preventDefault();
    });

    sliderWrapper.addEventListener("touchend", (e) => {
      if (!isSwaping) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
          // Minimum swipe distance
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
          this.resetAutoSlide();
        }
      }

      isSwaping = false;
    });
  }

  isSliderVisible() {
    const sliderSection = document.querySelector(".projects");
    const rect = sliderSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider("next");
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider("prev");
  }

  goToSlide(index) {
    if (index === this.currentSlide) return;

    const direction = index > this.currentSlide ? "next" : "prev";
    this.currentSlide = index;
    this.updateSlider(direction);
  }

  updateSlider(direction = "next") {
    // Update slides
    this.slides.forEach((slide, index) => {
      slide.classList.remove("active", "fade-in", "fade-out");

      if (index === this.currentSlide) {
        slide.classList.add("active", "fade-in");
      }
    });

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });

    // Update button states for accessibility
    this.updateButtonStates();
  }

  updateButtonStates() {
    // Add visual feedback when buttons are clicked
    this.prevBtn.setAttribute(
      "aria-label",
      `Go to previous slide (${
        this.currentSlide === 0 ? this.totalSlides : this.currentSlide
      } of ${this.totalSlides})`
    );
    this.nextBtn.setAttribute(
      "aria-label",
      `Go to next slide (${
        this.currentSlide + 2 > this.totalSlides ? 1 : this.currentSlide + 2
      } of ${this.totalSlides})`
    );
  }

  startAutoSlide() {
    this.pauseAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  pauseAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.pauseAutoSlide();
    setTimeout(() => {
      this.startAutoSlide();
    }, 1000); // Wait 1 second before restarting auto-slide
  }

  // Method to programmatically control the slider
  setAutoSlideDelay(delay) {
    this.autoSlideDelay = delay;
    if (this.autoSlideInterval) {
      this.resetAutoSlide();
    }
  }

  // Method to stop auto-slide permanently
  stopAutoSlide() {
    this.pauseAutoSlide();
  }

  // Method to restart auto-slide
  restartAutoSlide() {
    this.startAutoSlide();
  }
}

// Smooth scroll enhancement for project navigation
function enhanceProjectNavigation() {
  // Update navigation to include projects section
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// Intersection Observer for scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if slider exists before initializing
  if (document.querySelector(".slider-container")) {
    // Initialize slider
    const projectSlider = new ProjectSlider();

    // Make slider instance globally accessible for debugging
    window.projectSlider = projectSlider;

    // Enhance navigation
    enhanceProjectNavigation();

    // Add scroll animations
    addScrollAnimations();

    console.log("Project slider initialized successfully");
  }
});

// Export for potential use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProjectSlider;
}
