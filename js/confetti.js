function launchConfetti() {
    const colors = ["#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D", "#FF80AB"];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";
        
        // Random placement aru properties bacha hokolor choku jura kora babe
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 1.5 + "s";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 8 + "px";
        confetti.style.height = Math.random() * 15 + 10 + "px";
        
        document.body.appendChild(confetti);
        
        // Memory leak control
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}
