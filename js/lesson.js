document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "swara";
    let index = parseInt(params.get("index")) || 0;
    let dataset = [];

    // নিশ্চিতভাৱে উপাদানসমূহ আহৰণ কৰা
    const image = document.getElementById("lessonImage");
    const letter = document.getElementById("lessonLetter");
    const pronunciation = document.getElementById("lessonPronunciation");
    const progressBar = document.getElementById("progressBar");
    const currentCount = document.getElementById("currentCount");
    const totalCount = document.getElementById("totalCount");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const soundBtn = document.getElementById("soundBtn");

    async function loadLessonData() {
        try {
            const response = await fetch(`data/${type}.json`);
            dataset = await response.json();
            if (dataset.length > 0) {
                totalCount.innerText = dataset.length;
                renderCard();
            }
        } catch (error) {
            console.error("ভুল হৈছে:", error);
        }
    }

    function renderCard() {
        if (index < 0) index = 0;
        if (index >= dataset.length) {
            showCompletionScreen();
            return;
        }

        const item = dataset[index];
        letter.innerText = item.letter;
        pronunciation.innerText = item.pronunciation;
        image.src = item.image;
        currentCount.innerText = index + 1;

        const progressPercent = ((index + 1) / dataset.length) * 100;
        progressBar.style.width = `${progressPercent}%`;

        saveProgress();
    }

    function saveProgress() {
        const savedProgress = parseInt(localStorage.getItem(`${type}_progress`)) || 0;
        const currentProgress = index + 1;
        // কেৱল বেছি হ’লেহে সংৰক্ষণ হ’ব, পিছুৱাই গ’লে অগ্ৰগতি হ্ৰাস নহয়
        if (currentProgress > savedProgress) {
            localStorage.setItem(`${type}_progress`, currentProgress);
        }
    }

    function showCompletionScreen() {
        const container = document.querySelector(".lesson-container");
        container.innerHTML = `
            <div class="lesson-card" style="animation: bubblePop 0.5s ease;">
                <h1 style="font-size:48px; color:var(--success);">অসাধাৰণ! 🎉</h1>
                <p style="font-size:22px; margin:20px 0;">তুমি এই ভাগটো সম্পূৰ্ণ কৰিলা।</p>
                <button class="interactive-tap" onclick="window.location.href='learning.html'" style="border:none; background:var(--primary); color:white; padding:15px 30px; font-size:20px; border-radius:30px; font-weight:bold;">অইন এটা শিকো ব’লা</button>
            </div>
        `;
    }

    nextBtn.addEventListener("click", () => { index++; renderCard(); });
    prevBtn.addEventListener("click", () => { if (index > 0) { index--; renderCard(); } });
    
    soundBtn.addEventListener("click", () => {
        const isSoundOn = localStorage.getItem("soundEffects") !== "false";
        if (isSoundOn && dataset[index]?.audio) {
            const audio = new Audio(dataset[index].audio);
            audio.play();
        }
    });

    loadLessonData();
});
