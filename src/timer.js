import { state, addLog, formatTime } from './state.js';

let timerInterval = null;

export function startTimer() {
  if (timerInterval) return;
  
  timerInterval = setInterval(() => {
    if (state.activeScreen === 'waiting-room' && state.waitingRoom.timerSeconds > 0) {
      state.waitingRoom.timerSeconds--;
      
      const timerBadge = document.getElementById('waiting-timer-badge');
      if (timerBadge) {
        timerBadge.textContent = `STARTS IN ${formatTime(state.waitingRoom.timerSeconds).toUpperCase()}`;
      }
      
      if (state.waitingRoom.timerSeconds === 0) {
        addLog('Countdown complete! Session is ready to begin.');
        const btn = document.getElementById('join-session-btn');
        if (btn) btn.textContent = 'SESSION ACTIVE - JOIN NOW';
      }
    }
  }, 1000);
}
