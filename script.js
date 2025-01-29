let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;

const timeDisplay = document.getElementById("timeDisplay");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const laps = document.getElementById("laps");

function formatTime(time) {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

startStopButton.addEventListener("click", () => {
    if (running) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
        startStopButton.textContent = "Pause";
    }
    running = !running;
});

resetButton.addEventListener("click", () => {
    clearInterval(intervalId);
    running = false;
    startStopButton.textContent = "Start";
    elapsedTime = 0;
    timeDisplay.textContent = formatTime(0);
    laps.innerHTML = "";
});

lapButton.addEventListener("click", () => {
    if (running) {
        const lapTime = document.createElement("div");
        lapTime.className = "lap";
        lapTime.textContent = formatTime(elapsedTime);
        laps.appendChild(lapTime);
    }
});
