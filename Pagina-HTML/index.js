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
const overlay = document.getElementById("form-overlay");
const fecharForm = document.getElementById("fechar-form");

// Clicar no balão abre o formulário
agendamentoBalao.addEventListener("click", () => {
    overlay.classList.add("show");
});

// Fechar formulário
fecharForm.addEventListener("click", () => {
    overlay.classList.remove("show");
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
// Menu hamburger
const hamburgerMenu = document.querySelector(".hamburger-menu");
const menuContent = document.querySelector(".menu-content");

hamburgerMenu.addEventListener("click", () => {
    menuContent.style.display = menuContent.style.display === "flex" ? "none" : "flex";
});
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
   