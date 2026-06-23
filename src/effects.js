// Neo-brutalist Particle & Confetti Engine
let canvas = null;
let ctx = null;
let particles = [];
let animationFrameId = null;

const COLORS = ['#FFD028', '#FF4A4A', '#2E62F6', '#00AD6F'];

class Particle {
  constructor(x, y, isConfetti = false) {
    this.x = x;
    this.y = y;
    this.size = isConfetti ? Math.random() * 8 + 8 : Math.random() * 6 + 4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.shape = Math.random() > 0.5 ? 'square' : 'circle';
    
    // Physics
    const angle = isConfetti 
      ? (x < window.innerWidth / 2 ? -Math.PI / 4 - Math.random() * 0.2 : -3 * Math.PI / 4 + Math.random() * 0.2)
      : Math.random() * Math.PI * 2;
    
    const speed = isConfetti ? Math.random() * 12 + 10 : Math.random() * 4 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (isConfetti ? 4 : 0); // initial upward boost
    
    this.gravity = isConfetti ? 0.35 : 0.15;
    this.friction = 0.98;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    this.alpha = 1.0;
    this.fade = isConfetti ? 0.008 + Math.random() * 0.005 : 0.02 + Math.random() * 0.01;
    this.isConfetti = isConfetti;
  }

  update() {
    this.vx *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.alpha -= this.fade;
  }

  draw() {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw solid fill
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    if (this.shape === 'square') {
      ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }
}

export function initEffects() {
  if (canvas) return;
  
  canvas = document.createElement('canvas');
  canvas.id = 'skillverse-effects-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  tick();
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function tick() {
  if (!canvas || !ctx) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.alpha <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
      particles.splice(i, 1);
    }
  }
  
  animationFrameId = requestAnimationFrame(tick);
}

// Sparkle burst at specific client coordinates
export function triggerSparkles(x, y) {
  initEffects();
  const count = 12;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, false));
  }
}

// Confetti blast from corners
export function triggerConfetti() {
  initEffects();
  const count = 60;
  
  // Left corner launch
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(50, window.innerHeight - 50, true));
  }
  
  // Right corner launch
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(window.innerWidth - 50, window.innerHeight - 50, true));
  }
}

// Celebrate from the center
export function triggerSuccessParticles() {
  initEffects();
  const count = 80;
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2 - 50;
  
  for (let i = 0; i < count; i++) {
    const p = new Particle(x, y, true);
    // Overwrite speeds for a circular fireworks effect
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 2;
    particles.push(p);
  }
}
