# SKILLVERSE — Student Skill Exchange Platform

![Version](https://img.shields.io/badge/Version-1.0.0-FFD028?style=for-the-badge&labelColor=000000&logo=semver)
![Status](https://img.shields.io/badge/Status-Active-00AD6F?style=for-the-badge&labelColor=000000&logo=vercel)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&labelColor=000000&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&labelColor=000000&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&labelColor=000000&logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&labelColor=000000&logo=css3)
![Groq](https://img.shields.io/badge/Groq-API-FF6B6B?style=for-the-badge&labelColor=000000&logo=groq)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-FFD028?style=for-the-badge&labelColor=000000)
![License](https://img.shields.io/badge/License-AC--DC-000000?style=for-the-badge&labelColor=FFD028&logo=openaccess)

---

> **Note for Evaluators:**  
> This project — **SKILLVERSE** — is a student skill exchange platform built as part of the academic curriculum. It features a **neobrutalist design system**, a **modular Vite + vanilla JS architecture**, and **10 interactive screens** that simulate the complete user journey — from login to live chat. The platform demonstrates reactive state management, component-based routing, an AI chatbot assistant (Groq API), and a real-time waiting room simulator. We encourage you to explore the full flow: *Login → Home → Matches → Proposal → Status → Chats → Profile*.

---

## Team AC-DC

| Role | Name |
|---|---|
| **Developer** | **Rachit Tiwari** |
| **Developer** | **Mausam Kar** |
| **Developer** | **Shaikh Mohammad Warsi** |
| **Developer** | **Jiya Jaiswal** |

---

## Architecture Overview

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

### User Journey Flow

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

## Flowcharts

### Match Engine Workflow

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

### AI Chatbot Request Flow

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

---

## Features

| # | Screen | Description |
|---|---|---|
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

### Additional Components

| Component | Description |
|---|---|
| **AI Chatbot** | Floating assistant powered by Groq API (Llama 3.1 8B) |
| **Theme Toggle** | Light/Dark mode switcher |
| **State Debugger** | Live reactive JSON state viewer |
| **Color Sandbox** | Real-time neobrutalist color token editor |
| **Activity Log** | Console-style event stream |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Build Tool** | Vite 5 |
| **Language** | Vanilla JavaScript (ES Modules) |
| **Markup** | HTML (component strings via `?raw` import) |
| **Styling** | CSS with Custom Properties (neobrutalist design system) |
| **Smooth Scroll** | Lenis |
| **AI Integration** | Groq API (Llama 3.1 8B) |
| **State Management** | Reactive Proxy (custom) |
| **Router** | Custom hash-based SPA router |
| **Fonts** | Outfit (headers), Inter (body) |

---

## Project Structure

```
SKILLVERSE/
├── index.html                 # Entry point with global header, nav, AI widget
├── package.json               # Vite + Lenis dependencies
├── package-lock.json
├── .gitignore
├── .env                       # (create this) VITE_GROQ_API_KEY=your_key
├── README.md
└── src/
    ├── main.js                # App bootstrapper, event bindings, Lenis init
    ├── state.js               # Reactive state proxy with logging
    ├── router.js              # SPA navigation, screen switching, chat rendering
    ├── chatbot.js             # Chat message send/receive logic
    ├── timer.js               # Waiting room countdown timer
    ├── ai-assistant.js        # Groq API integration for AI chatbot
    ├── components/            # Screen templates (.html loaded as raw strings)
    │   ├── login.html
    │   ├── home.html
    │   ├── waiting-room.html
    │   ├── profile.html
    │   ├── edit-profile.html
    │   ├── matches.html
    │   ├── proposal.html
    │   ├── status.html
    │   ├── messages.html
    │   └── chat.html
    └── styles/                # Modular CSS files
        ├── variables.css
        ├── main.css
        ├── header.css
        ├── login.css
        ├── home.css
        ├── waiting-room.css
        ├── profile.css
        ├── edit-profile.css
        ├── matches.css
        ├── proposal.css
        ├── status.css
        ├── chat.css
        └── ai-chatbot.css
```

---

## Setup & Run

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Rachit-Tiwari-7/SKILLVERSE.git
cd SKILLVERSE

# Install dependencies
npm install

# (Optional) Set Groq API key for AI chatbot
echo "VITE_GROQ_API_KEY=your_groq_api_key" > .env

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build    # outputs to /dist
npm run preview  # preview production build
```

---

## Screens Walkthrough

| Screen | Key Interactions |
|---|---|
| **Login** | Enter credentials or click "Sign In with Google" to access the dashboard |
| **Home** | View stats, join upcoming session, quick-nav to Matches/Chats/Profile |
| **Waiting Room** | Toggle mic/camera, watch countdown, click "Join Session" |
| **Profile** | View rating, streak, skills; click EDIT to modify |
| **Edit Profile** | Update name/bio/dept, toggle notifications, log out |
| **Matches** | Filter by department, like/dismiss cards, propose exchange |
| **Proposal** | Review skill swap, select duration & format, send request |
| **Status** | Success confirmation; navigate to chat or back to home |
| **Messages** | Search conversations, select a chat to open |
| **Chatroom** | Send messages, receive auto-replies from simulated peer |

---

## License

### AC-DC Academic License

Copyright &copy; 2026 **Team AC-DC**

All rights reserved. This project is developed solely for **academic evaluation purposes** as part of the curriculum at **VIT Bhopal University**.

**Permissions:**
- Viewing and evaluating the source code by authorized faculty and evaluators
- Academic reference and study

**Restrictions:**
- No commercial use, distribution, or publication without prior written consent from the team
- No reproduction or redistribution of the codebase, in whole or in part, for any purpose outside academic evaluation
- No removal or alteration of this license notice

**Attribution:**

This project — **SKILLVERSE Student Skill Exchange Platform** — is the original work of:

| Name | Role |
|---|---|
| **Rachit Tiwari** | Developer |
| **Mausam Kar** | Developer |
| **Shaikh Mohammad Warsi** | Developer |
| **Jiya Jaiswal** | Developer |

*Team AC-DC — VIT Bhopal University*

---

<p align="center">SKILLVERSE &bull; Learn. Teach. Grow.</p>
