function create_overlay() {
  // Create the overlay container
  const gatekeeper_overlay = document.createElement('div');
  gatekeeper_overlay.id = 'gatekeeper-overlay';

  // Create the content wrapper
  const overlay_content = document.createElement('div');
  overlay_content.className = 'overlay-content';

  // Create the text
  const fade_in_text = document.createElement('h1');
  fade_in_text.className = 'fade-in-text';
  fade_in_text.innerText = "You have been browsing for a while.";

  // Create the time spent text
  const fade_in_time = document.createElement('p');
  fade_in_time.className = 'fade-in-time';
  fade_in_time.innerHTML = 'Time spent: <span id="time-spent">0</span> minutes';

  // Create the button
  const fade_in_button = document.createElement('button');
  fade_in_button.id = 'continue-btn';
  fade_in_button.className = 'fade-in-button';
  fade_in_button.innerText = 'Continue';

  // Assemble
  overlay_content.appendChild(fade_in_text);
  overlay_content.appendChild(fade_in_time);
  overlay_content.appendChild(fade_in_button);
  gatekeeper_overlay.appendChild(overlay_content);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #gatekeeper-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(5px);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        color: white;
        text-align: center;
    }

    .overlay-content {
        padding: 20px;
    }

    .overlay-content h1 {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .overlay-content p {
        font-size: 1.5rem;
        margin-bottom: 30px;
    }

    #continue-btn {
        padding: 12px 24px;
        font-size: 1.2rem;
        cursor: pointer;
        background-color: #ff0000;
        color: white;
        border: none;
        border-radius: 4px;
        transition: background 0.3s;
    }

    #continue-btn:hover {
        background-color: #cc0000;
    }

    .fade-in-text, .fade-in-time, .fade-in-button {
        opacity: 0;
        animation: fadeIn 0.8s ease forwards;
    }

    .fade-in-text {
        animation-delay: 0.2s;
    }

    .fade-in-time {
        animation-delay: 1.5s;
    }

    .fade-in-button {
        animation-delay: 2.8s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
  `;
  document.head.appendChild(style);

  // Add to page
  document.body.appendChild(gatekeeper_overlay);

  // Set some dummy data
  document.getElementById('time-spent').innerText = '45';

  // Add interaction
  fade_in_button.onclick = () => {
    gatekeeper_overlay.style.display = 'none';
  };
}

const observer = new MutationObserver((mutations, obs) => {
  const target = document.querySelector('iframe'); // Observing if this element is rendered or not
  if (target) {
    create_overlay();
    obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
})
