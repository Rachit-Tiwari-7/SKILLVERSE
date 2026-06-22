import { state, addLog, updateNavigationHighlights } from './state.js';

// 3. Navigation / Router Engine
export function navigate(screenId, saveToHistory = true) {
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
    
    // Handle navigation active class highlighting
    updateNavigationHighlights(screenId);
    
    // Special Screen Setup Operations
    onScreenLoad(screenId);
  } else {
    console.error(`Screen template "screen-${screenId}" not found.`);
  }
}

export function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    navigate(prev, false);
  } else {
    // If no history, default back to home if authenticated, else login
    navigate(state.isAuthenticated ? 'home' : 'login', false);
  }
}

// Executed when a screen mounts
export function onScreenLoad(screenId) {
  // Render user data
  if (screenId === 'home') {
    const el = document.getElementById('home-welcome-name');
    if (el) el.textContent = state.user.name;
  }
  
  if (screenId === 'profile') {
    const nameEl = document.getElementById('profile-name');
    if (nameEl) nameEl.textContent = state.user.name;
    const deptEl = document.getElementById('profile-dept');
    if (deptEl) deptEl.textContent = `${state.user.dept.toUpperCase()} • ${state.user.year.toUpperCase()}`;
    const bioEl = document.getElementById('profile-bio');
    if (bioEl) bioEl.textContent = state.user.bio;
  }
  
  if (screenId === 'edit-profile') {
    const nameInput = document.getElementById('edit-display-name');
    if (nameInput) nameInput.value = state.user.name;
    const bioInput = document.getElementById('edit-bio');
    if (bioInput) bioInput.value = state.user.bio;
    const deptInput = document.getElementById('edit-dept');
    if (deptInput) deptInput.value = state.user.dept;
    
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
export function setSwitchState(id, checked) {
  const sw = document.getElementById(id);
  if (!sw) return;
  if (checked) {
    sw.classList.add('checked');
  } else {
    sw.classList.remove('checked');
  }
}

// 5. Chat Rendering
export function renderChatsList() {
  const container = document.getElementById('chats-list-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const searchInput = document.getElementById('chat-search-input');
  const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
  
  Object.keys(state.chats).forEach(key => {
    const chat = state.chats[key];
    if (searchVal && !chat.name.toLowerCase().includes(searchVal)) {
      return; // Filter out
    }
    
    const lastMsg = chat.messages[chat.messages.length - 1];
    const previewText = lastMsg ? lastMsg.text : chat.preview;
    
    const item = document.createElement('div');
    item.className = 'chat-item';
    item.addEventListener('click', () => {
      state.activeChatKey = key;
      navigate('chat');
    });
    
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

export function renderChatRoom() {
  const chat = state.chats[state.activeChatKey];
  if (!chat) return;
  
  // Update header title
  const headerTitle = document.getElementById('chat-header-title');
  if (headerTitle) headerTitle.textContent = chat.name;
  
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
