chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("received event")
  if (message.type === "ACTIVE_SECONDS") {
    processActiveSeconds(message.seconds);
  }
})

async function processActiveSeconds(additionalSeconds) {
  console.log("background.js: processing active seconds")
  const data = await chrome.storage.local.get({
    pendingSeconds: 0,
    minutes: 0
  })

  let totalPending = data.pendingSeconds + additionalSeconds;
  let newMinutes = data.minutes;

  if (totalPending > 60) {
    const addedMinutes = Math.floor(totalPending / 60);
    newMinutes += addedMinutes;
    totalPending = totalPending % 60; // remaining seconds
  }

  await chrome.storage.local.set({
    pendingSeconds: totalPending,
    minutes: newMinutes
  });
  console.log("updated time storage" + newMinutes + " newMinutes" + pendingSeconds + " pendingSeconds");
}
