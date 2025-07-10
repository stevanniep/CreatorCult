
document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a');

    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- Scroll Animation Logic ---
    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    scrollAnimations.forEach(el => observer.observe(el));

    // --- Merchandise Injection Logic ---
    const merchandise = [
        { name: 'Tech Hoodies', creator: 'TechGuru', price: '$49.99', gradient: 'linear-gradient(to bottom right, var(--orange-400), #ef4444)', link: 'merchandise.html' },
        { name: 'Art T-Shirts', creator: 'ArtVibe', price: '$29.99', gradient: 'linear-gradient(to bottom right, #a855f7, #ec4899)', link: 'merchandise.html' },
        { name: 'Gaming Mugs', creator: 'GameWave', price: '$19.99', gradient: 'linear-gradient(to bottom right, #38bdf8, #22d3ee)', link: 'merchandise.html' },
        { name: 'Eco Tote Bags', creator: 'EcoLife', price: '$24.99', gradient: 'linear-gradient(to bottom right, #4ade80, #10b981)', link: 'merchandise.html' }
    ];

    const merchandiseContainer = document.getElementById('merchandise-grid');
    merchandise.forEach((item, index) => {
        const card = document.createElement('a');
        card.href = item.link;
        card.className = 'scroll-animation merch-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="image-placeholder" style="background: ${item.gradient};">
                <span>${item.creator}</span>
            </div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
        `;
        merchandiseContainer.appendChild(card);
        observer.observe(card); // Observe newly added cards
    });

    // --- Generic Modal Logic ---
    const openModal = (modalContent) => {
        const modalContainer = modalContent.closest('.modal-container');
        modalContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modalContent.classList.add('is-open');
        }, 10);
    };

    const closeModal = (modalContent) => {
        const modalContainer = modalContent.closest('.modal-container');
        modalContent.classList.remove('is-open');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    // --- Login Modal ---
    const loginModalContent = document.getElementById('login-modal-content');
    const loginTriggers = document.querySelectorAll('.login-trigger, #get-started-btn');
    const closeLoginModalBtn = document.getElementById('close-login-modal-btn');
    const loginModalOverlay = document.getElementById('login-modal-overlay');
    const loginForm = document.getElementById('login-form');
    const captchaDisplay = document.getElementById('captcha-display');
    const captchaInput = document.getElementById('captcha');
    const passwordInput = document.getElementById('password');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha-btn');
    const loginErrorMessage = document.getElementById('login-error-message');
    let currentCaptcha = '';

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptcha = captcha;
        captchaDisplay.textContent = currentCaptcha;
        loginErrorMessage.textContent = '';
    };

    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModalContent);
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (captchaInput.value !== currentCaptcha) {
            loginErrorMessage.textContent = 'CAPTCHA tidak cocok. Coba lagi.';
            passwordInput.value = '';
            captchaInput.value = '';
            generateCaptcha();
        } else {
            loginErrorMessage.textContent = '';
            alert('Login Berhasil!');
            closeModal(loginModalContent);
            loginForm.reset();
            generateCaptcha();
        }
    });

    refreshCaptchaBtn.addEventListener('click', generateCaptcha);
    closeLoginModalBtn.addEventListener('click', () => closeModal(loginModalContent));
    loginModalOverlay.addEventListener('click', () => closeModal(loginModalContent));
    generateCaptcha();

});

// suggestion-box
document.addEventListener('DOMContentLoaded', function () {
  const suggestionForm = document.getElementById('suggestion-form');

  if (suggestionForm) {
    suggestionForm.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent page reload
      alert('Thank you for your suggestion!');
      suggestionForm.reset(); // clear form fields
    });
  }
});

document.getElementById('support-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Your message has been sent! Our support team will contact you soon.');
    this.reset();
});