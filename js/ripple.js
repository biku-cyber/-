document.addEventListener("DOMContentLoaded", () => {
    // বুটাম, ডাছবৰ্ড কাৰ্ড আৰু নেভিগেচন মেনু সকলো সামৰি লোৱা হৈছে
    const targets = "button, .dashboard-card, .category-card, .nav-item";
    
    document.body.addEventListener("click", (e) => {
        const button = e.target.closest(targets);
        if (!button) return;

        const ripple = document.createElement("span");
        ripple.className = "ripple";
        
        if (getComputedStyle(button).position === "static") {
            button.style.position = "relative";
        }
        if (getComputedStyle(button).overflow !== "hidden") {
            button.style.overflow = "hidden";
        }

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = "absolute";
        ripple.style.background = "rgba(255, 255, 255, 0.5)";
        ripple.style.borderRadius = "50%";
        ripple.style.transform = "scale(0)";
        ripple.style.pointerEvents = "none";
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        ripple.style.marginLeft = "-10px";
        ripple.style.marginTop = "-10px";
        ripple.style.animation = "rippleAnim 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)";

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    if (!document.getElementById("ripple-styles")) {
        const style = document.createElement("style");
        style.id = "ripple-styles";
        style.innerHTML = `
            @keyframes rippleAnim {
                to { transform: scale(15); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});
