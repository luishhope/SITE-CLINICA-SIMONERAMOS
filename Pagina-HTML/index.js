// ====== CARDS INTERATIVOS ======
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const content = card.querySelector(".card-content");

        // fecha outros cards
        document.querySelectorAll(".card-content").forEach(c => {
            if (c !== content) {
                c.style.maxHeight = null;
                c.style.padding = "0 20px";
            }
        });

        // abre/fecha o selecionado
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.padding = "0 20px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.padding = "20px";
        }
    });
});

// ====== FADE-IN CARDS ======
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});

// ====== BOTÃO VOLTAR AO TOPO ======
// BOTÃO TOPO + BALÃO DE AGENDAMENTO
const btnTopo = document.getElementById("btnTopo");
const agendamentoBalao = document.getElementById("agendamento-balao");

// Detecta o scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btnTopo.style.display = "flex";
        agendamentoBalao.classList.add("move-up"); // SOBE
    } else {
        btnTopo.style.display = "none";
        agendamentoBalao.classList.remove("move-up"); // DESCE
    }
});

// Ação do botão topo
btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===============================
// FORM POP-UP
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("form-overlay");
    const fecharForm = document.getElementById("fechar-form");
    const agendamentoBalao = document.getElementById("agendamento-balao");
    const form = document.getElementById("form-popup");

    // Abrir formulário
    if (agendamentoBalao && overlay) {
        agendamentoBalao.addEventListener("click", () => {
            overlay.classList.add("show");
            overlay.style.display = "flex";
        });
    }

    // Fechar formulário
    if (fecharForm && overlay) {
        fecharForm.addEventListener("click", () => {
            overlay.classList.remove("show");
            overlay.style.display = "none";
        });
    }

    // Fechar clicando fora
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("show");
            overlay.style.display = "none";
        }
    });

    // Após enviar, fecha o popup (experiência profissional)
    if (form) {
        form.addEventListener("submit", () => {
            setTimeout(() => {
                overlay.classList.remove("show");
                overlay.style.display = "none";
                form.reset();
            }, 500);
        });
    }
});






// ====== CARROSSEL DE DEPOIMENTOS ======
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const dots = document.querySelectorAll(".dot");

    const totalSlides = slides.length;
    let index = 0;
    let autoplay;

    function updateSlide(n) {
        index = (n + totalSlides) % totalSlides; // evita índice negativo
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    function startAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(() => {
            updateSlide(index + 1);
        }, 4000);
    }

    nextBtn.addEventListener("click", () => {
        updateSlide(index + 1);
        startAutoplay(); // reinicia autoplay imediatamente
    });

    prevBtn.addEventListener("click", () => {
        updateSlide(index - 1);
        startAutoplay(); // reinicia autoplay imediatamente
    });

    // Inicializa
    updateSlide(0);
    startAutoplay();
});
document.addEventListener("DOMContentLoaded", () => {
  
  // ------- elementos do diagnóstico / agendamento (com checagem) -------
  const diagnosticoSection = document.querySelector(".diagnostico-section");
  const abrirDiagnosticoBTN = document.getElementById("abrirDiagnostico"); // botão dentro da seção
  const overlay = document.getElementById("form-overlay");                // seu modal existente
  const fecharForm = document.getElementById("fechar-form");              // botão fechar do modal
  const agendamentoBalao = document.getElementById("agendamento-balao");  // balão flutuante (fallback)
  const agendarMenuBtn = document.getElementById("btn-agendar") || document.querySelector('.menu-content a[href="#"][id="btn-agendar"]') || Array.from(document.querySelectorAll('.menu-content a, .menu-content button')).find(el => el && el.textContent && el.textContent.trim().toLowerCase() === "agendar");

  // Função segura para abrir overlay
  function openAgendamentoOverlay() {
    if (overlay) {
      overlay.classList.add("show");
      overlay.style.display = "flex";
      return true;
    }
    return false;
  }

  // Função segura para fechar overlay
  function closeAgendamentoOverlay() {
    if (overlay) {
      overlay.classList.remove("show");
      overlay.style.display = "none";
      return true;
    }
    return false;
  }

  // ------- Diagnóstico: Iniciar conversa (botão da seção) -------
  if (abrirDiagnosticoBTN && diagnosticoSection) {
    abrirDiagnosticoBTN.addEventListener("click", (e) => {
      e.preventDefault();
      // abrir popup de diálogo (se tiver) ou rolar pra seção (já estamos na seção)
      // neste caso, se você quer que este botão abra o chat popup, chame a função startQuiz() ou abrirPopupDiagnostico() se existir.
      if (typeof window.startQuiz === "function") {
        window.startQuiz();
      } else if (typeof window.abrirPopupDiagnostico === "function") {
        window.abrirPopupDiagnostico();
      } else {
        // fallback: rola pra a própria seção e foca ela
        diagnosticoSection.scrollIntoView({ behavior: "smooth", block: "start" });
        try { diagnosticoSection.setAttribute("tabindex", "-1"); diagnosticoSection.focus(); } catch(e){ }
      }
    });
  }

  // ------- Diagnóstico: item no menu deve rolar para a seção (se existir) -------
  const menuDiagLink = document.querySelector('.menu-content a[href="#diagnostico"], .menu-content #btn-diagnostico');
  if (menuDiagLink) {
    menuDiagLink.addEventListener("click", (ev) => {
      ev.preventDefault();
      // fecha menu se existir
      if (menuContent) { menuContent.style.display = "none"; hamburgerMenu?.classList.remove("active"); }

      if (diagnosticoSection) {
        diagnosticoSection.scrollIntoView({ behavior: "smooth", block: "start" });
        try { diagnosticoSection.setAttribute("tabindex", "-1"); diagnosticoSection.focus(); } catch(e){ }
      } else {
        // tenta abrir popup de diagnóstico se não houver seção
        const diagFns = ["abrirPopupDiagnostico", "startQuiz", "abrirDiagnostico"];
        for (const fn of diagFns) {
          if (typeof window[fn] === "function") { window[fn](); return; }
        }
        console.info("Diagnóstico: seção não encontrada e nenhuma função de popup disponível.");
      }
    });
  }

  // ------- Agendar: abrir modal/fallbacks -------
  if (agendarMenuBtn) {
    agendarMenuBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (menuContent) { menuContent.style.display = "none"; hamburgerMenu?.classList.remove("active"); }

      // tenta chamar funções globais (compatibilidade)
      const fns = ["abrirPopupAgendamento", "abrirPopupAgendamentoModal", "abrirPopup", "openAgendamento", "openBooking"];
      for (const fn of fns) {
        if (typeof window[fn] === "function") {
          window[fn]();
          return;
        }
      }

      // tenta abrir overlay existente
      if (openAgendamentoOverlay()) return;

      // tenta clicar no balão flutuante, se existir
      if (agendamentoBalao) { agendamentoBalao.click(); return; }

      console.warn("Agendar: não foi possível abrir popup de agendamento (verifique ids/funções).");
    });
  } else {
    console.info("Botão 'Agendar' não encontrado dentro do menu.");
  }

  // ------- conexões do overlay (fechar) -------
  if (overlay && fecharForm) {
    fecharForm.addEventListener("click", () => {
      closeAgendamentoOverlay();
    });

    // fechar clicando fora do conteúdo do modal
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAgendamentoOverlay();
    });
  } else {
    if (!overlay) console.info("Overlay (form-overlay) não encontrado.");
    if (!fecharForm) console.info("Botão fechar (fechar-form) não encontrado.");
  }

}); // fim DOMContentLoaded

const popupDiag = document.getElementById("popupDiagnostico");
const abrirDiag = document.getElementById("abrirDiagnostico");
const fecharDiag = document.getElementById("fecharDiag");
const chatDiag = document.getElementById("chatDiag");
const diagOpcoes = document.getElementById("diagOpcoes");

abrirDiag.addEventListener("click", iniciarDiagnostico);
fecharDiag.addEventListener("click", () => popupDiag.style.display = "none");

function enviarMensagem(texto, tipo) {
    let div = document.createElement("div");
    div.className = tipo === "bot" ? "bubble bot" : "bubble user";
    div.innerText = texto;
    chatDiag.appendChild(div);
    chatDiag.scrollTop = chatDiag.scrollHeight;
}

function iniciarDiagnostico() {
    popupDiag.style.display = "flex";
    chatDiag.innerHTML = "";
    enviarMensagem("Olá! Vamos ver o que está acontecendo com seu cabelo?", "bot");
    pergunta1();
}

/* === PERGUNTA 1 === */
function pergunta1() {
    enviarMensagem("O que mais te preocupa hoje?", "bot");
    diagOpcoes.innerHTML = `
        <div class="diag-btn-option" onclick="resposta1('Queda')">Queda</div>
        <div class="diag-btn-option" onclick="resposta1('Oleosidade')">Oleosidade</div>
        <div class="diag-btn-option" onclick="resposta1('Ressecamento')">Ressecamento</div>
    `;
}

function resposta1(resposta) {
    enviarMensagem(resposta, "user");
    diagOpcoes.innerHTML = "";
    setTimeout(() => pergunta2(resposta), 500);
}

/* === PERGUNTA 2 === */
function pergunta2(prev) {
    enviarMensagem("Há quanto tempo isso está acontecendo?", "bot");
    diagOpcoes.innerHTML = `
        <div class="diag-btn-option" onclick="resposta2('${prev}', 'Pouco tempo')">Pouco tempo</div>
        <div class="diag-btn-option" onclick="resposta2('${prev}', 'Alguns meses')">Alguns meses</div>
        <div class="diag-btn-option" onclick="resposta2('${prev}', 'Mais de 1 ano')">Mais de 1 ano</div>
    `;
}

function resposta2(prev, resp) {
    enviarMensagem(resp, "user");
    diagOpcoes.innerHTML = "";
    setTimeout(() => pergunta3(prev, resp), 500);
}

/* === PERGUNTA 3 === */
function pergunta3(prev, tempo) {
    enviarMensagem("Seu couro cabeludo apresenta coceira ou vermelhidão?", "bot");
    diagOpcoes.innerHTML = `
        <div class="diag-btn-option" onclick="finalDiag('${prev}', '${tempo}', 'Sim')">Sim</div>
        <div class="diag-btn-option" onclick="finalDiag('${prev}', '${tempo}', 'Não')">Não</div>
    `;
}

/* === RESULTADO FINAL === */
function finalDiag(problema, tempo, sintomas) {
    enviarMensagem(sintomas, "user");
    diagOpcoes.innerHTML = "";

    setTimeout(() => {
        enviarMensagem("Analisando…", "bot");

        setTimeout(() => {
            enviarMensagem(
                `Com base no que você relatou (${problema}, ${tempo}, sintomas: ${sintomas}), 
                recomendo um protocolo personalizado! Clique no botão flutuante de agendamento para marcarmos uma avaliação gratuita.`,
                "bot"
            );
        }, 900);
    }, 400);
}

// ================= JS LOCALIZAÇÃO =================
const pin = document.getElementById("pin-localizacao");
const mapa = document.getElementById("mapa-popup");
const fecharMapa = document.getElementById("fechar-mapa");

pin.addEventListener("click", () => {
    mapa.classList.toggle("show");
});

fecharMapa.addEventListener("click", () => {
    mapa.classList.remove("show");
});
document.addEventListener("DOMContentLoaded", () => {
    const particleContainer = document.getElementById("particle-container");

    function createParticle() {
        const particle = document.createElement("span");
        particle.className = "particle";

        // sempre começa no topo do container
        particle.style.top = "0px";

        // largura do container
        const width = particleContainer.offsetWidth;
        particle.style.left = Math.random() * width + "px";

        // tamanho
        const size = Math.random() * 6 + 4;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // duração
        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = duration + "s";

        particleContainer.appendChild(particle);

        setTimeout(() => particle.remove(), duration * 1000);
    }

    setInterval(createParticle, 150);
});

const abrir = document.getElementById("abrirResultados");
const modal = document.getElementById("modalResultados");
const fechar = document.getElementById("fecharResultados");

const resultados = document.querySelectorAll(".resultado");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let indexAtual = 0;

function mostrarResultado(index) {
    resultados.forEach((res, i) => {
        res.classList.toggle("ativo", i === index);
    });
}

abrir.addEventListener("click", () => {
    modal.classList.add("ativo");
    mostrarResultado(indexAtual);
});

fechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
});

next.addEventListener("click", () => {
    indexAtual = (indexAtual + 1) % resultados.length;
    mostrarResultado(indexAtual);
});

prev.addEventListener("click", () => {
    indexAtual = (indexAtual - 1 + resultados.length) % resultados.length;
    mostrarResultado(indexAtual);
});
