// Service data
const services = [
  {
    id: 1,
    title: "Portrait Photography",
    description:
      "Capture your personality with our professional portrait photography services for individuals, families, and corporate headshots.",
    icon: "📸",
  },
  {
    id: 2,
    title: "Wedding Photography",
    description:
      "Let us document your special day with elegant and timeless wedding photography that tells your unique love story.",
    icon: "💍",
  },
  {
    id: 3,
    title: "Commercial Photography",
    description:
      "Elevate your brand with high-quality commercial photography for products, services, and corporate marketing materials.",
    icon: "🏢",
  },
  {
    id: 4,
    title: "Event Coverage",
    description:
      "Comprehensive photography coverage for corporate events, parties, conferences, and special occasions.",
    icon: "🎭",
  },
  {
    id: 5,
    title: "Fashion Photography",
    description:
      "Creative fashion photography for designers, models, and brands looking to showcase their unique style and vision.",
    icon: "👗",
  },
  {
    id: 6,
    title: "Photo Editing",
    description:
      "Professional retouching and editing services to enhance your existing photographs with our expert techniques.",
    icon: "✨",
  },
];

// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const servicesGrid = document.getElementById("services-grid");
const contactForm = document.getElementById("contactForm");
const currentYear = document.getElementById("current-year");
const img_cnt=document.querySelectorAll(".image-container");
const img_cnt2=document.querySelector(".img_head");
const gg=document.querySelector("#gallery-grid");

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  // Change icon based on menu state
  if (mobileMenu.classList.contains("hidden")) {
    menuToggle.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  } else {
    menuToggle.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuToggle.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll to gallery function
function scrollToGallery() {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
}

// Gallery filter functionality
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    // Filter gallery items
    galleryItems.forEach((item) => {
      if (filter==="All" || item.dataset.category === filter) {
        item.style.display = "block";
        img_cnt.forEach((img_item) => {
          img_item.style.flexDirection="row";
          img_item.classList.add("new_class");
          gg.className = 'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6';
        })
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Render service items
function renderServices() {
  services.forEach((service) => {
    const serviceItem = document.createElement("div");
    serviceItem.className = "service-item";

    serviceItem.innerHTML = `
      <div class="service-icon">${service.icon}</div>
      <h3 class="text-xl font-medium mb-3">${service.title}</h3>
      <p class="text-gray-600 mb-6">${service.description}</p>
      <button class="rounded-none border border-black text-black hover:bg-black hover:text-white transition-colors py-2 px-4">
        Learn More
      </button>
    `;

    servicesGrid.appendChild(serviceItem);
  });
}

// Initialize services
renderServices();

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simulate form submission
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData);

  // Show success toast after "submitting" the form
  showToast("Message sent successfully! We'll be in touch soon.", "success");

  // Reset form
  contactForm.reset();
});

// Create toast notification
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// Intersection Observer for revealing elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");

      // Animate child elements if they have animation classes
      const animatedElements = entry.target.querySelectorAll(
        ".about-subtitle, .about-title, .about-text, .about-stats, .about-image"
      );
      let delay = 0;

      animatedElements.forEach((el) => {
        el.style.animationDelay = `${delay}ms`;
        delay += 200;
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal containers
document.querySelectorAll(".reveal-container").forEach((el) => {
  revealObserver.observe(el);
});

// Initialize image animations
document.querySelectorAll(".image-container").forEach((container, index) => {
  container.style.animationDelay = `${index * 100}ms`;
});
