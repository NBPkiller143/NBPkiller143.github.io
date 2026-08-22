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

// 9. Interactive Live Wallpaper Engine (Canvas Cyber Constellations & Particles)
function initLiveWallpaper() {
  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 65;
  const maxDistance = 135;

  let mouse = {
    x: null,
    y: null,
    radius: 160
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.color = Math.random() > 0.6 ? 'rgba(192, 132, 252, ' : (Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(255, 255, 255, ');
      this.alpha = Math.random() * 0.35 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactive attraction & gentle repulsion field
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 1.5;
          const dirY = (dy / dist) * force * 1.5;
          this.x += dirX;
          this.y += dirY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color + '0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw particle connection lines
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    // Connect to mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const opacity = (1 - dist / mouse.radius) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.9;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener('DOMContentLoaded', initLiveWallpaper);
