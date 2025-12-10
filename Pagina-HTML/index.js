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
// Fade-in para os cards quando aparecem na tela
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 }); // ativa quando 20% do card aparece

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});
