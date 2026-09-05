# YT Gatekeeper

YT Gatekeeper is a simple Chrome extension that monitors your daily YouTube usage and provides a persistent reminder on launch to keep your viewing time in check.

## Chrome Web Store
This extension is available to download through the chrome web store! 

You can download it from the following link: [YT Gatekeeper](https://chromewebstore.google.com/detail/yt-gatekeeper/paggklmpeoleddkmffideelfdcgmcbjm?authuser=1&hl=en)

## Demo

<img width="1280" height="802" alt="yt-gatekeeper-demo" src="https://github.com/user-attachments/assets/d2cfe727-a6fd-4e23-b60a-270f7a4f58aa" />

## Main Features

| Feature | Description |
| - | - |
| **Daily Time Tracker**  | Keeps a running total of the time you spend on YouTube each calendar day. A small overlay on the video page displays the time you have spent.                                                                                                    |
| **Persistent Reminder** | When you attempt to dismiss the overlay before a brief pause, a second overlay appears that cannot be closed until you read the message and wait a few seconds. This ensures you actually slow down before resuming playback, for mindfulness :) |

## Overlay Behavior

1. **Initial overlay** – appears automatically when you visit a YouTube video, showing the current day's total time spent and a “Close” button.
2. **Dismissal attempt** – clicking “Close” before the timer expires triggers a second overlay.
3. **Second overlay** – contains the reminder text to slow down. It will not let you continue to the site until you take a few seconds to actually read the message.

This is in attempt to slow you down, allowing you to be mindful of your time on YouTube :)

## Manual Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top‑right toggle).
4. Click **Load unpacked** and select the `yt-gatekeeper` folder.

After that, the extension will automatically inject its overlays on any YouTube page.

## Contributing

Contributions are welcome! I am absolutely not great at design and CSS, the overlay could use an overhaul. Any JS changes are also appreciated!

Please open issues or submit pull requests :>
