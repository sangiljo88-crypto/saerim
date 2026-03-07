const menuToggleButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealTargets = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

if (menuToggleButton && nav) {
  menuToggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggleButton.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuToggleButton?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${index * 90}ms`;
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("visible"));
}

if (contactForm && feedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "문의가 접수되었습니다. 빠르게 연락드리겠습니다.";
    contactForm.reset();
  });
}
