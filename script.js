/**
 * ============================================================================
 * NAMEET KUMAR BEHERA — SPATIAL 3D PORTFOLIO ENGINE
 * Inspired by the creative direction & spatial storytelling of why.zero.university
 * Technologies: Three.js (WebGL 3D), GSAP 3 + ScrollTrigger, Vanilla ES6+
 * Features:
 *  - Interactive 3D Spatial Universe (Obsidian & Emerald Cosmos Particles)
 *  - Hero 3D Monolithic Spatial Portal & Gyroscope Core (360° Drag & Pointer Tilt)
 *  - Rakshak AI 3D Sentinel Radar Scanner (Live Sweep Beam & Anomaly Markers)
 *  - Dual-Mode Hero Visual Stage (3D Spatial Portal / Authentic Developer Identity)
 *  - 6-Section Dynamic Scroll-Spy & Side-Nav Telemetry Sync
 *  - GSAP ScrollTrigger Orchestrated Reveals (Process Steps, Projects, Bento Cards)
 *  - Magnetic Button Physics with Elastic Spring Dynamics
 *  - 3D Card Tilt with Specular Spotlight Coordinates
 *  - Cyber Magnetic Cursor with Spring Lag Follower
 *  - Live IST Clock (Bangalore), REST API Contact Dispatch + Mailto Fallback
 *  - Graceful Fallback if WebGL is unavailable + Full Reduced Motion Support
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
  // 3. 6-SECTION SCROLL-SPY & SIDE-DOT SYNC
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sideNavItems = document.querySelectorAll('.side-nav-item');

  function updateActiveNavOnScroll() {
    const scrollY = window.pageYOffset;
    let currentSectionId = 'home';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
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
    }, 3800);
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
  // 7. CONTACT FORM DISPATCHER (REST API + MAILTO FALLBACK)
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
    const serviceInput = document.getElementById('msg-service');
    const service = serviceInput ? serviceInput.value.trim() : '';
    const rawSubject = subjectInput ? subjectInput.value.trim() : '';
    const subject = rawSubject || (service ? `Inquiry: ${service}` : 'Portfolio Inquiry');
    const body = bodyInput.value.trim();

    if (!name || !email || !body) {
      if (statusBox) {
        statusBox.className = 'form-status-box error';
        statusBox.style.display = 'flex';
        statusBox.innerHTML = '<span>⚠️ Please fill in all required fields.</span>';
      }
      return;
    }

    const payload = { name, email, service: service || 'General', subject, message: body };

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = `
        <span class="emerald-dot" style="display:inline-block; margin-right:6px;"></span>
        TRANSMITTING...
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
          statusBox.innerHTML = `<span>✓ Message transmitted successfully! Thanks <strong>${name}</strong>, I'll reply within 24 hours.</span>`;
        }
        showToast(`Transmission received! Thanks ${name}`);
        const contactForm = document.getElementById('contact-form');
        if (contactForm) contactForm.reset();

        if (sendBtn) {
          sendBtn.innerHTML = 'TRANSMISSION COMPLETE ✓';
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
      // Graceful client-side fallback for static hosting (GitHub Pages)
      const formattedBody = `Hello Nameet,\n\n${body}\n\nFrom: ${name} (${email})`;
      const mailtoUri = `mailto:nameetbehera6@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formattedBody)}`;

      if (statusBox) {
        statusBox.className = 'form-status-box success';
        statusBox.style.display = 'flex';
        statusBox.innerHTML = `<span>✓ Launching mail client to connect directly with <strong>nameetbehera6@gmail.com</strong>...</span>`;
      }

      window.location.href = mailtoUri;
      showToast('Opening email client to dispatch...');

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
  // 8. SCROLL PROGRESS INDICATOR
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
  // 9. CYBER MAGNETIC CURSOR (DESKTOP)
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

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

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
          const rotateX = -((y - centerY) / centerY) * 5.2;
          const rotateY = ((x - centerX) / centerX) * 5.2;

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
  // 12. HERO DUAL-MODE STAGE SWITCHER (3D PORTAL / DEV PHOTO)
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
  // 13. THREE.JS ENGINE 1: 3D SPATIAL UNIVERSE BACKGROUND (OBSIDIAN & EMERALD)
  // --------------------------------------------------------------------------
  function init3DUniverse() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas || !webglAvailable) {
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

    // Particle cosmos geometry with cyber lavender, neon cyan, white, and crimson
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
    grad.addColorStop(0.35, 'rgba(192,132,252,0.75)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.72,
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
        opacity: 0.16
      });

      const mesh = new THREE.Mesh(polyGeo, polyMat);
      mesh.position.set(
        (Math.random() - 0.5) * 1100,
        (Math.random() - 0.5) * 1100,
        (Math.random() - 0.5) * 600
      );
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012
      };
      polyGroup.add(mesh);
      polyMeshes.push(mesh);
    }
    scene.add(polyGroup);

    // Coordinates tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    }, { passive: true });

    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      scrollDepth = window.pageYOffset * 0.15;
    }, { passive: true });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, { passive: true });

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isTabActive) return;

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        particles.rotation.y += 0.00035;
        particles.rotation.x += 0.00018;

        polyMeshes.forEach(mesh => {
          mesh.rotation.x += mesh.userData.rotX;
          mesh.rotation.y += mesh.userData.rotY;
        });
      }

      camera.position.x = currentMouseX * 110;
      camera.position.y = -currentMouseY * 110;
      camera.position.z = 450 - (scrollDepth % 300);

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 14. THREE.JS ENGINE 2: HERO 3D MONOLITHIC SPATIAL PORTAL
  // Metaphor: Luminous Obsidian & Emerald Dimensional Gyroscope Portal
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

    // Master Portal Group
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

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
    portalGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.38, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    portalGroup.add(wireMesh);

    // 2. Gimbal Portal Rings
    // Ring 1 (Inner Torus - Lavender / White)
    const ring1Geo = new THREE.TorusGeometry(1.95, 0.038, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xc084fc,
      emissiveIntensity: 0.35
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    portalGroup.add(ring1);

    // Ring 2 (Middle Torus - Neon Cyan, inclined 55 deg)
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
    portalGroup.add(ring2);

    // Ring 3 (Outer Torus - Brand Crimson, inclined -45 deg)
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
    portalGroup.add(ring3);

    // 3. Orbiting Architectural Monolith Shards (4 Axially Positioned Pillars)
    const obelisks = [];
    const obeliskCount = 4;
    const obeliskGeo = new THREE.BoxGeometry(0.12, 1.25, 0.12);
    const obeliskEdges = new THREE.EdgesGeometry(obeliskGeo);
    const obeliskLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });

    const obeliskMeshMat = new THREE.MeshStandardMaterial({
      color: 0x101018,
      roughness: 0.2,
      metalness: 0.95
    });

    for (let i = 0; i < obeliskCount; i++) {
      const obeliskGroup = new THREE.Group();
      const oMesh = new THREE.Mesh(obeliskGeo, obeliskMeshMat);
      const oLine = new THREE.LineSegments(obeliskEdges, obeliskLineMat);
      obeliskGroup.add(oMesh);
      obeliskGroup.add(oLine);

      portalGroup.add(obeliskGroup);
      obelisks.push({
        group: obeliskGroup,
        angle: (i * (Math.PI * 2)) / obeliskCount,
        speed: 0.008 + i * 0.002,
        radius: 3.15,
        elevationSpeed: 0.02 + i * 0.01
      });
    }

    // 4. Orbiting Telemetry Spheres
    const satellites = [];
    const satCount = 3;
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      portalGroup.add(sat);
      satellites.push({
        mesh: sat,
        angle: (i * (Math.PI * 2)) / satCount,
        speed: 0.018 + i * 0.005,
        radius: 2.85
      });
    }

    // 5. Floating Micro-dust Particles
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
    portalGroup.add(dustPoints);

    // 6. Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x221133, 1.4);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    cyanKeyLight.position.set(4, 5, 4);
    scene.add(cyanKeyLight);

    const lavenderRimLight = new THREE.DirectionalLight(0xc084fc, 2.0);
    lavenderRimLight.position.set(-4, -4, 3);
    scene.add(lavenderRimLight);

    const corePointLight = new THREE.PointLight(0xff3b30, 2.2, 8);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 7. Interactive 360° Drag & Mouse Orientation
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

        portalGroup.rotation.y += dragVelocityX;
        portalGroup.rotation.x += dragVelocityY;

        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
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

    function handleResize() {
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    let isHeroVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    heroObserver.observe(container);

    let time = 0;
    function animatePortal() {
      requestAnimationFrame(animatePortal);
      if (!isHeroVisible || document.hidden) return;

      time += 0.02;

      if (!isDragging) {
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        portalGroup.rotation.y += dragVelocityX;
        portalGroup.rotation.x += dragVelocityY;

        if (!prefersReducedMotion) {
          portalGroup.rotation.y += 0.007;
          portalGroup.rotation.x += (targetRotX - portalGroup.rotation.x) * 0.06;
          portalGroup.rotation.z = Math.sin(time * 0.4) * 0.1;

          ring1.rotation.x += 0.014;
          ring1.rotation.y += 0.007;

          ring2.rotation.y += 0.011;
          ring2.rotation.z += 0.008;

          ring3.rotation.z += 0.009;
          ring3.rotation.x -= 0.006;

          coreMesh.rotation.y -= 0.005;
          wireMesh.rotation.y += 0.008;
        }
      }

      // Orbiting monolith obelisks
      obelisks.forEach(o => {
        o.angle += o.speed;
        o.group.position.x = Math.cos(o.angle) * o.radius;
        o.group.position.z = Math.sin(o.angle) * o.radius;
        o.group.position.y = Math.sin(time * 0.8 + o.angle) * 0.5;
        o.group.rotation.y += 0.015;
      });

      // Orbiting satellites
      satellites.forEach(sat => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 2) * 0.4;
      });

      // Pulsing central emerald core lighting
      corePointLight.intensity = 2.0 + Math.sin(time * 2.5) * 0.9;

      renderer.render(scene, camera);
    }

    animatePortal();
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
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 });
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
      color: 0x0a160f,
      metalness: 0.92,
      roughness: 0.2
    });
    const sensorBase = new THREE.Mesh(sensorBaseGeo, sensorBaseMat);
    radarGroup.add(sensorBase);

    const sensorOrbGeo = new THREE.SphereGeometry(0.38, 32, 16);
    const sensorOrbMat = new THREE.MeshStandardMaterial({
      color: 0x030805,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x10b981,
      emissiveIntensity: 0.35
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
      { x: 1.4, z: -1.2, color: 0xef4444, label: 'ANOMALY' },
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
        opacity: 0.85
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

    // Hero Entrance Sequence
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    heroTl
      .from('.site-header', { y: -40, opacity: 0, duration: 0.7 })
      .from('.hero-status-row .pill-badge', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.3')
      .from('.hero-title', { y: 30, opacity: 0, duration: 0.9 }, '-=0.5')
      .from('.hero-description', { y: 20, opacity: 0 }, '-=0.6')
      .from('.hero-cta-group .btn', { y: 20, opacity: 0, stagger: 0.15 }, '-=0.5')
      .from('.hero-stats-panel', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('#hero-stage-card', { y: 40, opacity: 0, duration: 1.0 }, '-=0.8');

    // Section Scroll Reveals for All 6 Sections
    if (typeof ScrollTrigger !== 'undefined') {
      const scrollSections = ['#about', '#skills', '#projects', '#services', '#process', '#contact'];

      scrollSections.forEach((secId) => {
        const sec = document.querySelector(secId);
        if (!sec) return;

        gsap.from(sec.querySelectorAll('.section-tag, .section-title, .section-subtitle'), {
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out'
        });
      });

      // Bento About Cards
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

      // Skills Cards Cascade
      gsap.from('.skills-grid .skill-card', {
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 75%'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Featured Project Cards (Rakshak AI & Nature Unisex Salon)
      const projectCards = document.querySelectorAll('.featured-project-card');
      projectCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%'
          },
          y: 45,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out'
        });
      });

      // 5-Stage Development Process Cards Cascade
      gsap.from('.process-timeline .process-card', {
        scrollTrigger: {
          trigger: '#process',
          start: 'top 75%'
        },
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Services Grid Cards Cascade
      gsap.from('.services-grid .service-card', {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 75%'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Contact Info & Form Cards
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
      ctx.fillStyle = '#10b981';

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
  // 18. INITIALIZE ALL ENGINES ON LOAD
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // 19. THEME SWITCHER (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  function initThemeToggle() {
    const desktopBtn = document.getElementById('theme-toggle');
    const mobileBtn = document.getElementById('mobile-theme-toggle');
    const mobileLabel = document.getElementById('mobile-theme-label');

    const STORAGE_KEY = 'agy_portfolio_theme';
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');

    function applyTheme(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (desktopBtn) desktopBtn.setAttribute('title', 'Switch to dark theme');
        if (mobileLabel) mobileLabel.textContent = 'LIGHT';
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (desktopBtn) desktopBtn.setAttribute('title', 'Switch to light theme');
        if (mobileLabel) mobileLabel.textContent = 'DARK';
      }
    }

    applyTheme(initialTheme);

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {}
    }

    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 20. INTERACTIVE PROJECT FILTERING ENGINE
  // --------------------------------------------------------------------------
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (!filterButtons.length || !projectItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        projectItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          const isMatch = filter === 'all' || cat === filter;

          if (isMatch) {
            item.classList.remove('filtered-out');
            if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
              gsap.fromTo(item, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
              );
            } else {
              item.style.opacity = '1';
              item.style.display = '';
            }
          } else {
            item.classList.add('filtered-out');
          }
        });

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 21. INTERACTIVE CASE STUDY MODAL ENGINE
  // --------------------------------------------------------------------------
  function initCaseStudyModal() {
    const modal = document.getElementById('case-study-modal');
    const backdrop = document.getElementById('cs-modal-backdrop');
    const closeBtn = document.getElementById('cs-modal-close-btn');
    const modalBody = document.getElementById('cs-modal-body');
    const modalBadge = document.getElementById('cs-modal-badge');
    const modalId = document.getElementById('cs-modal-id');

    if (!modal || !modalBody) return;

    const caseStudies = {
      rakshak: {
        badge: '// FLAGSHIP BUILD 01',
        id: 'RAKSHAK_AI_DEEPDIVE',
        title: 'Rakshak AI — Autonomous Campus Sentinel & Anomaly Detection',
        category: 'Computer Vision / Edge AI Surveillance',
        status: 'Active Prototype & Telemetry Dashboard',
        role: 'Creator & Lead Developer',
        timeline: '2025 – Present',
        stack: ['Python', 'Flask', 'OpenCV', 'YOLOv8', 'SQLite', 'REST APIs', 'Vanilla JS'],
        problem: 'Traditional campus surveillance relies on passive CCTV recording and fatiguing human monitoring, causing delayed reaction times during emergency incidents, unauthorized breaches, and safety hazards.',
        solution: 'Built an end-to-end edge surveillance pipeline using OpenCV and YOLOv8 to continuously process video streams, classify anomalous motion, and trigger instant security notifications. Coupled with a lightweight Python/Flask backend and a real-time responsive command console.',
        highlights: [
          'Real-time edge inference pipeline with under 400ms anomaly notification latency.',
          'Proactive geofenced safety zone boundary monitoring with automated threshold alerts.',
          'Zero cloud lock-in: runs efficiently on local hardware with lightweight SQLite event indexing.',
          'Privacy-focused architecture: visual processing occurs on premise without uploading private feeds to public clouds.'
        ],
        actions: [
          { text: 'VIEW GITHUB REPOSITORY', url: 'https://github.com/NBPkiller143/Rakshak-AI', primary: true },
          { text: 'EXPLORE LIVE TELEMETRY RADAR', url: '#projects', primary: false, scroll: true }
        ]
      },
      salon: {
        badge: '// CLIENT BUILD 02',
        id: 'SALON_CLIENT_PRODUCTION',
        title: 'Nature Unisex Salon — Commercial Client Web Platform',
        category: 'Client Production Web Application',
        status: 'Live on Render Cloud',
        role: 'Frontend Architect & UI Designer',
        timeline: 'Production Deliverable',
        stack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design', 'Render Cloud'],
        problem: 'The business required a polished, high-end online presence to showcase hair, skin, and wellness services, communicate pricing transparency, and drive bookings without paying recurring subscriptions for heavyweight CMS platforms.',
        solution: 'Engineered a bespoke zero-dependency static web application designed with modern editorial aesthetics, rapid asset delivery, interactive grooming service menus, and mobile-first booking paths that guide clients directly into scheduled appointments.',
        highlights: [
          'Sub-second First Contentful Paint (<0.8s) with optimized image compression and zero bloated scripts.',
          'Intuitive categorized service hierarchy covering haircuts, spa packages, and therapeutic treatments.',
          'Frictionless booking funnels optimized for mobile phone callers and direct message scheduling.',
          'Deployed to production cloud on Render with zero ongoing software licensing costs for the business owner.'
        ],
        actions: [
          { text: 'LAUNCH LIVE CLIENT SITE', url: 'https://nature-unisex-salon.onrender.com/', primary: true },
          { text: 'INSPECT SOURCE REPOSITORY', url: 'https://github.com/NBPkiller143/Nature-Unisex-Salon', primary: false }
        ]
      },
      shadowtrail: {
        badge: '// CREATIVE BUILD 03',
        id: 'SHADOW_TRAIL_ARCADE_ENGINE',
        title: 'SHADOW TRAIL: The Clean Path — Environmental Arcade Game (v3.0)',
        category: 'Browser Game Engine / Civic Edutainment',
        status: 'Live on GitHub Pages',
        role: 'Solo Game Developer & Creative Designer',
        timeline: 'Production v3.0 Release',
        stack: ['HTML5 Canvas 2D', 'JavaScript ES6+', 'Game Physics', 'Web Audio API', 'LocalStorage', 'GitHub Pages'],
        problem: 'Gamifying civic responsibility and environmental sanitation (inspired by the Swachh Bharat mission) in a way that feels intensely fun, fast-paced, and fluid across both smartphones and desktop computers without heavy third-party game engines.',
        solution: 'Programmed a custom 60 FPS requestAnimationFrame canvas game engine with procedural obstacle spawning, dynamic collision vectors, waste-sorting mechanics, responsive virtual joystick inputs, and synthesizer audio generated in real time via the Web Audio API.',
        highlights: [
          'Pure vanilla 60 FPS HTML5 Canvas performance with zero framework overhead or loading delays.',
          'Custom vector collision detection and object pooling for zero frame stutter or garbage collection lag.',
          'Dynamic audio synthesizers: chimes, retro jumps, and alerts synthesized purely via Web Audio API oscillators.',
          'Persistent local high scores, progressive difficulty scaling, and responsive touchscreen controls.'
        ],
        actions: [
          { text: 'PLAY LIVE ARCADE GAME', url: 'https://nbpkiller143.github.io/shadow-trail/', primary: true },
          { text: 'VIEW SOURCE CODE REPOSITORY', url: 'https://github.com/NBPkiller143/shadow-trail', primary: false }
        ]
      },
      stem: {
        badge: '// CONCEPT BUILD 04',
        id: 'STEM_QUEST_SYSTEM_SPEC',
        title: 'STEM Quest AI — Resilient EdTech Platform Architecture',
        category: 'System Architecture / Low-Connectivity Education',
        status: 'Conceptual Blueprint Spec',
        role: 'System Architect & Concept Designer',
        timeline: 'Architecture Exploration',
        stack: ['System Architecture', 'EdTech UX', 'IndexedDB Offline Cache', 'Modular APIs', 'Educational Tech'],
        problem: 'Digital educational platforms frequently break down or become inaccessible in areas with intermittent or low-bandwidth internet connectivity, widening the educational divide for students studying STEM subjects.',
        solution: 'Developed an architectural blueprint for an offline-first learning platform with modular simulation containers for physics and mathematics, decoupled state reconciliation via IndexedDB, and asynchronous delta synchronization.',
        highlights: [
          'Offline-first client persistence ensuring uninterrupted access to learning modules during network dropouts.',
          'Interactive physics inquiry simulation models allowing parameter manipulation and empirical observation.',
          'Algorithmic mathematics formula graphing modules engineered for rapid mathematical intuition.',
          'Low-memory, accessible UI design specification designed to operate smoothly on entry-level student devices.'
        ],
        actions: [
          { text: 'INQUIRE ABOUT THIS ARCHITECTURE', url: '#contact', primary: true, service: 'AI-Powered Web Experiences', scroll: true }
        ]
      }
    };

    function openModal(studyKey) {
      const data = caseStudies[studyKey];
      if (!data) return;

      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalId) modalId.textContent = data.id;

      let actionsHTML = '';
      data.actions.forEach(act => {
        if (act.scroll) {
          actionsHTML += `
            <a href="${act.url}" class="btn ${act.primary ? 'btn-primary' : 'btn-secondary'} cs-action-link" ${act.service ? `data-select-service="${act.service}"` : ''} style="padding: 0.6rem 1.25rem;">
              ${act.text} ↗
            </a>
          `;
        } else {
          actionsHTML += `
            <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn ${act.primary ? 'btn-primary' : 'btn-secondary'}" style="padding: 0.6rem 1.25rem;">
              ${act.text} ↗
            </a>
          `;
        }
      });

      const stackPills = data.stack.map(s => `<span class="skill-pill verified">${s}</span>`).join('');
      const highlightsHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

      modalBody.innerHTML = `
        <div class="cs-section">
          <span class="cs-section-label">// PROJECT OVERVIEW</span>
          <h2 class="cs-section-heading">${data.title}</h2>
          <div class="cs-meta-grid">
            <div class="cs-meta-item">
              <span class="cs-meta-key">Category</span>
              <span class="cs-meta-val">${data.category}</span>
            </div>
            <div class="cs-meta-item">
              <span class="cs-meta-key">Status</span>
              <span class="cs-meta-val" style="color: var(--accent-emerald);">● ${data.status}</span>
            </div>
            <div class="cs-meta-item">
              <span class="cs-meta-key">Role</span>
              <span class="cs-meta-val">${data.role}</span>
            </div>
            <div class="cs-meta-item">
              <span class="cs-meta-key">Timeline</span>
              <span class="cs-meta-val">${data.timeline}</span>
            </div>
          </div>
        </div>

        <div class="cs-section">
          <span class="cs-section-label">// THE CHALLENGE</span>
          <p class="cs-section-text">${data.problem}</p>
        </div>

        <div class="cs-section">
          <span class="cs-section-label">// THE ARCHITECTURAL SOLUTION</span>
          <p class="cs-section-text">${data.solution}</p>
        </div>

        <div class="cs-section">
          <span class="cs-section-label">// KEY ACHIEVEMENTS & METRICS</span>
          <ul class="cs-highlights-list">
            ${highlightsHTML}
          </ul>
        </div>

        <div class="cs-section">
          <span class="cs-section-label">// TECHNOLOGY STACK</span>
          <div class="skill-tags">
            ${stackPills}
          </div>
        </div>

        <div class="cs-actions-row">
          ${actionsHTML}
        </div>
      `;

      modal.style.display = 'flex';
      requestAnimationFrame(() => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });

      const scrollLinks = modalBody.querySelectorAll('.cs-action-link');
      scrollLinks.forEach(link => {
        link.addEventListener('click', () => {
          const svc = link.getAttribute('data-select-service');
          closeModal();
          if (svc) {
            const svcSelect = document.getElementById('msg-service');
            if (svcSelect) svcSelect.value = svc;
          }
        });
      });
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!modal.classList.contains('open')) {
          modal.style.display = 'none';
        }
      }, 350);
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.cs-trigger-btn, [data-case-study]');
      if (trigger) {
        e.preventDefault();
        const studyKey = trigger.getAttribute('data-case-study');
        if (studyKey) openModal(studyKey);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 22. SERVICE INQUIRY PRE-FILL & SMOOTH DISPATCH
  // --------------------------------------------------------------------------
  function initServiceInquiry() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-service-inquire, [data-service]');
      if (!btn) return;

      const serviceName = btn.getAttribute('data-service');
      if (!serviceName) return;

      const serviceSelect = document.getElementById('msg-service');
      const subjectInput = document.getElementById('msg-subject');
      const bodyInput = document.getElementById('msg-body');

      if (serviceSelect) {
        serviceSelect.value = serviceName;
      }

      if (subjectInput && !subjectInput.value.trim()) {
        subjectInput.value = `Inquiry: ${serviceName}`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerHeight = 74;
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        setTimeout(() => {
          if (bodyInput) bodyInput.focus();
        }, 600);
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initProjectFilter();
    initCaseStudyModal();
    initServiceInquiry();
    init3DUniverse();
    initHero3DCore();
    initRakshak3DRadar();
    initGSAPAnimations();
  });

})();
