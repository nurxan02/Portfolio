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
    ".skill-category, .timeline-item, .stat-item, .spotify-container, .tech-slider"
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
    header.style.background = "rgba(255, 255, 255, 0.8)";
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
