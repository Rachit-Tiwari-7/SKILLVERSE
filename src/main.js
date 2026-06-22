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

// Import JS Logic Modules
import { state, addLog } from './state.js';
import { navigate, goBack, renderChatsList, renderChatRoom, setSwitchState } from './router.js';
import { sendChatMessage } from './chatbot.js';
import { startTimer } from './timer.js';

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

  // --- Matches ---
  const matchesProposeBtn = document.getElementById('matches-propose-btn');
  if (matchesProposeBtn) {
    matchesProposeBtn.addEventListener('click', () => navigate('proposal'));
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
});
