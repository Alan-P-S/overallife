// Simple animation for futuristic glow
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(20px)";
    });

    setTimeout(() => {
        sections.forEach((sec, index) => {
            setTimeout(() => {
                sec.style.opacity = "1";
                sec.style.transform = "translateY(0)";
                sec.style.transition = "opacity 1s ease, transform 1s ease";
            }, index * 300);
        });
    }, 500);
});
