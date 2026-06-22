// Import Stylesheets
import './styles/variables.css';
import './styles/main.css';
import './styles/header.css';
import './styles/login.css';
import './styles/home.css';
import './styles/waiting-room.css';
import './styles/profile.css';
import './styles/edit-profile.css';
import './styles/matches.css';
import './styles/proposal.css';
import './styles/status.css';
import './styles/chat.css';
import './styles/ai-chatbot.css';

// Import JS Logic Modules
import Lenis from 'lenis';
import { state, addLog } from './state.js';
import { navigate, goBack, renderChatsList, renderChatRoom, setSwitchState } from './router.js';
import { sendChatMessage } from './chatbot.js';
import { startTimer } from './timer.js';
import { initAiAssistant } from './ai-assistant.js';

// Import Component HTML Files as raw strings (Vite feature)
import loginHtml from './components/login.html?raw';
import homeHtml from './components/home.html?raw';
import waitingRoomHtml from './components/waiting-room.html?raw';
import profileHtml from './components/profile.html?raw';
import editProfileHtml from './components/edit-profile.html?raw';
import matchesHtml from './components/matches.html?raw';
import proposalHtml from './components/proposal.html?raw';
import statusHtml from './components/status.html?raw';
import messagesHtml from './components/messages.html?raw';
import chatHtml from './components/chat.html?raw';

// 1. Component Loader
function loadComponents() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const screens = {
    'login': loginHtml,
    'home': homeHtml,
    'waiting-room': waitingRoomHtml,
    'profile': profileHtml,
    'edit-profile': editProfileHtml,
    'matches': matchesHtml,
    'proposal': proposalHtml,
    'status': statusHtml,
    'messages': messagesHtml,
    'chat': chatHtml
  };

  for (const [name, html] of Object.entries(screens)) {
    const section = document.createElement('section');
    section.className = 'skillverse-screen';
    section.id = `screen-${name}`;
    if (name === 'login') section.classList.add('active');
    section.innerHTML = html;
    container.appendChild(section);
  }
}

// 2. Event Binder
function bindEvents() {
  // --- Global Navigation Triggers ---
  const logoTrigger = document.getElementById('logo-home-trigger');
  if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
      if (state.isAuthenticated) navigate('home');
    });
  }

  const bindNav = (elementId, targetScreen) => {
    const el = document.getElementById(elementId);
    if (el) el.addEventListener('click', () => navigate(targetScreen));
  };

  // Desktop Header Nav
  bindNav('nav-link-home', 'home');
  bindNav('nav-link-matches', 'matches');
  bindNav('nav-link-messages', 'messages');
  bindNav('nav-link-profile', 'profile');

  // Mobile Bottom Nav
  bindNav('mobile-nav-home', 'home');
  bindNav('mobile-nav-matches', 'matches');
  bindNav('mobile-nav-messages', 'messages');
  bindNav('mobile-nav-profile', 'profile');

  // Core Theme & Debug Buttons
  const resetBtn = document.getElementById('resetStateBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.user.name = 'Abhinav Atul';
      state.user.bio = 'Design student passionate about UI/UX. Looking to learn frontend dev.';
      state.user.dept = 'Design Dept';
      state.user.preferences.emailNotifications = true;
      state.user.preferences.availableForMatches = true;
      state.waitingRoom.timerSeconds = 120;
      state.chats.alex.messages = [
        { sender: 'them', text: 'Hey Priya! I saw your request for React.js. I\'d love to help you out if you can teach me some UI/UX basics.' },
        { sender: 'me', text: 'That sounds perfect! I have my Figma files ready whenever you want to start.' },
        { sender: 'them', text: 'Great. Should we jump on a call this Thursday at 4 PM to set our syllabus?' }
      ];
      addLog('Application state variables successfully RESET.');
      navigate(state.activeScreen, false);
    });
  }

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggleBtn.textContent = isDark ? '☀ LIGHT MODE' : '☾ DARK MODE';
      addLog(`Theme switched to ${isDark ? 'DARK' : 'LIGHT'} mode`);
    });
  }

  // --- Login Screen ---
  const loginForm = document.getElementById('mobileLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      state.isAuthenticated = true;
      state.user.email = email;
      addLog(`Authenticated user: ${email}`);
      navigate('home');
    });
  }

  const googleBtn = document.getElementById('login-google-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      state.isAuthenticated = true;
      addLog('Signing in with Google Auth simulator...');
      navigate('home');
    });
  }

  // --- Home Screen ---
  const joinCallBtn = document.getElementById('join-call-btn');
  if (joinCallBtn) {
    joinCallBtn.addEventListener('click', () => navigate('waiting-room'));
  }

  // Quick Action cards
  const qaMatches = document.getElementById('qa-matches');
  if (qaMatches) qaMatches.addEventListener('click', () => navigate('matches'));

  const qaChat = document.getElementById('qa-chat');
  if (qaChat) qaChat.addEventListener('click', () => navigate('messages'));

  const qaProfile = document.getElementById('qa-profile');
  if (qaProfile) qaProfile.addEventListener('click', () => navigate('profile'));

  const rescheduleBtn = document.getElementById('reschedule-btn');
  if (rescheduleBtn) {
    rescheduleBtn.addEventListener('click', () => {
      rescheduleBtn.textContent = '✓ Noted!';
      rescheduleBtn.style.opacity = '1';
      setTimeout(() => { rescheduleBtn.textContent = 'Reschedule'; rescheduleBtn.style.opacity = '0.7'; }, 2000);
    });
  }

  // --- Waiting Room ---
  const waitBackBtn = document.getElementById('waiting-back-btn');
  if (waitBackBtn) {
    waitBackBtn.addEventListener('click', () => goBack());
  }

  const micToggle = document.getElementById('waiting-mute-toggle');
  if (micToggle) {
    micToggle.addEventListener('click', () => {
      state.waitingRoom.muted = !state.waitingRoom.muted;
      if (state.waitingRoom.muted) {
        micToggle.textContent = 'MUTED';
        micToggle.style.backgroundColor = 'var(--primary-red)';
        addLog('Microphone input simulated: MUTED');
      } else {
        micToggle.textContent = 'UNMUTED';
        micToggle.style.backgroundColor = 'var(--primary-green)';
        addLog('Microphone input simulated: ACTIVE');
      }
    });
  }

  const cameraToggle = document.getElementById('waiting-video-toggle');
  if (cameraToggle) {
    cameraToggle.addEventListener('click', () => {
      state.waitingRoom.cameraOn = !state.waitingRoom.cameraOn;
      const webcam = document.getElementById('waiting-sim-webcam');
      const offIndicator = document.getElementById('waiting-camera-off');
      
      if (state.waitingRoom.cameraOn) {
        cameraToggle.textContent = 'VIDEO ON';
        cameraToggle.classList.remove('white');
        cameraToggle.classList.add('yellow');
        if (webcam) webcam.style.display = 'block';
        if (offIndicator) offIndicator.style.display = 'none';
        addLog('Webcam hardware simulated: CAMERA ON');
      } else {
        cameraToggle.textContent = 'VIDEO OFF';
        cameraToggle.classList.remove('yellow');
        cameraToggle.classList.add('white');
        if (webcam) webcam.style.display = 'none';
        if (offIndicator) offIndicator.style.display = 'block';
        addLog('Webcam hardware simulated: CAMERA OFF');
      }
    });
  }

  const rtcJoinBtn = document.getElementById('join-session-btn');
  if (rtcJoinBtn) {
    rtcJoinBtn.addEventListener('click', () => {
      addLog('Session initiated. Simulating connection to Peer WebRTC channel...');
      alert('Connecting to Alex Chen...\nWebRTC Call simulation running.');
    });
  }

  // --- Student Profile ---
  const profileEditBtn = document.getElementById('profile-edit-btn');
  if (profileEditBtn) {
    profileEditBtn.addEventListener('click', () => navigate('edit-profile'));
  }

  // --- Edit Profile ---
  const editCancelBtn = document.getElementById('edit-profile-cancel-btn');
  if (editCancelBtn) {
    editCancelBtn.addEventListener('click', () => goBack());
  }

  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.user.name = document.getElementById('edit-display-name').value;
      state.user.bio = document.getElementById('edit-bio').value;
      state.user.dept = document.getElementById('edit-dept').value;
      addLog(`Saved Profile details for: ${state.user.name}`);
      navigate('profile');
    });
  }

  const switchEmail = document.getElementById('switch-email');
  if (switchEmail) {
    switchEmail.addEventListener('click', () => {
      state.user.preferences.emailNotifications = !state.user.preferences.emailNotifications;
      setSwitchState('switch-email', state.user.preferences.emailNotifications);
      addLog(`Preferences updated: Email Notifications = ${state.user.preferences.emailNotifications}`);
    });
  }

  const switchMatches = document.getElementById('switch-matches');
  if (switchMatches) {
    switchMatches.addEventListener('click', () => {
      state.user.preferences.availableForMatches = !state.user.preferences.availableForMatches;
      setSwitchState('switch-matches', state.user.preferences.availableForMatches);
      addLog(`Preferences updated: Available for Matches = ${state.user.preferences.availableForMatches}`);
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.isAuthenticated = false;
      addLog('User logged out.');
      navigate('login');
    });
  }

  // --- Matches --- (event delegation on the screen container)
  const matchesScreen = document.getElementById('screen-matches');
  if (matchesScreen) {
    matchesScreen.addEventListener('click', (e) => {

      // Filter buttons
      const filterBtn = e.target.closest('.match-filter-btn');
      if (filterBtn) {
        const filter = filterBtn.dataset.filter;
        // Update active state
        matchesScreen.querySelectorAll('.match-filter-btn').forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
        // Show/hide cards
        matchesScreen.querySelectorAll('.match-card').forEach(card => {
          if (filter === 'all' || card.dataset.dept === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        return;
      }

      // Like / Dismiss buttons
      const actionBtn = e.target.closest('.match-action-btn');
      if (actionBtn) {
        const card = actionBtn.closest('.match-card');
        const action = actionBtn.dataset.action;
        if (card) {
          card.classList.add(action === 'like' ? 'liked' : 'dismissed');
          setTimeout(() => card.remove(), 380);
          // Update count badge
          const countBadge = document.getElementById('match-count-badge');
          if (countBadge) {
            const remaining = matchesScreen.querySelectorAll('.match-card:not(.liked):not(.dismissed)').length - 1;
            countBadge.textContent = `${remaining} Match${remaining !== 1 ? 'es' : ''}`;
          }
        }
        return;
      }

      // Propose Exchange buttons (any inside match cards)
      const proposeBtn = e.target.closest('.neobrutal-btn');
      if (proposeBtn && proposeBtn.textContent.trim() === 'Propose Exchange') {
        navigate('proposal');
      }
    });
  }

  // --- Proposal ---
  const proposalBackBtn = document.getElementById('proposal-back-btn');
  if (proposalBackBtn) {
    proposalBackBtn.addEventListener('click', () => navigate('matches'));
  }

  const proposalForm = document.getElementById('exchangeProposalForm');
  if (proposalForm) {
    proposalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.proposal.duration = document.getElementById('proposal-duration').value;
      state.proposal.format = document.getElementById('proposal-format').value;
      addLog(`Created exchange proposal: Teaches: ${state.proposal.teaches}, Learns: ${state.proposal.learns}`);
      navigate('status');
    });
  }

  // --- Status ---
  const statusCloseBtn = document.getElementById('status-close-btn');
  if (statusCloseBtn) {
    statusCloseBtn.addEventListener('click', () => navigate('home'));
  }

  const statusGoChatBtn = document.getElementById('status-go-chat-btn');
  if (statusGoChatBtn) {
    statusGoChatBtn.addEventListener('click', () => {
      state.activeChatKey = 'alex';
      navigate('chat');
    });
  }

  const statusBackHomeBtn = document.getElementById('status-back-home-btn');
  if (statusBackHomeBtn) {
    statusBackHomeBtn.addEventListener('click', () => navigate('home'));
  }

  // --- Chats Directory & Chatroom ---
  const chatBackBtn = document.getElementById('chat-mobile-back-btn');
  if (chatBackBtn) {
    chatBackBtn.addEventListener('click', () => navigate('messages'));
  }

  const chatSendBtn = document.getElementById('chat-send-btn');
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
  }

  const chatInput = document.getElementById('chat-message-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  const searchInput = document.getElementById('chat-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', renderChatsList);
  }
}

// 3. Application Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  addLog('Initializing modular bootstrapper...');

  // Load Screen templates into DOM
  loadComponents();

  // Bind UI interactions
  bindEvents();

  // Start wait timer loops
  startTimer();

  // Route to entry screen
  navigate('login', false);

  // Initialize AI Chatbot Widget
  initAiAssistant();

  // ── Lenis Smooth Scroll ──────────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.2,          // scroll animation duration in seconds
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Pause Lenis when the user is typing in an input so scroll doesn't interfere
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('input, textarea, [contenteditable]')) {
      lenis.stop();
    }
  });
  document.addEventListener('focusout', (e) => {
    if (e.target.matches('input, textarea, [contenteditable]')) {
      lenis.start();
    }
  });

  // RAF loop — drives Lenis every animation frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // ────────────────────────────────────────────────────────────────────
});

// HMR Trigger 2
