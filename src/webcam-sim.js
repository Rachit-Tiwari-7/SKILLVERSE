// Canvas Call & Webcam Simulator for WebRTC demo
const activeLoops = new Map();

export function startWebcamSim(canvas, type = 'local', stateObj = { muted: false, cameraOn: true }) {
  if (!canvas) return;
  stopWebcamSim(canvas);

  const ctx = canvas.getContext('2d');
  let frame = 0;

  // Ensure canvas internal size matches client size
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 400;
    canvas.height = rect.height || 225;
  };
  resize();
  window.addEventListener('resize', resize);

  const drawLoop = () => {
    if (!document.body.contains(canvas)) {
      activeLoops.delete(canvas);
      window.removeEventListener('resize', resize);
      return;
    }

    frame++;
    const t = frame * 0.03;
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    if (type === 'local') {
      // 1. Grid Background
      ctx.strokeStyle = 'rgba(0, 173, 111, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Local Face Mesh Silhouette
      ctx.save();
      ctx.translate(w / 2, h / 2 + 10);
      // Subtle tilt/hover motion
      ctx.rotate(Math.sin(t * 1.5) * 0.05);

      // Draw head shape outline
      ctx.strokeStyle = '#00AD6F';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(0, 173, 111, 0.05)';
      ctx.beginPath();
      ctx.ellipse(0, -10, 45, 60, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#00AD6F';
      ctx.beginPath();
      ctx.arc(-15, -20, 6, 0, Math.PI * 2);
      ctx.arc(15, -20, 6, 0, Math.PI * 2);
      ctx.fill();

      // Tracking reticle crosshairs on eyes
      ctx.strokeStyle = 'rgba(255, 208, 40, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Left eye cross
      ctx.moveTo(-25, -20); ctx.lineTo(-5, -20);
      ctx.moveTo(-15, -30); ctx.lineTo(-15, -10);
      // Right eye cross
      ctx.moveTo(5, -20); ctx.lineTo(25, -20);
      ctx.moveTo(15, -30); ctx.lineTo(15, -10);
      ctx.stroke();

      // Smiling mouth
      ctx.strokeStyle = '#00AD6F';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 10, 15, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Shoulders outline
      ctx.strokeStyle = '#00AD6F';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(0, 173, 111, 0.03)';
      ctx.beginPath();
      ctx.moveTo(-80, 70);
      ctx.quadraticCurveTo(-60, 30, -30, 45);
      ctx.lineTo(30, 45);
      ctx.quadraticCurveTo(60, 30, 80, 70);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // 3. Audio Frequency wave (reactive to mute)
      if (!stateObj.muted) {
        ctx.strokeStyle = '#FFD028';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const waveY = h - 25;
        for (let x = 0; x < w; x++) {
          const amp = Math.sin(t * 10) * 8 + Math.cos(t * 22) * 4;
          // React to simulated volume spike
          const vol = 1.0 + Math.sin(t) * 0.8;
          const yOffset = Math.sin(x * 0.05 - t * 8) * amp * vol * Math.sin(x / w * Math.PI);
          if (x === 0) ctx.moveTo(x, waveY + yOffset);
          else ctx.lineTo(x, waveY + yOffset);
        }
        ctx.stroke();
        
        ctx.font = '800 7px "Outfit", sans-serif';
        ctx.fillStyle = '#FFD028';
        ctx.fillText('AUDIO SIGNAL: STABLE', 15, h - 10);
      }

      // 4. Overlays & Indicators
      ctx.font = '900 8px "Outfit", monospace';
      ctx.fillStyle = '#00AD6F';
      ctx.fillText('🔴 REC', 15, 25);
      ctx.fillText('RESOL: 1280 x 720 @ 30FPS', 15, h - 35);
      ctx.fillText('SOURCE: WEBCAM_HD_FRONT', 15, h - 25);
      
      const dotsCount = Math.floor(frame / 10) % 4;
      ctx.fillText(`TRANSMITTING LOCAL VIDEO${'.'.repeat(dotsCount)}`, 15, 38);

    } else if (type === 'remote') {
      // Alex Chen's video feed
      // 1. Grid Background (Blue Theme)
      ctx.strokeStyle = 'rgba(46, 98, 246, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // 2. Remote Face silhouette
      ctx.save();
      ctx.translate(w / 2, h / 2 + 5);
      // Rotate head wiggles
      ctx.rotate(Math.sin(t * 1.1) * 0.04);

      ctx.strokeStyle = '#2E62F6';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(46, 98, 246, 0.08)';
      ctx.beginPath();
      // Ellipse head
      ctx.ellipse(0, -15, 42, 55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glasses (since Alex Chen is a coder)
      ctx.strokeStyle = '#FF4A4A';
      ctx.lineWidth = 2.5;
      // Left glass frame
      ctx.beginPath(); ctx.arc(-16, -20, 11, 0, Math.PI * 2); ctx.stroke();
      // Right glass frame
      ctx.beginPath(); ctx.arc(16, -20, 11, 0, Math.PI * 2); ctx.stroke();
      // Bridge
      ctx.beginPath(); ctx.moveTo(-5, -20); ctx.lineTo(5, -20); ctx.stroke();
      
      // Eyes inside glasses
      ctx.fillStyle = '#2E62F6';
      // Blink eyes dynamically
      const isBlinking = Math.sin(t * 2) > 0.96;
      if (!isBlinking) {
        ctx.beginPath();
        ctx.arc(-16, -20, 3, 0, Math.PI * 2);
        ctx.arc(16, -20, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2E62F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-20, -20); ctx.lineTo(-12, -20);
        ctx.moveTo(12, -20); ctx.lineTo(20, -20);
        ctx.stroke();
      }

      // Smiling mouth
      ctx.strokeStyle = '#2E62F6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 12, 12, 0.2, Math.PI - 0.2);
      ctx.stroke();

      // Remote shoulders
      ctx.strokeStyle = '#2E62F6';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(46, 98, 246, 0.05)';
      ctx.beginPath();
      ctx.moveTo(-75, 65);
      ctx.quadraticCurveTo(-55, 25, -25, 40);
      ctx.lineTo(25, 40);
      ctx.quadraticCurveTo(55, 25, 75, 65);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // 3. Audio signal from remote peer (simulate talk waves)
      ctx.strokeStyle = '#00AD6F';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const waveY = h - 25;
      for (let x = 0; x < w; x++) {
        // High frequency active talking shape
        const talkVolume = Math.max(0, Math.sin(t * 0.8) * 1.5 + 0.3);
        const yOffset = Math.sin(x * 0.09 - t * 12) * (Math.sin(t * 18) * 5) * talkVolume * Math.sin(x / w * Math.PI);
        if (x === 0) ctx.moveTo(x, waveY + yOffset);
        else ctx.lineTo(x, waveY + yOffset);
      }
      ctx.stroke();

      // 4. Overlays & Stats
      ctx.font = '900 8px "Outfit", monospace';
      ctx.fillStyle = '#2E62F6';
      ctx.fillText('📡 PEER FEED: ALEX CHEN', 15, 25);
      ctx.fillText('LATENCY: 12ms', 15, h - 35);
      ctx.fillText('PACKET LOSS: 0.0%', 15, h - 25);
      
      const dotsCount = Math.floor(frame / 10) % 4;
      ctx.fillText(`RECEIVING INCOMING FEED${'.'.repeat(dotsCount)}`, 15, 38);

    } else if (type === 'screenshare') {
      // Wireframe Sandbox / Sharing UI Screen
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(255, 208, 40, 0.08)';
      ctx.lineWidth = 1;
      const step = 15;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Drawing stylized UI mock blueprint blocks
      ctx.strokeStyle = '#FFD028';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 208, 40, 0.03)';
      
      // Wireframe browser window frame
      ctx.strokeRect(20, 20, w - 40, h - 40);
      
      // Header bar
      ctx.beginPath();
      ctx.moveTo(20, 45);
      ctx.lineTo(w - 20, 45);
      ctx.stroke();

      // Close/Minimize/Maximize dots
      ctx.fillStyle = '#FF4A4A';
      ctx.beginPath(); ctx.arc(35, 32, 3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#FFD028';
      ctx.beginPath(); ctx.arc(47, 32, 3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#00AD6F';
      ctx.beginPath(); ctx.arc(59, 32, 3, 0, Math.PI*2); ctx.fill();

      // Draw flow diagram nodes
      const nodeX1 = w / 2 - 60;
      const nodeX2 = w / 2 + 60;
      const nodeY = h / 2 - 10;
      
      // Node 1: "Landing UI"
      ctx.strokeStyle = '#2E62F6';
      ctx.strokeRect(nodeX1 - 35, nodeY - 15, 70, 30);
      ctx.font = '800 6px "Outfit", sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('LANDING COMP', nodeX1, nodeY + 3);

      // Node 2: "User Auth"
      ctx.strokeStyle = '#00AD6F';
      ctx.strokeRect(nodeX2 - 35, nodeY - 15, 70, 30);
      ctx.fillStyle = '#fff';
      ctx.fillText('AUTH ROUTE', nodeX2, nodeY + 3);

      // Connection arrow
      ctx.strokeStyle = '#FFD028';
      ctx.beginPath();
      ctx.moveTo(nodeX1 + 35, nodeY);
      ctx.lineTo(nodeX2 - 35, nodeY);
      ctx.stroke();
      
      // Arrowhead
      ctx.fillStyle = '#FFD028';
      ctx.beginPath();
      ctx.moveTo(nodeX2 - 35, nodeY);
      ctx.lineTo(nodeX2 - 40, nodeY - 4);
      ctx.lineTo(nodeX2 - 40, nodeY + 4);
      ctx.fill();

      // Floating particles simulating code flow
      const px = nodeX1 + 35 + ((frame * 2.5) % 50);
      ctx.fillStyle = '#FF4A4A';
      ctx.beginPath();
      ctx.arc(px, nodeY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Scrolling console log lines at the bottom
      ctx.fillStyle = '#94a3b8';
      ctx.font = '400 6px monospace';
      ctx.textAlign = 'left';
      const logLines = [
        `> npm run dev --host`,
        `> [vite] Hot Module Replacement active`,
        `> GET /api/v1/user/auth - 200 OK (${Math.floor(Math.sin(t)*10 + 40)}ms)`,
        `> WebSocket connected: wss://skillverse/live`
      ];
      const activeLineIdx = Math.floor(frame / 60) % logLines.length;
      for (let i = 0; i <= activeLineIdx; i++) {
        ctx.fillText(logLines[i], 30, h - 35 + (i * 7));
      }

      // Title header share
      ctx.font = '900 8px "Outfit", monospace';
      ctx.fillStyle = '#FFD028';
      ctx.fillText('🖥️ SCREEN SHARE: PORTFOLIO FIGMA BLUEPRINT', 80, 35);
    }

    // 5. Global Glitch/Scanline effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    const scanlineY = Math.floor(frame * 1.5) % h;
    ctx.fillRect(0, scanlineY, w, 2);

    if (frame % 80 < 5) {
      // Glitch bar overlay
      ctx.fillStyle = 'rgba(0, 173, 111, 0.05)';
      ctx.fillRect(0, Math.random() * h, w, 15);
    }

    const nextId = requestAnimationFrame(drawLoop);
    activeLoops.set(canvas, nextId);
  };

  drawLoop();
}

export function stopWebcamSim(canvas) {
  if (!canvas) return;
  const loopId = activeLoops.get(canvas);
  if (loopId) {
    cancelAnimationFrame(loopId);
    activeLoops.delete(canvas);
  }
}
