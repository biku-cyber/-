let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Profile bikhoyor thaka install button visibility manage kora
    const installBtn = document.getElementById("installBtn");
    if (installBtn) {
        installBtn.style.display = "block";
        
        installBtn.addEventListener("click", async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                console.log("Bacha hokolor babe app install kora hol");
            }
            deferredPrompt = null;
            installBtn.style.display = "none";
        });
    }
});
