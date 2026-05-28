
// variables
const timer = document.getElementById("timer");
const label = document.getElementById("label");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");
const time25 = document.getElementById("time-1");
const time45 = document.getElementById("time-2");
const time60 = document.getElementById("time-3");


// sounds
const clickSound = new Audio("assets/audio/Click-Gun.mp3");
const NatureSound = new Audio("assets/audio/NatureSound.mp3");
const timesUp = new Audio("assets/audio/times-up.mp3");

let twentyFive = 25 * 60;
let twentyBreak = 5 * 60;

let fourtyFive = 45 * 60;
let fourtyBreak = 10 * 60;

let sixty = 60 * 60;
let sixtyBreak = 15 * 60; 

let focusMode = twentyFive;
let breakMode = twentyBreak;

let timeleft = focusMode;

let interval = null;
let isBreak = false;
let sessionCount = 0;

function clickingSound() {
    clickSound.play();
}

function stopAllSounds() {
    NatureSound.pause();
    NatureSound.currentTime = 0;

    timesUp.pause();
    timesUp.currentTime = 0;
}

function unHideButtons() {
    pauseButton.classList.remove("hidden");
    restartButton.classList.remove("hidden");
}

function hideButtons() {
    pauseButton.classList.add("hidden");
    restartButton.classList.add("hidden");
}

function backStart() {
    hideButtons();
    startButton.classList.remove("start-hidden");
}

function updateSessionDisplay() {
    document.getElementById("session-num").textContent = sessionCount + 1;

    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById("dot-" + i);
        dot.classList.remove("done", "active");

        if (i <= sessionCount) {
            dot.classList.add("done");
        }
        else if (i === sessionCount + 1) {
            dot.classList.add("active");
        }
    }


}

function updateTimer() {

    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (interval !== null) return;

    NatureSound.loop = true;
    NatureSound.play();

    startButton.classList.add("start-hidden");
    unHideButtons();

    interval = setInterval(() => {

        timeleft--;

        updateTimer();

        if (timeleft <= 0) {
            clearInterval(interval);
            interval = null;

            stopAllSounds();

            switchMode();
            startTimer();
        }

    }, 1000)
}

function pauseTimer() {
    NatureSound.pause();
    NatureSound.currentTime = 0;
    backStart();
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    pauseTimer();
    stopAllSounds();
    backStart();
    
    timeleft = focusMode;
    isBreak = false;

    updateTimer();
}

function switchMode() {
    isBreak = !isBreak;

    if (isBreak) {
        sessionCount++;

        timeleft = breakMode;

        timesUp.play();

        updateSessionDisplay();
    } else {
        if (sessionCount >= 4) sessionCount = 0;

        timeleft = focusMode;

        NatureSound.loop = true;

        NatureSound.currentTime = 0;

        NatureSound.play();
        
        updateSessionDisplay();
    }

    updateTimer();
}

time25.addEventListener("click", () => {
    focusMode = twentyFive;
    breakMode = twentyBreak;

    timeleft = focusMode;

    pauseTimer();
    updateTimer();
});

time45.addEventListener("click", () => {
    focusMode = fourtyFive;
    breakMode = fourtyBreak;

    timeleft = focusMode;

    pauseTimer();
    updateTimer();
});

time60.addEventListener("click", () => {
    focusMode = sixty;
    breakMode = sixtyBreak;

    timeleft = focusMode;
    pauseTimer();
    updateTimer();
    updateSessionDisplay();
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", resetTimer);

updateTimer();
updateSessionDisplay();