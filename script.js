// Select elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

let interval;
let elapsedTime = 0; // Time in milliseconds
let isRunning = false;

// Function to update the display
function updateDisplay() {
  const animate = (el) => {
    el.classList.remove('fade');
    void el.offsetWidth; // Trigger reflow to restart animation
    el.classList.add('fade');
  };

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
  millisecondsEl.textContent = milliseconds.toString().padStart(2, '0');

  animate(minutesEl);
  animate(secondsEl);
  animate(millisecondsEl);
}

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      elapsedTime += 10;
      updateDisplay();
    }, 10);
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
  }
}

// Reset the stopwatch
function resetStopwatch() {
  isRunning = false;
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay();
  lapsContainer.innerHTML = ''; // Clear laps

  startBtn.classList.add('pulse'); // Add pulse animation
}

// Record a lap
function recordLap() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.textContent = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    lapsContainer.appendChild(lapTime);
    lapsContainer.scrollTop = lapsContainer.scrollHeight; // Scroll to the latest lap
  }
}

// Remove pulse when stopwatch starts
startBtn.addEventListener('click', () => {
  startBtn.classList.remove('pulse');
});

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);