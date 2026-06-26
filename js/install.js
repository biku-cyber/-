let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.getElementById("installBtn");
    if (btn) {
        btn.style.display = "block";

        btn.addEventListener("click", async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();

            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to install: ${outcome}`);
            
            deferredPrompt = null;
            btn.style.display = "none";
        });
    }
});
