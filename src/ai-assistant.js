export function initAiAssistant() {
  const fabBtn = document.getElementById('ai-fab-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const inputEl = document.getElementById('ai-chat-input');
  const messagesLog = document.getElementById('ai-chat-messages');

  if (!fabBtn || !chatWindow) return;

  // Toggle chat window (using classes for bounce transitions)
  fabBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      inputEl.focus();
      scrollToBottom();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Handle Suggestion Chips clicks
  const chipsContainer = document.getElementById('ai-suggestion-chips');
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (chip) {
        const query = chip.dataset.query;
        if (query) {
          inputEl.value = query;
          handleSend();
        }
      }
    });
  }

  // Handle sending messages
  const handleSend = async () => {
    const text = inputEl.value.trim();
    if (!text) return;
    
    // Add user message
    appendMessage(text, 'user');
    inputEl.value = '';
    
    // Show typing indicator
    const typingId = showTypingIndicator();
    
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
      let responseText = '';
      
      if (!apiKey) {
        // Fallback directly if no key is set
        responseText = getLocalFallbackResponse(text);
      } else {
        responseText = await fetchGroqResponse(text);
      }
      
      removeTypingIndicator(typingId);
      appendMessage(responseText, 'bot');
    } catch (e) {
      console.error('Groq AI API failed, using offline fallback:', e);
      removeTypingIndicator(typingId);
      appendMessage(getLocalFallbackResponse(text), 'bot');
    }
  };

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  function scrollToBottom() {
    setTimeout(() => {
      messagesLog.scrollTop = messagesLog.scrollHeight;
    }, 50);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;
    // Simple parsing for bold text just in case the LLM returns markdown
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    msgDiv.innerHTML = `<div class="ai-bubble">${formattedText}</div>`;
    messagesLog.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-bot ai-typing`;
    msgDiv.id = id;
    msgDiv.innerHTML = `
      <div class="ai-bubble">
        <div class="ai-dot"></div>
        <div class="ai-dot"></div>
        <div class="ai-dot"></div>
      </div>
    `;
    messagesLog.appendChild(msgDiv);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // --- GROQ API INTEGRATION ---
  async function fetchGroqResponse(userText) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
    
    const systemPrompt = `You are the Skillverse AI assistant. Skillverse is a neo-brutalist student skill exchange platform.
Key features:
- Home: Dashboard, Quick Actions, Upcoming Sessions.
- Matches: Filter peers by department, swipe/like to propose a skill exchange.
- Chats: Coordinate sessions and share meeting links.
- Me (Profile): Profile management, bio, department.

Keep your answers brief (1-3 sentences max), friendly, and strictly contextual to navigating or using this app. Do not write code or give long explanations.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userText }
        ],
        temperature: 0.6,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error('Groq API Error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // --- LOCAL OFFLINE KEYWORD RESPONDER FALLBACK ---
  function getLocalFallbackResponse(userText) {
    const text = userText.toLowerCase();
    
    if (text.includes('match') || text.includes('find') || text.includes('peer')) {
      return "To find skill exchange matches, head to the **Matches** screen from the navbar! You can filter peers by department (CS, Design, Business) and click **Propose Exchange** or swipe/like them.";
    }
    if (text.includes('chat') || text.includes('message') || text.includes('talk')) {
      return "Once a proposal is approved, coordinate session timings with peers inside the **Chats** directory. Select a student's name from the list to start messaging or access call lobbys!";
    }
    if (text.includes('call') || text.includes('waiting') || text.includes('lobby') || text.includes('video')) {
      return "To start a live session, go to **Home** and click **🎥 Join Call** under 'Upcoming Sessions'. Make sure to test your video and audio in the Call Lobby first, then click Join Session to launch the call dashboard!";
    }
    if (text.includes('xp') || text.includes('level') || text.includes('reward') || text.includes('rank')) {
      return "You earn **XP** by completing video calls and rating your peers! Accumulate 1000 XP to **Level Up**, which grants you new titles and boosts your profile visual appeal.";
    }
    if (text.includes('streak')) {
      return "Your **Streak** increases every consecutive day you engage in skill exchanges. Maintain your streak to climb the Top Skill Sharers leaderboard on the dashboard!";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('assist')) {
      return "Hey there! I am the Skillverse Offline AI. Ask me about matches, live video call rooms, messaging, earning XP, or profile streak levels.";
    }
    if (text.includes('help') || text.includes('how')) {
      return "I can help you navigate this platform! Try asking me: 'how do matches work?', 'how do I join a call?', 'how do I earn XP?', or 'where are my messages?'.";
    }
    
    return "I am the Skillverse AI assistant. I can show you how to find matches, earn XP, chat with other students, or join call lobbys. Try asking: 'how do video calls work?'";
  }
}
