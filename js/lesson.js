const params = new URLSearchParams(window.location.search);
const type = params.get("type");
let index = parseInt(params.get("index")) || 0;

let lessonData = [];

// HTML উপাদানসমূহ
const image = document.getElementById("lessonImage");
const letter = document.getElementById("lessonLetter");
const pronunciation = document.getElementById("lessonPronunciation");
const progressBar = document.getElementById("progressBar");
const currentCount = document.getElementById("currentCount");
const totalCount = document.getElementById("totalCount");

// JSON-ৰ পৰা ডাটা লোড কৰা মেইন ফাংচন
async function initLesson() {
    try {
        let jsonFile = "";
        if (type === "swara") jsonFile = "swara.json";
        else if (type === "vyanjan") jsonFile = "vyanjan.json";
        else if (type === "numbers") jsonFile = "number.json";

        const res = await fetch(jsonFile);
        lessonData = await res.json();

        totalCount.innerText = lessonData.length;
        renderLesson();
    } catch (err) {
        console.error("লেচন ডাটা ল’ড কৰিব পৰা নগ’ল:", err);
    }
}

// স্ক্ৰীণত ডাটা দেখুৱাবলৈ
function renderLesson() {
    if (!lessonData || lessonData.length === 0) return;
    let item = lessonData[index];

    image.src = item.image;
    letter.innerText = item.letter;
    pronunciation.innerText = item.pronunciation;
    currentCount.innerText = index + 1;

    // প্ৰগ্ৰেছ বাৰ আপডেট
    let progress = ((index + 1) / lessonData.length) * 100;
    progressBar.style.width = progress + "%";

    saveProgress();
}

// লোকাল ষ্ট’ৰেজত প্ৰগ্ৰেছ ছেভ কৰিবলৈ
function saveProgress() {
    localStorage.setItem(`${type}_progress`, index + 1);
}

// Next বুটাম
document.getElementById("nextBtn").addEventListener("click", () => {
    if (index < lessonData.length - 1) {
        index++;
        renderLesson();
    } else {
        showCompletion();
    }
});

// Previous বুটাম
document.getElementById("prevBtn").addEventListener("click", () => {
    if (index > 0) {
        index--;
        renderLesson();
    }
});

// অডিঅ’ প্লেয়াৰ
document.getElementById("soundBtn").addEventListener("click", () => {
    const soundEnabled = localStorage.getItem("soundEnabled");
    if (soundEnabled === "false") return;

    if (lessonData[index] && lessonData[index].audio) {
        let audio = new Audio(lessonData[index].audio);
        audio.play().catch(e => console.log("অডিঅ’ ফাইলটো বিচাৰি পোৱা নগ’ল"));
    }
});

// পাঠ শেষ হ’লে ওলোৱা স্ক্ৰীণ
function showCompletion() {
    let nextCategory = "";
    let typeName = "";
    
    if (type === "swara") { nextCategory = "vyanjan"; typeName = "স্বরবৰ্ণ"; }
    else if (type === "vyanjan") { nextCategory = "numbers"; typeName = "ব্যঞ্জনবৰ্ণ"; }
    else if (type === "numbers") { typeName = "সংখ্যা"; }

    document.body.innerHTML = `
        <div class="complete-screen" style="text-align:center; padding:60px 20px; font-family:sans-serif; background:#F5FBFF; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <h1 style="font-size:40px; color:#1976d2; margin-bottom:10px;">🎉 বঢ়িয়া কাম!</h1>
            <p style="font-size:20px; color:#555; margin-bottom:30px;">আপুনি সফলভাৱে <b>${typeName}</b> শিকা সম্পূৰ্ণ কৰিলে।</p>
            
            <div style="display:flex; gap:15px;">
                <button onclick="window.location.href='index.html'" style="padding:15px 30px; font-size:18px; font-weight:bold; border-radius:15px; border:none; background:#ECEFF1; color:#546E7A; cursor:pointer;">ঘৰলৈ ব’লা</button>
                ${
                    type !== "numbers"
                    ? `<button onclick="window.location.href='${nextCategory}.html'" style="padding:15px 30px; font-size:18px; font-weight:bold; border-radius:15px; border:none; background:#64B5F6; color:white; cursor:pointer;">পিছৰ পাঠ</button>`
                    : `<button onclick="window.location.href='number.html'" style="padding:15px 30px; font-size:18px; font-weight:bold; border-radius:15px; border:none; background:#FFD54F; color:#2C3E50; cursor:pointer;">আকৌ শিকো</button>`
                }
            </div>
        </div>
    `;
    
    if(typeof launchConfetti ===
