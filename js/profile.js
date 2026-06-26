document.addEventListener("DOMContentLoaded", () => {
    const progressConfig = { swara: 11, vyanjan: 41, numbers: 100 };
    let totalScore = 0;

    Object.keys(progressConfig).forEach(key => {
        const total = progressConfig[key];
        const progress = parseInt(localStorage.getItem(`${key}_progress`)) || 0;
        const percent = Math.min(Math.round((progress / total) * 100), 100);
        
        document.getElementById(`${key}Percent`).innerText = `${percent}%`;
        totalScore += progress;
    });

    // এচিভমেণ্ট বা মেডেল ব্যৱস্থা
    const badgeContainer = document.getElementById("achievementList");
    badgeContainer.innerHTML = "";
    
    if (totalScore > 5) {
        badgeContainer.innerHTML += `<div class="badge">🌟 প্ৰাৰম্ভিক শিকো পৰিচিতি (কণমাণি তৰা)</div>`;
    }
    if (totalScore >= 50) {
        badgeContainer.innerHTML += `<div class="badge">🏆 মেধাৱী ছাত্ৰ (মহাপুৰুষ মেডেল)</div>`;
    }
    if (totalScore === 152) {
        badgeContainer.innerHTML += `<div class="badge">👑 আখৰ সম্ৰাট (সোণৰ মুকুট)</div>`;
    }
    if (badgeContainer.innerHTML === "") {
        badgeContainer.innerHTML = `<p style="color:#7f8c8d;">শিকিবলৈ আৰম্ভ কৰা আৰু পুৰস্কাৰ জিকা!</p>`;
    }

    // ৰিসেট বুটাম
    document.getElementById("resetBtn").addEventListener("click", () => {
        if(confirm("তুমি সঁচাকৈয়ে সকলো মচিব খুজিছা নেকি?")) {
            localStorage.clear();
            window.location.reload();
        }
    });
});
