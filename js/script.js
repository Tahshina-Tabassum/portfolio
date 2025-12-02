function toggleMenu() {
    const navLinks = document.getElementById("mainNavLinks");
    navLinks.classList.toggle("active");
  }
  
  // select all <a> inside the container
  document.querySelectorAll("#mainNavLinks a").forEach(link => {
    link.addEventListener("click", () => {
      // remove “active” when any link is clicked
      document.getElementById("mainNavLinks").classList.remove("active");
    });
  });
  
  
  const text = '" What is done with love, is done well ."';
  const typingText = document.getElementById("typing-text");
  const author = document.querySelector(".author");
  
  let index = 0;
  let typingSpeed = 70; // faster typing
  let paused = false;
  
  function type() {
    if (index < text.length) {
      const currentChar = text.charAt(index);
      typingText.textContent += currentChar;
  
      // Check for comma pause
      if (currentChar === ',') {
        paused = true;
        setTimeout(() => {
          paused = false;
          index++;
          type(); // continue after pause
        }, 900); // pause duration at comma
        return;
      }
  
      index++;
      setTimeout(type, typingSpeed);
    } else {
      // Show the author once typing is complete
      author.style.opacity = "1";
      author.style.transition = "opacity 1.5s ease-in-out";
    }
  }
  
  window.onload = type;
  
  let skillAnimationStarted = false;

  function animateSkillFills() {
    const bars = [
      { selector: ".fill-figma", width: "75%" },
      { selector: ".fill-html", width: "80%" },
      { selector: ".fill-c", width: "50%" },
      { selector: ".fill-sql", width: "65%" }
    ];

    bars.forEach((bar, i) => {
      const el = document.querySelector(bar.selector);
      el.style.width = "0%"; // Reset to 0 initially

      setTimeout(() => {
        el.style.width = bar.width;
      }, i * 1000); // Delay each bar
    });
  }

  window.addEventListener("scroll", () => {
    const section = document.getElementById("skills");
    const position = section.getBoundingClientRect().top;

    if (!skillAnimationStarted && position < window.innerHeight - 150) {
      animateSkillFills();
      skillAnimationStarted = true;
    }
  });

 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Fading text
        if (el.classList.contains('fade-bold')) {
          el.classList.remove('fade-bold');
          void el.offsetWidth;
          el.classList.add('fade-bold');

          // Back-block animation starts after fade-bold
          setTimeout(() => {
            document.querySelectorAll('.back-block.animate-on-scroll').forEach(b => {
              b.classList.add('start-animation');
            });
          }, 2200);

          // Red animation starts after back-block
          setTimeout(() => {
            document.querySelectorAll('.red.animate-on-scroll').forEach(r => {
              r.classList.add('start-animation');
            });
          }, 4200);
        }
        // After red animation, start quote animation
setTimeout(() => {
  document.querySelectorAll('.text.animate-on-scroll').forEach(q => {
    q.classList.add('start-animation');
  });
}, 6200); // 2.2s (bold) + 2.2s (back) + 1.2s (red) + buffer

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.3
  });
// Attach observer to elements that should animate on scroll
document.querySelectorAll('.fade-bold, .back-block.animate-on-scroll, .red.animate-on-scroll, .text.animate-on-scroll')
  .forEach(el => observer.observe(el));

 


  document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.getElementById("contact");
    const decorImages = document.querySelectorAll(".contact-decor");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Section is in view → show images
            decorImages.forEach(img => img.classList.add("show"));
          } else {
            // Section is out of view → hide images
            decorImages.forEach(img => img.classList.remove("show"));
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    observer.observe(contactSection);
  });


document.addEventListener("DOMContentLoaded", () => {
  const resumeSection = document.getElementById("resume");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resumeSection.classList.add("active");
      } else {
        resumeSection.classList.remove("active");
      }
    });
  }, { threshold: 0.3 });

  observer.observe(resumeSection);
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const body = document.body;
  
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
    body.classList.add('scrolled'); // NEW LINE
  } else {
    nav.classList.remove('scrolled');
    body.classList.remove('scrolled'); // NEW LINE
  }
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  // Change this number if your dark section starts higher/lower
  if (window.scrollY < 600) {                    
    nav.classList.add('dark-glass');    // light homepage → dark glass
  } else {
    nav.classList.remove('dark-glass'); // dark sections → light glass
  }
});

// Staggered column animation for About section
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-wrapper");

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  aboutObserver.observe(aboutSection);
});

// Individual element scroll animation (repeats on scroll)
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".column.left, .column.middle, .education-container, .column-4, .column.right, .soft-skills-column, .facts-column, .contact-column"
  );

  const elementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => elementObserver.observe(el));
});

document.querySelectorAll('.center-links a').forEach(link => {
  const originalText = link.textContent;
  let typingInterval = null;
  let isTyping = false;

  link.addEventListener('mouseenter', () => {
    if (isTyping) return;  // prevent starting another interval
    isTyping = true;
    let i = 0;
    link.textContent = '';

    typingInterval = setInterval(() => {
      link.textContent += originalText[i];
      i++;
      if (i >= originalText.length) {
        clearInterval(typingInterval);
        typingInterval = null;
        isTyping = false;
      }
    }, 100); // typing speed
  });

  link.addEventListener('mouseleave', () => {
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
      isTyping = false;
    }
    link.textContent = originalText; // reset text
  });
});


// NEW: Glassmorphism effect based on sections - ADDED
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section');
  
  if (window.scrollY < 100) {
    nav.classList.remove('glass-home', 'glass-about', 'glass-resume');
    return;
  }
  
  let currentSection = null;
  let maxVisibleArea = 0;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate how much of the section is visible
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);
    
    // The section with the most visible area is the current one
    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      currentSection = section.id;
    }
  });
  
  nav.classList.remove('glass-home', 'glass-about', 'glass-resume');
  
  if (currentSection === 'home') {
    nav.classList.add('glass-home');
  } else if (currentSection === 'about') {
    nav.classList.add('glass-about');
  } else if (currentSection === 'resume') {
    nav.classList.add('glass-resume');
  }
});

// Transformation charm effect on scroll - ADD THIS
// Transformation charm effect on scroll with smooth reverse
let transformTriggered = false;

window.addEventListener('scroll', () => {
  const homeContainer = document.querySelector('.home_container');
  const scrollPosition = window.scrollY;
  const triggerPoint = 1;

  if (scrollPosition > triggerPoint) {
    if (!transformTriggered) {
      homeContainer.classList.add('transform');
      transformTriggered = true;
    }
  } else {
    if (transformTriggered) {
      homeContainer.classList.remove('transform');
      transformTriggered = false;
    }
  }
});

// Show/hide about section on scroll
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-wrapper");

  const aboutVisibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("in-view");
        } else {
          aboutSection.classList.remove("in-view");
        }
      });
    },
    { 
      threshold: 0.1,  // Triggers when 10% of section is visible
      rootMargin: "-100px 0px -100px 0px"  // Only show when properly scrolled to
    }
  );

  aboutVisibilityObserver.observe(aboutSection);
});
// Skill bars animation when about section is in view - REPEATS EVERY TIME
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll('.column-4 .skill-bar-figma > div, .column-4 .skill-bar-html > div, .column-4 .skill-bar-py > div, .column-4 .skill-bar-c > div');
  
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const figmaBar = document.querySelector('.column-4 .skill-bar-figma > div');
        const htmlBar = document.querySelector('.column-4 .skill-bar-html > div');
        const pyBar = document.querySelector('.column-4 .skill-bar-py > div');
        const cBar = document.querySelector('.column-4 .skill-bar-c > div');
        
        if (entry.isIntersecting) {
          // Trigger skill bar animations
          if (figmaBar) {
            figmaBar.style.animation = 'none';
            void figmaBar.offsetWidth; // Force reflow
            figmaBar.style.animation = 'fillBar 2s ease-out forwards 0.3s';
          }
          if (htmlBar) {
            htmlBar.style.animation = 'none';
            void htmlBar.offsetWidth;
            htmlBar.style.animation = 'fillBar 2s ease-out forwards 0.6s';
          }
          if (pyBar) {
            pyBar.style.animation = 'none';
            void pyBar.offsetWidth;
            pyBar.style.animation = 'fillBar 2s ease-out forwards 0.9s';
          }
          if (cBar) {
            cBar.style.animation = 'none';
            void cBar.offsetWidth;
            cBar.style.animation = 'fillBar 2s ease-out forwards 1.2s';
          }
        } else {
          // Reset bars when out of view
          if (figmaBar) figmaBar.style.width = '0%';
          if (htmlBar) htmlBar.style.width = '0%';
          if (pyBar) pyBar.style.width = '0%';
          if (cBar) cBar.style.width = '0%';
        }
      });
    },
    { 
      threshold: 0.3
    }
  );

  // Observe the skills column
  const skillsColumn = document.querySelector('.column-4');
  if (skillsColumn) {
    skillObserver.observe(skillsColumn);
  }
});
