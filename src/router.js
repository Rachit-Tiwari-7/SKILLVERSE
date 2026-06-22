import { state, addLog, updateNavigationHighlights } from './state.js';

export function navigate(screenId, saveToHistory = true) {
  const performNavigation = () => {
    const screens = document.querySelectorAll('.skillverse-screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add('active');

      if (saveToHistory && state.activeScreen !== screenId) {
        state.history.push(state.activeScreen);
      }

      state.activeScreen = screenId;
      addLog(`Navigated to: <strong>${screenId.toUpperCase()}</strong>`);
      updateNavigationHighlights(screenId);
      onScreenLoad(screenId);
    } else {
      console.error(`Screen template "screen-${screenId}" not found.`);
    }
  };

  // Use the native View Transitions API for full-page animations
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      performNavigation();
    });
  } else {
    performNavigation();
  }
}

export function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    navigate(prev, false);
  } else {
    navigate(state.isAuthenticated ? 'home' : 'login', false);
  }
}

// Executed when a screen mounts
export function onScreenLoad(screenId) {
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

    // Inject avatar image — setting src triggers onload/onerror in the HTML
    const avatarImg = document.getElementById('profile-avatar-img');
    if (avatarImg && state.user.avatarUrl) {
      avatarImg.src = state.user.avatarUrl;
    }
  }

  if (screenId === 'edit-profile') {
    const nameInput = document.getElementById('edit-display-name');
    if (nameInput) nameInput.value = state.user.name;
    const bioInput = document.getElementById('edit-bio');
    if (bioInput) bioInput.value = state.user.bio;
    const deptInput = document.getElementById('edit-dept');
    if (deptInput) deptInput.value = state.user.dept;
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
  sw.classList.toggle('checked', checked);
}

// 5. Avatar helper — renders either an <img> or a letter fallback
function renderAvatar(chat, extraClass = '') {
  if (chat.avatarUrl) {
    return `<img
      class="chat-avatar-img ${extraClass}"
      src="${chat.avatarUrl}"
      alt="${chat.name}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    /><div class="chat-avatar-circle ${chat.avatarClass}" style="display:none;">${chat.avatar}</div>`;
  }
  return `<div class="chat-avatar-circle ${chat.avatarClass}">${chat.avatar}</div>`;
}

// 6. Chat List Rendering
export function renderChatsList() {
  const container = document.getElementById('chats-list-container');
  if (!container) return;

  container.innerHTML = '';

  const searchInput = document.getElementById('chat-search-input');
  const searchVal = searchInput ? searchInput.value.toLowerCase() : '';

  // Calculate total unread for online count badge
  let onlineCount = 0;

  Object.keys(state.chats).forEach(key => {
    const chat = state.chats[key];
    if (searchVal && !chat.name.toLowerCase().includes(searchVal)) return;
    if (chat.online) onlineCount++;

    const lastMsg = chat.messages[chat.messages.length - 1];
    const previewText = lastMsg ? lastMsg.text : '';
    const isActive = key === state.activeChatKey;

    const item = document.createElement('div');
    item.className = `chat-item${isActive ? ' active-chat' : ''}`;
    item.addEventListener('click', () => {
      // Mark as read
      chat.unread = 0;
      state.activeChatKey = key;
      // Update active highlight
      container.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active-chat'));
      item.classList.add('active-chat');
      navigate('chat');
    });

    const avatarHtml = chat.avatarUrl
      ? `<div class="chat-avatar-wrapper">
           <img class="chat-avatar-img" src="${chat.avatarUrl}" alt="${chat.name}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
           <div class="chat-avatar-circle ${chat.avatarClass}" style="display:none;">${chat.avatar}</div>
           ${chat.online ? '<div class="chat-online-dot"></div>' : ''}
         </div>`
      : `<div class="chat-avatar-wrapper">
           <div class="chat-avatar-circle ${chat.avatarClass}">${chat.avatar}</div>
           ${chat.online ? '<div class="chat-online-dot"></div>' : ''}
         </div>`;

    item.innerHTML = `
      ${avatarHtml}
      <div class="chat-info">
        <div class="chat-meta">
          <h4 class="chat-item-name">${chat.name}</h4>
          <span class="chat-item-time">${chat.time}</span>
        </div>
        <p class="chat-item-preview">${previewText}</p>
      </div>
      ${chat.unread > 0 ? `<div class="chat-unread-badge">${chat.unread}</div>` : ''}
    `;
    container.appendChild(item);
  });

  // Update online count
  const onlineCountEl = document.querySelector('.messages-online-count');
  if (onlineCountEl) onlineCountEl.textContent = `${onlineCount} online`;
}

export function renderChatRoom() {
  const chat = state.chats[state.activeChatKey];
  
  const header = document.querySelector('.chat-room-header');
  const banner = document.querySelector('.exchange-started-banner');
  const inputBar = document.querySelector('.chat-input-bar');
  const container = document.getElementById('chat-messages-log');
  
  if (!chat) {
    if (header) header.style.display = 'none';
    if (banner) banner.style.display = 'none';
    if (inputBar) inputBar.style.display = 'none';
    if (container) {
      container.innerHTML = `
        <div style="display:flex; height:100%; align-items:center; justify-content:center; flex-direction:column; color: #888; text-align: center; gap: 0.5rem; opacity: 0.7;">
          <div style="font-size:3.5rem; margin-bottom:0.5rem;">💬</div>
          <h3 style="font-family:var(--font-header); font-weight:900; text-transform:uppercase; color:var(--text-color); font-size:1.2rem;">Your Messages</h3>
          <p style="font-size:0.9rem;">Click on a person's name to start chatting.</p>
        </div>
      `;
      container.dataset.chatKey = '';
    }
    return;
  }
  
  if (header) header.style.display = 'flex';
  if (banner) banner.style.display = 'flex';
  if (inputBar) inputBar.style.display = 'flex';

  // Update header
  const headerTitle = document.getElementById('chat-header-title');
  if (headerTitle) headerTitle.textContent = chat.name;

  // Update header avatar
  const headerAvatar = document.getElementById('chat-room-avatar');
  if (headerAvatar) {
    if (chat.avatarUrl) {
      headerAvatar.innerHTML = `<img src="${chat.avatarUrl}" alt="${chat.name}"
        style="width:100%;height:100%;border-radius:50%;object-fit:cover;"
        onerror="this.parentElement.textContent='${chat.avatar[0]}'" />`;
    } else {
      headerAvatar.textContent = chat.avatar[0];
    }
    // color the ring
    headerAvatar.className = `chat-room-avatar ${chat.avatarClass}`;
  }

  // Update status dot
  const statusDot = document.querySelector('.chat-status-dot');
  const statusText = document.getElementById('chat-status-text');
  if (statusDot) statusDot.className = `chat-status-dot ${chat.online ? 'online' : ''}`;
  if (statusText) statusText.textContent = chat.online ? 'Online now' : 'Last seen recently';

  // Render messages
  // container is already defined at the top of the function
  if (!container) return;
  
  const existingBubbles = container.querySelectorAll('.chat-message-bubble:not(.typing-indicator-wrapper)');
  
  if (container.dataset.chatKey !== state.activeChatKey || (existingBubbles.length === 0 && chat.messages.length > 0) || existingBubbles.length > chat.messages.length) {
    container.innerHTML = '';
    container.dataset.chatKey = state.activeChatKey;
    chat.messages.forEach((msg, i) => {
      const bubble = document.createElement('div');
      bubble.className = `chat-message-bubble ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`;
      bubble.style.animationDelay = `${i * 0.04}s`;

      const timeEl = msg.time
        ? `<div class="chat-message-time">${msg.time}</div>` : '';

      bubble.innerHTML = `<span>${msg.text}</span>${timeEl}`;
      container.appendChild(bubble);
    });
  } else {
    for (let i = existingBubbles.length; i < chat.messages.length; i++) {
      const msg = chat.messages[i];
      const bubble = document.createElement('div');
      bubble.className = `chat-message-bubble ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`;
      bubble.style.animationDelay = `0s`;

      const timeEl = msg.time
        ? `<div class="chat-message-time">${msg.time}</div>` : '';

      bubble.innerHTML = `<span>${msg.text}</span>${timeEl}`;
      
      const typingIndicator = container.querySelector('.typing-indicator-wrapper');
      if (typingIndicator) {
        container.insertBefore(bubble, typingIndicator);
      } else {
        container.appendChild(bubble);
      }
    }
  }

  // Scroll to bottom
  setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
}
