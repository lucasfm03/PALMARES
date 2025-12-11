// Pequeno script para interceptar o envio do formulário

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("Formulário enviado com sucesso!");

  form.reset();
});

// Modal para exibir imagens em tamanho grande
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.querySelector(".modal-close");
const yearImages = document.querySelectorAll(".ano img");

// Abrir modal ao clicar na imagem
yearImages.forEach((img) => {
  img.addEventListener("click", function () {
    modal.classList.add("active");
    modalImage.src = this.src;
  });
});

// Fechar modal ao clicar no X
modalClose.addEventListener("click", function () {
  modal.classList.remove("active");
});

// Fechar modal ao clicar fora da imagem
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Fechar modal ao pressionar ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});

// Menu toggle (mobile)
const menuToggle = document.getElementById('menuToggle');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');

if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('nav-open');
  });

  // close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // smooth scroll to section
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // close mobile menu
      header.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
