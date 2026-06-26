function launchConfetti() {
    const colors = ["#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D", "#FF80AB", "#9b59b6"];
    
    for (let i = 0; i < 80; i++) {
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        
        confetti.style.position = "fixed";
        confetti.style.width = Math.random() * 8 + 8 + "px";
        confetti.style.height = Math.random() * 15 + 10 + "px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.borderRadius = "4px";
        confetti.style.zIndex = "9999";
        
        // ডাইনামিক এনিমেচন প্ৰয়োগ কৰা হৈছে
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 1 + "s";
        
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// এনিমেচনৰ বাবে CSS টুকুৰা অটোমেটিক ইনজেক্ট কৰা হ’ল
if (!document.getElementById("confetti-styles")) {
    const style = document.createElement("style");
    style.id = "confetti-styles";
    style.innerHTML = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
