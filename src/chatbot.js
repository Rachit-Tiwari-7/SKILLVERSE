import { state, addLog } from './state.js';
import { renderChatRoom } from './router.js';

export function sendChatMessage() {
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

export function triggerChatbotReply(chatKey, userText) {
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
  }, 1800);
}
