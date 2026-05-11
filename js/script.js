// ============ EMAILJS CONFIG ============
const EMAILJS_PUBLIC_KEY  = 'h5lBgBH6QWHJOFsrq';
const EMAILJS_SERVICE_ID  = 'service_z2amelo';
const EMAILJS_TEMPLATE_ID = 'template_da79ed4';
emailjs.init(EMAILJS_PUBLIC_KEY);

// ============ DOM CACHE ============
const navEl = document.querySelector('nav');
const bodyEl = document.body;
const homeSection = document.getElementById('home');
const introOverlay = document.querySelector('.intro-overlay');
const quoteH2 = document.querySelector('.text_part h2');
const quoteWrapper = document.querySelector('.quote-wrapper');
const imgPrimary = document.querySelector('.img-primary');
const imgSecondary = document.querySelector('.img-secondary');
const dividerEl = document.querySelector('.divider');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.center-links a');
const authorEl = document.querySelector(".author");
if (authorEl) {
  authorEl.style.opacity = '0';
  authorEl.style.transition = 'none';  /* keep this — prevents any accidental fade on load */
}

// ============ MENU TOGGLE ============
function toggleMenu() {
  document.getElementById("mainNavLinks").classList.toggle("active");
}

document.querySelectorAll("#mainNavLinks a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNavLinks").classList.remove("active");
  });
});

// ============ TYPING ANIMATION ============
const words = [
  { text: '" What is done with ', color: 'var(--text-primary)' },
  { text: 'love', color: 'var(--accent-warm)' },
  { text: ', is done well ."', color: 'var(--text-primary)' }
];

const fullText = words.map(w => w.text).join('');
const typingText = document.getElementById("typing-text");
let index = 0;
const typingSpeed = 70;

function type() {
  if (index < fullText.length) {
    const currentChar = fullText.charAt(index);
    const typed = fullText.substring(0, index + 1);
    let built = '';
    let charCount = 0;

    for (let w of words) {
      const wordEnd = charCount + w.text.length;
      if (typed.length > charCount) {
        const slice = typed.substring(charCount, wordEnd);
        if (slice) built += `<span style="color:${w.color}">${slice}</span>`;
      }
      charCount = wordEnd;
    }

    typingText.innerHTML = built;

    if (currentChar === ',') {
      setTimeout(() => { index++; type(); }, 900);
      return;
    }

    index++;
    setTimeout(type, typingSpeed);
} else {
  const scrolled = window.scrollY;
  const sectionHeight = homeSection ? homeSection.offsetHeight : 0;
  const triggerStart = sectionHeight * 0.15;
  
  if (!transformDone && scrolled < triggerStart && authorEl) {
    authorEl.style.transition = 'opacity 1.5s ease-in-out';
    authorEl.style.opacity = '1';
  }
}
}

window.onload = type;

// ============ ALL OBSERVERS ON DOMCONTENTLOADED ============
document.addEventListener("DOMContentLoaded", () => {

  // Fade bold text observer
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('fade-bold')) {
        el.classList.remove('fade-bold');
        void el.offsetWidth;
        el.classList.add('fade-bold');
        setTimeout(() => {
          document.querySelectorAll('.back-block.animate-on-scroll').forEach(b => b.classList.add('start-animation'));
        }, 2200);
        setTimeout(() => {
          document.querySelectorAll('.red.animate-on-scroll').forEach(r => r.classList.add('start-animation'));
        }, 4200);
      }
      setTimeout(() => {
        document.querySelectorAll('.text.animate-on-scroll').forEach(q => q.classList.add('start-animation'));
      }, 6200);

      textObserver.unobserve(el);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.fade-bold, .back-block.animate-on-scroll, .red.animate-on-scroll, .text.animate-on-scroll')
    .forEach(el => textObserver.observe(el));

  // Contact decor observer
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const decorImages = document.querySelectorAll(".contact-decor");
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        decorImages.forEach(img => img.classList.toggle("show", entry.isIntersecting));
      });
    }, { threshold: 0.3 }).observe(contactSection);
  }

  // Resume observer
  const resumeSection = document.getElementById("resume");
  if (resumeSection) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        resumeSection.classList.toggle("active", entry.isIntersecting);
      });
    }, { threshold: 0.3 }).observe(resumeSection);
  }

  // About wrapper visibility observer
  const aboutSection = document.querySelector(".about-wrapper");
  if (aboutSection) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("animate-in", "in-view");
        } else {
          aboutSection.classList.remove("in-view");
        }
      });
    }, { threshold: 0.1, rootMargin: "-100px 0px -100px 0px" }).observe(aboutSection);
  }

  // Column animations observer
  const animatedElements = document.querySelectorAll(
    ".column.left, .column.middle, .education-container, .column-4, .column.right, .soft-skills-column, .facts-column, .contact-column"
  );
  const columnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
  }, { threshold: 0.2 });
  animatedElements.forEach(el => columnObserver.observe(el));

  // Skill bars observer
  const skillsColumn = document.querySelector('.column-4');
  if (skillsColumn) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const bars = [
          { el: document.querySelector('.column-4 .skill-bar-figma > div'), delay: '0.3s' },
          { el: document.querySelector('.column-4 .skill-bar-html > div'), delay: '0.6s' },
          { el: document.querySelector('.column-4 .skill-bar-py > div'), delay: '0.9s' },
          { el: document.querySelector('.column-4 .skill-bar-c > div'), delay: '1.2s' },
        ];
        bars.forEach(({ el, delay }) => {
          if (!el) return;
          if (entry.isIntersecting) {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = `fillBar 2s ease-out forwards ${delay}`;
          } else {
            el.style.width = '0%';
          }
        });
      });
    }, { threshold: 0.3 }).observe(skillsColumn);
  }

  // Set HOME nav link active on load
  const homeLink = document.querySelector('.center-links a[href="#home"]');
  if (homeLink) homeLink.classList.add('active');

});

// ============ SINGLE UNIFIED SCROLL LISTENER ============
let transformDone = false;
let rafPending = false;

window.addEventListener('scroll', () => {
  if (rafPending) return;
  rafPending = true;

  requestAnimationFrame(() => {
    rafPending = false;
    const scrolled = window.scrollY;

    // ---- NAV scrolled class ----
    navEl.classList.toggle('scrolled', scrolled > 50);
    bodyEl.classList.toggle('scrolled', scrolled > 50);
    navEl.classList.toggle('dark-glass', scrolled < 600);

    // ---- NAV glassmorphism ----
    if (scrolled >= 100) {
      let currentSection = null;
      let maxArea = 0;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(0, Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top));
        if (visible > maxArea) { maxArea = visible; currentSection = section.id; }
      });
      navEl.classList.remove('glass-home', 'glass-about', 'glass-beyond', 'glass-resume');
      if (currentSection === 'home') navEl.classList.add('glass-home');
      else if (currentSection === 'about') navEl.classList.add('glass-about');
      else if (currentSection === 'beyond') navEl.classList.add('glass-beyond');
      else if (currentSection === 'resume') navEl.classList.add('glass-resume');
    } else {
      navEl.classList.remove('glass-home', 'glass-about', 'glass-beyond', 'glass-resume');
    }

    // ---- ACTIVE NAV LINK ----
    let activeSection = 'home';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`);
    });

    // ---- HOME TRANSITION ----
    if (!transformDone && homeSection) {
      const sectionHeight = homeSection.offsetHeight;
      const start = sectionHeight * 0.15;
      const end = sectionHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (scrolled - start) / (end - start)));

      // Quote fades out completely
      if (quoteH2) quoteH2.style.opacity = `${Math.max(0, 1 - progress *4)}`;
      if (authorEl) authorEl.style.opacity = `${Math.max(0, 1 - progress * 10)}`;

      // Divider shrinks
      if (dividerEl) dividerEl.style.height = `${500 - progress * 280}px`;

      // Images crossfade in first 60%
      const imgP = Math.min(1, progress / 0.4);
      if (imgPrimary) imgPrimary.style.opacity = `${1 - imgP}`;
      if (imgSecondary) {
        imgSecondary.style.opacity = `${imgP}`;
        imgSecondary.style.maxWidth = `${400 + imgP * 300}px`;
        imgSecondary.style.height = imgP > 0 ? `${30 + imgP * 55}vh` : 'auto';
        imgSecondary.style.objectFit = 'cover';
        imgSecondary.style.objectPosition = 'center';
        imgSecondary.style.transform = `translateX(${-imgP * 150}px)`;
      }

      // Intro floats up in second half
      const introP = Math.min(1, Math.max(0, (progress - 0.4) / 0.6));
      if (introOverlay) {
        if (introP > 0) {
          introOverlay.style.visibility = 'visible';
          introOverlay.style.height = 'auto';
          introOverlay.style.overflow = 'visible';
          introOverlay.style.opacity = `${introP}`;
          introOverlay.style.transform = `translateY(${60 - introP * 60}px)`;
          introOverlay.style.pointerEvents = introP > 0.8 ? 'all' : 'none';
        } else {
          introOverlay.style.visibility = 'hidden';
          introOverlay.style.height = '0';
          introOverlay.style.overflow = 'hidden';
          introOverlay.style.opacity = '0';
          introOverlay.style.transform = 'translateY(60px)';
          introOverlay.style.pointerEvents = 'none';
        }
      }

      // Lock at progress = 1
      if (progress >= 1) {
        transformDone = true;

        if (quoteWrapper) quoteWrapper.style.display = 'none';
        if (authorEl) authorEl.style.display = 'none';
        if (dividerEl) dividerEl.style.height = '220px';
        if (imgPrimary) imgPrimary.style.opacity = '0';
        if (imgSecondary) {
          imgSecondary.style.opacity = '1';
          imgSecondary.style.maxWidth = '700px';
          imgSecondary.style.height = '85vh';
          imgSecondary.style.objectFit = 'cover';
          imgSecondary.style.objectPosition = 'center';
          imgSecondary.style.transform = 'translateX(-150px)'; 
        }

        if (introOverlay) {
          introOverlay.style.visibility = 'visible';
          introOverlay.style.height = 'auto';
          introOverlay.style.overflow = 'visible';
          introOverlay.style.opacity = '1';
          introOverlay.style.transform = 'translateY(0)';
          introOverlay.style.pointerEvents = 'all';
        }
      }
    }
  });
}, { passive: true });
// Beyond section observer
const beyondSection = document.querySelector(".beyond-wrapper");
if (beyondSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        beyondSection.classList.add("in-view");
      } else {
        beyondSection.classList.remove("in-view");
      }
    });
  }, { threshold: 0.1 }).observe(beyondSection);
}

// Drawing gallery — infinite seamless loop
const slidesContainer = document.querySelector('.gallery-slides');
const originalSlides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.gallery-dot');

if (slidesContainer && originalSlides.length > 0) {
  const total = originalSlides.length;
  let current = 0; // tracks the "real" index (0 to total-1)
  let isTransitioning = false;

  // 1. Clone first and last slides and insert them
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[total - 1].cloneNode(true);

  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  // Append clone of first at the end, prepend clone of last at the start
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, originalSlides[0]);

  // 2. Start at position 1 (the real first slide, after the prepended clone)
  let position = 1; // real slides are at index 1 to total
  slidesContainer.style.transition = 'none';
  slidesContainer.style.transform = `translateX(-${position * 100}%)`;

  function goToPosition(pos, animate = true) {
    if (!animate) {
      slidesContainer.style.transition = 'none';
    } else {
      slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    slidesContainer.style.transform = `translateX(-${pos * 100}%)`;
    position = pos;
  }

  function updateDots(realIndex) {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[realIndex]) dots[realIndex].classList.add('active');
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    goToPosition(position + 1);
    current = (current + 1) % total;
    updateDots(current);
  }

  // 3. After transition ends, silently jump if on a clone
  slidesContainer.addEventListener('transitionend', () => {
    isTransitioning = false;

    // If on the last clone (clone of first) → jump to real first
    if (position === total + 1) {
      goToPosition(1, false);
    }

    // If on the first clone (clone of last) → jump to real last
    if (position === 0) {
      goToPosition(total, false);
    }
  });

  // 4. Auto-advance every 2 seconds
  setInterval(nextSlide, 2000);

  // 5. Dot click support
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      current = i;
      goToPosition(i + 1); // +1 because position 0 is the last clone
      updateDots(current);
    });
  });

  // Set first dot active on load
  updateDots(0);
}
// =========================================
// RESUME + CONTACT SECTION — CONCEPT 4
// =========================================

// Scroll reveal observer
const rcSection = document.getElementById('resume-contact');
if (rcSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      rcSection.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.1 }).observe(rcSection);
}

// Terminal send handler
function handleSend() {
  const name     = document.getElementById('t-name').value.trim();
  const email    = document.getElementById('t-email').value.trim();
  const message  = document.getElementById('t-message').value.trim();
  const response = document.getElementById('t-response');
  const btn      = document.querySelector('.t-send-btn');

  // — Validation —
  if (!name || !email || !message) {
    response.style.color = '#E24B4A';
    response.textContent = '> Error: all fields required. try again.';
    response.classList.add('show');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    response.style.color = '#E24B4A';
    response.textContent = '> Error: invalid email format.';
    response.classList.add('show');
    return;
  }

  // — Sending state —
  btn.textContent = './sending...';
  btn.disabled = true;
  response.style.color = '#febc2e';
  response.textContent = '> Transmitting message...';
  response.classList.add('show');

  // — Real EmailJS send —
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    message:    message,
  })
  .then(() => {
    response.style.color = '#28c840';
    response.textContent = `> Message sent successfully. Talk soon, ${name}. ✓`;
    btn.textContent = 'send_message';
    btn.disabled = false;
    // Clear fields
    document.getElementById('t-name').value    = '';
    document.getElementById('t-email').value   = '';
    document.getElementById('t-message').value = '';
  })
  .catch((error) => {
    response.style.color = '#E24B4A';
    response.textContent = `> Error: failed to send. (${error.text || 'check console'})`;
    btn.textContent = 'send_message';
    btn.disabled = false;
    console.error('EmailJS error:', error);
  });
}


// Typing effect on terminal load
const terminalLines = [
  { el: '.t-output:nth-of-type(1)', delay: 300 },
  { el: '.t-output:nth-of-type(2)', delay: 800 },
];

const rcObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const outputs = document.querySelectorAll('.t-output');
      outputs.forEach((el, i) => {
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease';
          el.style.opacity = '1';
        }, 400 + i * 500);
      });
      rcObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (rcSection) rcObserver.observe(rcSection);

// ============ THEME TOGGLE ============
function toggleTheme() {
  bodyEl.classList.toggle('light-mode');
  const isLight = bodyEl.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = isLight ? '🌙' : '☀️';

  const profilePic = document.querySelector('.column.left img');
  if (profilePic) {
    profilePic.src = isLight ? 'image/cvpic3.png' : 'image/cvpic4.png';
  }
}

(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = '🌙';
    const profilePic = document.querySelector('.column.left img');
    if (profilePic) profilePic.src = 'image/cvpic3.png';
  }
})();
// ============ FIREFLY EFFECT ============
function createFireflies() {
  const container = document.getElementById('home');
  const count = 28;

  for (let i = 0; i < count; i++) {
    const fly = document.createElement('div');
    fly.classList.add('firefly');

    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${Math.random() * 100}%`;

    const size = 2 + Math.random() * 3;
    fly.style.width = `${size}px`;
    fly.style.height = `${size}px`;

    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 8;
    fly.style.animationDuration = `${duration}s`;
    fly.style.animationDelay = `${delay}s`;

    // Unique random drift for each firefly
    const x1 = (Math.random() - 0.5) * 140;
    const y1 = (Math.random() - 0.5) * 140;
    const x2 = (Math.random() - 0.5) * 100;
    const y2 = (Math.random() - 0.5) * 80;

    fly.style.setProperty('--x1', `${x1}px`);
    fly.style.setProperty('--y1', `${y1}px`);
    fly.style.setProperty('--x2', `${x2}px`);
    fly.style.setProperty('--y2', `${y2}px`);

    container.appendChild(fly);
  }
}
createFireflies();