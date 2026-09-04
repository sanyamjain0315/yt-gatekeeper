let overlay_insert_ts = null;

async function insert_overlay() {
  // Get HTML file URLs
  const htmlUrl = chrome.runtime.getURL("resources/overlay.html");
  const cssUrl = chrome.runtime.getURL("resources/overlay.css");

  // Fetch the files in parallel
  const [htmlText, cssText] = await Promise.all([
    fetch(htmlUrl).then((res) => res.text()),
    fetch(cssUrl).then((res) => res.text()),
  ]);

  // Create container element
  const container = document.createElement("div");
  container.id = "my-extension-root";

  // Attach a Shadow DOM for style isolation
  const shadowRoot = container.attachShadow({ mode: "open" });

  const styleElement = document.createElement("style");
  styleElement.textContent = cssText;

  shadowRoot.innerHTML = htmlText;
  shadowRoot.appendChild(styleElement);

  // Update the time spent
  let timespent_span = shadowRoot.getElementById("time-spent");
  let response = await chrome.storage.local.get({ minutes: 0 });
  const hours = Math.floor(response.minutes / 60);
  const minutes = response.minutes % 60;
  timespent_span.innerHTML = hours + " hours " + minutes + " minutes";

  document.body.appendChild(container);

  // Bind event listeners inside the Shadow DOM
  shadowRoot.getElementById("continue-btn").addEventListener("click", () => {
    const time_delta = new Date() - overlay_insert_ts;
    if (time_delta <= 5000) {
      // Hide previous elements
      let header_message = shadowRoot.getElementById("header-message");
      header_message.setAttribute("hidden", "hidden");
      let para_message = shadowRoot.getElementById("para-message");
      para_message.setAttribute("hidden", "hidden");
      let button = shadowRoot.getElementById("continue-btn");
      button.setAttribute("hidden", "hidden");

      // Unhide warning elements
      let header_warning = shadowRoot.getElementById("header-warning");
      header_warning.removeAttribute("hidden");
      let para_warning = shadowRoot.getElementById("para-warning");
      para_warning.removeAttribute("hidden");
      button.removeAttribute("hidden");

      overlay_insert_ts = new Date();
    } else {
      container.remove();
    }
  });
}

const observer = new MutationObserver((mutations, obs) => {
  const target = document.querySelector("iframe"); // Observing if this element is rendered or not
  if (target) {
    insert_overlay();
    overlay_insert_ts = Date.now();
    obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
