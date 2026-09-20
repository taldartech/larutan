/**
 * LARUTAN — Real Fruit Popsicles
 * Core Client-Side Interactions & UI Script
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initFlavourFilters();
  initEnquiryForms();
  initSmoothScroll();
});

/**
 * Sticky Header Scroll State
 */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * Accessible Mobile Navigation Drawer
 */
function initMobileNavigation() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const drawerOverlay = document.querySelector(".drawer-overlay");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!hamburgerBtn || !mobileDrawer || !drawerOverlay) return;

  function openMenu() {
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = hamburgerBtn.classList.contains("active");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  drawerOverlay.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });
}

/**
 * Interactive Flavour Filtering (Popsicles Page)
 */
function initFlavourFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const flavourCards = document.querySelectorAll(".flavour-card[data-category]");

  if (!filterBtns.length || !flavourCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      flavourCards.forEach(card => {
        const categories = card.getAttribute("data-category").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.transition = "opacity 0.3s ease";
            card.style.opacity = "1";
          }, 10);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Enquiry Form Validation & Feedback Toast
 */
function initEnquiryForms() {
  const forms = document.querySelectorAll(".larutan-form");
  const toast = document.getElementById("toast-msg") || createToastElement();

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = form.querySelector("[name=\"name\"]");
      const phoneInput = form.querySelector("[name=\"phone\"]");
      const emailInput = form.querySelector("[name=\"email\"]");
      const messageInput = form.querySelector("[name=\"message\"]");

      if (nameInput && !nameInput.value.trim()) {
        showToast("Please enter your name", "error");
        nameInput.focus();
        return;
      }

      if (phoneInput && !phoneInput.value.trim()) {
        showToast("Please enter your phone number", "error");
        phoneInput.focus();
        return;
      }

      // Success
      showToast("Thank you! Your enquiry has been received. We will reach out to you shortly.", "success");
      form.reset();
    });
  });

  function createToastElement() {
    const el = document.createElement("div");
    el.id = "toast-msg";
    el.className = "toast-msg";
    document.body.appendChild(el);
    return el;
  }

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.classList.add("show");
    if (type === "error") {
      toast.style.backgroundColor = "#E0432C";
    } else {
      toast.style.backgroundColor = "#1F1914";
    }

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }
}

/**
 * Smooth Anchor Scrolling
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll("a[href^=\"#\"]:not([href=\"#\"])");
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 80;

  anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
