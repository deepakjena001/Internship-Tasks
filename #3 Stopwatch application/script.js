const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");

let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;

let isRunning = false;

let lapCount = 1;

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resumeBtn.addEventListener("click", resumeStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", saveLap);
         
function startStopwatch() {

  if (isRunning) {
    return;
  }

  isRunning = true;

  timer = setInterval(updateTime, 1000);
}

function updateTime() {

  seconds++;


  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  display.innerText =
    formatTime(hours) + " : " +
    formatTime(minutes) + " : " +
    formatTime(seconds);
}

function formatTime(time) { 

  return time < 10 ? "0" + time : time;
}

function pauseStopwatch() { 
  
  clearInterval(timer); 

  isRunning = false;
}

function resumeStopwatch() {

  if (isRunning) {
    return;
  }

  isRunning = true;

  timer = setInterval(updateTime, 1000);
}

function resetStopwatch() {

  clearInterval(timer);

  seconds = 0;
  minutes = 0;
  hours = 0;

  isRunning = false;

  lapCount = 1;

  display.innerText = "00 : 00 : 00";

  lapList.innerHTML = "";
}

function saveLap() {

  if (!isRunning) {
    return;
  }

  let lapTime = display.innerText;

  let lapDiv = document.createElement("div");

  lapDiv.classList.add("lap-item");

  lapDiv.innerHTML = `
    <strong>Lap ${lapCount}</strong>
    <p>${lapTime}</p>
  `;

  lapList.prepend(lapDiv);

  lapCount++;
}