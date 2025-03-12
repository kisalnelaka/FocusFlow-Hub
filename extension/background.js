// Initialize stats when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    focusTime: 0,
    tasksDone: 0,
    tasks: []
  });
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FOCUS_SESSION_COMPLETED') {
    // Update focus time
    chrome.storage.local.get(['focusTime'], (result) => {
      const newFocusTime = (result.focusTime || 0) + 25; // Add 25 minutes
      chrome.storage.local.set({ focusTime: newFocusTime });
    });
  }
  
  if (request.type === 'TASK_COMPLETED') {
    // Update tasks done
    chrome.storage.local.get(['tasksDone'], (result) => {
      const newTasksDone = (result.tasksDone || 0) + 1;
      chrome.storage.local.set({ tasksDone: newTasksDone });
    });
  }
}); 