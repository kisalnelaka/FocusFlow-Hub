let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

// DOM Elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('startTimer');
const resetButton = document.getElementById('resetTimer');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const openDashboardButton = document.getElementById('openDashboard');
const setHomepageButton = document.getElementById('setHomepage');

const DASHBOARD_URL = 'http://localhost:3000/dashboard';

// Timer Functions
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = 'Pause';
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      
      if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'Start';
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'Time\'s Up!',
          message: 'Take a break. You\'ve earned it!'
        });
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  startButton.textContent = 'Start';
  updateDisplay();
}

// Task Functions
function addTask(taskText) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.innerHTML = `
    <input type="checkbox">
    <span>${taskText}</span>
  `;
  taskList.appendChild(taskElement);
  
  // Save to storage
  chrome.storage.local.get(['tasks'], function(result) {
    const tasks = result.tasks || [];
    tasks.push({ text: taskText, completed: false });
    chrome.storage.local.set({ tasks: tasks });
  });
}

// Set Homepage Function
async function setHomepage() {
  try {
    await chrome.storage.local.set({ homepage: DASHBOARD_URL });
    const result = await chrome.browserSettings.homepageOverride.set({
      value: DASHBOARD_URL
    });
    if (result) {
      setHomepageButton.textContent = 'Homepage Set!';
      setTimeout(() => {
        setHomepageButton.textContent = 'Set as Homepage';
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to set homepage:', error);
    setHomepageButton.textContent = 'Failed to Set';
    setTimeout(() => {
      setHomepageButton.textContent = 'Set as Homepage';
    }, 2000);
  }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
setHomepageButton.addEventListener('click', setHomepage);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = '';
  }
});

openDashboardButton.addEventListener('click', function() {
  chrome.tabs.create({ url: DASHBOARD_URL });
});

// Load saved tasks
chrome.storage.local.get(['tasks'], function(result) {
  const tasks = result.tasks || [];
  tasks.forEach(task => addTask(task.text));
}); 