// 1. Reactive State Object
export const state = {
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
export function addLog(message) {
  // Console logging simulator (was connected to live sandbox stream UI)
  console.log(`[SKILLVERSE LOG]: ${message.replace(/<[^>]*>/g, '')}`);
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function updateNavigationHighlights(screenId) {
  let activeTab = '';
  if (['home', 'waiting-room'].includes(screenId)) {
    activeTab = 'home';
  } else if (['matches', 'proposal', 'status'].includes(screenId)) {
    activeTab = 'matches';
  } else if (['messages', 'chat'].includes(screenId)) {
    activeTab = 'messages';
  } else if (['profile', 'edit-profile'].includes(screenId)) {
    activeTab = 'profile';
  }

  // Update desktop navigation links
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  desktopLinks.forEach(link => {
    if (link.getAttribute('data-nav') === activeTab) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update mobile navigation links
  const mobileLinks = document.querySelectorAll('.app-nav-item');
  mobileLinks.forEach(link => {
    if (link.getAttribute('data-nav') === activeTab) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle logged-in class on body
  if (state.isAuthenticated) {
    document.body.classList.add('logged-in');
  } else {
    document.body.classList.remove('logged-in');
  }
}
