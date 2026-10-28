/**
 * ============================================================================
 * NAMEET KUMAR BEHERA — ULTRA-PREMIUM 3D PORTFOLIO ENGINE
 * Technologies: Three.js (WebGL 3D), GSAP 3 + ScrollTrigger, Vanilla JavaScript
 * Features:
 *  - Interactive 3D Spatial WebGL Universe (Background particle cosmos)
 *  - Hero 3D Quantum Gyroscope Core with 360° Drag & Pointer Parallax
 *  - Rakshak AI 3D AI Sentinel Radar Scanner with Live Sweep Beam
 *  - Dual-Mode Hero Visual Stage (3D Quantum Core / Developer Photo ID)
 *  - GSAP ScrollTrigger Orchestrated Section & Card Reveals
 *  - Magnetic Button Physics for CTAs & Social Channels
 *  - Dynamic 3D Card Tilt with Specular Spotlight Highlights
 *  - Custom Cyber Magnetic Cursor with Spring Lag Follower
 *  - Live IST Clock, Contact REST API + Mailto Fallback, Toast System
 *  - Graceful Fallback if WebGL is unavailable + Reduced Motion Support
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 0. CAPABILITY & PREFERENCE GUARDS
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;

  function isWebGLSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const webglAvailable = isWebGLSupported() && typeof THREE !== 'undefined';

  // --------------------------------------------------------------------------
  // 1. CLEAN URL & SMOOTH SCROLLING
  // --------------------------------------------------------------------------
  function cleanUrlHash() {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    cleanUrlHash();
  });

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

  // --------------------------------------------------------------------------
  // 2. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileContactBtn = document.getElementById('mobile-contact-btn');

  function toggleMobileMenu() {
    if (!mobileDrawer || !mobileToggle) return;
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileToggle.classList.toggle('open', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  if (mobileContactBtn) mobileContactBtn.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. SCROLL-SPY & SIDE-DOT SYNC
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 4. LIVE IST CLOCK (BANGALORE, KARNATAKA)
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 6. COPY EMAIL BUTTON
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'nameetbehera6@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Copied nameetbehera6@gmail.com to clipboard!');
        }).catch(() => {
          showToast('Email: nameetbehera6@gmail.com');
        });
      } else {
        showToast('Email: nameetbehera6@gmail.com');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM HANDLER (REST API + MAILTO FALLBACK)
  // --------------------------------------------------------------------------
  window.handleFormSubmit = async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const subjectInput = document.getElementById('msg-subject');
    const bodyInput = document.getElementById('msg-body');
    const sendBtn = document.getElementById('send-msg-btn');
    const statusBox = document.getElementById('form-status');

    if (!nameInput || !emailInput || !bodyInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : '';
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
      // Graceful fallback to mailto URI (e.g. for static GitHub Pages)
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
  };

  // --------------------------------------------------------------------------
  // 8. TOP SCROLL PROGRESS BAR
  // --------------------------------------------------------------------------
  function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // --------------------------------------------------------------------------
  // 9. CUSTOM CYBER MAGNETIC CURSOR (DESKTOP)
  // --------------------------------------------------------------------------
  function initCustomCursor() {
    if (isTouchDevice) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    // Spring lag follower for ring
    function renderRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Expand cursor on interactive elements
    const interactiveSelectors = 'a, button, input, textarea, canvas, .stage-tab, .glass-card, [role="button"], [data-magnetic="true"]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.remove('active');
      }
    });
  }

  initCustomCursor();

  // --------------------------------------------------------------------------
  // 10. MAGNETIC BUTTON PHYSICS
  // --------------------------------------------------------------------------
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    const magneticElements = document.querySelectorAll('[data-magnetic="true"]');

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;

        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  initMagneticButtons();

  // --------------------------------------------------------------------------
  // 11. DYNAMIC 3D CARD TILT WITH SPECULAR GLOW
  // --------------------------------------------------------------------------
  function init3DCardTilt() {
    const tiltCards = document.querySelectorAll('.glass-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (!isTouchDevice && !prefersReducedMotion && card.hasAttribute('data-tilt')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = -((y - centerY) / centerY) * 5.5;
          const rotateY = ((x - centerX) / centerX) * 5.5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!isTouchDevice && !prefersReducedMotion && card.hasAttribute('data-tilt')) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
      });
    });
  }

  init3DCardTilt();

  // --------------------------------------------------------------------------
  // 12. HERO DUAL-MODE STAGE SWITCHER (3D CORE / PHOTO ID)
  // --------------------------------------------------------------------------
  function initHeroStageSwitcher() {
    const tab3D = document.getElementById('tab-3d-core');
    const tabPhoto = document.getElementById('tab-photo-id');
    const view3D = document.getElementById('view-3d-core');
    const viewPhoto = document.getElementById('view-photo-id');

    if (!tab3D || !tabPhoto || !view3D || !viewPhoto) return;

    tab3D.addEventListener('click', () => {
      tab3D.classList.add('active');
      tab3D.setAttribute('aria-selected', 'true');
      tabPhoto.classList.remove('active');
      tabPhoto.setAttribute('aria-selected', 'false');

      view3D.classList.add('active');
      viewPhoto.classList.remove('active');
    });

    tabPhoto.addEventListener('click', () => {
      tabPhoto.classList.add('active');
      tabPhoto.setAttribute('aria-selected', 'true');
      tab3D.classList.remove('active');
      tab3D.setAttribute('aria-selected', 'false');

      viewPhoto.classList.add('active');
      view3D.classList.remove('active');
    });
  }

  initHeroStageSwitcher();

  // --------------------------------------------------------------------------
  // 13. THREE.JS ENGINE 1: 3D SPATIAL UNIVERSE BACKGROUND
  // --------------------------------------------------------------------------
  function init3DUniverse() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas || !webglAvailable) {
      // Fall back to 2D canvas
      const fallback = document.getElementById('live-wallpaper-canvas');
      if (fallback) {
        fallback.style.display = 'block';
        init2DFallbackWallpaper();
      }
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle cosmos geometry
    const particleCount = window.innerWidth < 768 ? 650 : 1300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#c084fc'), // Cyber lavender
      new THREE.Color('#38bdf8'), // Neon cyan
      new THREE.Color('#ffffff'), // Crisp white
      new THREE.Color('#ff3b30')  // Brand crimson
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture generator
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.75)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating subtle geometric polyhedrons
    const polyGroup = new THREE.Group();
    const polyCount = window.innerWidth < 768 ? 4 : 8;
    const polyMeshes = [];

    for (let i = 0; i < polyCount; i++) {
      const polyGeo = Math.random() > 0.5
        ? new THREE.OctahedronGeometry(Math.random() * 8 + 4)
        : new THREE.IcosahedronGeometry(Math.random() * 7 + 4);

      const polyMat = new THREE.MeshBasicMaterial({
        color: palette[i % palette.length],
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });

      const mesh = new THREE.Mesh(polyGeo, polyMat);
      mesh.position.set(
        (Math.random() - 0.5) * 1100,
        (Math.random() - 0.5) * 1100,
        (Math.random() - 0.5) * 600
      );
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.015,
        rotY: (Math.random() - 0.5) * 0.015
      };
      polyGroup.add(mesh);
      polyMeshes.push(mesh);
    }
    scene.add(polyGroup);

    // Mouse coordinates tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    }, { passive: true });

    // Scroll depth tracking
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      scrollDepth = window.pageYOffset * 0.15;
    }, { passive: true });

    // Resize handler
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, { passive: true });

    // Visibility management
    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      if (!isTabActive) return;

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        particles.rotation.y += 0.0004;
        particles.rotation.x += 0.0002;

        polyMeshes.forEach(mesh => {
          mesh.rotation.x += mesh.userData.rotX;
          mesh.rotation.y += mesh.userData.rotY;
        });
      }

      camera.position.x = currentMouseX * 120;
      camera.position.y = -currentMouseY * 120;
      camera.position.z = 450 - (scrollDepth % 300);

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 14. THREE.JS ENGINE 2: HERO 3D QUANTUM GYROSCOPE CORE
  // --------------------------------------------------------------------------
  function initHero3DCore() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || !webglAvailable) return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Faceted Central Quantum Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x120826,
      roughness: 0.18,
      metalness: 0.88,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.45,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.38, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 2. Gimbal Rings
    // Ring 1 (Inner Torus)
    const ring1Geo = new THREE.TorusGeometry(1.95, 0.038, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xc084fc,
      emissiveIntensity: 0.35
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    // Ring 2 (Middle Torus, inclined 55 deg)
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.032, 16, 90);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.2;
    coreGroup.add(ring2);

    // Ring 3 (Outer Torus, inclined -45 deg)
    const ring3Geo = new THREE.TorusGeometry(2.85, 0.026, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      metalness: 0.85,
      roughness: 0.3,
      emissive: 0xff3b30,
      emissiveIntensity: 0.4
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    // 3. Orbiting Satellite Telemetry Beads on Outer Ring
    const satellites = [];
    const satCount = 3;
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      coreGroup.add(sat);
      satellites.push({
        mesh: sat,
        angle: (i * (Math.PI * 2)) / satCount,
        speed: 0.018 + i * 0.005,
        radius: 2.85
      });
    }

    // 4. Floating Micro-dust Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 7.5;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 7.5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.65
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    coreGroup.add(dustPoints);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x221133, 1.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    cyanLight.position.set(4, 5, 4);
    scene.add(cyanLight);

    const lavenderLight = new THREE.DirectionalLight(0xc084fc, 2.0);
    lavenderLight.position.set(-4, -4, 3);
    scene.add(lavenderLight);

    const pointLight = new THREE.PointLight(0xff3b30, 2.2, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 6. Interactive Drag & Mouse Orientation
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    let targetRotX = 0;
    let targetRotY = 0;

    function onPointerDown(e) {
      isDragging = true;
      previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      dragVelocityX = 0;
      dragVelocityY = 0;
    }

    function onPointerMove(e) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;

        dragVelocityX = deltaX * 0.008;
        dragVelocityY = deltaY * 0.008;

        coreGroup.rotation.y += dragVelocityX;
        coreGroup.rotation.x += dragVelocityY;

        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        // Subtle hover tilt
        const rect = container.getBoundingClientRect();
        const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        targetRotY = normX * 0.45;
        targetRotX = -normY * 0.45;
      }
    }

    function onPointerUp() {
      isDragging = false;
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    function handleResize() {
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause when hero is off-screen
    let isHeroVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    heroObserver.observe(container);

    // Animation Loop
    let time = 0;
    function animateCore() {
      requestAnimationFrame(animateCore);
      if (!isHeroVisible || document.hidden) return;

      time += 0.02;

      if (!isDragging) {
        // Inertia damping
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        coreGroup.rotation.y += dragVelocityX;
        coreGroup.rotation.x += dragVelocityY;

        // Autonomous rotation & organic tilt
        if (!prefersReducedMotion) {
          coreGroup.rotation.y += 0.007;
          coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;
          coreGroup.rotation.z = Math.sin(time * 0.4) * 0.1;

          ring1.rotation.x += 0.015;
          ring1.rotation.y += 0.008;

          ring2.rotation.y += 0.012;
          ring2.rotation.z += 0.009;

          ring3.rotation.z += 0.01;
          ring3.rotation.x -= 0.007;

          coreMesh.rotation.y -= 0.005;
          wireMesh.rotation.y += 0.008;
        }
      }

      // Orbiting satellites
      satellites.forEach(sat => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 2) * 0.4;
      });

      // Pulse core lighting
      pointLight.intensity = 1.8 + Math.sin(time * 2.5) * 0.8;

      renderer.render(scene, camera);
    }

    animateCore();
  }

  // --------------------------------------------------------------------------
  // 15. THREE.JS ENGINE 3: RAKSHAK AI 3D SENTINEL RADAR SCANNER
  // --------------------------------------------------------------------------
  function initRakshak3DRadar() {
    const canvas = document.getElementById('rakshak-3d-canvas');
    if (!canvas || !webglAvailable) return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 195;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const radarGroup = new THREE.Group();
    scene.add(radarGroup);

    // 1. Concentric Horizontal Radar Grid Rings
    const ringRadii = [1.0, 1.8, 2.6];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.02, r, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 2 ? 0x10b981 : (idx === 1 ? 0x38bdf8 : 0xc084fc),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 + idx * 0.1
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      radarGroup.add(ringMesh);
    });

    // Crosshairs
    const lineMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.25 });
    const crossPoints = [
      new THREE.Vector3(-2.8, 0, 0), new THREE.Vector3(2.8, 0, 0),
      new THREE.Vector3(0, 0, -2.8), new THREE.Vector3(0, 0, 2.8)
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossLines = new THREE.LineSegments(crossGeo, lineMat);
    radarGroup.add(crossLines);

    // 2. Central AI Surveillance Sensor Core Head
    const sensorBaseGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.2, 32);
    const sensorBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      metalness: 0.9,
      roughness: 0.2
    });
    const sensorBase = new THREE.Mesh(sensorBaseGeo, sensorBaseMat);
    radarGroup.add(sensorBase);

    const sensorOrbGeo = new THREE.SphereGeometry(0.38, 32, 16);
    const sensorOrbMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x10b981,
      emissiveIntensity: 0.3
    });
    const sensorOrb = new THREE.Mesh(sensorOrbGeo, sensorOrbMat);
    sensorOrb.position.y = 0.25;
    radarGroup.add(sensorOrb);

    // Eye Scanner Lens
    const lensGeo = new THREE.CircleGeometry(0.18, 32);
    const lensMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0, 0.25, 0.38);
    radarGroup.add(lens);

    // 3. Rotating Radar Sweep Beam (Pie sector wedge)
    const sweepGeo = new THREE.RingGeometry(0.1, 2.65, 32, 1, 0, Math.PI / 3.5);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    sweepMesh.rotation.x = Math.PI / 2;
    radarGroup.add(sweepMesh);

    // 4. Target Anomaly Detection Markers (Pulsing Blips)
    const targets = [
      { x: 1.4, z: -1.2, color: 0xff3b30, label: 'ANOMALY' },
      { x: -1.6, z: 0.8, color: 0x38bdf8, label: 'ZONE_A' },
      { x: 0.9, z: 1.7, color: 0x10b981, label: 'PATROL' }
    ];

    const targetMeshes = [];
    targets.forEach(t => {
      const tGeo = new THREE.RingGeometry(0.08, 0.14, 16);
      const tMat = new THREE.MeshBasicMaterial({
        color: t.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const tMesh = new THREE.Mesh(tGeo, tMat);
      tMesh.rotation.x = Math.PI / 2;
      tMesh.position.set(t.x, 0.02, t.z);
      radarGroup.add(tMesh);
      targetMeshes.push(tMesh);
    });

    // Lights
    const radarAmbient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(radarAmbient);

    const radarSpot = new THREE.PointLight(0x10b981, 2.5, 6);
    radarSpot.position.set(0, 1.5, 0);
    scene.add(radarSpot);

    // Drag to inspect radar
    let isRadarDragging = false;
    let prevX = 0;
    let radarVelX = 0;

    canvas.addEventListener('mousedown', (e) => {
      isRadarDragging = true;
      prevX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (isRadarDragging) {
        const delta = e.clientX - prevX;
        radarVelX = delta * 0.008;
        radarGroup.rotation.y += radarVelX;
        prevX = e.clientX;
      }
    }, { passive: true });

    window.addEventListener('mouseup', () => {
      isRadarDragging = false;
    });

    // Touch support for radar
    canvas.addEventListener('touchstart', (e) => {
      isRadarDragging = true;
      prevX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isRadarDragging && e.touches[0]) {
        const delta = e.touches[0].clientX - prevX;
        radarVelX = delta * 0.008;
        radarGroup.rotation.y += radarVelX;
        prevX = e.touches[0].clientX;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isRadarDragging = false;
    });

    // Visibility Observer
    let isRadarVisible = true;
    const radarObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isRadarVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    radarObserver.observe(container);

    function onRadarResize() {
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 195;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onRadarResize, { passive: true });

    // Radar Loop
    let sweepAngle = 0;
    let radarTime = 0;
    function animateRadar() {
      requestAnimationFrame(animateRadar);
      if (!isRadarVisible || document.hidden) return;

      radarTime += 0.03;

      if (!isRadarDragging) {
        radarVelX *= 0.95;
        radarGroup.rotation.y += radarVelX;
      }

      if (!prefersReducedMotion) {
        sweepAngle += 0.028;
        sweepMesh.rotation.z = sweepAngle;
        sensorOrb.rotation.y = sweepAngle;

        // Pulse targets
        targetMeshes.forEach((tm, idx) => {
          const s = 1.0 + Math.sin(radarTime * 3 + idx) * 0.35;
          tm.scale.set(s, s, s);
        });
      }

      renderer.render(scene, camera);
    }

    animateRadar();
  }

  // --------------------------------------------------------------------------
  // 16. GSAP 3 & SCROLLTRIGGER ORCHESTRATION
  // --------------------------------------------------------------------------
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    heroTl
      .from('.site-header', { y: -40, opacity: 0, duration: 0.7 })
      .from('.hero-status-row .pill-badge', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.3')
      .from('.hero-title', { y: 30, opacity: 0, duration: 0.9 }, '-=0.5')
      .from('.hero-description', { y: 20, opacity: 0 }, '-=0.6')
      .from('.hero-cta-group .btn', { y: 20, opacity: 0, stagger: 0.15 }, '-=0.5')
      .from('.hero-stats-panel', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('#hero-stage-card', { y: 40, opacity: 0, duration: 1.0 }, '-=0.8');

    // Section Scroll Reveals
    if (typeof ScrollTrigger !== 'undefined') {
      const scrollSections = ['#about', '#skills', '#projects', '#contact'];

      scrollSections.forEach((secId) => {
        const sec = document.querySelector(secId);
        if (!sec) return;

        gsap.from(sec.querySelectorAll('.section-tag, .section-title'), {
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      });

      // Bento about cards
      gsap.from('.about-bio-card, .details-panel', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%'
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Skills cards cascade
      gsap.from('.skills-grid .skill-card', {
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 75%'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Project cards
      gsap.from('.featured-project-card', {
        scrollTrigger: {
          trigger: '.featured-project-card',
          start: 'top 80%'
        },
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from('.secondary-projects-grid .future-project-card', {
        scrollTrigger: {
          trigger: '.secondary-projects-grid',
          start: 'top 80%'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Contact Grid
      gsap.from('.contact-info-card, .contact-form-card', {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 78%'
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }

  // --------------------------------------------------------------------------
  // 17. 2D FALLBACK WALLPAPER ENGINE (If WebGL is unavailable)
  // --------------------------------------------------------------------------
  function init2DFallbackWallpaper() {
    const canvas = document.getElementById('live-wallpaper-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];
      const count = window.innerWidth < 768 ? 60 : 120;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.8 + 0.3
        });
      }
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function render2D() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';

      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render2D);
    }
    render2D();
  }

  // --------------------------------------------------------------------------
  // 18. INITIALIZE ALL ENGINES
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    init3DUniverse();
    initHero3DCore();
    initRakshak3DRadar();
    initGSAPAnimations();
  });

})();
