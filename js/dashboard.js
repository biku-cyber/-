document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("dashboardGrid");
    if (!grid || typeof dashboardType === "undefined") return;

    try {
        // প্ৰকৃত অসমীয়া আখৰ আৰু সংখ্যা প্ৰদৰ্শন কৰিবলৈ ডাটা ফেচ কৰা হৈছে
        const response = await fetch(`data/${dashboardType}.json`);
        const lessonData = await response.json();

        grid.innerHTML = "";
        lessonData.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "dashboard-card interactive-tap";
            
            let num = String(index + 1).padStart(dashboardType === "numbers" ? 3 : 2, "0");
            let folder = dashboardType === "numbers" ? "numbers" : dashboardType;
            let prefix = dashboardType === "numbers" ? "number" : dashboardType;

            card.innerHTML = `
                <img src="assets/${folder}/${prefix}${num}.png" alt="${item.letter}">
                <span>${item.letter}</span>
            `;

            // ঠিক কৰা হ’ল: কাৰ্ডত ক্লিক কৰিলে সেই আখৰটো খোল খাব
            card.onclick = () => {
                window.location.href = `lesson.html?type=${dashboardType}&index=${index}`;
            };

            grid.appendChild(card);
        });
    } catch (error) {
        console.error("ডাটা ল’ড কৰিব পৰা নগ’ল:", error);
    }
});

function startLearning(type) {
    window.location.href = `lesson.html?type=${type}&index=0`;
}
