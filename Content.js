async function insert_overlay() {
  // Get HTML file URLs
  const htmlUrl = chrome.runtime.getURL("resources/overlay.html");
  const cssUrl = chrome.runtime.getURL("resources/overlay.css");

  // Fetch the files in parallel
  const [htmlText, cssText] = await Promise.all([
    fetch(htmlUrl).then((res) => res.text()),
    fetch(cssUrl).then((res) => res.text())
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

  document.body.appendChild(container);

  // Bind event listeners inside the Shadow DOM
  shadowRoot.getElementById("continue-btn").addEventListener("click", () => {
    const time_delta = new Date() - overlay_insert_ts;
    if (time_delta <= 5000) {
      let header = shadowRoot.getElementById("header-message");
      header.innerHTML = "Slow Down";

      let paragraph = shadowRoot.getElementById("para-message");
      paragraph.innerHTML = "Remember, use must YouTube for work, not as another addiction.";

      overlay_insert_ts = new Date();
    }
    else {
      container.remove();
    }
  });
}

let overlay_insert_ts = 0;
const observer = new MutationObserver((mutations, obs) => {
  const target = document.querySelector('iframe'); // Observing if this element is rendered or not
  if (target) {
    insert_overlay();
    overlay_insert_ts = new Date();
    obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
})
