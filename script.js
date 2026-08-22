/**
 * Nameet Behera — Portfolio Interactive Scripts
 * Pure Vanilla JavaScript
 */

// 1. Clean URL Handler (Removes #hash and keeps URL clean)
function cleanUrlHash() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  cleanUrlHash();
});

// Smooth scroll without altering browser URL with hash tags
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  
  const targetId = anchor.getAttribute('href').replace('#', '');
  if (!targetId) return;

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    e.preventDefault();
    const headerHeight = 74;
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (targetId === 'home' ? 120 : headerHeight + 10);
    
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });

    cleanUrlHash();
  }
});

// 2. Mobile Drawer Navigation
const mobileToggle = document.getElementById('mobile-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const mobileContactBtn = document.getElementById('mobile-contact-btn');

function toggleMobileMenu() {
  const isOpen = mobileDrawer.classList.toggle('open');
  mobileToggle.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileDrawer.classList.remove('open');
  mobileToggle.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
if (mobileContactBtn) mobileContactBtn.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
    closeMobileMenu();
  }
});

// 3. Scroll-Spy & Side-Dot Sync
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
const sideNavItems = document.querySelectorAll('.side-nav-item');

function updateActiveNavOnScroll() {
  const scrollY = window.pageYOffset;
  let currentSectionId = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  desktopNavLinks.forEach(link => {
    const target = link.getAttribute('data-nav');
    if (target === currentSectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  sideNavItems.forEach(item => {
    const target = item.getAttribute('data-section');
    if (target === currentSectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
window.addEventListener('DOMContentLoaded', updateActiveNavOnScroll);

// 4. Live IST Clock (Bangalore, Karnataka)
function updateLiveIST() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;
  
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
}

setInterval(updateLiveIST, 1000);
updateLiveIST();

// 5. Toast Notification System
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toastMsg.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// 6. Copy Email Button
const copyBtn = document.getElementById('copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = 'nameetbehera6@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied nameetbehera6@gmail.com to clipboard!');
    }).catch(() => {
      showToast('Email: nameetbehera6@gmail.com');
    });
  });
}

// 7. Contact Form Handler (Backend API + In-Form Status + Mailto Fallback)
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const subjectInput = document.getElementById('msg-subject');
  const bodyInput = document.getElementById('msg-body');
  const sendBtn = document.getElementById('send-msg-btn');
  const statusBox = document.getElementById('form-status');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const body = bodyInput.value.trim();

  if (!name || !email || !body) {
    if (statusBox) {
      statusBox.className = 'form-status-box error';
      statusBox.style.display = 'flex';
      statusBox.innerHTML = '<span>⚠️ Please fill in all required fields.</span>';
    }
    return;
  }

  const payload = { name, email, subject: subject || 'Portfolio Inquiry', message: body };

  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
      <span class="green-dot" style="display:inline-block; margin-right:6px;"></span>
      DISPATCHING...
    `;
  }
  
  if (statusBox) {
    statusBox.style.display = 'none';
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      if (statusBox) {
        statusBox.className = 'form-status-box success';
        statusBox.style.display = 'flex';
        statusBox.innerHTML = `<span>✓ Message dispatched successfully! Thanks <strong>${name}</strong>, I'll get back to you shortly.</span>`;
      }
      showToast(`Inquiry sent! Thanks ${name}`);
      document.getElementById('contact-form').reset();
      
      if (sendBtn) {
        sendBtn.innerHTML = 'MESSAGE SENT ✓';
        sendBtn.style.backgroundColor = '#10b981';
        sendBtn.style.color = '#ffffff';
        setTimeout(() => {
          sendBtn.innerHTML = 'SEND MESSAGE ↗';
          sendBtn.style.backgroundColor = '';
          sendBtn.style.color = '';
        }, 4000);
      }
    } else {
      throw new Error(result.message || 'API error');
    }
  } catch (err) {
    console.warn('API submission notice:', err);
    // Fallback to mailto link if offline or direct file:// access
    const formattedBody = `Hello Nameet,\n\n${body}\n\nFrom: ${name} (${email})`;
    const mailtoUri = `mailto:nameetbehera6@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formattedBody)}`;
    
    if (statusBox) {
      statusBox.className = 'form-status-box success';
      statusBox.style.display = 'flex';
      statusBox.innerHTML = `<span>✓ Opening email client to send to <strong>nameetbehera6@gmail.com</strong>...</span>`;
    }
    
    window.location.href = mailtoUri;
    showToast('Opening your email app to send...');
    
    if (sendBtn) {
      sendBtn.innerHTML = 'SEND MESSAGE ↗';
    }
  } finally {
    if (sendBtn) {
      sendBtn.disabled = false;
    }
  }
}

// 8. Dynamic Mouse Spotlight Effect for Glass Cards
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 9. Interactive Live Wallpaper Engine: Continuous Falling Stars & Shooting Meteor Shower
function initLiveWallpaper() {
  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let staticStars = [];
  let fallingStars = [];
  let meteors = [];

  const staticStarCount = window.innerWidth < 768 ? 70 : 130;
  const fallingStarCount = window.innerWidth < 768 ? 40 : 85;

  let mouse = {
    x: null,
    y: null,
    radius: 180
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  }

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Spawn subtle stardust sparks on fast mouse movement
    if (Math.random() > 0.4) {
      fallingStars.push(new FallingStar(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40, true));
    }
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // 1. Distant Twinkling Star
  class StaticStar {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.5;
      this.baseAlpha = Math.random() * 0.6 + 0.2;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.phase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.7 ? '#c084fc' : (Math.random() > 0.4 ? '#38bdf8' : '#ffffff');
    }

    draw(time) {
      const alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed + this.phase) * 0.25;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.08, Math.min(1, alpha));
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }

  // 2. Continuous Cascading Falling Star with Light Trail
  class FallingStar {
    constructor(x, y, isSpark = false) {
      this.isSpark = isSpark;
      this.reset(x, y);
    }

    reset(customX, customY) {
      this.x = customX !== undefined ? customX : Math.random() * (width + 300) - 150;
      this.y = customY !== undefined ? customY : (this.isSpark ? customY : Math.random() * -height);
      
      this.speed = Math.random() * 2.8 + 1.6;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.15; // ~45 deg elegant diagonal fall
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;

      this.length = Math.random() * 45 + 20;
      this.size = Math.random() * 1.6 + 0.8;
      this.opacity = Math.random() * 0.65 + 0.35;
      
      const randColor = Math.random();
      if (randColor > 0.65) {
        this.headColor = '#ffffff';
        this.tailColor = 'rgba(192, 132, 252, '; // Lavender
      } else if (randColor > 0.35) {
        this.headColor = '#ffffff';
        this.tailColor = 'rgba(56, 189, 248, '; // Cyan
      } else {
        this.headColor = '#ffffff';
        this.tailColor = 'rgba(255, 255, 255, '; // Pure White
      }
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      // Mouse subtle gravitational deflection
      if (mouse.x !== null && mouse.y !== null) {
        const distX = mouse.x - this.x;
        const distY = mouse.y - this.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (distX / dist) * force * 1.8;
          this.y += (distY / dist) * force * 1.8;
        }
      }

      // Reset when falling out of bounds
      if (this.y > height + 60 || this.x > width + 100 || this.x < -100) {
        if (this.isSpark) {
          return false; // remove spark
        } else {
          this.reset(Math.random() * (width + 300) - 150, Math.random() * -80);
        }
      }
      return true;
    }

    draw() {
      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, this.tailColor + '0)');
      grad.addColorStop(0.7, this.tailColor + (this.opacity * 0.4) + ')');
      grad.addColorStop(1, this.headColor);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing star head point
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = this.headColor;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // 3. Fast Radiant Shooting Meteor
  class Meteor {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (width * 0.8);
      this.y = Math.random() * (height * 0.35) - 60;
      this.speed = Math.random() * 8 + 7;
      this.angle = Math.PI / 4.2;
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;
      this.length = Math.random() * 120 + 90;
      this.size = Math.random() * 2.2 + 1.4;
      this.opacity = 1.0;
      this.fade = Math.random() * 0.015 + 0.008;
      this.alive = true;
      this.color = Math.random() > 0.5 ? 'rgba(192, 132, 252, ' : 'rgba(56, 189, 248, ';
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;
      this.opacity -= this.fade;

      if (this.opacity <= 0 || this.y > height + 100 || this.x > width + 100) {
        this.alive = false;
      }
    }

    draw() {
      if (!this.alive || this.opacity <= 0) return;

      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, this.color + '0)');
      grad.addColorStop(0.5, this.color + (this.opacity * 0.6) + ')');
      grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Bright meteor core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initStars() {
    staticStars = [];
    fallingStars = [];
    meteors = [];

    for (let i = 0; i < staticStarCount; i++) {
      staticStars.push(new StaticStar());
    }

    for (let i = 0; i < fallingStarCount; i++) {
      fallingStars.push(new FallingStar(Math.random() * width, Math.random() * height));
    }
  }

  resize();

  // Periodic Shooting Meteor Spawner
  let lastMeteorTime = 0;
  function maybeSpawnMeteor(currentTime) {
    if (currentTime - lastMeteorTime > (Math.random() * 2500 + 2000)) {
      if (meteors.length < 3) {
        meteors.push(new Meteor());
      }
      lastMeteorTime = currentTime;
    }
  }

  let time = 0;
  function animate(currentTime = 0) {
    time += 1;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw static twinkling starfield
    staticStars.forEach(star => star.draw(time));

    // 2. Update and draw continuous falling stars
    fallingStars = fallingStars.filter(star => {
      const active = star.update();
      if (active) star.draw();
      return active;
    });

    // 3. Spawn and draw radiant shooting meteors
    maybeSpawnMeteor(currentTime);
    meteors = meteors.filter(meteor => {
      meteor.update();
      meteor.draw();
      return meteor.alive;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener('DOMContentLoaded', initLiveWallpaper);
