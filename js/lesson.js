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

// 🖍️ Tracing Pad উপাদানসমূহ
const canvas = document.getElementById("tracingCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

// কেনভাছৰ আকাৰ আৰু ব্ৰাছৰ ছেটিংছ মিলাই লোৱা ফাংচন
function setupCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // ব্ৰাছৰ ডিজাইন (শিশুৰ বাবে গাঢ় আৰু ঘূৰণীয়া)
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ff4081"; // গুলপীয়া ৰঙৰ চিয়াহী
}

// মাউচ বা টাচৰ পৰা সঠিক স্থান (Coordinates) উলিওৱা
function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// লিখিবলৈ আৰম্ভ কৰা
function startDrawing(e) {
    isDrawing = true;
    const coords = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    e.preventDefault();
}

// আঁকি থকা অৱস্থা
function draw(e) {
    if (!isDrawing) return;
    const coords = getCoords(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    e.preventDefault();
}

// লিখা বন্ধ কৰা
function stopDrawing() {
    isDrawing = false;
}

// 🎧 Tracing Pad ৰ বাবে Event Listeners সংযোগ
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
window.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
window.addEventListener("touchend", stopDrawing);

// 🧹 মচি দিয়া (Clear) বুটামৰ একচন
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


// 📂 JSON-ৰ পৰা ডাটা ল’ড কৰা মেইন ফাংচন
async function initLesson() {
    try {
        let jsonFile = "";
        if (type === "swara") jsonFile = "swara.json";
        else if (type === "vyanjan") jsonFile = "vyanjan.json";
        else if (type === "numbers") jsonFile = "number.json";

        const res = await fetch(jsonFile);
        lessonData = await res.json();

        totalCount.innerText = lessonData.length;
        
        // কেনভাছ সজোৱা আৰু লেচন লোড কৰা
        setTimeout(setupCanvas, 100); // অলপ পলমকৈ লোড কৰিলে সঠিক জোখ পায়
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

    // নতুন আখৰ আহিলে পুৰণি লিখাখিনি চাফা কৰিবলৈ
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        audio.play().catch(e => console.log("অডিঅ’ ফাইল পোৱা নগ’ল"));
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
}

// স্ক্ৰীণৰ আকাৰ সলনি হ’লে ব’ৰ্ডখন যাতে নষ্ট নহয়
window.addEventListener("resize", setupCanvas);

initLesson();
