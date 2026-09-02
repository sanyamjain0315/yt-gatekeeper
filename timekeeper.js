let focus_start_time = null;

function start_tracking() {
  if (document.visibilityState === "visible" && document.hasFocus()) {
    if (!focus_start_time) {
      focus_start_time = Date.now();
      console.log("Started tracking " + focus_start_time);
    }
  } else {
    send_time();
  }
}

function send_time() {
  console.log("Started sending message");
  if (focus_start_time) {
    console.log("inside first if statement");
    const elapsed_seconds = Math.floor((Date.now() - focus_start_time) / 1000);
    focus_start_time = null;
    console.log("elapsed_seconds " + elapsed_seconds);
    if (elapsed_seconds > 0) {
      console.log("inside elapsed_seconds if statemtnt");
      chrome.runtime.sendMessage({
        type: "ACTIVE_SECONDS",
        seconds: elapsed_seconds
      });
      console.log("Sent message");
    }
  }
}

window.addEventListener("focus", () => {
  console.log("Gained focus");
  start_tracking();
});
window.addEventListener("blur", () => {
  console.log("Lost focus")
  send_time();
});
// document.addEventListener("visibilitychange", () => {
//   if (document.visibilityState === "hidden") {
//     send_time();
//   } else {
//     start_tracking();
//   }
// })

window.addEventListener("pagehide", send_time());

// Start tracking on page load
start_tracking();

// window.addEventListener("blur", () => {
//   console.log("Window lost focus (minimized or switched app)");
// });

// window.addEventListener("focus", () => {
//   console.log("Window gained focus");
// });
