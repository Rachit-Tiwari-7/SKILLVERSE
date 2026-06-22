<div align="center">
  <br/>
  <h1 align="center">SKILLVERSE</h1>
  <p align="center">
    <strong>Student Skill Exchange Platform</strong>
    <br/>
    <em>Learn. Teach. Grow.</em>
  </p>

  <br/>

  <p align="center">
    <a href="#-features"><strong>Features</strong></a> •
    <a href="#-tech-stack"><strong>Tech Stack</strong></a> •
    <a href="#-architecture"><strong>Architecture</strong></a> •
    <a href="#-quick-start"><strong>Quick Start</strong></a> •
    <a href="#-screens"><strong>Screens</strong></a> •
    <a href="#-contributors"><strong>Team</strong></a>
  </p>

  <br/>

  <!-- BADGES -->
  <p>
    <img src="https://img.shields.io/badge/Version-1.0.0-FFD028?style=for-the-badge&labelColor=000000&logo=semver" alt="Version"/>
    <img src="https://img.shields.io/badge/Status-Active-00AD6F?style=for-the-badge&labelColor=000000&logo=vercel" alt="Status"/>
    <img src="https://img.shields.io/badge/Build-Passing-00AD6F?style=for-the-badge&labelColor=000000&logo=githubactions" alt="Build"/>
    <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&labelColor=000000&logo=vite" alt="Vite"/>
    <img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&labelColor=000000&logo=javascript" alt="JavaScript"/>
    <img src="https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&labelColor=000000&logo=html5" alt="HTML"/>
    <img src="https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&labelColor=000000&logo=css3" alt="CSS"/>
    <img src="https://img.shields.io/badge/Groq-API-FF6B6B?style=for-the-badge&labelColor=000000&logo=groq" alt="Groq"/>
    <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-FFD028?style=for-the-badge&labelColor=000000" alt="Lenis"/>
    <img src="https://img.shields.io/badge/PRs-Welcome-8A2BE2?style=for-the-badge&labelColor=000000&logo=github" alt="PRs Welcome"/>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-AC--DC-000000?style=for-the-badge&labelColor=FFD028&logo=openaccess" alt="License"/></a>
  </p>

  <br/>
</div>

---

## 📋 Overview

**SKILLVERSE** is a sophisticated **student-to-student skill exchange platform** that reimagines peer learning through a neobrutalist lens. Built with **vanilla JavaScript**, **Vite 5**, and a custom **reactive state management** system, the platform delivers a seamless single-page application experience across **10 interactive screens** — from authentication to live chat.

> 🎓 **Academic Project** — Developed by Team **AC-DC** as part of the VIT Bhopal University curriculum. This project demonstrates advanced frontend engineering patterns including component-based SPA routing, reactive state proxies, real-time AI integration, and a modular CSS design system.

### ✨ Why SKILLVERSE?

| | |
|---|---|
| **🎯 Peer-to-Peer Learning** | Connect students with complementary skills for knowledge exchange |
| **🤖 AI-Powered Assistance** | Integrated Groq AI chatbot (Llama 3.1) provides intelligent guidance |
| **🎨 Neobrutalist Design** | A bold, distinctive visual identity that stands out from conventional UIs |
| **⚡ Reactive Architecture** | Custom Proxy-based state management without any frameworks |
| **📱 Full User Journey** | 10 interconnected screens covering the complete skill exchange lifecycle |

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Screens Walkthrough](#-screens-walkthrough)
- [Project Structure](#-project-structure)
- [Contributors](#-contributors)
- [Development Timeline](#-development-timeline)
- [License](#-license)

---

## 🚀 Features

### Core Screens

| # | Screen | Description |
|:---:|---|---|
| 1 | **Login** | Student email/password sign-in with Google Auth simulation |
| 2 | **Home Dashboard** | Welcome banner, stats grid, upcoming sessions, quick actions |
| 3 | **Waiting Room** | Pre-call lobby with countdown timer, camera/mic toggles, video simulation |
| 4 | **Student Profile** | Avatar, rating, streak, teach/learn badges |
| 5 | **Edit Profile** | Display name, bio, department, notification/match preferences, log out |
| 6 | **Match Engine** | AI-powered peer cards with department filters, like/dismiss, match percentage |
| 7 | **Exchange Proposal** | Skill swap summary, duration/format selectors |
| 8 | **Success Status** | Confirmation screen with navigation to chat or home |
| 9 | **Chats Directory** | Searchable list of active conversations |
| 10 | **Live Chatroom** | Real-time messaging interface with send/enter support |

### 🧩 Additional Components

| Component | Description |
|---|---|
| **AI Chatbot** | 🤖 Floating assistant powered by **Groq API** (Llama 3.1 8B) — context-aware, real-time responses |
| **Theme Toggle** | 🌗 Seamless light/dark mode switching with persistent preference |
| **State Debugger** | 🔍 Live reactive JSON state viewer for development inspection |
| **Color Sandbox** | 🎨 Real-time neobrutalist color token editor — tweak variables, see changes instantly |
| **Activity Log** | 📋 Console-style event stream recording all application interactions |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---|---:|---:|
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) | Lightning-fast HMR, optimized production builds |
| **Language** | ![JavaScript](https://img.shields.io/badge/ES2024-F7DF1E?logo=javascript) | Vanilla JS with ES modules — zero framework overhead |
| **Markup** | ![HTML](https://img.shields.io/badge/HTML_5-E34F26?logo=html5) | Component templates loaded via `?raw` Vite imports |
| **Styling** | ![CSS](https://img.shields.io/badge/CSS_3_Custom_Properties-1572B6?logo=css3) | Neobrutalist design system with CSS custom properties |
| **Smooth Scroll** | ![Lenis](https://img.shields.io/badge/Lenis-FFD028) | Butter-smooth scroll physics |
| **AI Integration** | ![Groq](https://img.shields.io/badge/Groq-API-FF6B6B?logo=groq) | Llama 3.1 8B via Groq's ultra-fast inference |
| **State Management** | — | Custom reactive `Proxy`-based store with change logging |
| **Router** | — | Custom hash-based SPA router with dynamic component injection |
| **Fonts** | — | **Outfit** (headers), **Inter** (body) — loaded from Google Fonts |

</div>

---

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    subgraph Entry["Entry Point"]
        HTML["index.html"]
    end

    subgraph Core["Core Modules (src/)"]
        MAIN["main.js<br/>Bootstrapper"]
        STATE["state.js<br/>Reactive Proxy"]
        ROUTER["router.js<br/>SPA Router"]
        TIMER["timer.js<br/>Countdown"]
        CHAT["chatbot.js<br/>Chat Logic"]
        AI["ai-assistant.js<br/>Groq AI"]
    end

    subgraph Components["Components (src/components/)"]
        LOGIN["login.html"]
        HOME["home.html"]
        WAIT["waiting-room.html"]
        PROF["profile.html"]
        EDIT["edit-profile.html"]
        MATCH["matches.html"]
        PROP["proposal.html"]
        STAT["status.html"]
        MSGS["messages.html"]
        CHATROOM["chat.html"]
    end

    subgraph Styles["Styles (src/styles/)"]
        VAR["variables.css"]
        MAIN_CSS["main.css"]
        HEADER["header.css"]
        LOGIN_CSS["login.css"]
        HOME_CSS["home.css"]
        WAIT_CSS["waiting-room.css"]
        PROF_CSS["profile.css"]
        EDIT_CSS["edit-profile.css"]
        MATCH_CSS["matches.css"]
        PROP_CSS["proposal.css"]
        STAT_CSS["status.css"]
        CHAT_CSS["chat.css"]
        AI_CSS["ai-chatbot.css"]
    end

    HTML --> MAIN
    MAIN --> STATE
    MAIN --> ROUTER
    MAIN --> TIMER
    MAIN --> CHAT
    MAIN --> AI
    MAIN -.-> Components
    MAIN -.-> Styles
    STATE -.-> ROUTER
    ROUTER -.-> Components
```

### Data Flow

```mermaid
flowchart LR
    A["User Action<br/>(Click / Submit)"] --> B["Event Listener<br/>(main.js)"]
    B --> C["state.js<br/>Reactive Proxy"]
    C --> D["router.js<br/>navigate()"]
    D --> E["Component HTML<br/>injected into DOM"]
    E --> F["CSS Modules<br/>applied"]
    F --> G["Screen Rendered"]
    G -.->|"User interacts again"| A
```

### User Journey

```mermaid
stateDiagram-v2
    [*] --> Login
    Login --> Home: Authenticate
    
    Home --> WaitingRoom: Join Call
    Home --> Matches: Find Peers
    Home --> Profile: View Profile
    Home --> Messages: Open Chats
    
    Matches --> Proposal: Propose Exchange
    Proposal --> Status: Send Request
    
    Status --> Chatroom: Go to Chat
    Status --> Home: Back to Home
    
    Profile --> EditProfile: Edit
    
    EditProfile --> Profile: Save
    EditProfile --> Login: Log Out
    
    Messages --> Chatroom: Select Chat
    
    WaitingRoom --> Home: Back
    Chatroom --> Messages: Back
    
    Login --> [*]
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (ships with Node.js)

### Setup in 30 Seconds

```bash
# 1. Clone the repository
git clone https://github.com/Rachit-Tiwari-7/SKILLVERSE.git

# 2. Navigate to project
cd SKILLVERSE

# 3. Install dependencies
npm install

# 4. (Optional) Set Groq API key for AI chatbot features
echo "VITE_GROQ_API_KEY=your_groq_api_key" > .env

# 5. Start development server
npm run dev
```

Your browser will open at **👉 [http://localhost:5173](http://localhost:5173)**

### Production Build

```bash
npm run build    # outputs optimized bundle to /dist
npm run preview  # preview production build locally
```

---

## 🎬 Screens Walkthrough

| Screen | Key Interactions |
|---|---|
| **🔐 Login** | Enter credentials or click "Sign In with Google" to access the dashboard |
| **🏠 Home** | View stats, join upcoming session, quick-nav to Matches/Chats/Profile |
| **⏳ Waiting Room** | Toggle mic/camera, watch countdown, click "Join Session" |
| **👤 Profile** | View rating, streak, skills; click EDIT to modify |
| **✏️ Edit Profile** | Update name/bio/dept, toggle notifications, log out |
| **💞 Matches** | Filter by department, like/dismiss cards, propose exchange |
| **📝 Proposal** | Review skill swap, select duration & format, send request |
| **✅ Status** | Success confirmation; navigate to chat or back to home |
| **💬 Messages** | Search conversations, select a chat to open |
| **💭 Chatroom** | Send messages, receive auto-replies from simulated peer |

### Workflow Diagrams

<details>
<summary><strong>🔽 Click to expand: Match Engine Workflow</strong></summary>

```mermaid
flowchart TD
    START(["User opens Matches"]) --> LOAD["Load peer cards from state"]
    LOAD --> FILTER{Filter by<br/>Department?}
    FILTER -->|All| SHOW_ALL["Show all cards"]
    FILTER -->|CS Dept| SHOW_CS["Show CS cards only"]
    FILTER -->|Design| SHOW_DES["Show Design cards only"]
    FILTER -->|Business| SHOW_BUS["Show Business cards only"]
    
    SHOW_ALL --> ACTION{User Action}
    SHOW_CS --> ACTION
    SHOW_DES --> ACTION
    SHOW_BUS --> ACTION
    
    ACTION -->|"Like (👍)"| LIKE["Animate like<br/>Remove card<br/>Update count"]
    ACTION -->|"Dismiss (✕)"| DISMISS["Animate dismiss<br/>Remove card<br/>Update count"]
    ACTION -->|"Propose Exchange"| PROPOSE["Navigate to<br/>Proposal Screen"]
    
    LIKE --> REMAIN{More cards?}
    DISMISS --> REMAIN
    REMAIN -->|Yes| ACTION
    REMAIN -->|No| EMPTY["No more matches<br/>notification"]
```
</details>

<details>
<summary><strong>🔽 Click to expand: AI Chatbot Request Flow</strong></summary>

```mermaid
sequenceDiagram
    actor User
    participant UI as Chat Widget
    participant Handler as ai-assistant.js
    participant Groq as Groq API
    
    User->>UI: Types message & clicks send
    UI->>Handler: fetchGroqResponse(text)
    Handler->>UI: Show typing indicator
    Handler->>Groq: POST /chat/completions<br/>(llama-3.1-8b-instant)
    Groq-->>Handler: Response with AI reply
    Handler->>UI: Remove typing indicator
    UI-->>User: Display AI response
    Note over Handler,Groq: System prompt provides<br/>Skillverse context
```
</details>

---

## 📁 Project Structure

```
SKILLVERSE/
├── 📄 index.html                 # Entry point — global header, nav, AI widget
├── 📄 package.json               # Vite + Lenis dependencies
├── 📄 package-lock.json
├── 📄 .gitignore
├── 📄 .env                       # (create this) VITE_GROQ_API_KEY=your_key
├── 📄 README.md
└── 📂 src/
    ├── 📄 main.js                # App bootstrapper, event bindings, Lenis init
    ├── 📄 state.js               # Reactive state proxy with logging
    ├── 📄 router.js              # SPA navigation, screen switching, chat rendering
    ├── 📄 chatbot.js             # Chat message send/receive logic
    ├── 📄 timer.js               # Waiting room countdown timer
    ├── 📄 ai-assistant.js        # Groq API integration for AI chatbot
    ├── 📂 components/            # Screen templates (.html as raw strings)
    │   ├── 📄 login.html
    │   ├── 📄 home.html
    │   ├── 📄 waiting-room.html
    │   ├── 📄 profile.html
    │   ├── 📄 edit-profile.html
    │   ├── 📄 matches.html
    │   ├── 📄 proposal.html
    │   ├── 📄 status.html
    │   ├── 📄 messages.html
    │   └── 📄 chat.html
    └── 📂 styles/                # Modular CSS files
        ├── 📄 variables.css
        ├── 📄 main.css
        ├── 📄 header.css
        ├── 📄 login.css
        ├── 📄 home.css
        ├── 📄 waiting-room.css
        ├── 📄 profile.css
        ├── 📄 edit-profile.css
        ├── 📄 matches.css
        ├── 📄 proposal.css
        ├── 📄 status.css
        ├── 📄 chat.css
        └── 📄 ai-chatbot.css
```

---

## 👥 Contributors

### Team AC-DC

<div align="center">

| | Name | Role | Contributions |
|:---:|---|---|---|
| **👤** | **Rachit Tiwari** | Lead Developer | Architecture, State Management, Router, Chat System, AI Integration |
| **👤** | **Mausam Kar** | Frontend Developer | Component Screens, CSS Design System, Match Engine, Timer |
| **👤** | **Shaikh Mohammad Warsi** | UI/UX Developer | Login, Profile, Edit Profile, Proposal, Status Screens |
| **👤** | **Jiya Jaiswal** | Frontend Developer | Home Dashboard, Messages, Waiting Room, Responsive Layout |

</div>

### Contribution Graph

```mermaid
gitGraph
    commit id: "init" tag: "v0.1"
    branch dev
    checkout dev
    commit id: "scaffold" tag: "vite-setup"
    commit id: "login-screen"
    commit id: "home-dashboard"
    commit id: "neobrutalist-css"
    commit id: "state-proxy"
    checkout main
    merge dev tag: "v0.2"
    checkout dev
    commit id: "router-spa"
    commit id: "match-engine"
    commit id: "waiting-room"
    commit id: "chat-system"
    checkout main
    merge dev tag: "v0.5"
    checkout dev
    commit id: "ai-chatbot"
    commit id: "theme-toggle"
    commit id: "responsive-nav"
    checkout main
    merge dev tag: "v1.0"
    commit id: "readme-docs" tag: "final"
```

---

## 📅 Development Timeline — 48‑Hour Hackathon Sprint

> Built from scratch in a 2‑day sprint (June 22–23, 2026). Every task below was planned, implemented, and polished within this window.

```mermaid
gantt
    title SKILLVERSE — 48‑Hour Sprint
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d %a

    section Day 1 — Foundation
    Project Scaffold & Vite Setup         :done, 2026-06-22, 4h
    Reactive State Proxy & Router         :done, 2026-06-22, 3h
    Neobrutalist Design System (CSS vars) :done, 2026-06-22, 2h
    Core Screens (Login, Home, Profile)   :done, 2026-06-22, 4h
    Match Engine & Proposal Flow          :done, 2026-06-22, 3h
    Waiting Room & Timer                  :done, 2026-06-22, 2h

    section Day 2 — Features & Polish
    Chat System & Messages                :done, 2026-06-23, 3h
    AI Chatbot (Groq Integration)         :done, 2026-06-23, 3h
    Theme Toggle & Color Sandbox          :done, 2026-06-23, 2h
    Remaining Screens (Status, Edit)      :done, 2026-06-23, 2h
    Responsive Layout & Navigation        :done, 2026-06-23, 2h
    README, Docs & Final Review           :done, 2026-06-23, 2h
```

---

## 📄 License

This project is licensed under the **AC-DC Academic License**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Support

- **Report Issues**: [GitHub Issues](https://github.com/Rachit-Tiwari-7/SKILLVERSE/issues)
- **Contribute**: Fork the repo and submit a PR — all contributions welcome!
- **Contact**: Reach out to any of the team members above

---

<div align="center">
  <sub>
    Built with ❤️ by <strong>Team AC-DC</strong> — VIT Bhopal University
  </sub>
  <br/>
  <br/>
  <sub>
    <strong>SKILLVERSE</strong> &bull; <em>Learn. Teach. Grow.</em>
  </sub>
</div>
