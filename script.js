// Handler para envio do formulário de contato via Formspree (AJAX)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const messageEl = document.getElementById('contact-form-message');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitBtn) submitBtn.disabled = true;
    if (messageEl) messageEl.textContent = 'Enviando...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        if (messageEl) messageEl.textContent = 'Mensagem enviada com sucesso! Obrigado.';
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        if (messageEl) messageEl.textContent = data?.error || 'Erro ao enviar. Tente novamente mais tarde.';
      }
    } catch (err) {
      if (messageEl) messageEl.textContent = 'Erro de rede. Verifique sua conexão.';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

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

// Adiciona controle para "Saiba mais" / abrir seção de história completa
(function() {
  const saibaBtn = document.getElementById('saibaMaisBtn');
  const historia = document.getElementById('historia');
  const fechar = document.getElementById('fecharHistoria');

  if (!saibaBtn || !historia) return;

  function abrirHistoria(e) {
    e.preventDefault();
    historia.classList.add('open');
    historia.setAttribute('aria-hidden', 'false');
    saibaBtn.setAttribute('aria-expanded', 'true');
    // rola a seção para visualização
    historia.scrollIntoView({ behavior: 'smooth' });
  }

  function fecharHistoria(e) {
    if (e) e.preventDefault();
    historia.classList.remove('open');
    historia.setAttribute('aria-hidden', 'true');
    saibaBtn.setAttribute('aria-expanded', 'false');
    // volta a rolar para a seção sobre (opcional)
    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
  }

  saibaBtn.addEventListener('click', abrirHistoria);
  if (fechar) fechar.addEventListener('click', fecharHistoria);

  // Fecha ao pressionar Esc
  document.addEventListener('keydown', function(ev) {
    if (ev.key === 'Escape' && historia.classList.contains('open')) {
      fecharHistoria();
    }
  });
})();

(function() {
  const abrirBtn = document.getElementById('abrirGaleriaBtn');
  const galeria = document.getElementById('galeria');

  if (!abrirBtn || !galeria) return;

  function toggleGaleria(e) {
    e.preventDefault();
    const aberto = galeria.classList.toggle('open');
    galeria.setAttribute('aria-hidden', String(!aberto));
    abrirBtn.setAttribute('aria-expanded', String(aberto));
    abrirBtn.textContent = aberto ? 'Fechar galeria' : 'Abrir galeria';
    if (aberto) {
      // rola suavemente para a galeria
      galeria.scrollIntoView({ behavior: 'smooth' });
    } else {
      // volta para a seção máquina (opcional)
      document.querySelector('.maquina')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  abrirBtn.addEventListener('click', toggleGaleria);
})();
