# SKILLVERSE Student Skill Exchange Platform - Recreation Guide

This guide contains the complete instructions and full source code to recreate the 1:1 neobrutalist interactive prototype website for the **SKILLVERSE** platform based on the 10 mockup screens in the design PDF.

To recreate the website, follow the steps below to set up the files in your project directory.

---

## 🛠️ Step-by-Step Recreation Steps

### Step 1: Create the Project Structure
Ensure you have the following folder layout in your workspace:
```text
(Project Root)/
├── README.md
└── pages/
    ├── signin.html
    ├── skillverse-style.css
    └── skillverse-app.js
```

### Step 2: Save the HTML Structure
Create a file at `pages/signin.html` and copy the code from the [HTML Source Code](#1-html-source-code-pagessigninhtml) section.

### Step 3: Save the CSS Styling
Create a file at `pages/skillverse-style.css` and copy the code from the [CSS Source Code](#2-css-source-code-pagesskillverse-stylecss) section.

### Step 4: Save the JavaScript Logic
Create a file at `pages/skillverse-app.js` and copy the code from the [JavaScript Source Code](#3-javascript-source-code-pagesskillverse-appjs) section.

### Step 5: Run the Prototype
Open `pages/signin.html` directly in your browser or run a simple local server in the project directory:
* **With Node.js**: Run `npx -y serve .` and visit `http://localhost:3000/pages/signin.html`.
* **With Python**: Run `python -m http.server 8000` and visit `http://localhost:8000/pages/signin.html`.

---

## 💻 Source Code Listings

### 1. HTML Source Code (`pages/signin.html`)
Save the code below as [signin.html](file:///d:/SKILLSYNC/SkillSync/pages/signin.html):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skillverse Prototyper - Student Skill Exchange</title>
  
  <!-- Imports custom neobrutalist styling -->
  <link rel="stylesheet" href="skillverse-style.css">
  
  <!-- Imports controllers and reactive state script -->
  <script defer src="skillverse-app.js"></script>
</head>
<body>

  <!-- Prototyper Wrapper Dashboard -->
  <div class="prototyper-wrapper">
  
    <!-- Top Header Bar -->
    <header class="db-header">
      <div class="db-title-zone">
        <div class="logo-shapes">
          <div class="logo-circle"></div>
          <div class="logo-square"></div>
        </div>
        <h1 class="db-title">SKILLVERSE Prototyper</h1>
      </div>
      <div class="db-controls">
        <button class="neobrutal-btn yellow" id="resetStateBtn" style="padding: 0.5rem 1rem; font-size: 0.8rem; box-shadow: 2px 2px 0px #000;">
          ↺ RESET DEMO
        </button>
        <button class="neobrutal-btn black" id="themeToggleBtn" style="padding: 0.5rem 1rem; font-size: 0.8rem; box-shadow: 2px 2px 0px #fff;">
          ☾ DARK MODE
        </button>
      </div>
    </header>

    <!-- Content Workspace -->
    <div class="db-layout">
    
      <!-- Left Panel: Manual Screen Selector -->
      <aside class="db-panel">
        <h2 class="panel-title">
          Screens 
          <span class="panel-title-badge">10 VIEWS</span>
        </h2>
        <div class="screen-list">
          <button class="screen-item active" data-screen="login">
            <span>1. Login Screen</span>
            <span class="screen-item-id">login</span>
          </button>
          <button class="screen-item" data-screen="home">
            <span>2. Home Dashboard</span>
            <span class="screen-item-id">home</span>
          </button>
          <button class="screen-item" data-screen="waiting-room">
            <span>3. Session Waiting Room</span>
            <span class="screen-item-id">waiting-room</span>
          </button>
          <button class="screen-item" data-screen="profile">
            <span>4. Student Profile</span>
            <span class="screen-item-id">profile</span>
          </button>
          <button class="screen-item" data-screen="edit-profile">
            <span>5. Edit Profile</span>
            <span class="screen-item-id">edit-profile</span>
          </button>
          <button class="screen-item" data-screen="matches">
            <span>6. Match Engine</span>
            <span class="screen-item-id">matches</span>
          </button>
          <button class="screen-item" data-screen="proposal">
            <span>7. Exchange Proposal</span>
            <span class="screen-item-id">proposal</span>
          </button>
          <button class="screen-item" data-screen="status">
            <span>8. Success Status</span>
            <span class="screen-item-id">status</span>
          </button>
          <button class="screen-item" data-screen="messages">
            <span>9. Chats Directory</span>
            <span class="screen-item-id">messages</span>
          </button>
          <button class="screen-item" data-screen="chat">
            <span>10. Live Chatroom</span>
            <span class="screen-item-id">chat</span>
          </button>
        </div>
      </aside>

      <!-- Center Panel: Smartphone Wrapper Mockup -->
      <main class="phone-mockup-wrapper">
        <div class="iphone-frame">
          <!-- Hardware Notch details -->
          <div class="iphone-notch">
            <div class="iphone-speaker"></div>
            <div class="iphone-camera"></div>
          </div>
          
          <!-- Virtual OS bar -->
          <div class="iphone-status-bar">
            <span>9:41 AM</span>
            <div class="iphone-status-icons">
              <span>5G</span>
              <svg width="14" height="10" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4"></rect>
                <rect x="4" y="6" width="3" height="6"></rect>
                <rect x="8" y="4" width="3" height="8"></rect>
                <rect x="12" y="1" width="3" height="11"></rect>
              </svg>
              <svg width="18" height="10" viewBox="0 0 20 10" fill="currentColor">
                <rect x="0" y="0" width="16" height="10" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
                <rect x="2" y="2" width="10" height="6"></rect>
                <rect x="17" y="3" width="2" height="4"></rect>
              </svg>
            </div>
          </div>
          
          <!-- Viewport Screen -->
          <div class="iphone-screen">
          
            <!-- ================= SCREEN 1: LOGIN ================= -->
            <section class="skillverse-screen active" id="screen-login">
              <div class="login-screen">
                <div class="login-logo-zone">
                  <div class="login-shapes">
                    <div class="login-circle"></div>
                    <div class="login-square"></div>
                  </div>
                  <h2 class="login-title">SKILL<br>VERSE</h2>
                  <p class="login-subtitle">Learn. Teach. Grow.</p>
                </div>
                
                <form id="mobileLoginForm" class="login-form">
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="login-email">Student Email</label>
                    <input class="neobrutal-input" type="email" id="login-email" required value="example@gmail.com">
                  </div>
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="login-password">Password</label>
                    <input class="neobrutal-input" type="password" id="login-password" required value="password123">
                  </div>
                  <div class="login-actions">
                    <button type="submit" class="neobrutal-btn red">Login to System</button>
                    <button type="button" id="login-google-btn" class="neobrutal-btn">Sign In with Google</button>
                  </div>
                </form>
              </div>
            </section>
            
            <!-- ================= SCREEN 2: HOME ================= -->
            <section class="skillverse-screen" id="screen-home">
              <header class="app-header">
                <div class="app-logo">
                  <div class="app-logo-shapes">
                    <div class="app-logo-circle"></div>
                    <div class="app-logo-square"></div>
                  </div>
                  <span>Skillverse</span>
                </div>
                <div class="pulse-dot"></div>
              </header>
              
              <div class="home-screen">
                <div class="welcome-banner">
                  <p class="welcome-sub">Welcome Back</p>
                  <h3 id="home-welcome-name" class="welcome-name">Abhinav Atul</h3>
                </div>
                
                <div class="stats-grid">
                  <div class="stat-box blue">
                    <div class="stat-value">12</div>
                    <div class="stat-label">Sessions Taught</div>
                  </div>
                  <div class="stat-box red">
                    <div class="stat-value">08</div>
                    <div class="stat-label">Skills Learned</div>
                  </div>
                </div>
                
                <h4 class="section-label">Upcoming Sessions</h4>
                <div class="upcoming-card">
                  <div class="upcoming-time">
                    <span class="pulse-dot"></span>
                    <span>Today • 4:00 PM</span>
                  </div>
                  <h3 class="upcoming-title">React Hooks</h3>
                  <p class="upcoming-instructor">With Alex Chen</p>
                  <button type="button" onclick="navigate('waiting-room')" class="neobrutal-btn black">Join Call</button>
                </div>
              </div>
              
              <!-- Bottom Tabs navigation -->
              <nav class="app-nav-bar">
                <div onclick="navigate('home')" class="app-nav-item active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </div>
                <div onclick="navigate('matches')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Match</span>
                </div>
                <div onclick="navigate('messages')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Chat</span>
                </div>
                <div onclick="navigate('profile')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Me</span>
                </div>
              </nav>
            </section>
            
            <!-- ================= SCREEN 3: WAITING ROOM ================= -->
            <section class="skillverse-screen" id="screen-waiting-room">
              <header class="app-header">
                <button type="button" onclick="goBack()" class="neobrutal-btn" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  ← BACK
                </button>
                <div class="app-logo" style="font-size: 0.95rem;">
                  Waiting Room
                </div>
                <div style="width: 16px; height: 16px; background-color: var(--primary-yellow); border: 1.5px solid #000;"></div>
              </header>
              
              <div class="waiting-room-screen">
                <div class="waiting-countdown-badge" id="waiting-timer-badge">Starts in 2:00</div>
                
                <h2 class="waiting-title">React Hooks</h2>
                <p class="waiting-subtitle">With Alex Chen</p>
                
                <!-- Video Simulator Area -->
                <div class="video-container">
                  <div class="video-status-overlay">LOCAL STREAM</div>
                  
                  <div id="waiting-camera-off" class="camera-off-indicator">
                    <div class="camera-off-icon"></div>
                    <div class="camera-off-text">Camera Off</div>
                  </div>
                  
                  <!-- Animated canvas pattern playing when camera is ON -->
                  <div id="waiting-sim-webcam" class="simulated-webcam" style="background: radial-gradient(circle, #334155, #0f172a); display:none; flex-direction:column; justify-content:center; align-items:center;">
                    <div class="pulse-dot" style="width: 14px; height: 14px; background-color: var(--primary-green); margin-bottom: 10px;"></div>
                    <span style="color: #fff; font-size: 0.75rem; font-weight: 800; font-family: var(--font-header);">TRANSMITTING VIDEO...</span>
                  </div>
                </div>
                
                <div class="video-status-overlay" style="top: auto; bottom: 85px; right: 10px; left: auto; background-color: var(--primary-red);" id="mic-status-label">AUDIO MUTED</div>
                
                <div class="video-controls-row">
                  <button type="button" id="waiting-mute-toggle" class="neobrutal-btn red">Muted</button>
                  <button type="button" id="waiting-video-toggle" class="neobrutal-btn white">Video Off</button>
                </div>
                
                <button type="button" id="join-session-btn" class="neobrutal-btn blue">Join Session</button>
              </div>
            </section>
            
            <!-- ================= SCREEN 4: STUDENT PROFILE ================= -->
            <section class="skillverse-screen" id="screen-profile">
              <header class="app-header">
                <div class="app-logo" style="font-size: 1rem;">Student Profile</div>
                <button type="button" onclick="navigate('edit-profile')" class="neobrutal-btn" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  EDIT
                </button>
              </header>
              
              <div class="profile-screen">
                <div class="profile-card">
                  <div class="profile-avatar-circle">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 id="profile-name" class="profile-name">Abhinav Atul</h2>
                  <p id="profile-dept" class="profile-dept">Design Dept • Year 2</p>
                </div>
                
                <div class="streak-rating-row">
                  <div class="profile-metric-box">
                    <div class="metric-value">4.9</div>
                    <div class="metric-label">Rating</div>
                  </div>
                  <div class="profile-metric-box">
                    <div class="metric-value">14</div>
                    <div class="metric-label">Day Streak</div>
                  </div>
                </div>
                
                <div class="badge-container">
                  <h4 class="badge-container-title">I Can Teach</h4>
                  <div class="badge-list">
                    <span class="neobrutal-badge">UI/UX Design</span>
                    <span class="neobrutal-badge">Figma</span>
                    <span class="neobrutal-badge">Wireframing</span>
                  </div>
                </div>
                
                <div class="badge-container">
                  <h4 class="badge-container-title">I Want to Learn</h4>
                  <div class="badge-list">
                    <span class="neobrutal-badge yellow">React.js</span>
                    <span class="neobrutal-badge yellow">Javascript</span>
                    <span class="neobrutal-badge yellow">CSS Grid</span>
                  </div>
                </div>
              </div>
              
              <nav class="app-nav-bar">
                <div onclick="navigate('home')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </div>
                <div onclick="navigate('matches')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Match</span>
                </div>
                <div onclick="navigate('messages')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Chat</span>
                </div>
                <div onclick="navigate('profile')" class="app-nav-item active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Me</span>
                </div>
              </nav>
            </section>
            
            <!-- ================= SCREEN 5: EDIT PROFILE ================= -->
            <section class="skillverse-screen" id="screen-edit-profile">
              <header class="app-header">
                <button type="button" onclick="goBack()" class="neobrutal-btn" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  ← CANCEL
                </button>
                <div class="app-logo" style="font-size: 1rem;">Edit Profile</div>
                <button type="submit" form="editProfileForm" class="neobrutal-btn blue" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  SAVE
                </button>
              </header>
              
              <div class="edit-profile-screen">
                <form id="editProfileForm">
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="edit-display-name">Display Name</label>
                    <input class="neobrutal-input" type="text" id="edit-display-name" required value="Abhinav Atul">
                  </div>
                  
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="edit-bio">Bio</label>
                    <textarea class="neobrutal-input" id="edit-bio" rows="3" style="resize: none;" required>Design student passionate about UI/UX. Looking to learn frontend dev.</textarea>
                  </div>
                  
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="edit-dept">Department</label>
                    <input class="neobrutal-input" type="text" id="edit-dept" required value="Design Dept">
                  </div>
                  
                  <div class="neobrutal-label" style="margin-bottom: 0.5rem; display:block;">Preferences</div>
                  
                  <div class="neobrutal-toggle-group">
                    <span class="toggle-label">Email Notifications</span>
                    <div class="neobrutal-switch checked" id="switch-email"></div>
                  </div>
                  
                  <div class="neobrutal-toggle-group">
                    <span class="toggle-label">Available for Matches</span>
                    <div class="neobrutal-switch checked" id="switch-matches"></div>
                  </div>
                  
                  <button type="button" onclick="state.isAuthenticated=false; navigate('login'); addLog('User logged out.');" class="neobrutal-btn red" style="margin-top: 1rem;">
                    Log Out
                  </button>
                </form>
              </div>
            </section>
            
            <!-- ================= SCREEN 6: MATCHES ================= -->
            <section class="skillverse-screen" id="screen-matches">
              <header class="app-header">
                <div class="app-logo">
                  <div class="app-logo-shapes">
                    <div class="app-logo-circle"></div>
                    <div class="app-logo-square"></div>
                  </div>
                  <span>Skillverse</span>
                </div>
                <div style="font-family: var(--font-header); font-weight:900; font-size: 0.85rem;">AI Matches</div>
              </header>
              
              <div class="matches-screen">
                <div class="match-list">
                  
                  <!-- Match Card 1: Alex Chen -->
                  <div class="match-card">
                    <div class="match-card-header">
                      <div>
                        <h3 class="match-name">Alex Chen</h3>
                        <p class="match-dept">CS Dept • Year 3</p>
                      </div>
                      <span class="match-percentage-badge">94%</span>
                    </div>
                    
                    <div class="offers-wants-grid">
                      <div>
                        <div class="offers-wants-title">Offers</div>
                        <span class="neobrutal-badge">React.js</span>
                        <span class="neobrutal-badge">Next.js</span>
                      </div>
                      <div>
                        <div class="offers-wants-title">Wants</div>
                        <span class="neobrutal-badge yellow">UI/UX</span>
                      </div>
                    </div>
                    
                    <button type="button" onclick="navigate('proposal')" class="neobrutal-btn black">Propose Exchange</button>
                  </div>
                  
                  <!-- Match Card 2: Sarah Jenkins -->
                  <div class="match-card">
                    <div class="match-card-header">
                      <div>
                        <h3 class="match-name">David Kim</h3>
                        <p class="match-dept">Business Dept • Year 2</p>
                      </div>
                      <span class="match-percentage-badge">87%</span>
                    </div>
                    
                    <div class="offers-wants-grid">
                      <div>
                        <div class="offers-wants-title">Offers</div>
                        <span class="neobrutal-badge">Excel VBA</span>
                        <span class="neobrutal-badge">Economics</span>
                      </div>
                      <div>
                        <div class="offers-wants-title">Wants</div>
                        <span class="neobrutal-badge yellow">Figma</span>
                      </div>
                    </div>
                    
                    <button type="button" class="neobrutal-btn black" style="opacity: 0.6; cursor: not-allowed;" disabled>Propose Exchange</button>
                  </div>
                  
                </div>
              </div>
              
              <nav class="app-nav-bar">
                <div onclick="navigate('home')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </div>
                <div onclick="navigate('matches')" class="app-nav-item active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Match</span>
                </div>
                <div onclick="navigate('messages')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Chat</span>
                </div>
                <div onclick="navigate('profile')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Me</span>
                </div>
              </nav>
            </section>
            
            <!-- ================= SCREEN 7: EXCHANGE PROPOSAL ================= -->
            <section class="skillverse-screen" id="screen-proposal">
              <header class="app-header">
                <button type="button" onclick="navigate('matches')" class="neobrutal-btn" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  ← BACK
                </button>
                <div class="app-logo" style="font-size: 0.9rem;">Exchange Proposal</div>
                <div style="width: 16px; height: 16px; background-color: var(--primary-red); border-radius:50%; border: 1.5px solid #000;"></div>
              </header>
              
              <div class="proposal-screen">
                <form id="exchangeProposalForm">
                  <div class="proposal-summary-card">
                    <div class="proposal-summary-item">
                      <div class="proposal-indicator-circle"></div>
                      <div>
                        <div class="proposal-item-label">You Teach</div>
                        <div class="proposal-item-val">UI/UX Design</div>
                      </div>
                    </div>
                    
                    <div class="proposal-connector-line"></div>
                    
                    <div class="proposal-summary-item">
                      <div class="proposal-indicator-square"></div>
                      <div>
                        <div class="proposal-item-label">Alex Teaches</div>
                        <div class="proposal-item-val">React.js</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="proposal-duration">Duration</label>
                    <div class="neobrutal-select-wrapper">
                      <select class="neobrutal-select" id="proposal-duration">
                        <option value="2 Weeks">2 Weeks</option>
                        <option value="4 Weeks" selected>4 Weeks</option>
                        <option value="6 Weeks">6 Weeks</option>
                        <option value="8 Weeks">8 Weeks</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="neobrutal-input-group">
                    <label class="neobrutal-label" for="proposal-format">Format</label>
                    <div class="neobrutal-select-wrapper">
                      <select class="neobrutal-select" id="proposal-format">
                        <option value="1x / Week">1x / Week</option>
                        <option value="2x / Week" selected>2x / Week</option>
                        <option value="3x / Week">3x / Week</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" class="neobrutal-btn red" style="margin-top: 1.5rem;">Send Request</button>
                </form>
              </div>
            </section>
            
            <!-- ================= SCREEN 8: STATUS ================= -->
            <section class="skillverse-screen" id="screen-status">
              <div class="status-screen">
                <button type="button" onclick="navigate('home')" class="status-close-btn">×</button>
                
                <div class="status-icon-circle">
                  <span class="status-icon-check">✓</span>
                </div>
                
                <h2 class="status-title">Request<br>Sent!</h2>
                <p class="status-subtitle">Your skill exchange proposal has been successfully sent to Alex Chen.</p>
                
                <div class="status-actions">
                  <button type="button" onclick="state.activeChatKey='alex'; navigate('chat');" class="neobrutal-btn black">Go to Chat</button>
                  <button type="button" onclick="navigate('home')" class="neobrutal-btn white">Back to Home</button>
                </div>
              </div>
            </section>
            
            <!-- ================= SCREEN 9: MESSAGES ================= -->
            <section class="skillverse-screen" id="screen-messages">
              <header class="app-header">
                <div class="app-logo">
                  <div class="app-logo-shapes">
                    <div class="app-logo-circle"></div>
                    <div class="app-logo-square"></div>
                  </div>
                  <span>Messages</span>
                </div>
                <div style="width: 16px; height: 16px; background-color: var(--primary-blue); border: 1.5px solid #000;"></div>
              </header>
              
              <div class="messages-screen">
                <div class="chat-search-bar">
                  <input type="text" class="neobrutal-input" id="chat-search-input" placeholder="SEARCH CHATS...">
                </div>
                
                <!-- Chat list dynamically rendered by app.js -->
                <div class="chat-list" id="chats-list-container">
                  <!-- Injected dynamic chat list items -->
                </div>
              </div>
              
              <nav class="app-nav-bar">
                <div onclick="navigate('home')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </div>
                <div onclick="navigate('matches')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Match</span>
                </div>
                <div onclick="navigate('messages')" class="app-nav-item active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Chat</span>
                </div>
                <div onclick="navigate('profile')" class="app-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Me</span>
                </div>
              </nav>
            </section>
            
            <!-- ================= SCREEN 10: CHAT ROOM ================= -->
            <section class="skillverse-screen chat-room-screen" id="screen-chat">
              <header class="app-header">
                <button type="button" onclick="navigate('messages')" class="neobrutal-btn" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-shadow: none;">
                  ← BACK
                </button>
                <div class="app-logo" style="font-size: 0.9rem; align-items: center; gap:0.35rem;">
                  <span id="chat-header-title">Alex Chen</span>
                  <div class="pulse-dot" style="width: 8px; height: 8px; background-color: var(--primary-green); margin-left: 2px;"></div>
                </div>
                <div style="width: 16px; height: 16px; background-color: var(--primary-yellow); border: 1.5px solid #000;"></div>
              </header>
              
              <div class="exchange-started-banner">Exchange Started</div>
              
              <!-- Messages logs view -->
              <div class="chat-messages-container" id="chat-messages-log">
                <!-- Message bubbles are injected by app.js -->
              </div>
              
              <!-- Typing footer bar -->
              <div class="chat-input-bar">
                <input type="text" class="chat-text-input" id="chat-message-input" placeholder="TYPE MESSAGE...">
                <button type="button" id="chat-send-btn" class="chat-send-btn"></button>
              </div>
            </section>
            
          </div>
          
          <!-- Bottom iOS indicator -->
          <div class="iphone-home-indicator"></div>
        </div>
      </main>

      <!-- Right Panel: State Log & Debugger -->
      <section class="db-panel">
        <h2 class="panel-title">
          Live Database State
          <span class="panel-title-badge">REACTIVE JSON</span>
        </h2>
        
        <pre class="state-viewer" id="stateViewer">
Loading state data...
        </pre>

        <h2 class="panel-title">
          Theme Customizer
          <span class="panel-title-badge">SANDBOX</span>
        </h2>
        <div class="sandbox-group">
          <label>Brutalist Color Tokens</label>
          <div class="color-pickers">
            <div class="color-picker-item">
              <input type="color" data-var="--primary-yellow" value="#FFD028">
              <span>Yellow</span>
            </div>
            <div class="color-picker-item">
              <input type="color" data-var="--primary-red" value="#FF4A4A">
              <span>Red</span>
            </div>
            <div class="color-picker-item">
              <input type="color" data-var="--primary-blue" value="#2E62F6">
              <span>Blue</span>
            </div>
            <div class="color-picker-item">
              <input type="color" data-var="--primary-green" value="#00AD6F">
              <span>Green</span>
            </div>
          </div>
        </div>
        
        <h2 class="panel-title" style="margin-top: 1rem;">
          Activity Log Stream
          <span class="panel-title-badge">CONSOLE</span>
        </h2>
        <div class="log-console" id="logConsole"></div>
      </section>
      
    </div>
  </div>

</body>
</html>
```

### 2. CSS Source Code (`pages/skillverse-style.css`)
Save the code below as [skillverse-style.css](file:///d:/SKILLSYNC/SkillSync/pages/skillverse-style.css):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap');

/* --- Neobrutalism Design System --- */
:root {
  /* Dynamic custom colors (editable via sandbox dashboard) */
  --primary-yellow: #FFD028;
  --primary-red: #FF4A4A;
  --primary-blue: #2E62F6;
  --primary-green: #00AD6F;
  --black: #000000;
  --white: #FFFFFF;
  
  --bg-gray: #F3F4F6;
  --dark-bg: #1C212E;
  --light-bg: #FFFFFF;
  
  /* Fonts */
  --font-header: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Borders & Shadows */
  --border-thick: 3px solid #000000;
  --border-thin: 2px solid #000000;
  --shadow-sm: 2px 2px 0px #000000;
  --shadow-md: 4px 4px 0px #000000;
  --shadow-lg: 8px 8px 0px #000000;
  
  /* Outer Dashboard Themes */
  --db-bg: #F9FAFB;
  --db-panel-bg: #FFFFFF;
  --db-text: #111827;
  --db-border: 3px solid #000000;
  --db-shadow: 6px 6px 0px #000000;
}

/* Outer Dashboard Dark Mode */
.db-dark-mode {
  --db-bg: #0F172A;
  --db-panel-bg: #1E293B;
  --db-text: #F8FAFC;
  --db-border: 3px solid #FFFFFF;
  --db-shadow: 6px 6px 0px #FFFFFF;
}

/* Base resets inside the dashboard wrapper */
.prototyper-wrapper {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-body);
  background-color: var(--db-bg);
  color: var(--db-text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.prototyper-wrapper *,
.prototyper-wrapper *::before,
.prototyper-wrapper *::after {
  box-sizing: border-box;
}

/* Header Styles */
.db-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background-color: var(--db-panel-bg);
  border-bottom: var(--db-border);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, border-bottom 0.3s ease;
}

.db-title-zone {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.db-title-zone .logo-shapes {
  display: flex;
  gap: 0.25rem;
}

.db-title-zone .logo-circle {
  width: 16px;
  height: 16px;
  background-color: var(--primary-red);
  border-radius: 50%;
  border: 1.5px solid var(--black);
}

.db-title-zone .logo-square {
  width: 16px;
  height: 16px;
  background-color: var(--primary-blue);
  border: 1.5px solid var(--black);
}

.db-title {
  font-family: var(--font-header);
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.db-controls {
  display: flex;
  gap: 1rem;
}

/* Dashboard Layout Grid */
.db-layout {
  display: grid;
  grid-template-columns: 300px 1fr 340px;
  gap: 2rem;
  padding: 2rem;
  flex: 1;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* Panel Styles */
.db-panel {
  background-color: var(--db-panel-bg);
  border: var(--db-border);
  box-shadow: var(--db-shadow);
  border-radius: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background-color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
}

.panel-title {
  font-family: var(--font-header);
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--black);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title-badge {
  font-size: 0.75rem;
  background-color: var(--primary-yellow);
  color: var(--black);
  padding: 0.2rem 0.5rem;
  border: 1.5px solid var(--black);
  font-family: var(--font-body);
}

/* Left Panel: Screen List */
.screen-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
}

.screen-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: var(--border-thin);
  background-color: var(--white);
  color: var(--black);
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: var(--shadow-sm);
}

.screen-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.screen-item.active {
  background-color: var(--primary-yellow);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.screen-item-id {
  font-size: 0.7rem;
  opacity: 0.6;
  font-family: monospace;
}

/* Right Panel: Sandbox Controls */
.sandbox-group {
  margin-bottom: 1.25rem;
}

.sandbox-group label {
  display: block;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.color-pickers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.color-picker-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border: var(--border-thin);
  background: var(--white);
  color: var(--black);
}

.color-picker-item input[type="color"] {
  border: 1px solid #000;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  background: none;
}

.color-picker-item span {
  font-size: 0.75rem;
  font-weight: 600;
}

/* Log Stream Console */
.log-console {
  background-color: var(--black);
  color: #00FF66;
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.75rem;
  border: var(--border-thin);
  height: 140px;
  overflow-y: auto;
  margin-top: auto;
}

.log-entry {
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.log-time {
  color: #888;
}

/* Live State Viewer */
.state-viewer {
  background-color: #1E293B;
  color: #38BDF8;
  padding: 0.75rem;
  border: var(--border-thin);
  height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.75rem;
  white-space: pre-wrap;
  margin-bottom: 1rem;
}

/* --- Virtual Smartphone Mockup --- */
.phone-mockup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.iphone-frame {
  width: 375px;
  height: 812px;
  border: 8px solid var(--black);
  border-radius: 40px;
  box-shadow: 12px 12px 0px var(--black);
  background-color: var(--black);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Phone Bezel Hardware Details */
.iphone-notch {
  width: 150px;
  height: 26px;
  background-color: var(--black);
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.iphone-speaker {
  width: 45px;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  margin-bottom: 4px;
}

.iphone-camera {
  width: 8px;
  height: 8px;
  background-color: #111;
  border-radius: 50%;
  margin-left: 10px;
  box-shadow: inset 0 0 2px #0f2c59;
}

.iphone-screen {
  flex: 1;
  background-color: var(--white);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 24px; /* Clearance for notch */
}

/* Phone Navigation Drawer bar & status indicator simulations */
.iphone-status-bar {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--black);
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  z-index: 999;
}

.iphone-status-icons {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.iphone-home-indicator {
  width: 120px;
  height: 5px;
  background-color: var(--black);
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

/* --- Mobile Application Screens Styles --- */
.skillverse-screen {
  display: none;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  position: relative;
  background-color: var(--white);
  color: var(--black);
  padding-bottom: 24px; /* Clearance for home bar */
}

.skillverse-screen.active {
  display: flex;
}

/* Standard Header inside Mobile App */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: var(--border-thick);
  background-color: var(--white);
  position: sticky;
  top: 0;
  z-index: 90;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-header);
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.app-logo-shapes {
  display: flex;
  gap: 0.2/rem;
}

.app-logo-circle {
  width: 12px;
  height: 12px;
  background-color: var(--primary-red);
  border-radius: 50%;
  border: 1.5px solid var(--black);
}

.app-logo-square {
  width: 12px;
  height: 12px;
  background-color: var(--primary-blue);
  border: 1.5px solid var(--black);
}

/* Bottom App Navigation Bar */
.app-nav-bar {
  display: flex;
  border-top: var(--border-thick);
  background-color: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 95;
  height: 60px;
  padding-bottom: 8px; /* Clearance for home bar */
}

.app-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  border-right: var(--border-thin);
  background-color: var(--white);
  color: var(--black);
  height: 100%;
}

.app-nav-item:last-child {
  border-right: none;
}

.app-nav-item.active {
  background-color: var(--primary-blue);
  color: var(--white);
}

.app-nav-item svg {
  margin-bottom: 2px;
}

/* Generic Neobrutalist Mobile Components */
.neobrutal-btn {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.75rem 1rem;
  border: var(--border-thick);
  background-color: var(--white);
  color: var(--black);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  width: 100%;
}

.neobrutal-btn:hover,
.neobrutal-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.neobrutal-btn.yellow {
  background-color: var(--primary-yellow);
}

.neobrutal-btn.red {
  background-color: var(--primary-red);
  color: var(--white);
}

.neobrutal-btn.blue {
  background-color: var(--primary-blue);
  color: var(--white);
}

.neobrutal-btn.black {
  background-color: var(--black);
  color: var(--white);
}

/* Neobrutalist Text Inputs & Textareas */
.neobrutal-input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.neobrutal-label {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.neobrutal-input {
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.75rem;
  border: var(--border-thick);
  background-color: var(--white);
  color: var(--black);
  width: 100%;
  outline: none;
  border-radius: 0;
  box-shadow: var(--shadow-sm);
}

.neobrutal-input:focus {
  background-color: #FAFAFA;
  box-shadow: var(--shadow-md);
}

/* Neobrutalist Badges & Tags */
.neobrutal-badge {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border: var(--border-thin);
  background-color: var(--white);
  display: inline-block;
  box-shadow: 1px 1px 0px #000;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
}

.neobrutal-badge.yellow {
  background-color: var(--primary-yellow);
}

/* --- Screen 1: Login Screen --- */
.login-screen {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-logo-zone {
  text-align: center;
  margin-bottom: 2rem;
}

.login-shapes {
  display: inline-flex;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.login-circle {
  width: 28px;
  height: 28px;
  background-color: var(--primary-red);
  border-radius: 50%;
  border: 3px solid var(--black);
}

.login-square {
  width: 28px;
  height: 28px;
  background-color: var(--primary-blue);
  border: 3px solid var(--black);
}

.login-title {
  font-family: var(--font-header);
  font-size: 2.25rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -1px;
  margin: 0;
}

.login-subtitle {
  font-family: var(--font-header);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #777;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

/* --- Screen 2: Home Screen --- */
.home-screen {
  padding: 1rem;
}

.welcome-banner {
  background-color: var(--primary-yellow);
  border: var(--border-thick);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1rem;
}

.welcome-sub {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.8;
  margin: 0;
}

.welcome-name {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 1.75rem;
  text-transform: uppercase;
  line-height: 1;
  margin: 0.25rem 0 0 0;
  letter-spacing: -0.5px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  border: var(--border-thick);
  padding: 0.75rem;
  box-shadow: var(--shadow-sm);
  color: var(--white);
}

.stat-box.blue {
  background-color: var(--primary-blue);
}

.stat-box.red {
  background-color: var(--primary-red);
}

.stat-value {
  font-family: var(--font-header);
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
}

.stat-label {
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.section-label {
  font-family: var(--font-header);
  font-size: 0.95rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upcoming-card {
  border: var(--border-thick);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--white);
  margin-bottom: 1.5rem;
}

.upcoming-time {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: var(--primary-red);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

.upcoming-title {
  font-family: var(--font-header);
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0.25rem 0;
  letter-spacing: -0.5px;
}

.upcoming-instructor {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

/* --- Screen 3: Waiting Room Screen --- */
.waiting-room-screen {
  padding: 1rem;
}

.waiting-countdown-badge {
  background-color: var(--primary-yellow);
  border: var(--border-thick);
  padding: 0.4rem 0.75rem;
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  display: inline-block;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1rem;
  align-self: flex-start;
}

.waiting-title {
  font-family: var(--font-header);
  font-size: 2.25rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0 0 0.25rem 0;
}

.waiting-subtitle {
  font-size: 0.8rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 1.5rem;
}

.video-container {
  aspect-ratio: 4/3;
  background-color: var(--dark-bg);
  border: var(--border-thick);
  box-shadow: var(--shadow-sm);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.camera-off-indicator {
  text-align: center;
}

.camera-off-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: var(--primary-yellow);
  border: var(--border-thin);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.camera-off-icon::after {
  content: '';
  width: 18px;
  height: 18px;
  background-color: var(--white);
  border: 2px solid var(--black);
}

.camera-off-text {
  color: var(--white);
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.simulated-webcam {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}

.video-status-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0,0,0,0.6);
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 700;
  border: 1px solid white;
}

.video-controls-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

/* --- Screen 4: Profile Screen --- */
.profile-screen {
  padding: 1rem;
}

.profile-card {
  border: var(--border-thick);
  background-color: var(--dark-bg);
  color: var(--white);
  padding: 1.5rem 1rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.25rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--white);
  border: 3px solid var(--black);
  margin-bottom: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-name {
  font-family: var(--font-header);
  font-size: 1.75rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.1;
  text-align: center;
}

.profile-dept {
  font-family: var(--font-header);
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--primary-yellow);
  margin-top: 0.25rem;
  letter-spacing: 0.5px;
}

.streak-rating-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.profile-metric-box {
  border: var(--border-thick);
  padding: 0.5rem;
  text-align: center;
  background-color: var(--white);
  color: var(--black);
  box-shadow: var(--shadow-sm);
}

.metric-value {
  font-family: var(--font-header);
  font-size: 1.25rem;
  font-weight: 900;
}

.metric-label {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #666;
}

.badge-container {
  border: var(--border-thick);
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--white);
}

.badge-container-title {
  font-family: var(--font-header);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--black);
  padding-bottom: 0.25rem;
}

/* --- Screen 5: Edit Profile Screen --- */
.edit-profile-screen {
  padding: 1rem;
}

.neobrutal-toggle-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: var(--border-thick);
  margin-bottom: 1rem;
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
}

.toggle-label {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.neobrutal-switch {
  width: 50px;
  height: 26px;
  border: var(--border-thin);
  background-color: var(--white);
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.neobrutal-switch::after {
  content: '';
  width: 20px;
  height: 20px;
  background-color: var(--primary-blue);
  border: 1.5px solid var(--black);
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.neobrutal-switch.checked {
  background-color: var(--primary-yellow);
}

.neobrutal-switch.checked::after {
  transform: translateX(24px);
  background-color: var(--primary-blue);
}

/* --- Screen 6: Matches Screen --- */
.matches-screen {
  padding: 1rem;
}

.match-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.match-card {
  border: var(--border-thick);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--white);
  position: relative;
}

.match-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.match-name {
  font-family: var(--font-header);
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

.match-dept {
  font-size: 0.65rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.match-percentage-badge {
  background-color: var(--primary-blue);
  color: var(--white);
  border: var(--border-thin);
  padding: 0.25rem 0.5rem;
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.85rem;
  box-shadow: 2px 2px 0px #000;
}

.offers-wants-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--bg-gray);
  padding: 0.5rem;
  border: var(--border-thin);
}

.offers-wants-title {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 0.25rem;
}

/* --- Screen 7: Exchange Proposal Screen --- */
.proposal-screen {
  padding: 1rem;
}

.proposal-summary-card {
  border: 3px dashed var(--black);
  padding: 1rem;
  background-color: var(--white);
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.proposal-summary-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.proposal-indicator-circle {
  width: 14px;
  height: 14px;
  background-color: var(--primary-red);
  border-radius: 50%;
  border: 2px solid var(--black);
  flex-shrink: 0;
}

.proposal-indicator-square {
  width: 14px;
  height: 14px;
  background-color: var(--primary-blue);
  border: 2px solid var(--black);
  flex-shrink: 0;
}

.proposal-connector-line {
  width: 2px;
  height: 16px;
  background-color: var(--black);
  margin-left: 6px;
}

.proposal-item-label {
  font-size: 0.6rem;
  font-weight: 800;
  color: #666;
  text-transform: uppercase;
}

.proposal-item-val {
  font-family: var(--font-header);
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-top: 0.1rem;
}

/* Custom Neobrutalist Dropdown Select */
.neobrutal-select-wrapper {
  position: relative;
  width: 100%;
}

.neobrutal-select {
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.75rem;
  border: var(--border-thick);
  background-color: var(--white);
  color: var(--black);
  width: 100%;
  outline: none;
  border-radius: 0;
  box-shadow: var(--shadow-sm);
  appearance: none;
  cursor: pointer;
}

.neobrutal-select-wrapper::after {
  content: '▼';
  font-size: 0.6rem;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* --- Screen 8: Status Success Screen --- */
.status-screen {
  background-color: var(--primary-yellow);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  inset: 0;
  z-index: 150;
}

.status-close-btn {
  position: absolute;
  top: 30px;
  right: 20px;
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
  background: none;
  border: none;
}

.status-icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: var(--white);
  border: 4px solid var(--black);
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.status-icon-check {
  font-size: 2.5rem;
  color: var(--primary-blue);
  font-weight: 900;
}

.status-title {
  font-family: var(--font-header);
  font-size: 2.25rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.5px;
}

.status-subtitle {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  color: #222;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.status-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

/* --- Screen 9: Messages Screen --- */
.messages-screen {
  padding: 1rem;
}

.chat-search-bar {
  margin-bottom: 1.25rem;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: var(--border-thick);
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  position: relative;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.chat-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.chat-avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--primary-yellow);
  border: 2px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.chat-avatar-circle.blue {
  background-color: var(--primary-blue);
  color: var(--white);
}

.chat-avatar-circle.red {
  background-color: var(--primary-red);
  color: var(--white);
}

.chat-avatar-circle.green {
  background-color: var(--primary-green);
  color: var(--white);
}

.chat-info {
  flex: 1;
  min-width: 0; /* for text truncation */
}

.chat-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.15rem;
}

.chat-item-name {
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin: 0;
}

.chat-item-time {
  font-size: 0.6rem;
  font-weight: 700;
  color: #777;
}

.chat-item-preview {
  font-size: 0.75rem;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.chat-online-dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary-green);
  border-radius: 50%;
  border: 1px solid var(--black);
  position: absolute;
  bottom: 8px;
  left: 40px;
  z-index: 10;
}

/* --- Screen 10: Chat Room Screen --- */
.chat-room-screen {
  padding-bottom: 60px; /* Space for message input bar */
}

.exchange-started-banner {
  background-color: var(--primary-yellow);
  border-bottom: var(--border-thick);
  padding: 0.5rem;
  text-align: center;
  font-family: var(--font-header);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chat-messages-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
}

.chat-message-bubble {
  max-width: 85%;
  padding: 0.75rem;
  border: var(--border-thick);
  font-size: 0.8rem;
  line-height: 1.35;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.chat-message-bubble.incoming {
  background-color: var(--white);
  align-self: flex-start;
}

.chat-message-bubble.outgoing {
  background-color: var(--primary-blue);
  color: var(--white);
  align-self: flex-end;
  box-shadow: 2px 2px 0px #000;
}

.chat-input-bar {
  display: flex;
  border-top: var(--border-thick);
  background-color: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  height: 54px;
}

.chat-text-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
}

.chat-send-btn {
  width: 54px;
  height: 100%;
  border-left: var(--border-thick);
  background-color: var(--primary-red);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease;
}

.chat-send-btn::after {
  content: '▶';
  color: var(--white);
  font-size: 0.8rem;
}

.chat-send-btn:active {
  background-color: #D32F2F;
}

/* Typing Indicator Animation */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 0.35rem 0.5rem;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background-color: var(--black);
  border-radius: 50%;
  animation: typing-bounce 1s infinite ease-in-out;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

/* CSS Animations */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes typing-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* --- Responsive Adaptations (Mobile Auto-Scale) --- */
@media screen and (max-width: 1024px) {
  .db-layout {
    grid-template-columns: 240px 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
  .db-right-panel {
    display: none; /* Hide Right panel on tablets */
  }
}

@media screen and (max-width: 768px) {
  /* On mobile screens, hide the dashboard panels entirely and make the app fullscreen */
  .db-header {
    display: none;
  }
  .db-layout {
    padding: 0;
    display: block;
    height: 100vh;
  }
  .db-left-panel {
    display: none;
  }
  .phone-mockup-wrapper {
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
  .iphone-frame {
    width: 100vw;
    height: 100vh;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
  .iphone-notch {
    display: none;
  }
  .iphone-screen {
    padding-top: 0;
  }
  .iphone-home-indicator {
    display: none;
  }
}
```

### 3. JavaScript Source Code (`pages/skillverse-app.js`)
Save the code below as [skillverse-app.js](file:///d:/SKILLSYNC/SkillSync/pages/skillverse-app.js):

```javascript
// --- SKILLVERSE APP CONTROLLER ---

// 1. Reactive State Object
const state = {
  // Screen routing
  activeScreen: 'login',
  history: [], // Stack for back button navigation
  
  // User Authentication & Profile
  isAuthenticated: false,
  user: {
    name: 'Abhinav Atul',
    dept: 'Design Dept',
    year: 'Year 2',
    email: 'example@gmail.com',
    bio: 'Design student passionate about UI/UX. Looking to learn frontend dev.',
    preferences: {
      emailNotifications: true,
      availableForMatches: true
    },
    rating: '4.9',
    streak: '14'
  },
  
  // Waiting Room State
  waitingRoom: {
    timerSeconds: 120, // 2:00
    cameraOn: false,
    muted: true
  },
  
  // Exchange Proposal State
  proposal: {
    teacher: 'You',
    teaches: 'UI/UX Design',
    learner: 'Alex Chen',
    learns: 'React.js',
    duration: '4 Weeks',
    format: '2x / Week'
  },
  
  // Messaging Repository
  chats: {
    alex: {
      name: 'Alex Chen',
      avatar: 'A',
      avatarClass: 'red',
      online: true,
      preview: 'Great. Should we jump on a call...',
      time: '4:15 PM',
      messages: [
        { sender: 'them', text: 'Hey Priya! I saw your request for React.js. I\'d love to help you out if you can teach me some UI/UX basics.' },
        { sender: 'me', text: 'That sounds perfect! I have my Figma files ready whenever you want to start.' },
        { sender: 'them', text: 'Great. Should we jump on a call this Thursday at 4 PM to set our syllabus?' }
      ],
      started: true
    },
    david: {
      name: 'David Kim',
      avatar: 'D',
      avatarClass: 'blue',
      online: false,
      preview: 'Thanks for the help with CSS Grid! I finally...',
      time: 'YESTERDAY',
      messages: [
        { sender: 'them', text: 'Hey, are you free to chat about CSS grid?' },
        { sender: 'me', text: 'Sure! I can explain grid-template-columns and autofit.' },
        { sender: 'them', text: 'Thanks for the help with CSS Grid! I finally understand auto-fit.' }
      ],
      started: true
    },
    group: {
      name: 'UI/UX Study Group',
      avatar: 'UI',
      avatarClass: 'yellow',
      online: false,
      preview: 'Sarah: Are we meeting at the library or online?',
      time: 'TUESDAY',
      messages: [
        { sender: 'them', text: 'Hey everyone, final exam study time?' },
        { sender: 'them', text: 'Sarah: Are we meeting at the library or online?' }
      ],
      started: false
    },
    marcus: {
      name: 'Marcus Johnson',
      avatar: 'M',
      avatarClass: 'green',
      online: false,
      preview: 'Exchange completed. Left you a 5-star review!',
      time: 'OCT 12',
      messages: [
        { sender: 'me', text: 'How was the portfolio review?' },
        { sender: 'them', text: 'Exchange completed. Left you a 5-star review!' }
      ],
      started: false
    }
  },
  
  // Current active chat thread
  activeChatKey: 'alex'
};

// 2. Helper Functions
function addLog(message) {
  const consoleEl = document.getElementById('logConsole');
  if (!consoleEl) return;
  
  const timeStr = new Date().toLocaleTimeString();
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `<span class="log-time">[${timeStr}]</span> ${message}`;
  
  consoleEl.appendChild(entry);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function updateStateViewer() {
  const viewerEl = document.getElementById('stateViewer');
  if (!viewerEl) return;
  
  // Render subset of state for clean inspection
  const printableState = {
    activeScreen: state.activeScreen,
    historyDepth: state.history.length,
    userProfile: {
      name: state.user.name,
      dept: state.user.dept,
      preferences: state.user.preferences
    },
    waitingRoom: {
      timer: formatTime(state.waitingRoom.timerSeconds),
      camera: state.waitingRoom.cameraOn ? 'ON' : 'OFF',
      mic: state.waitingRoom.muted ? 'MUTED' : 'ACTIVE'
    },
    proposal: state.proposal,
    chats: Object.keys(state.chats).map(key => ({
      key: key,
      name: state.chats[key].name,
      messagesCount: state.chats[key].messages.length
    }))
  };
  
  viewerEl.textContent = JSON.stringify(printableState, null, 2);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// 3. Navigation / Router Engine
function navigate(screenId, saveToHistory = true) {
  // Hide all screens
  const screens = document.querySelectorAll('.skillverse-screen');
  screens.forEach(s => s.classList.remove('active'));
  
  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
    
    // Manage history stack
    if (saveToHistory && state.activeScreen !== screenId) {
      state.history.push(state.activeScreen);
    }
    
    state.activeScreen = screenId;
    addLog(`Navigated to: <strong>${screenId.toUpperCase()}</strong>`);
    updateStateViewer();
    
    // Handle manual sidebar navigation active state
    const sidebarItems = document.querySelectorAll('.screen-item');
    sidebarItems.forEach(item => {
      if (item.getAttribute('data-screen') === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Special Screen Setup Operations
    onScreenLoad(screenId);
  } else {
    console.error(`Screen template "screen-${screenId}" not found.`);
  }
}

function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    navigate(prev, false);
  } else {
    // If no history, default back to home if authenticated, else login
    navigate(state.isAuthenticated ? 'home' : 'login', false);
  }
}

// Executed when a screen mounts
function onScreenLoad(screenId) {
  // Render user data
  if (screenId === 'home') {
    document.getElementById('home-welcome-name').textContent = state.user.name;
  }
  
  if (screenId === 'profile') {
    document.getElementById('profile-name').textContent = state.user.name;
    document.getElementById('profile-dept').textContent = `${state.user.dept.toUpperCase()} • ${state.user.year.toUpperCase()}`;
    document.getElementById('profile-bio').textContent = state.user.bio;
  }
  
  if (screenId === 'edit-profile') {
    document.getElementById('edit-display-name').value = state.user.name;
    document.getElementById('edit-bio').value = state.user.bio;
    document.getElementById('edit-dept').value = state.user.dept;
    
    // Set switches
    setSwitchState('switch-email', state.user.preferences.emailNotifications);
    setSwitchState('switch-matches', state.user.preferences.availableForMatches);
  }
  
  if (screenId === 'messages') {
    renderChatsList();
  }
  
  if (screenId === 'chat') {
    renderChatRoom();
  }
}

// 4. Custom Switch Helper
function setSwitchState(id, checked) {
  const sw = document.getElementById(id);
  if (!sw) return;
  if (checked) {
    sw.classList.add('checked');
  } else {
    sw.classList.remove('checked');
  }
}

// 5. Chat Rendering and Chatbot Simulation
function renderChatsList() {
  const container = document.getElementById('chats-list-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const searchVal = document.getElementById('chat-search-input').value.toLowerCase();
  
  Object.keys(state.chats).forEach(key => {
    const chat = state.chats[key];
    if (searchVal && !chat.name.toLowerCase().includes(searchVal)) {
      return; // Filter out
    }
    
    const lastMsg = chat.messages[chat.messages.length - 1];
    const previewText = lastMsg ? lastMsg.text : chat.preview;
    
    const item = document.createElement('div');
    item.className = 'chat-item';
    item.onclick = () => {
      state.activeChatKey = key;
      navigate('chat');
    };
    
    item.innerHTML = `
      <div class="chat-avatar-circle ${chat.avatarClass}">${chat.avatar}</div>
      ${chat.online ? '<div class="chat-online-dot"></div>' : ''}
      <div class="chat-info">
        <div class="chat-meta">
          <h4 class="chat-item-name">${chat.name}</h4>
          <span class="chat-item-time">${chat.time}</span>
        </div>
        <p class="chat-item-preview">${previewText}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderChatRoom() {
  const chat = state.chats[state.activeChatKey];
  if (!chat) return;
  
  // Update header title
  document.getElementById('chat-header-title').textContent = chat.name;
  
  // Render messages
  const container = document.getElementById('chat-messages-log');
  if (!container) return;
  
  container.innerHTML = '';
  
  chat.messages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `chat-message-bubble ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`;
    bubble.textContent = msg.text;
    container.appendChild(bubble);
  });
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-message-input');
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const chat = state.chats[state.activeChatKey];
  if (!chat) return;
  
  // 1. Add user message
  chat.messages.push({ sender: 'me', text: text });
  chat.preview = text;
  chat.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  input.value = '';
  
  addLog(`Sent chat message to ${chat.name}: "${text}"`);
  renderChatRoom();
  updateStateViewer();
  
  // 2. Trigger automated reply after delay
  triggerChatbotReply(state.activeChatKey, text);
}

const chatbotResponses = {
  alex: [
    { trigger: 'syllabus', reply: 'Awesome! I can write down a quick Markdown document with our 4-week milestones for CSS and React hooks.' },
    { trigger: 'figma', reply: 'Figma files look great! Let\'s go over the components and wireframes together during our first session.' },
    { trigger: 'hi', reply: 'Hey! Ready to swap some skills? Let me know when you want to schedule our call.' },
    { trigger: 'hello', reply: 'Hey! Ready to swap some skills? Let me know when you want to schedule our call.' },
    { default: 'Sounds good! I am looking forward to our session this week. Let\'s make sure we have a Zoom or Google Meet link set up.' }
  ],
  david: [
    { default: 'Yeah, let me know if you need help setting up flexbox grids as well!' }
  ],
  group: [
    { default: 'Let\'s meet online on Discord this Tuesday at 6 PM. I\'ll host the room.' }
  ],
  marcus: [
    { default: 'Thanks again for the excellent Figma advice! Let me know if you want to swap more React lessons in the future.' }
  ]
};

function triggerChatbotReply(chatKey, userText) {
  const container = document.getElementById('chat-messages-log');
  if (!container) return;
  
  // Append temporary typing indicator
  const indicator = document.createElement('div');
  indicator.className = 'chat-message-bubble incoming typing-indicator-wrapper';
  indicator.style.border = 'none';
  indicator.style.boxShadow = 'none';
  indicator.style.backgroundColor = 'transparent';
  indicator.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  
  setTimeout(() => {
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
  }, 500);
  
  setTimeout(() => {
    // Remove indicator
    const matches = container.querySelectorAll('.typing-indicator-wrapper');
    matches.forEach(m => m.remove());
    
    // Choose reply
    const rules = chatbotResponses[chatKey] || [{ default: 'Got it!' }];
    let replyText = '';
    
    const matchedRule = rules.find(r => r.trigger && userText.toLowerCase().includes(r.trigger));
    if (matchedRule) {
      replyText = matchedRule.reply;
    } else {
      const defaultRule = rules.find(r => r.default);
      replyText = defaultRule ? defaultRule.default : 'Okay!';
    }
    
    const chat = state.chats[chatKey];
    chat.messages.push({ sender: 'them', text: replyText });
    chat.preview = replyText;
    chat.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    addLog(`Received auto-reply from ${chat.name}: "${replyText}"`);
    renderChatRoom();
    updateStateViewer();
  }, 1800);
}

// 6. Waiting Room Countdown Timer Controller
let timerInterval = null;
function startTimer() {
  if (timerInterval) return;
  
  timerInterval = setInterval(() => {
    if (state.activeScreen === 'waiting-room' && state.waitingRoom.timerSeconds > 0) {
      state.waitingRoom.timerSeconds--;
      
      const timerBadge = document.getElementById('waiting-timer-badge');
      if (timerBadge) {
        timerBadge.textContent = `STARTS IN ${formatTime(state.waitingRoom.timerSeconds)}`;
      }
      
      if (state.waitingRoom.timerSeconds === 0) {
        addLog('Countdown complete! Session is ready to begin.');
        const btn = document.getElementById('join-session-btn');
        if (btn) btn.textContent = 'SESSION ACTIVE - JOIN NOW';
      }
      
      // Update state viewer periodically
      if (state.waitingRoom.timerSeconds % 10 === 0) {
        updateStateViewer();
      }
    }
  }, 1000);
}

// 7. Initialize Application Event Listeners & Sandbox Actions
document.addEventListener('DOMContentLoaded', () => {
  addLog('Skillverse Reactive Controller initialised.');
  
  // Auto start background timer
  startTimer();
  
  // Set up Screen manual list listeners
  const screenItems = document.querySelectorAll('.screen-item');
  screenItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetScreen = item.getAttribute('data-screen');
      navigate(targetScreen);
    });
  });
  
  // Custom Color Customization Hook
  const pickers = document.querySelectorAll('.sandbox-group input[type="color"]');
  pickers.forEach(picker => {
    picker.addEventListener('input', (e) => {
      const variable = e.target.getAttribute('data-var');
      const val = e.target.value;
      document.documentElement.style.setProperty(variable, val);
      addLog(`Updated CSS variable: <code>${variable}</code> to <strong>${val}</strong>`);
    });
  });
  
  // Outer dashboard theme toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const wrapper = document.querySelector('.prototyper-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('db-dark-mode');
        const isDark = wrapper.classList.contains('db-dark-mode');
        themeToggleBtn.textContent = isDark ? '☀ LIGHT MODE' : '☾ DARK MODE';
        addLog(`Dashboard wrapper switched to <strong>${isDark ? 'DARK' : 'LIGHT'}</strong> theme`);
      }
    });
  }
  
  // Reset Prototyper state
  const resetStateBtn = document.getElementById('resetStateBtn');
  if (resetStateBtn) {
    resetStateBtn.addEventListener('click', () => {
      // Revert dynamic edits
      state.user.name = 'Abhinav Atul';
      state.user.bio = 'Design student passionate about UI/UX. Looking to learn frontend dev.';
      state.user.dept = 'Design Dept';
      state.user.preferences.emailNotifications = true;
      state.user.preferences.availableForMatches = true;
      state.waitingRoom.timerSeconds = 120;
      
      // Reset Chat Alex
      state.chats.alex.messages = [
        { sender: 'them', text: 'Hey Priya! I saw your request for React.js. I\'d love to help you out if you can teach me some UI/UX basics.' },
        { sender: 'me', text: 'That sounds perfect! I have my Figma files ready whenever you want to start.' },
        { sender: 'them', text: 'Great. Should we jump on a call this Thursday at 4 PM to set our syllabus?' }
      ];
      
      addLog('Application state variables successfully <strong>RESET</strong>.');
      navigate(state.activeScreen, false);
    });
  }
  
  // Binding Event Handlers for Mobile Screens
  
  // LOGIN FORM
  const loginForm = document.getElementById('mobileLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      addLog(`Authenticated user: <strong>${email}</strong>`);
      state.isAuthenticated = true;
      state.user.email = email;
      navigate('home');
    });
  }
  
  // GOOGLE LOGIN BUTTON
  const googleBtn = document.getElementById('login-google-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      addLog('Signing in with Google Auth simulator...');
      state.isAuthenticated = true;
      navigate('home');
    });
  }
  
  // WAITING ROOM VIDEO CONTROLS
  const videoBtn = document.getElementById('waiting-video-toggle');
  if (videoBtn) {
    videoBtn.addEventListener('click', () => {
      state.waitingRoom.cameraOn = !state.waitingRoom.cameraOn;
      const webcam = document.getElementById('waiting-sim-webcam');
      const offIndicator = document.getElementById('waiting-camera-off');
      
      if (state.waitingRoom.cameraOn) {
        videoBtn.textContent = 'VIDEO ON';
        videoBtn.classList.remove('white');
        videoBtn.classList.add('yellow');
        if (webcam) webcam.style.display = 'block';
        if (offIndicator) offIndicator.style.display = 'none';
        addLog('Webcam hardware access simulated: <strong>CAMERA ON</strong>');
      } else {
        videoBtn.textContent = 'VIDEO OFF';
        videoBtn.classList.remove('yellow');
        videoBtn.classList.add('white');
        if (webcam) webcam.style.display = 'none';
        if (offIndicator) offIndicator.style.display = 'block';
        addLog('Webcam hardware access disconnected: <strong>CAMERA OFF</strong>');
      }
      updateStateViewer();
    });
  }
  
  const unmuteBtn = document.getElementById('waiting-mute-toggle');
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', () => {
      state.waitingRoom.muted = !state.waitingRoom.muted;
      if (state.waitingRoom.muted) {
        unmuteBtn.textContent = 'MUTED';
        unmuteBtn.style.backgroundColor = 'var(--primary-red)';
        unmuteBtn.style.color = '#fff';
        addLog('Microphone input simulated: <strong>MUTED</strong>');
      } else {
        unmuteBtn.textContent = 'UNMUTED';
        unmuteBtn.style.backgroundColor = 'var(--primary-green)';
        unmuteBtn.style.color = '#fff';
        addLog('Microphone input simulated: <strong>ACTIVE</strong>');
      }
      updateStateViewer();
    });
  }
  
  // JOIN SESSION BUTTON
  const joinBtn = document.getElementById('join-session-btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      addLog('Session initiated. Simulating connection to Peer WebRTC channel...');
      alert('Connecting to Alex Chen...\nWebRTC Call simulation running.');
    });
  }
  
  // EDIT PROFILE PREFERENCES
  const switchEmail = document.getElementById('switch-email');
  if (switchEmail) {
    switchEmail.addEventListener('click', () => {
      state.user.preferences.emailNotifications = !state.user.preferences.emailNotifications;
      setSwitchState('switch-email', state.user.preferences.emailNotifications);
      addLog(`Preferences updated: Email Notifications = <strong>${state.user.preferences.emailNotifications}</strong>`);
      updateStateViewer();
    });
  }
  
  const switchMatches = document.getElementById('switch-matches');
  if (switchMatches) {
    switchMatches.addEventListener('click', () => {
      state.user.preferences.availableForMatches = !state.user.preferences.availableForMatches;
      setSwitchState('switch-matches', state.user.preferences.availableForMatches);
      addLog(`Preferences updated: Available for Matches = <strong>${state.user.preferences.availableForMatches}</strong>`);
      updateStateViewer();
    });
  }
  
  // SAVE EDIT PROFILE
  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newName = document.getElementById('edit-display-name').value;
      const newBio = document.getElementById('edit-bio').value;
      const newDept = document.getElementById('edit-dept').value;
      
      state.user.name = newName;
      state.user.bio = newBio;
      state.user.dept = newDept;
      
      addLog(`Saved Profile details for: <strong>${newName}</strong>`);
      navigate('profile');
    });
  }
  
  // SUBMIT EXCHANGE PROPOSAL
  const proposalForm = document.getElementById('exchangeProposalForm');
  if (proposalForm) {
    proposalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const duration = document.getElementById('proposal-duration').value;
      const format = document.getElementById('proposal-format').value;
      
      state.proposal.duration = duration;
      state.proposal.format = format;
      
      addLog(`Created exchange proposal: Teaches: ${state.proposal.teaches}, Learns: ${state.proposal.learns}, Duration: ${duration}, Frequency: ${format}`);
      navigate('status');
    });
  }
  
  // SEND CHAT MESSAGE BUTTON
  const chatSendBtn = document.getElementById('chat-send-btn');
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
  }
  
  const chatInput = document.getElementById('chat-message-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  // CHAT SEARCH BAR FILTER
  const searchInput = document.getElementById('chat-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', renderChatsList);
  }
  
  // Mount initial screen
  navigate('login', false);
});
```
#   S K I L L V E R S E  
 