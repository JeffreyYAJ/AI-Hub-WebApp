# AI-Hub-WebApp

A web application that centralizes access to multiple AI platforms in a single workspace.

Instead of switching tabs between different AI tools, users can pin their favorite AI websites and interact with them directly inside the application, through an embedded web view.

---

## Concept

AI Hub is designed as an **AI control center**.

- Pin your favorite AI tools (ChatGPT, Claude, Gemini, Perplexity, etc.)
- Organize them in a customizable sidebar or toolbar
- Open and use each AI directly inside the app
- Keep a clean, focused workflow without browser tab overload

Inspired by platforms like Poe  
**AI websites are accessed directly from the web**, not reimplemented.

## Architecture Overview

The project is structured with modularity:

```bash
src/
├── components/ 
│ ├── Sidebar
│ ├── PinButton
│ ├── WebView
│ └── SettingsPanel
├── context/ # Global state management
├── hooks/ # Custom React hooks
├── styles/ # Global and theme styles
├── utils/ # Helper functions
└── main.tsx
```


---

## Getting Started

### Prerequisites
- Node.js (>= 18)
- npm or yarn

### Installation

```bash
git clone https://github.com/JeffreyYAJ/AI-Hub-WebApp.git
cd AI-Hub-WebApp
npm install
```
Run in development mode
```bash
npm run dev
```

### Example AI Sites
By default, the app may include example pinned sites such as:

- https://chat.openai.com

- https://claude.ai

- https://www.perplexity.ai

- https://gemini.google.com

These can be modified or removed at any time from the UI.

# Future Improvements
- Electron desktop version
- Multiple workspaces / profiles
- Split-view (multiple AI tools visible at once)
- Keyboard shortcuts
- Cloud sync
- Plugin system for AI tools

# Limitations
Some external websites may restrict embedding via iframes due to security policies (CSP / X-Frame-Options).
Handling or bypassing these limitations is planned for future desktop (Electron) versions.

# Contributing
Contributions are welcome.
Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

# Author
Built with passion for modern web and AI-focused tools.
