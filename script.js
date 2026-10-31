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

  
  // --------------------------------------------------------------------------
  // PRELOADER ENGINE
  // --------------------------------------------------------------------------
  function initPreloader() {
    const preloader = document.getElementById("site-preloader");
    const bar = document.getElementById("preloader-progress");
    const status = document.getElementById("preloader-status");
    if (!preloader) return;

    if (bar) bar.style.width = "60%";

    function dismissPreloader() {
      if (bar) bar.style.width = "100%";
      if (status) status.textContent = "SYSTEMS ONLINE";
      setTimeout(() => {
        preloader.classList.add("loaded");
      }, 300);
    }

    if (document.readyState === "complete") {
      dismissPreloader();
    } else {
      window.addEventListener("load", dismissPreloader);
      setTimeout(dismissPreloader, 1200);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
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
      const serviceLine = service ? `Service: ${service}\n` : '';
      const formattedBody = `Hello Nameet,\n\n${body}\n\n${serviceLine}From: ${name} (${email})`;
      const mailtoSubject = encodeURIComponent(subject || (service ? `Inquiry: ${service}` : 'Portfolio Inquiry'));
      const mailtoUri = `mailto:nameetbehera6@gmail.com?subject=${mailtoSubject}&body=${encodeURIComponent(formattedBody)}`;

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
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    if (isTouchDevice || window.innerWidth <= 1024 || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    // Touch safeguard: if touch interaction is detected at all, immediately hide cursor
    window.addEventListener('touchstart', () => {
      dot.style.display = 'none';
      ring.style.display = 'none';
    }, { passive: true, once: true });

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
  // 21. INTERACTIVE CASE STUDY MODAL ENGINE (8-PART DEDICATED ARCHITECTURE)
  // --------------------------------------------------------------------------
  function initCaseStudyModal() {
    const modal = document.getElementById("case-study-modal");
    const backdrop = document.getElementById("cs-modal-backdrop");
    const closeBtn = document.getElementById("cs-modal-close-btn");
    const modalBody = document.getElementById("cs-modal-body");
    const modalBadge = document.getElementById("cs-modal-badge");
    const modalId = document.getElementById("cs-modal-id");

    if (!modal || !modalBody) return;

    const caseStudies = {
      rakshak: {
        badge: "// FLAGSHIP BUILD 01",
        id: "RAKSHAK_AI_DEEPDIVE",
        title: "Rakshak AI — Autonomous Campus Sentinel & Anomaly Detection",
        category: "Computer Vision / Edge AI Surveillance",
        status: "Active Prototype & Telemetry Dashboard",
        role: "Creator & Lead Developer",
        timeline: "2025 – Present",
        overview: "An AI-assisted safety surveillance system engineered to eliminate campus security blindspots by coupling automated visual anomaly detection with real-time safety alerts. Runs on local edge hardware to preserve user privacy without public cloud dependencies.",
        problem: "Traditional campus surveillance relies on passive CCTV recording and fatiguing human monitoring, causing delayed reaction times during emergency incidents, perimeter breaches, and safety hazards.",
        approach: "Designed a decoupled local pipeline: edge video feeds are ingested through OpenCV, processed frame-by-frame by a lightweight YOLOv8 inference model, and dispatched via Flask REST APIs to a responsive command console in under 400ms.",
        stack: ["Python", "Flask", "OpenCV", "YOLOv8", "SQLite", "REST APIs", "Chart.js", "Vanilla JS"],
        features: [
          "360° Real-time AI Sentinel Radar sweep telemetry display",
          "Automated geofenced perimeter violation detection",
          "Immediate visual warning indicators and anomaly notification dispatch",
          "Lightweight local SQLite incident logging for forensic review",
          "Low-latency responsive monitoring interface accessible across devices"
        ],
        highlights: [
          "Sub-400ms notification latency from camera detection to UI dispatch",
          "Zero cloud lock-in: fully functional on modest edge computing hardware",
          "Privacy-centric architecture: frames are analyzed in-memory and never uploaded to third-party cloud servers"
        ],
        visual: `
          <div class="arch-box" style="margin: 0;">
            <div class="arch-header">
              <span>SYSTEM TELEMETRY ARCHITECTURE SCHEMATIC</span>
              <span style="color: var(--accent-emerald);">● OPERATIONAL PIPELINE</span>
            </div>
            <div class="arch-nodes" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
              <div class="arch-node"><div class="arch-node-name"><span class="red-dot"></span><span>1. RTSP Camera Feed</span></div><span class="arch-node-tag">Edge Video</span></div>
              <div class="arch-node"><div class="arch-node-name"><span class="green-dot"></span><span>2. YOLOv8 Anomaly Infer</span></div><span class="arch-node-tag">OpenCV / Python</span></div>
              <div class="arch-node"><div class="arch-node-name"><span class="red-dot"></span><span>3. SQLite Storage Engine</span></div><span class="arch-node-tag">Flask REST</span></div>
              <div class="arch-node"><div class="arch-node-name"><span style="color: var(--accent-lavender);">✦</span><span>4. Dispatch Console UI</span></div><span class="arch-node-tag">360° Sweep HUD</span></div>
            </div>
          </div>
        `,
        actions: [
          { text: "VIEW GITHUB REPOSITORY", url: "https://github.com/NBPkiller143/Rakshak-AI", primary: true },
          { text: "EXPLORE LIVE TELEMETRY RADAR", url: "#projects", primary: false, scroll: true }
        ]
      },
      salon: {
        badge: "// CLIENT BUILD 02",
        id: "SALON_CLIENT_PRODUCTION",
        title: "Nature Unisex Salon — Commercial Client Web Platform",
        category: "Commercial Web Application / Client Production",
        status: "Live on Render Cloud",
        role: "Frontend Architect & UI Designer",
        timeline: "Production Deliverable",
        overview: "A refined commercial web platform engineered for a beauty and wellness salon brand. Combines editorial typography, structured grooming service catalogs, and intuitive appointment booking pathways.",
        problem: "The business lacked a dedicated digital storefront to present specialized beauty packages and transparent pricing, and needed to avoid expensive monthly CMS platform subscription fees.",
        approach: "Engineered a high-performance zero-dependency static web platform with modern editorial aesthetics, rapid asset compression, interactive grooming menus, and mobile-first booking paths connecting clients directly to appointments.",
        stack: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Render Cloud"],
        features: [
          "Interactive service menu showcasing haircuts, spa therapies, styling, and skin treatments",
          "Mobile-first appointment booking pathways with direct phone and WhatsApp routing",
          "Responsive editorial layout optimized for smartphone and desktop viewports",
          "Production cloud deployment hosted on Render"
        ],
        highlights: [
          "Near-instant First Contentful Paint (<0.8s) via zero-dependency architecture",
          "Zero recurring monthly CMS software costs for the business owner",
          "Seamless mobile appointment pathways resulting in higher visitor conversion"
        ],
        visual: `
          <div class="browser-frame-mockup" style="margin: 0;">
            <div class="browser-mockup-bar">
              <div class="browser-dots"><span></span><span></span><span></span></div>
              <div class="browser-address-bar">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>https://nature-unisex-salon.onrender.com/</span>
              </div>
            </div>
            <div class="browser-mockup-content">
              <div class="mockup-salon-banner">
                <span class="mockup-salon-badge">NATURE UNISEX SALON</span>
                <div class="mockup-salon-hero">
                  <span class="mockup-salon-title">Refined Grooming & Beauty</span>
                  <span class="mockup-salon-sub">Haircuts • Spa • Styling • Skin Therapy</span>
                </div>
                <span class="mockup-salon-btn" style="display: inline-block;">BOOK AN APPOINTMENT ↗</span>
              </div>
            </div>
          </div>
        `,
        actions: [
          { text: "LAUNCH LIVE CLIENT SITE", url: "https://nature-unisex-salon.onrender.com/", primary: true },
          { text: "INSPECT SOURCE REPOSITORY", url: "https://github.com/NBPkiller143/Nature-Unisex-Salon", primary: false }
        ]
      },
      shadowtrail: {
        badge: "// CREATIVE BUILD 03",
        id: "SHADOW_TRAIL_ARCADE_ENGINE",
        title: "SHADOW TRAIL: The Clean Path — Environmental Arcade Game (v3.0)",
        category: "Browser Game Engine / Civic Edutainment",
        status: "Live on GitHub Pages",
        role: "Solo Game Developer & Creative Designer",
        timeline: "Production v3.0 Release",
        overview: "A 60 FPS HTML5 Canvas arcade game inspired by the Swachh Bharat mission. Players navigate urban obstacles, collect recyclables, sanitize street sectors, and avoid hazards with responsive controls.",
        problem: "Gamifying environmental cleanliness in a way that feels intensely fun, fast-paced, and responsive across both smartphones and desktop computers without the overhead of heavy third-party game engines.",
        approach: "Built a lightweight custom requestAnimationFrame game loop with object pooling, procedural obstacle spawning, dynamic collision vectors, waste sorting mechanics, virtual touch controls, and Web Audio API synth sound effects.",
        stack: ["HTML5 Canvas 2D", "JavaScript ES6+", "Game Physics", "Web Audio API", "LocalStorage", "GitHub Pages"],
        features: [
          "60 FPS HTML5 Canvas engine with zero external framework dependencies",
          "Dynamic urban hazards, waste-sorting classification, and combo multipliers",
          "Real-time street cleanliness percentage meter and high-score tracker",
          "Dual responsive control scheme: virtual touch joystick and keyboard arrow controls",
          "Web Audio synthesizer oscillators generating sound effects on-the-fly"
        ],
        highlights: [
          "Constant 60 FPS performance with zero frame stutter or garbage-collection lag",
          "Procedural difficulty scaling providing continuous replayability",
          "Persistent local high-score storage across browser sessions"
        ],
        visual: `
          <div class="arcade-frame-mockup" style="margin: 0;">
            <div class="arcade-top-bar">
              <div class="arcade-status-indicator"><span class="arcade-blinker"></span><span>SWACHH BHARAT MISSION ARCADE v3.0</span></div>
              <span class="arcade-rate">60 FPS</span>
            </div>
            <div class="arcade-screen-content">
              <div class="arcade-meter-box">
                <span class="arcade-meter-label">STREET CLEANLINESS</span>
                <div class="clean-meter-track"><div class="clean-meter-fill" style="width: 88%;"></div></div>
                <span class="arcade-meter-pct">88% ZONE SANITIZED</span>
              </div>
              <div class="arcade-stats-row">
                <div class="arcade-stat-cell"><span class="stat-sub">RECYCLABLES</span><span class="stat-val">42 ITEMS</span></div>
                <div class="arcade-stat-cell"><span class="stat-sub">CURRENT SCORE</span><span class="stat-val" style="color: var(--accent-lavender);">14,850 PTS</span></div>
                <div class="arcade-stat-cell"><span class="stat-sub">MULTIPLIER</span><span class="stat-val" style="color: var(--accent-emerald);">3.5x COMBO</span></div>
              </div>
            </div>
          </div>
        `,
        actions: [
          { text: "PLAY LIVE ARCADE GAME", url: "https://nbpkiller143.github.io/shadow-trail/", primary: true },
          { text: "VIEW SOURCE CODE REPOSITORY", url: "https://github.com/NBPkiller143/shadow-trail", primary: false }
        ]
      },
      stem: {
        badge: "// CONCEPT BUILD 04",
        id: "STEM_QUEST_SYSTEM_SPEC",
        title: "STEM Quest AI — Resilient EdTech Platform Architecture",
        category: "System Architecture / Low-Connectivity Education",
        status: "Conceptual Blueprint Spec",
        role: "System Architect & Concept Designer",
        timeline: "Architecture Exploration",
        overview: "An architectural system specification addressing digital education accessibility in intermittent or low-bandwidth environments through modular inquiry simulation containers and offline-first state synchronization.",
        problem: "Digital educational platforms frequently break down or become completely inaccessible when internet connectivity drops, widening learning inequalities for students in low-connectivity regions.",
        approach: "Designed an offline-first 3-tier architecture separating interactive inquiry simulations (physics & math) from background state synchronization, storing progress locally in IndexedDB and reconciling deltas upon reconnection.",
        stack: ["System Architecture", "EdTech UX", "IndexedDB Offline Cache", "Modular APIs", "Educational Tech"],
        features: [
          "Interactive physics inquiry models allowing parameter manipulation and empirical observation",
          "Algorithmic mathematics formula graphing modules for visual intuition",
          "Offline-first client state persistence ensuring uninterrupted learning during network dropouts",
          "Background delta sync reconciliation that updates student progress seamlessly upon reconnection",
          "Zero-barrier accessible responsive UI design system"
        ],
        highlights: [
          "Decoupled simulation execution from network availability",
          "Modular curriculum schema adaptable to varied school standards",
          "Low-memory interface architecture designed to run on entry-level student devices"
        ],
        visual: `
          <div class="arch-box" style="margin: 0;">
            <div class="arch-header"><span>CONCEPT SYSTEM SCHEMATIC</span><span style="color: var(--accent-lavender);">● BLUEPRINT SPEC</span></div>
            <div class="stem-nodes-container" style="padding: 0.5rem 0;">
              <div class="stem-node-box"><div class="stem-node-head"><span class="blue-dot"></span><span class="stem-node-title">PHYSICS // INQUIRY ENGINE</span></div><span class="stem-node-sub">Parameter manipulation & dynamic simulation containers</span></div>
              <div class="stem-connector-line"></div>
              <div class="stem-node-box"><div class="stem-node-head"><span class="green-dot"></span><span class="stem-node-title">MATH // ALGORITHMIC GRAPHING</span></div><span class="stem-node-sub">Geometric transformations, mathematical formulas & proofs</span></div>
              <div class="stem-connector-line"></div>
              <div class="stem-node-box"><div class="stem-node-head"><span class="lavender-dot"></span><span class="stem-node-title">OFFLINE // SYNC & LOCAL STATE</span></div><span class="stem-node-sub">IndexedDB client caching with background delta sync reconciliation</span></div>
            </div>
          </div>
        `,
        actions: [
          { text: "INQUIRE ABOUT THIS ARCHITECTURE", url: "#contact", primary: true, service: "AI-Powered Web Experiences", scroll: true }
        ]
      }
    };

    function openModal(studyKey) {
      const data = caseStudies[studyKey];
      if (!data) return;

      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalId) modalId.textContent = data.id;

      let actionsHTML = "";
      data.actions.forEach(act => {
        if (act.scroll) {
          actionsHTML += `
            <a href="${act.url}" class="btn ${act.primary ? "btn-primary" : "btn-secondary"} cs-action-link" ${act.service ? `data-select-service="${act.service}"` : ""} style="padding: 0.6rem 1.25rem;">
              ${act.text} ↗
            </a>
          `;
        } else {
          actionsHTML += `
            <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn ${act.primary ? "btn-primary" : "btn-secondary"}" style="padding: 0.6rem 1.25rem;">
              ${act.text} ↗
            </a>
          `;
        }
      });

      const stackPills = data.stack.map(s => `<span class="skill-pill verified">${s}</span>`).join("");
      const featuresHTML = data.features.map(f => `<li>${f}</li>`).join("");
      const highlightsHTML = data.highlights.map(h => `<li>${h}</li>`).join("");

      modalBody.innerHTML = `
        <!-- 01. Project Overview -->
        <div class="cs-section">
          <span class="cs-section-label">// 01. PROJECT OVERVIEW</span>
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
          <p class="cs-section-text" style="margin-top: 0.85rem;">${data.overview}</p>
        </div>

        <!-- 02. Problem Statement -->
        <div class="cs-section">
          <span class="cs-section-label">// 02. PROBLEM STATEMENT</span>
          <p class="cs-section-text">${data.problem}</p>
        </div>

        <!-- 03. My Approach -->
        <div class="cs-section">
          <span class="cs-section-label">// 03. MY APPROACH</span>
          <p class="cs-section-text">${data.approach}</p>
        </div>

        <!-- 04. Technologies Used -->
        <div class="cs-section">
          <span class="cs-section-label">// 04. TECHNOLOGIES USED</span>
          <div class="skill-tags">
            ${stackPills}
          </div>
        </div>

        <!-- 05. Key Features -->
        <div class="cs-section">
          <span class="cs-section-label">// 05. KEY FEATURES</span>
          <ul class="cs-highlights-list">
            ${featuresHTML}
          </ul>
        </div>

        <!-- 06. Implementation Highlights -->
        <div class="cs-section">
          <span class="cs-section-label">// 06. IMPLEMENTATION HIGHLIGHTS</span>
          <ul class="cs-highlights-list">
            ${highlightsHTML}
          </ul>
        </div>

        <!-- 07. Screenshots & Architectural Visuals -->
        <div class="cs-section">
          <span class="cs-section-label">// 07. SCREENSHOTS & ARCHITECTURAL VISUALS</span>
          <div class="cs-visual-container">
            ${data.visual}
          </div>
        </div>

        <!-- 08. Live Demo and Source Code -->
        <div class="cs-section">
          <span class="cs-section-label">// 08. LIVE DEMO AND SOURCE CODE</span>
          <div class="cs-actions-row">
            ${actionsHTML}
          </div>
        </div>
      `;

      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });

      const scrollLinks = modalBody.querySelectorAll(".cs-action-link");
      scrollLinks.forEach(link => {
        link.addEventListener("click", () => {
          const svc = link.getAttribute("data-select-service");
          closeModal();
          if (svc) {
            const svcSelect = document.getElementById("msg-service");
            if (svcSelect) svcSelect.value = svc;
          }
        });
      });
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!modal.classList.contains("open")) {
          modal.style.display = "none";
        }
      }, 350);
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".cs-trigger-btn, [data-case-study]");
      if (trigger) {
        e.preventDefault();
        const studyKey = trigger.getAttribute("data-case-study");
        if (studyKey) openModal(studyKey);
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
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
