let focus_start_time = null;

function start_tracking() {
  if (document.visibilityState === "visible" && document.hasFocus()) {
    if (!focus_start_time) focus_start_time = Date.now()
  } else {
    send_time();
  }
}

function send_time() {
  if (focus_start_time) {
    const current_time = Date.now();
    const current_date = new Date(current_time).toISOString().split('T')[0];
    const focus_start_date = new Date(focus_start_time).toISOString().split('T')[0];

    if (focus_start_date != current_date) {
      focus_start_time = null;
      // Seconds since midnight
      const remaining_seconds = Math.floor((current_time - new Date(current_time).setHours(0, 0, 0, 0)) / 1000);
      if (remaining_seconds > 0) {
        chrome.runtime.sendMessage({
          type: "RESET_TIME",
          seconds: remaining_seconds
        });
      }
    }
    else {
      const elapsed_seconds = Math.floor((current_time - focus_start_time) / 1000);
      focus_start_time = null;
      if (elapsed_seconds > 0) {
        chrome.runtime.sendMessage({
          type: "ACTIVE_SECONDS",
          seconds: elapsed_seconds
        });
      }
    }
  }
}

window.addEventListener("focus", start_tracking);
window.addEventListener("blur", send_time);
window.addEventListener("pagehide", send_time);

// Start tracking on page load
start_tracking();
