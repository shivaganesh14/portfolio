/* ================= REVEAL ANIMATIONS ================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

document
  .querySelectorAll(".card, .service-card, .timeline__item")
  .forEach(el => observer.observe(el));


/* ================= MODAL ELEMENTS ================= */
const contactModal = document.getElementById("contactModal");
const thankYouModal = document.getElementById("thankYouModal");

const openers = [
  document.getElementById("openContact"),
  document.getElementById("openContactInline"),
  document.getElementById("openContactFooter"),
].filter(Boolean);

const closeContactBtn = document.getElementById("closeContact");
const closeThankYouBtn = document.getElementById("closeThankYou");

const contactBackdrop = contactModal.querySelector(".modal__backdrop");
const thankYouBackdrop = thankYouModal.querySelector(".modal__backdrop");


/* ================= MODAL FUNCTIONS ================= */
function openContactModal() {
  contactModal.classList.add("open");
  contactModal.setAttribute("aria-hidden", "false");
}

function closeContactModal() {
  contactModal.classList.remove("open");
  contactModal.setAttribute("aria-hidden", "true");
}

function openThankYouModal() {
  thankYouModal.classList.add("open");
  thankYouModal.setAttribute("aria-hidden", "false");
}

function closeThankYouModal() {
  thankYouModal.classList.remove("open");
  thankYouModal.setAttribute("aria-hidden", "true");
}


/* ================= MODAL EVENTS ================= */
openers.forEach(btn => btn.addEventListener("click", openContactModal));

closeContactBtn.addEventListener("click", closeContactModal);
contactBackdrop.addEventListener("click", closeContactModal);

closeThankYouBtn.addEventListener("click", closeThankYouModal);
thankYouBackdrop.addEventListener("click", closeThankYouModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeContactModal();
    closeThankYouModal();
  }
});


/* ================= FORM SUBMISSION ================= */
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  button.textContent = "Sending...";
  button.disabled = true;

  const data = new FormData(form);

  try {
    const res = await fetch("https://formspree.io/f/mdkqyaql", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      form.reset();
      closeContactModal();

      setTimeout(() => {
        openThankYouModal();
      }, 300);
    } else {
      alert("Submission failed. Try again.");
    }
  } catch (err) {
    alert("Network error. Please try again.");
  } finally {
    button.textContent = "Send brief";
    button.disabled = false;
  }
});


/* ================= POINTER GLOW ================= */
const root = document.documentElement;

document.addEventListener("pointermove", e => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  root.style.setProperty("--mouse-x", `${x}%`);
  root.style.setProperty("--mouse-y", `${y}%`);
});
