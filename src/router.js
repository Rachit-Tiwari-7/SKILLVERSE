import { state, addLog, updateNavigationHighlights } from './state.js';
import { startWebcamSim, stopWebcamSim } from './webcam-sim.js';
import { triggerConfetti, triggerSparkles } from './effects.js';

export function navigate(screenId, saveToHistory = true) {
  if (state.activeScreen === 'waiting-room') {
    const prevCanvas = document.getElementById('waiting-sim-webcam-canvas');
    if (prevCanvas) stopWebcamSim(prevCanvas);
  }
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
    
    const levelLabel = document.querySelector('.xp-bar-label span:nth-child(1)');
    if (levelLabel) levelLabel.textContent = `⚡ Level ${state.user.level} — Skill Sharer`;
    
    const xpText = document.querySelector('.xp-bar-label span:nth-child(2)');
    if (xpText) xpText.textContent = `${state.user.xp} / 1000 XP`;
    
    const xpFill = document.querySelector('.xp-bar-fill');
    if (xpFill) {
      const pct = (state.user.xp / 1000) * 100;
      xpFill.style.setProperty('--bar-width', `${pct}%`);
      xpFill.style.width = '0%';
      void xpFill.offsetWidth;
      xpFill.style.width = `${pct}%`;
    }

    // Dynamic stats counting up animation
    const animateCount = (element, target, prefix = '') => {
      if (!element) return;
      let start = 0;
      const duration = 1000;
      const startTime = performance.now();
      
      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const current = Math.floor(progress * target);
        
        // Pad single digit numbers if target has leading zero
        const formatted = current < 10 && target >= 10 ? `0${current}` : `${current}`;
        element.textContent = `${prefix}${formatted}`;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          const final = target < 10 ? `0${target}` : `${target}`;
          element.textContent = `${prefix}${final}`;
        }
      };
      
      requestAnimationFrame(update);
    };

    const taughtEl = document.getElementById('stat-taught');
    if (taughtEl) animateCount(taughtEl, 12);
    
    const learnedEl = document.getElementById('stat-learned');
    if (learnedEl) animateCount(learnedEl, 8);
    
    const streakEl = document.getElementById('stat-streak');
    if (streakEl) animateCount(streakEl, parseInt(state.user.streak, 10) || 14, '🔥');
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

  if (screenId === 'waiting-room') {
    const canvas = document.getElementById('waiting-sim-webcam-canvas');
    const offIndicator = document.getElementById('waiting-camera-off');
    const cameraToggle = document.getElementById('waiting-video-toggle');
    const micToggle = document.getElementById('waiting-mute-toggle');
    
    if (cameraToggle) {
      cameraToggle.className = `neobrutal-btn ${state.waitingRoom.cameraOn ? 'yellow' : 'white'}`;
      cameraToggle.textContent = state.waitingRoom.cameraOn ? 'VIDEO ON' : 'VIDEO OFF';
    }
    if (micToggle) {
      micToggle.className = `neobrutal-btn ${state.waitingRoom.muted ? 'red' : 'green'}`;
      micToggle.textContent = state.waitingRoom.muted ? 'MUTED' : 'UNMUTED';
    }
    
    const micStatusLabel = document.getElementById('mic-status-label');
    if (micStatusLabel) {
      micStatusLabel.textContent = state.waitingRoom.muted ? 'AUDIO MUTED' : 'AUDIO ACTIVE';
      micStatusLabel.className = `video-status-overlay ${state.waitingRoom.muted ? 'red' : 'green'}`;
    }

    if (state.waitingRoom.cameraOn && canvas) {
      canvas.style.display = 'block';
      if (offIndicator) offIndicator.style.display = 'none';
      startWebcamSim(canvas, 'local', state.waitingRoom);
    } else {
      if (canvas) canvas.style.display = 'none';
      if (offIndicator) offIndicator.style.display = 'block';
      stopWebcamSim(canvas);
    }
  }

  if (screenId === 'matches') {
    initCardSwiping();
    updateMatchCount();
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

// --- Card Swipe Interactivity ---
export function updateMatchCount() {
  const countBadge = document.getElementById('match-count-badge');
  if (countBadge) {
    const matchesScreen = document.getElementById('screen-matches');
    if (matchesScreen) {
      const remaining = matchesScreen.querySelectorAll('.match-card:not(.liked):not(.dismissed)').length;
      countBadge.textContent = `${remaining} Match${remaining !== 1 ? 'es' : ''}`;
    }
  }
}

export function initCardSwiping() {
  const cards = document.querySelectorAll('.match-card');
  
  cards.forEach(card => {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let isSwipeGesture = null; // null = undecided, true = swipe, false = scroll
    
    const likeStamp = card.querySelector('.like-stamp');
    const nopeStamp = card.querySelector('.nope-stamp');

    const onStart = (e) => {
      if (e.target.closest('button')) return;

      isDragging = true;
      isSwipeGesture = null;
      startX = e.clientX || e.touches[0].clientX;
      startY = e.clientY || e.touches[0].clientY;
      card.style.transition = 'none';
      card.style.cursor = 'grabbing';
      card.style.zIndex = '10';

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      
      const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
      
      currentX = clientX - startX;
      currentY = clientY - startY;

      if (isSwipeGesture === null) {
        const threshold = 10;
        const absX = Math.abs(currentX);
        const absY = Math.abs(currentY);
        if (absX > threshold || absY > threshold) {
          if (absX > absY) {
            isSwipeGesture = true;
          } else {
            isSwipeGesture = false;
            // Cancel dragging/gestures, let browser scroll naturally
            isDragging = false;
            card.style.cursor = 'grab';
            card.style.zIndex = '';
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
            return;
          }
        } else {
          return;
        }
      }
      
      const rotate = currentX * 0.08;
      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
      
      if (currentX > 20) {
        const opacity = Math.min(1, (currentX - 20) / 100);
        if (likeStamp) {
          likeStamp.style.opacity = opacity;
          likeStamp.style.transform = `rotate(-12deg) scale(${1 + opacity * 0.15})`;
        }
        if (nopeStamp) nopeStamp.style.opacity = 0;
      } else if (currentX < -20) {
        const opacity = Math.min(1, (-currentX - 20) / 100);
        if (nopeStamp) {
          nopeStamp.style.opacity = opacity;
          nopeStamp.style.transform = `rotate(12deg) scale(${1 + opacity * 0.15})`;
        }
        if (likeStamp) likeStamp.style.opacity = 0;
      } else {
        if (likeStamp) likeStamp.style.opacity = 0;
        if (nopeStamp) nopeStamp.style.opacity = 0;
      }

      // Prevent window scroll while dragging card on mobile
      if (e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.cursor = 'grab';
      card.style.zIndex = '';

      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);

      const threshold = 120;
      const name = card.querySelector('.match-name').textContent;

      if (currentX > threshold) {
        // SWIPE RIGHT (LIKE)
        card.classList.add('liked');
        card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
        card.style.transform = `translate(${window.innerWidth}px, ${currentY}px) rotate(${currentX * 0.08}deg)`;
        card.style.opacity = '0';
        addLog(`Swiped LIKE on peer: <strong>${name.toUpperCase()}</strong>`);
        
        triggerConfetti();
        
        setTimeout(() => {
          card.remove();
          updateMatchCount();
        }, 350);
      } else if (currentX < -threshold) {
        // SWIPE LEFT (DISMISS)
        card.classList.add('dismissed');
        card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
        card.style.transform = `translate(${-window.innerWidth}px, ${currentY}px) rotate(${currentX * 0.08}deg)`;
        card.style.opacity = '0';
        addLog(`Swiped DISMISS on peer: <strong>${name.toUpperCase()}</strong>`);
        
        setTimeout(() => {
          card.remove();
          updateMatchCount();
        }, 350);
      } else {
        // Reset card pos
        card.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
        card.style.transform = 'translate(0px, 0px) rotate(0deg)';
        if (likeStamp) {
          likeStamp.style.transition = 'opacity 0.2s ease';
          likeStamp.style.opacity = 0;
        }
        if (nopeStamp) {
          nopeStamp.style.transition = 'opacity 0.2s ease';
          nopeStamp.style.opacity = 0;
        }
      }
      
      currentX = 0;
      currentY = 0;
    };

    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart, { passive: true });
  });
}
