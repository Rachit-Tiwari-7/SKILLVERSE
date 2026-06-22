export function initAiAssistant() {
  const fabBtn = document.getElementById('ai-fab-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const inputEl = document.getElementById('ai-chat-input');
  const messagesLog = document.getElementById('ai-chat-messages');

  if (!fabBtn || !chatWindow) return;

  // Toggle chat window
  fabBtn.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    if (chatWindow.style.display === 'flex') {
      inputEl.focus();
      scrollToBottom();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });

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
      const response = await fetchGroqResponse(text);
      removeTypingIndicator(typingId);
      appendMessage(response, 'bot');
    } catch (e) {
      console.error(e);
      removeTypingIndicator(typingId);
      appendMessage("Sorry, I'm having trouble connecting to my neural network right now.", 'bot');
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
}
