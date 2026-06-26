document.addEventListener("DOMContentLoaded", () => {
    // Shokolo interactive card aru button ot soft tap ripple effect link kora hoise
    document.body.addEventListener("click", function (e) {
        const target = e.target.closest(".interactive-tap");
        if (!target) return;

        // Position dynamic calculation
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.className = "ripple-effect";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Style bypass absolute alignment
        if (getComputedStyle(target).position === "static") {
            target.style.position = "relative";
        }

        target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
