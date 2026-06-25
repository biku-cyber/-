// profile.js
document.addEventListener("DOMContentLoaded", () => {
    const swaraProg = localStorage.getItem('swara_progress') || 0;
    const vyanjanProg = localStorage.getItem('vyanjan_progress') || 0;
    const numberProg = localStorage.getItem('numbers_progress') || 0;

    // Percentages (Total count updates)
    const sPercent = Math.floor((swaraProg / 11) * 100);
    const vPercent = Math.floor((vyanjanProg / 41) * 100);
    const nPercent = Math.floor((numberProg / 100) * 100);

    document.getElementById('swaraPercent').innerText = sPercent + "%";
    document.getElementById('vyanjanPercent').innerText = vPercent + "%";
    document.getElementById('numberPercent').innerText = nPercent + "%";
    
    // Achievement Logic
    const list = document.getElementById('achievementList');
    if(sPercent === 100) list.innerHTML += "<div class='badge'>🏆 স্বরবৰ্ণৰ ৰজা</div>";
    if(vPercent === 100) list.innerHTML += "<div class='badge'>🎖 ব্যঞ্জনবৰ্ণৰ ওস্তাদ</div>";
    if(nPercent === 100) list.innerHTML += "<div class='badge'>🥇 সংখ্যা সম্ৰাট</div>";
});
