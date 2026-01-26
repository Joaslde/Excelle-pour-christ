/* ========================================
   Excelle pour Christ - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initDropdowns();
  initHeroCarousel();
  initScrollAnimations();
  initVerseGenerator();
  initForms();
  initDonation();
  initSmoothScroll();
  initAllButtons();
});

/* ========================================
   Navbar
   ======================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link highlighting based on current page
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    }
  });
}

/* ========================================
   Dropdown Menus (Mobile Fix)
   ======================================== */
   function initDropdowns() {
    // Sur mobile, ferme la navbar après clic sur un lien
    document.querySelectorAll('.dropdown-item, .nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (window.innerWidth < 992 && navbarCollapse?.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          bsCollapse?.hide();
        }
      });
    });
  }
/* ========================================
   Hero Carousel
   ======================================== */
function initHeroCarousel() {
  const carouselItems = document.querySelectorAll('.hero-carousel-item');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (carouselItems.length === 0) return;

  let currentIndex = 0;
  const totalItems = carouselItems.length;
  let autoplayInterval;

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Start autoplay
  startAutoplay();

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      currentIndex = index;
      showSlide(currentIndex);
      startAutoplay();
    });
  });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animation = el.dataset.animation || 'fade-up';
        const delay = el.dataset.delay || 0;
        
        setTimeout(() => {
          el.classList.add('animated', `animate-${animation}`);
        }, delay * 1000);
        
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   Verse Generator
   ======================================== */
const verses = [
  { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", reference: "Jérémie 29:11" },
  { text: "L'Éternel est mon berger: je ne manquerai de rien.", reference: "Psaume 23:1" },
  { text: "Je puis tout par celui qui me fortifie.", reference: "Philippiens 4:13" },
  { text: "Ne crains point, car je suis avec toi; ne t'effraie point, car je suis ton Dieu.", reference: "Ésaïe 41:10" },
  { text: "Remets ton sort à l'Éternel, et il te soutiendra.", reference: "Psaume 55:22" },
  { text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", reference: "Psaume 119:105" },
  { text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.", reference: "Psaume 91:1" },
  { text: "L'amour est patient, l'amour est serviable, il n'est point envieux.", reference: "1 Corinthiens 13:4" },
  { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", reference: "Matthieu 11:28" },
  { text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.", reference: "Matthieu 6:33" },
  { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", reference: "Jean 3:16" },
  { text: "Et nous savons que toutes choses concourent au bien de ceux qui aiment Dieu.", reference: "Romains 8:28" }
];

let currentVerse = null;

function initVerseGenerator() {
  const verseBtn = document.getElementById('verseBtn');
  const verseModal = document.getElementById('verseModal');
  const verseClose = document.getElementById('verseClose');
  const verseText = document.getElementById('verseText');
  const verseReference = document.getElementById('verseReference');
  const downloadVerseBtn = document.getElementById('downloadVerseBtn');

  if (!verseBtn || !verseModal) return;

  function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  }

  function showVerse() {
    currentVerse = getRandomVerse();
    if (verseText) verseText.textContent = `"${currentVerse.text}"`;
    if (verseReference) verseReference.textContent = `— ${currentVerse.reference}`;
    verseModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function hideVerse() {
    verseModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  verseBtn.addEventListener('click', showVerse);
  
  if (verseClose) {
    verseClose.addEventListener('click', hideVerse);
  }

  verseModal.addEventListener('click', (e) => {
    if (e.target === verseModal) {
      hideVerse();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && verseModal.classList.contains('show')) {
      hideVerse();
    }
  });

  // Download verse as image
  if (downloadVerseBtn) {
    downloadVerseBtn.addEventListener('click', () => {
      if (currentVerse) {
        downloadVerseImage(currentVerse);
      }
    });
  }
}

function downloadVerseImage(verse) {
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 1080 : 1280;
  const height = isMobile ? 1080 : 720;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#011C40');
  gradient.addColorStop(0.5, '#021F59');
  gradient.addColorStop(1, '#011C40');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Gold decorative circles
  ctx.fillStyle = 'rgba(217, 170, 82, 0.1)';
  ctx.beginPath();
  ctx.arc(width * 0.1, height * 0.2, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width * 0.9, height * 0.8, 200, 0, Math.PI * 2);
  ctx.fill();

  // Gold border
  ctx.strokeStyle = '#D9AA52';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Inner border
  ctx.strokeStyle = 'rgba(217, 170, 82, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Verse text
  ctx.fillStyle = '#F2F2F2';
  ctx.font = `italic ${isMobile ? 36 : 32}px 'Georgia', serif`;
  ctx.textAlign = 'center';
  
  const maxWidth = width - 160;
  const text = verse.text;
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine.trim());

  const lineHeight = isMobile ? 50 : 45;
  const startY = (height - lines.length * lineHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });

  // Reference
  ctx.fillStyle = '#D9AA52';
  ctx.font = `bold ${isMobile ? 28 : 24}px 'Arial', sans-serif`;
  ctx.fillText(verse.reference, width / 2, startY + lines.length * lineHeight + 50);

  // Church name
  ctx.fillStyle = 'rgba(242, 242, 242, 0.6)';
  ctx.font = `14px 'Arial', sans-serif`;
  ctx.fillText('Excelle pour Christ International', width / 2, height - 60);

  // Download
  const link = document.createElement('a');
  link.download = `verset-${verse.reference.replace(/\s+/g, '-').replace(/:/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/* ========================================
   Forms
   ======================================== */
function initForms() {
  const contactForm = document.getElementById('contactForm');
  const newsletterForms = document.querySelectorAll('form:not(#contactForm)');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Validate required fields
      if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.interest) {
        showToast('Champs requis', 'Veuillez remplir tous les champs obligatoires.', 'warning');
        return;
      }
      
      // Get selected volunteer areas
      const volunteerAreas = [];
      document.querySelectorAll('input[name="volunteerArea"]:checked').forEach(cb => {
        volunteerAreas.push(cb.value);
      });

      // Build WhatsApp message
      const interestLabels = {
        visit: "Visiter l'église",
        member: "Devenir membre",
        info: "Obtenir plus d'informations",
        prayer: "Demander une prière",
        volunteer: "Devenir bénévole"
      };

      const volunteerLabels = {
        worship: "Louange & Musique",
        teaching: "Enseignement",
        children: "Ministère Enfants",
        hospitality: "Accueil & Hospitalité",
        community: "Actions Sociales",
        youth: "Ministère Jeunesse"
      };

      let message = `*Nouveau contact - Excelle pour Christ*\n\n`;
      message += `*Nom:* ${data.firstName} ${data.lastName}\n`;
      message += `*Email:* ${data.email}\n`;
      message += `*Téléphone:* ${data.phone}\n`;
      message += `*Intérêt:* ${interestLabels[data.interest] || data.interest}\n`;
      
      if (data.message) {
        message += `*Message:* ${data.message}\n`;
      }
      
      if (volunteerAreas.length > 0) {
        const areas = volunteerAreas.map(id => volunteerLabels[id] || id).join(", ");
        message += `*Bénévolat:* ${areas}\n`;
      }
      
      if (data.newsletter === 'on') {
        message += `*Newsletter:* Oui\n`;
      }

      const whatsappNumber = "22901968164596";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, "_blank");
      
      showToast('Redirection vers WhatsApp', 'Envoyez le message pour nous contacter.');
      
      contactForm.reset();
      const volunteerAreasEl = document.getElementById('volunteerAreas');
      if (volunteerAreasEl) volunteerAreasEl.style.display = 'none';
    });

    // Toggle volunteer areas
    const volunteerCheckbox = document.getElementById('volunteerCheckbox');
    const volunteerAreas = document.getElementById('volunteerAreas');
    
    if (volunteerCheckbox && volunteerAreas) {
      volunteerCheckbox.addEventListener('change', function() {
        volunteerAreas.style.display = this.checked ? 'block' : 'none';
      });
    }
  }
  
  // Newsletter forms
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Inscription réussie !', 'Vous recevrez bientôt nos enseignements quotidiens.');
        form.reset();
      }
    });
  });
}

/* ========================================
   Donation
   ======================================== */
function initDonation() {
  const donationTypes = document.querySelectorAll('.donation-type');
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  const donateBtn = document.getElementById('donateBtn');
  const copyBtn = document.getElementById('copyDepositNumber');
  const donationForm = document.getElementById('donationForm');

  let selectedType = null;
  let selectedAmount = '';

  // Donation type selection
  donationTypes.forEach(type => {
    type.addEventListener('click', function() {
      donationTypes.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      selectedType = this.dataset.type;
      
      if (donationForm) {
        donationForm.style.display = 'block';
        setTimeout(() => {
          donationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  });

  // Amount selection
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      amountBtns.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedAmount = this.dataset.amount;
      if (customAmountInput) customAmountInput.value = '';
    });
  });

  // Custom amount
  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      amountBtns.forEach(b => b.classList.remove('selected'));
      selectedAmount = this.value;
    });
  }

  // Copy deposit number
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const number = '01968164596';
      navigator.clipboard.writeText(number).then(() => {
        showToast('Numéro copié !', 'Le numéro de dépôt a été copié dans le presse-papier.');
        this.innerHTML = '<i class="bi bi-check-lg"></i>';
        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Numéro copié !', 'Le numéro de dépôt a été copié.');
      });
    });
  }

  // Donate button
  if (donateBtn) {
    donateBtn.addEventListener('click', function() {
      const amount = selectedAmount || (customAmountInput ? customAmountInput.value : '');
      
      if (!selectedType) {
        showToast('Information manquante', 'Veuillez sélectionner un type de don.', 'warning');
        return;
      }
      
      if (!amount || amount <= 0) {
        showToast('Information manquante', 'Veuillez sélectionner ou entrer un montant valide.', 'warning');
        return;
      }

      // Show processing state
      const originalContent = this.innerHTML;
      this.innerHTML = '<span class="spinner"></span> Traitement...';
      this.disabled = true;

      setTimeout(() => {
        const typeLabels = { dime: 'dîme', offering: 'offrande', project: 'don au projet' };
        showToast('Merci pour votre générosité !', 
          `Votre ${typeLabels[selectedType]} de ${formatCFA(amount)} FCFA. Effectuez le dépôt au 01 96 81 64 96.`);
        
        this.innerHTML = originalContent;
        this.disabled = false;
        
        // Reset
        donationTypes.forEach(t => t.classList.remove('selected'));
        amountBtns.forEach(b => b.classList.remove('selected'));
        if (customAmountInput) customAmountInput.value = '';
        if (donationForm) donationForm.style.display = 'none';
        selectedType = null;
        selectedAmount = '';
      }, 1500);
    });
  }
}

function formatCFA(value) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar-custom')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const nextSection = heroSection.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

/* ========================================
   Initialize All Buttons
   ======================================== */
function initAllButtons() {
  // Make all "Lire plus" buttons work
  document.querySelectorAll('a.btn').forEach(btn => {
    const href = btn.getAttribute('href');
    if (href && href !== '#') {
      btn.style.cursor = 'pointer';
    }
  });
  
  // Ministry cards - make them clickable
  document.querySelectorAll('.ministry-card').forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'pages/join.html';
    });
  });
  
  // Social icons - ensure they work
  document.querySelectorAll('.social-icon').forEach(icon => {
    const href = icon.getAttribute('href');
    if (href && href !== '#') {
      icon.style.cursor = 'pointer';
    }
  });
}

/* ========================================
   Toast Notifications
   ======================================== */
function showToast(title, message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast-notification').forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div class="toast-content ${type}">
      <div class="toast-icon">
        <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'}"></i>
      </div>
      <div class="toast-text">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
      <button class="toast-close" aria-label="Fermer">&times;</button>
    </div>
  `;
  
  // Styles
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;
  
  const content = toast.querySelector('.toast-content');
  content.style.cssText = `
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(1, 28, 64, 0.98);
    border: 1px solid ${type === 'success' ? '#D9AA52' : '#dc3545'};
    border-radius: 12px;
    padding: 1rem 1.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    color: #F2F2F2;
  `;
  
  toast.querySelector('.toast-icon').style.cssText = `
    color: ${type === 'success' ? '#D9AA52' : '#dc3545'};
    font-size: 1.5rem;
    flex-shrink: 0;
  `;
  
  toast.querySelector('.toast-text').style.cssText = `
    flex: 1;
  `;
  
  toast.querySelector('.toast-text strong').style.cssText = `
    display: block;
    margin-bottom: 0.25rem;
    color: #FFFFFF;
  `;
  
  toast.querySelector('.toast-text p').style.cssText = `
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.8);
  `;
  
  toast.querySelector('.toast-close').style.cssText = `
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  });
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// Add animation styles
const animStyles = document.createElement('style');
animStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @media (max-width: 575.98px) {
    .toast-notification {
      left: 1rem !important;
      right: 1rem !important;
      bottom: 1rem !important;
      max-width: none !important;
    }
  }
`;
document.head.appendChild(animStyles);
