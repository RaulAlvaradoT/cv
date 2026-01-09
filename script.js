// ===================================
// Theme Management
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const navLogoImg = document.getElementById('nav-logo-img');
const footerLogo = document.getElementById('footer-logo');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateLogos(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateLogos(newTheme);
});

// Update logos based on theme
function updateLogos(theme) {
  if (theme === 'dark') {
    // Fondo negro (FN) para tema oscuro
    navLogoImg.src = 'LOGO/RA-FN-TXT.png';
    footerLogo.src = 'LOGO/RA-FN-LOGO.png';
  } else {
    // Fondo blanco (FB) para tema claro
    navLogoImg.src = 'LOGO/RA-FB-TXT.png';
    footerLogo.src = 'LOGO/RA-FB-LOGO.png';
  }
}

// ===================================
// Mobile Navigation
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===================================
// Smooth Scrolling & Active Nav Links
// ===================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = 'none';
  } else {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// ===================================
// AOS (Animate On Scroll) Initialization
// ===================================
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100,
  delay: 0,
});

// Refresh AOS on window resize
window.addEventListener('resize', () => {
  AOS.refresh();
});

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
let charIndex = 0;

function typeWriter() {
  if (charIndex < subtitleText.length) {
    heroSubtitle.textContent = subtitleText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeWriter, 50);
  }
}

// Uncomment to enable typing effect
// heroSubtitle.textContent = '';
// setTimeout(typeWriter, 1000);

// ===================================
// Particle Background Effect (Tech Feel)
// ===================================
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  document.body.appendChild(particlesContainer);
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--accent-blue);
      border-radius: 50%;
      left: ${posX}%;
      top: ${posY}%;
      opacity: 0.3;
      animation: float ${duration}s ${delay}s infinite ease-in-out;
    `;
    
    particlesContainer.appendChild(particle);
  }
  
  // Add animation styles
  if (!document.getElementById('particle-animations')) {
    const style = document.createElement('style');
    style.id = 'particle-animations';
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.3;
        }
        25% {
          transform: translate(20px, -30px) scale(1.2);
          opacity: 0.5;
        }
        50% {
          transform: translate(-20px, -60px) scale(0.8);
          opacity: 0.2;
        }
        75% {
          transform: translate(30px, -40px) scale(1.1);
          opacity: 0.4;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize particles
createParticles();

// ===================================
// Project Card Interactive Effects
// ===================================
// Removed 3D rotation effect - keeping simple hover

// ===================================
// Scroll Progress Indicator
// ===================================
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-green) 100%);
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

createScrollProgress();

// ===================================
// Skills Animation on Hover
// ===================================
const skillItems = document.querySelectorAll('.skills-list li');

skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const skillName = item.querySelector('.skill-name');
    skillName.style.color = 'var(--accent-blue)';
  });
  
  item.addEventListener('mouseleave', () => {
    const skillName = item.querySelector('.skill-name');
    skillName.style.color = 'var(--text-primary)';
  });
});

// ===================================
// Copy Email to Clipboard
// ===================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const email = link.getAttribute('href').replace('mailto:', '');
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = '¡Email copiado!';
    tooltip.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-green);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10000;
      animation: slideUpFade 3s ease forwards;
    `;
    
    // Add animation
    if (!document.getElementById('tooltip-animations')) {
      const style = document.createElement('style');
      style.id = 'tooltip-animations';
      style.textContent = `
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            bottom: 20px;
          }
          10% {
            opacity: 1;
            bottom: 30px;
          }
          90% {
            opacity: 1;
            bottom: 30px;
          }
          100% {
            opacity: 0;
            bottom: 40px;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(tooltip);
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).catch(err => {
      console.error('Error al copiar:', err);
    });
    
    // Remove tooltip after animation
    setTimeout(() => {
      tooltip.remove();
    }, 3000);
  });
});

// ===================================
// Statistics Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toString().includes('+') ? target : Math.ceil(target) + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current) + '+';
    }
  }, 16);
}

// Intersection Observer for stats animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      const hasPlus = text.includes('+');
      
      animateCounter(entry.target, number);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  const originalText = stat.textContent;
  stat.setAttribute('data-target', originalText);
  statsObserver.observe(stat);
});

// ===================================
// Easter Egg: Konami Code
// ===================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  document.body.style.animation = 'rainbow 2s infinite';
  
  if (!document.getElementById('rainbow-animation')) {
    const style = document.createElement('style');
    style.id = 'rainbow-animation';
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Console Message
// ===================================
console.log('%c¡Hola Developer! 👨‍💻', 'color: #007acc; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en el código? Contáctame: IngRaulAlvarado@hotmail.com', 'color: #4ec9b0; font-size: 14px;');

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('CV Website loaded successfully! 🚀');
});
