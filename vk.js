let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    const now = Date.now();
    const timePassed = now - startTime + elapsedTime;
    const minutes = Math.floor(timePassed / 60000);
    const seconds = Math.floor((timePassed % 60000) / 1000);
    const milliseconds = Math.floor((timePassed % 1000) / 10);
    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(intervalId);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    timerDisplay.textContent = '00:00.00';
    lapsContainer.innerHTML = '';
}

function lapTime() {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = timerDisplay.textContent;
        lapsContainer.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapTime);