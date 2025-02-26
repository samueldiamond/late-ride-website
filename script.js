document.addEventListener("DOMContentLoaded", function() {
    const playButtons = document.querySelectorAll(".play-button");
    const accordions = document.querySelectorAll(".accordion");

    playButtons.forEach(button => {
        button.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            const iframe = panel.querySelector("iframe");
            
            if (panel.style.display === "none" || panel.style.display === "") {
                panel.style.display = "block";
                iframe.style.display = "block";
            } else {
                panel.style.display = "none";
                iframe.style.display = "none";
            }
        });
    });

    accordions.forEach(accordion => {
        accordion.addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    });
});
