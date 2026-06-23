// 1. Reactive State Object

// ui-avatars.com — replaced with DiceBear for cute avatars
const avatarUrl = (name, bg = '6366f1', fg = 'ffffff') =>
  `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(name)}&backgroundColor=${bg}`;

export const state = {
  // Screen routing
  activeScreen: 'login',
  history: [],

  // User Authentication & Profile
  isAuthenticated: false,
  user: {
    name: 'Abhinav Atul',
    dept: 'Design Dept',
    year: 'Year 2',
    email: 'abhinav@university.edu',
    bio: 'Design student passionate about UI/UX. Looking to learn frontend dev.',
    avatarUrl: avatarUrl('Abhinav Atul', '1d4ed8', 'ffffff'),
    preferences: {
      emailNotifications: true,
      availableForMatches: true
    },
    rating: '4.9',
    streak: '14',
    xp: 720,
    level: 4
  },

  // Waiting Room State
  waitingRoom: {
    timerSeconds: 120,
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

  // Messaging Repository — 8 chats with rich histories
  chats: {
    alex: {
      name: 'Alex Chen',
      avatar: 'A',
      avatarClass: 'red',
      avatarUrl: avatarUrl('Alex Chen', 'ef4444', 'ffffff'),
      online: true,
      unread: 2,
      time: '4:15 PM',
      messages: [
        { sender: 'them', text: 'Hey! I saw your request for React.js help 👋', time: '3:45 PM' },
        { sender: 'me',   text: 'Hi Alex! Yes, I\'ve been struggling with hooks and state management.', time: '3:47 PM' },
        { sender: 'them', text: 'No worries, I can def help. I\'ve built 3 full-stack React apps.', time: '3:48 PM' },
        { sender: 'me',   text: 'That\'s amazing! In return I can teach you UI/UX fundamentals — I have prepared Figma files already.', time: '3:50 PM' },
        { sender: 'them', text: 'Perfect deal! I actually need to redesign my portfolio 😅', time: '3:52 PM' },
        { sender: 'me',   text: 'Ha! Great timing. Should we start this Thursday?', time: '3:55 PM' },
        { sender: 'them', text: 'Thursday works. 4 PM? I\'ll set up a Zoom link.', time: '4:01 PM' },
        { sender: 'me',   text: 'Confirmed! I\'ll prepare a beginner Figma walkthrough for you.', time: '4:03 PM' },
        { sender: 'them', text: 'Great. Should we jump on a call right now to set our syllabus? 📋', time: '4:15 PM' },
      ],
      started: true
    },
    david: {
      name: 'David Kim',
      avatar: 'D',
      avatarClass: 'blue',
      avatarUrl: avatarUrl('David Kim', '3b82f6', 'ffffff'),
      online: false,
      unread: 0,
      time: 'YESTERDAY',
      messages: [
        { sender: 'them', text: 'Hey! Quick question about CSS Grid layouts', time: '2:10 PM' },
        { sender: 'me',   text: 'Sure! What\'s the issue?', time: '2:12 PM' },
        { sender: 'them', text: 'I can\'t get my gallery to be responsive. Items keep overflowing.', time: '2:13 PM' },
        { sender: 'me',   text: 'Try `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` — it auto-fills and wraps!', time: '2:15 PM' },
        { sender: 'them', text: 'Oh wow that works perfectly!! 🎉', time: '2:22 PM' },
        { sender: 'me',   text: 'Glad it helped! CSS Grid is super powerful once you get the hang of it.', time: '2:23 PM' },
        { sender: 'them', text: 'Can I also ask about `place-items: center`? Is that shorthand?', time: '2:30 PM' },
        { sender: 'me',   text: 'Yes! It\'s shorthand for `align-items` + `justify-items`. Super clean.', time: '2:31 PM' },
        { sender: 'them', text: 'Thanks for the help with CSS Grid! I finally understand auto-fit. You\'re a lifesaver! 🙌', time: 'Yesterday' },
      ],
      started: true
    },
    priya: {
      name: 'Priya Sharma',
      avatar: 'P',
      avatarClass: 'purple',
      avatarUrl: avatarUrl('Priya Sharma', '7c3aed', 'ffffff'),
      online: true,
      unread: 1,
      time: '11:30 AM',
      messages: [
        { sender: 'them', text: 'Hi! I noticed you\'re learning Python 🐍', time: '10:00 AM' },
        { sender: 'me',   text: 'Yes! I want to get into data analysis. Are you the one who posted about teaching it?', time: '10:05 AM' },
        { sender: 'them', text: 'That\'s me! I\'ve been doing Python for 3 years now, mostly ML and data stuff.', time: '10:07 AM' },
        { sender: 'me',   text: 'Wow! What would you want in return?', time: '10:10 AM' },
        { sender: 'them', text: 'I need to learn wireframing for my internship. Would you be able to help?', time: '10:12 AM' },
        { sender: 'me',   text: 'Absolutely! Wireframing is my strongest skill 💪', time: '10:15 AM' },
        { sender: 'them', text: 'Amazing! I\'m thinking 1hr sessions twice a week?', time: '10:20 AM' },
        { sender: 'me',   text: 'That works perfectly. Shall we start next Monday?', time: '10:25 AM' },
        { sender: 'them', text: 'Monday it is! I\'ll share my Python learning roadmap with you beforehand 🗺️', time: '11:30 AM' },
      ],
      started: true
    },
    group: {
      name: 'UI/UX Study Group',
      avatar: 'UI',
      avatarClass: 'yellow',
      avatarUrl: avatarUrl('Study Group', 'ca8a04', 'ffffff'),
      online: true,
      unread: 5,
      time: 'TUESDAY',
      messages: [
        { sender: 'them', text: 'Sarah: Hey team! Finals are in 2 weeks 😱', time: 'Monday 9 AM' },
        { sender: 'them', text: 'Raj: We should start reviewing the heuristics evaluation section.', time: 'Monday 9:15 AM' },
        { sender: 'me',   text: 'I\'ll create a shared Figma board for us to practice.', time: 'Monday 10 AM' },
        { sender: 'them', text: 'Sarah: Yes!! That would be so helpful.', time: 'Monday 10:05 AM' },
        { sender: 'them', text: 'Raj: Can we also cover accessibility standards? It was in last year\'s exam.', time: 'Monday 10:30 AM' },
        { sender: 'me',   text: 'Good call. I\'ll add an accessibility checklist section too.', time: 'Monday 11 AM' },
        { sender: 'them', text: 'Sarah: Should we meet physically or online this time?', time: 'Tuesday 8 AM' },
        { sender: 'them', text: 'Raj: Library has group rooms booked till 6pm. Online might be easier.', time: 'Tuesday 8:20 AM' },
        { sender: 'them', text: 'Sarah: Are we meeting at the library or online? 📚', time: 'Tuesday 9 AM' },
      ],
      started: false
    },
    marcus: {
      name: 'Marcus Johnson',
      avatar: 'M',
      avatarClass: 'green',
      avatarUrl: avatarUrl('Marcus Johnson', '16a34a', 'ffffff'),
      online: false,
      unread: 0,
      time: 'OCT 12',
      messages: [
        { sender: 'me',   text: 'Hey Marcus! Ready for our portfolio review session?', time: 'Oct 12, 2 PM' },
        { sender: 'them', text: 'Yes! I\'ve been working on it all week. Really excited to get feedback.', time: 'Oct 12, 2:05 PM' },
        { sender: 'me',   text: 'Let\'s start with your hero section. The hierarchy looks a bit off.', time: 'Oct 12, 2:30 PM' },
        { sender: 'them', text: 'You\'re right, I wasn\'t sure about the font sizing. Should I increase the headline?', time: 'Oct 12, 2:35 PM' },
        { sender: 'me',   text: 'Yes, aim for 3:1 contrast ratio between headline and subtext. Try 48px vs 16px.', time: 'Oct 12, 2:38 PM' },
        { sender: 'them', text: 'Done! That looks so much better. Your eye for this stuff is insane 🔥', time: 'Oct 12, 3:00 PM' },
        { sender: 'me',   text: 'How was the overall experience of our exchange?', time: 'Oct 12, 3:15 PM' },
        { sender: 'them', text: 'Exchange completed. Left you a 5-star review! Best skill swap I\'ve done 🌟', time: 'Oct 12, 3:20 PM' },
      ],
      started: false
    },
    maya: {
      name: 'Maya Patel',
      avatar: 'MP',
      avatarClass: 'orange',
      avatarUrl: avatarUrl('Maya Patel', 'f97316', 'ffffff'),
      online: true,
      unread: 3,
      time: '9:00 AM',
      messages: [
        { sender: 'them', text: 'Hi! I\'m Maya, I design brand identities 🎨', time: '8:30 AM' },
        { sender: 'me',   text: 'Hey Maya! I saw your profile — your branding work is stunning!', time: '8:35 AM' },
        { sender: 'them', text: 'Thank you! I\'ve been working on a few local business rebrands.', time: '8:40 AM' },
        { sender: 'me',   text: 'Would you be open to a skill exchange? I could teach you CSS Grid layouts.', time: '8:45 AM' },
        { sender: 'them', text: 'Oh yes! I\'ve been trying to hand-code my portfolio but CSS kills me lol 😅', time: '8:50 AM' },
        { sender: 'me',   text: 'Haha, I\'ve been there. I can make CSS Grid feel like second nature in 2 sessions.', time: '8:55 AM' },
        { sender: 'them', text: 'Deal! And I\'ll teach you logo design and brand typography.', time: '9:00 AM' },
      ],
      started: true
    },
    raj: {
      name: 'Raj Verma',
      avatar: 'R',
      avatarClass: 'indigo',
      avatarUrl: avatarUrl('Raj Verma', '4338ca', 'ffffff'),
      online: false,
      unread: 0,
      time: 'MON',
      messages: [
        { sender: 'them', text: 'Hey! Found you through the UI/UX Study Group chat.', time: 'Mon 11 AM' },
        { sender: 'me',   text: 'Oh hey Raj! Great to connect directly.', time: 'Mon 11:05 AM' },
        { sender: 'them', text: 'I wanted to propose a focused exchange — I teach you accessibility testing, you teach me Figma prototyping?', time: 'Mon 11:10 AM' },
        { sender: 'me',   text: 'That\'s a great pairing! Accessibility is something I\'ve been meaning to level up on.', time: 'Mon 11:15 AM' },
        { sender: 'them', text: 'I use Axe + NVDA in my workflow. I can show you real-world a11y auditing.', time: 'Mon 11:20 AM' },
        { sender: 'me',   text: 'And I\'ll show you advanced Figma prototyping — variables, interactive components, etc.', time: 'Mon 11:25 AM' },
        { sender: 'them', text: 'Perfect. Let\'s formalize this on the platform and schedule our first session! 🤝', time: 'Mon 11:30 AM' },
      ],
      started: true
    },
    sarah: {
      name: 'Sarah Kim',
      avatar: 'SK',
      avatarClass: 'pink',
      avatarUrl: avatarUrl('Sarah Kim', 'db2777', 'ffffff'),
      online: false,
      unread: 0,
      time: 'SUN',
      messages: [
        { sender: 'them', text: 'Hey Abhinav! I\'m Sarah from the study group 👋', time: 'Sun 4 PM' },
        { sender: 'me',   text: 'Hi Sarah! Nice to chat outside of the group.', time: 'Sun 4:05 PM' },
        { sender: 'them', text: 'I wanted to say — that shared Figma board you made was brilliant!', time: 'Sun 4:10 PM' },
        { sender: 'me',   text: 'Happy it helped! I put a lot of work into the component audit section.', time: 'Sun 4:15 PM' },
        { sender: 'them', text: 'Genuinely the best study resource we\'ve had this semester. You\'re so talented 🏆', time: 'Sun 4:20 PM' },
        { sender: 'me',   text: 'Means a lot! We\'ll ace this final for sure 💪', time: 'Sun 4:25 PM' },
        { sender: 'them', text: 'Also — would you want to do a 1:1 session on color theory before the exam?', time: 'Sun 4:30 PM' },
      ],
      started: false
    }
  },

  // Current active chat thread
  activeChatKey: null
};

// 2. Helper Functions
export function addLog(message) {
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

  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  desktopLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-nav') === activeTab);
  });

  const mobileLinks = document.querySelectorAll('.app-nav-item');
  mobileLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-nav') === activeTab);
  });

  if (state.isAuthenticated) {
    document.body.classList.add('logged-in');
  } else {
    document.body.classList.remove('logged-in');
  }
}
