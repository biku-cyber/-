const grid = document.getElementById("dashboardGrid");

// JSON-ৰ পৰা ডাটা আনি ড্যাশবৰ্ড সজোৱা ফাংচন
async function loadDashboard() {
    try {
        let jsonFile = "";
        if (dashboardType === "swara") jsonFile = "swara.json";
        else if (dashboardType === "vyanjan") jsonFile = "vyanjan.json";
        else if (dashboardType === "numbers") jsonFile = "number.json";

        const res = await fetch(jsonFile);
        const data = await res.json();

        grid.innerHTML = ""; // পুৰণি ব্লেন্ক কাৰ্ডবোৰ চাফা কৰিবলৈ

        data.forEach((item, i) => {
            const card = document.createElement("div");
            card.className = "dashboard-card";
            
            // কাৰ্ডত ক্লিক কৰিলে পোনে পোনে সেইটো লেচনলৈ লৈ যাব
            card.onclick = () => {
                window.location.href = `lesson.html?type=${dashboardType}&index=${i}`;
            };

            card.innerHTML = `
                <img src="${item.image}" alt="${item.letter}">
                <span>${item.letter}</span>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        console.error("ডাটা লোড কৰোঁতে ভুল হৈছে:", err);
    }
}

// 'শিকো আহা' বুটামৰ বাবে ফাংচন (যিটো আপোনাৰ মিছ হৈ আছিল)
function startLearning(type) {
    window.location.href = `lesson.html?type=${type}&index=0`;
}

// পেজটো ল’ড হ’লেই ড্যাশবৰ্ড ৰেণ্ডাৰ কৰিব
if (typeof dashboardType !== 'undefined') {
    loadDashboard();
}
