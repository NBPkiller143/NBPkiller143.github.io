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
