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
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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
    