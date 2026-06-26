document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("dashboardGrid");
    if (!grid || typeof dashboardType === "undefined") return;

    try {
        // ডাইনামিকালি ডাটা ফেচ কৰা পদ্ধতি
        const response = await fetch(`data/${dashboardType}.json`);
        const data = await response.json();

        grid.innerHTML = "";
        data.forEach((item, idx) => {
            const card = document.createElement("div");
            card.className = "dashboard-card interactive-tap";
            card.innerHTML = `<span>${item.letter}</span>`;
            card.onclick = () => {
                window.location.href = `lesson.html?type=${dashboardType}&index=${idx}`;
            };
            grid.appendChild(card);
        });
    } catch (e) {
        console.error("ডাটা লোড কৰিব পৰা নগ’ল:", e);
    }
});

function startLearning(type) {
    window.location.href = `lesson.html?type=${type}&index=0`;
}
