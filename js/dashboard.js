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

        grid.innerHTML = ""; // পুৰণি ব্লেন্ক কাৰ্ড চাফা কৰিবলৈ

        data.forEach((item, i) => {
            const card = document.createElement("div");
            card.className = "dashboard-card";
            
            // কাৰ্ডত ক্লিক কৰিলে পোনে পোনে সেইটো নম্বৰ/আখৰৰ লেচনলৈ লৈ যাব
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
        console.error("ড্যাশবৰ্ড ডাটা ল’ড কৰোঁতে ভুল হৈছে:", err);
    }
}

// 'শিকো আহা' বুটামৰ বাবে ফাংচন
function startLearning(type) {
    window.location.href = `lesson.html?type=${type}&index=0`;
}

// পেজ ল’ড হ’লেই এইটো ৰান হ’ব
if (typeof dashboardType !== 'undefined') {
    loadDashboard();
}
