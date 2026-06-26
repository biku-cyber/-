document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "swara";
    let index = parseInt(params.get("index")) || 0;
    let lessonData = [];

    // DOM উপাদানসমূহ নিশ্চিত কৰা
    const image = document.getElementById("lessonImage");
    const letter = document.getElementById("lessonLetter");
    const pronunciation = document.getElementById("lessonPronunciation");
    const progressBar = document.getElementById("progressBar");
    const currentCount = document.getElementById("currentCount");
    const totalCount = document.getElementById("totalCount");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const soundBtn = document.getElementById("soundBtn");

    // JSON ফাইলৰ পৰা ডাটা সুৰক্ষিতভাৱে অনাৰ ব্যৱস্থা
    try {
        const response = await fetch(`data/${type}.json`);
        lessonData = await response.json();
        if (lessonData.length > 0) {
            totalCount.innerText = lessonData.length;
            renderLesson();
        }
    } catch (error) {
        console.error("ডাটা লোড কৰিবলৈ ব্যৰ্থ হ’ল:", error);
        return;
    }

    function renderLesson() {
        if (index < 0) index = 0;
        if (index >= lessonData.length) return;

        let item = lessonData[index];
        image.src = item.image;
        letter.innerText = item.letter;
        pronunciation.innerText = item.pronunciation;
        currentCount.innerText = index + 1;

        let progress = ((index + 1) / lessonData.length) * 100;
        progressBar.style.width = progress + "%";
        saveProgress();
    }

    function saveProgress() {
        localStorage.setItem(`${type}_progress`, index + 1);
    }

    nextBtn.addEventListener("click", () => {
        if (index < lessonData.length - 1) {
            index++;
            renderLesson();
        } else {
            showCompletion();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            renderLesson();
        }
    });

    soundBtn.addEventListener("click", () => {
        const soundEnabled = localStorage.getItem("soundEnabled");
        if (soundEnabled === "false") return;

        if (lessonData[index] && lessonData[index].audio) {
            let audio = new Audio(lessonData[index].audio);
            audio.play().catch(e => console.log("শব্দ বজাব পৰা নগ’ল:", e));
        }
    });

    function showCompletion() {
        let nextCategory = "";
        let nextLabel = "";
        let typeInAssamese = "";

        if (type === "swara") {
            nextCategory = "vyanjan";
            nextLabel = "ব্যঞ্জনবৰ্ণ শিকো আহা 🚀";
            typeInAssamese = "স্বৰবৰ্ণ";
        } else if (type === "vyanjan") {
            nextCategory = "numbers";
            nextLabel = "संख्या শিকো আহা 🚀";
            typeInAssamese = "ব্যঞ্জনবৰ্ণ";
        } else {
            typeInAssamese = "সংখ্যা";
        }

        // আনন্দ ফুৰ্তিৰ বাবে কনফেটি ইফেক্ট চলোৱা হ’ল
        if (typeof launchConfetti === "function") {
            launchConfetti();
        }

        // সম্পূৰ্ণ অসমীয়া অভিনন্দন স্ক্ৰীণ
        document.body.innerHTML = `
            <div class="complete-screen" style="text-align:center; padding:60px 20px; font-family: 'Comic Sans MS', sans-serif;">
                <h1 style="font-size:52px; color:#6BCB77; margin-bottom:20px; animation: bounce 1s infinite;">🎉 বৰ ধুনীয়া!</h1>
                <p style="font-size:26px; margin-bottom:40px; color:#2C3E50;">তুমি সফলতাৰে সকলো <b>${typeInAssamese}</b> শিকি শেষ কৰিলা।</p>
                
                <div style="display:flex; flex-direction:column; gap:18px; max-width:320px; margin:0 auto;">
                    <button class="interactive-tap" onclick="window.location.href='index.html'" style="background:#FF6B6B; color:white; border:none; padding:18px; font-size:22px; font-weight:bold; border-radius:40px; cursor:pointer; box-shadow: 0 8px 15px rgba(255,107,107,0.3);">🏠 মূল ঘৰলৈ ব’লা</button>
                    ${
                        type !== "numbers"
                        ? `<button class="interactive-tap" onclick="window.location.href='${nextCategory}.html'" style="background:#4D96FF; color:white; border:none; padding:18px; font-size:22px; font-weight:bold; border-radius:40px; cursor:pointer; box-shadow: 0 8px 15px rgba(77,150,255,0.3);">${nextLabel}</button>`
                        : `<button class="interactive-tap" onclick="window.location.href='numbers.html'" style="background:#FFD93D; color:#2C3E50; border:none; padding:18px; font-size:22px; font-weight:bold; border-radius:40px; cursor:pointer; box-shadow: 0 8px 15px rgba(255,217,61,0.3);">🔄 আকৌ শিকো ব’লা</button>`
                    }
                </div>
            </div>
        `;
    }

    // সোঁৱে-বাওঁৱে ছুইপ কৰাৰ জেষ্টাৰ (Touch Swipe)
    let touchStart = 0;
    document.addEventListener("touchstart", e => {
        touchStart = e.touches[0].clientX;
    });

    document.addEventListener("touchend", e => {
        let touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 60) {
            nextBtn.click();
        }
        if (touchEnd - touchStart > 60) {
            prevBtn.click();
        }
    });
});
