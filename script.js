const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navbar = document.getElementById("navbar");
const navItems = document.querySelectorAll("#nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const loader = document.getElementById("loader");

const driverCards = document.querySelectorAll(".driver-card");
const modal = document.getElementById("driver-modal");
const modalClose = document.getElementById("modal-close");
const modalName = document.getElementById("modal-name");
const modalImage = document.getElementById("modal-image");
const modalInfo = document.getElementById("modal-info");
const modalStyle = document.getElementById("modal-style");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000);

  revealOnScroll();
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  revealOnScroll();
});

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

driverCards.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.getAttribute("data-name");
    const image = card.getAttribute("data-image");
    const info = card.getAttribute("data-info");
    const style = card.getAttribute("data-style");

    modalName.textContent = name;
    modalImage.src = image;
    modalImage.alt = name;
    modalInfo.textContent = info;
    modalStyle.textContent = style;

    modalImage.classList.remove("max-modal", "hadjar-modal");

    if (name === "Max Verstappen") {
      modalImage.classList.add("max-modal");
    }

    if (name === "Isack Hadjar") {
      modalImage.classList.add("hadjar-modal");
    }

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("show");
  modalImage.classList.remove("max-modal", "hadjar-modal");
  document.body.style.overflow = "auto";
}

const carImage = document.getElementById("car-image");
const carSection = document.getElementById("arac");

function animateCarOnScroll() {

  if (!carImage || !carSection) return;

  const rect = carSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {

    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

    const translateX = (progress - 0.5) * 120;
    const translateY = Math.sin(progress * Math.PI) * -30;
    const rotate = (progress - 0.5) * 6;
    const scale = 1 + Math.sin(progress * Math.PI) * 0.04;

    carImage.style.transform = `
      translateX(${translateX}px)
      translateY(${translateY}px)
      rotate(${rotate}deg)
      scale(${scale})
    `;

  }
}

window.addEventListener("scroll", animateCarOnScroll);
window.addEventListener("load", animateCarOnScroll);
window.addEventListener("resize", animateCarOnScroll);