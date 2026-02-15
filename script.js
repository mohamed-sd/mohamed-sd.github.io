// ====================================
// Portfolio Website JavaScript
// Developer Notes: Easy to modify
// ====================================

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '' : '+');
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats when visible
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Developer Note: Here you can add your form submission logic
    // For example: send to email service, API endpoint, etc.
    
    console.log('Form Data:', formData);
    
    // Show success message
    alert('شكراً لتواصلك! سأرد عليك في أقرب وقت ممكن.');
    
    // Reset form
    contactForm.reset();
});

// ====================================
// Admin Panel Functionality
// ====================================

const adminBtn = document.getElementById('adminBtn');
let adminClickCount = 0;
let adminClickTimer;

// Triple click to access admin
adminBtn.addEventListener('click', () => {
    adminClickCount++;
    
    if (adminClickCount === 1) {
        adminClickTimer = setTimeout(() => {
            adminClickCount = 0;
        }, 1000);
    }
    
    if (adminClickCount === 3) {
        clearTimeout(adminClickTimer);
        adminClickCount = 0;
        showLoginModal();
    }
});

// Create and show login modal
function showLoginModal() {
    // Check if modal already exists
    if (document.getElementById('adminModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'adminModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const loginBox = document.createElement('div');
    loginBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
        animation: slideDown 0.3s ease;
    `;
    
    loginBox.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 1.5rem; color: #0f172a; font-family: 'Cairo', sans-serif;">
            تسجيل دخول المدير
        </h2>
        <form id="adminLoginForm">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #0f172a;">اسم المستخدم</label>
                <input type="text" id="adminUsername" required style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #cbd5e1;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-family: 'Cairo', sans-serif;
                ">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #0f172a;">كلمة المرور</label>
                <input type="password" id="adminPassword" required style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #cbd5e1;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-family: 'Cairo', sans-serif;
                ">
            </div>
            <div style="display: flex; gap: 1rem;">
                <button type="submit" style="
                    flex: 1;
                    padding: 0.75rem;
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    دخول
                </button>
                <button type="button" id="cancelLogin" style="
                    flex: 1;
                    padding: 0.75rem;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    إلغاء
                </button>
            </div>
        </form>
    `;
    
    modal.appendChild(loginBox);
    document.body.appendChild(modal);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Handle login
    document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === 'admin' && password === '2026') {
            document.body.removeChild(modal);
            showAdminPanel();
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
        }
    });
    
    // Handle cancel
    document.getElementById('cancelLogin').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Show Admin Panel
function showAdminPanel() {
    // Check if panel already exists
    if (document.getElementById('adminPanel')) return;
    
    const panel = document.createElement('div');
    panel.id = 'adminPanel';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const panelContent = document.createElement('div');
    panelContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 1.5rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        max-width: 500px;
        width: 90%;
        animation: slideDown 0.3s ease;
    `;
    
    // Get current theme
    const currentTheme = localStorage.getItem('siteTheme') || 'normal';
    
    panelContent.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 2rem; color: #0f172a; font-family: 'Cairo', sans-serif; font-size: 2rem;">
            لوحة التحكم الإدارية
        </h2>
        <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: #0f172a; font-family: 'Cairo', sans-serif;">اختر تصميم الموقع:</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <label style="
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border: 2px solid ${currentTheme === 'normal' ? '#6366f1' : '#cbd5e1'};
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    background: ${currentTheme === 'normal' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))' : 'white'};
                " onmouseover="if(this.querySelector('input').checked === false) this.style.borderColor='#6366f1'" onmouseout="if(this.querySelector('input').checked === false) this.style.borderColor='#cbd5e1'">
                    <input type="radio" name="theme" value="normal" ${currentTheme === 'normal' ? 'checked' : ''} style="
                        margin-left: 1rem;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    ">
                    <div>
                        <div style="font-weight: 600; color: #0f172a; font-family: 'Cairo', sans-serif; margin-bottom: 0.25rem;">🎨 تصميم عادي</div>
                        <div style="font-size: 0.9rem; color: #64748b;">التصميم الافتراضي للموقع</div>
                    </div>
                </label>
                
                <label style="
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border: 2px solid ${currentTheme === 'ramadan' ? '#6366f1' : '#cbd5e1'};
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    background: ${currentTheme === 'ramadan' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))' : 'white'};
                " onmouseover="if(this.querySelector('input').checked === false) this.style.borderColor='#6366f1'" onmouseout="if(this.querySelector('input').checked === false) this.style.borderColor='#cbd5e1'">
                    <input type="radio" name="theme" value="ramadan" ${currentTheme === 'ramadan' ? 'checked' : ''} style="
                        margin-left: 1rem;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    ">
                    <div>
                        <div style="font-weight: 600; color: #0f172a; font-family: 'Cairo', sans-serif; margin-bottom: 0.25rem;">🌙 تصميم رمضان</div>
                        <div style="font-size: 0.9rem; color: #64748b;">إضافة هلال وألوان رمضانية</div>
                    </div>
                </label>
                
                <label style="
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border: 2px solid ${currentTheme === 'celebration' ? '#6366f1' : '#cbd5e1'};
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    background: ${currentTheme === 'celebration' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))' : 'white'};
                " onmouseover="if(this.querySelector('input').checked === false) this.style.borderColor='#6366f1'" onmouseout="if(this.querySelector('input').checked === false) this.style.borderColor='#cbd5e1'">
                    <input type="radio" name="theme" value="celebration" ${currentTheme === 'celebration' ? 'checked' : ''} style="
                        margin-left: 1rem;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    ">
                    <div>
                        <div style="font-weight: 600; color: #0f172a; font-family: 'Cairo', sans-serif; margin-bottom: 0.25rem;">🎉 تصميم الاحتفال</div>
                        <div style="font-size: 0.9rem; color: #64748b;">إضافة تأثيرات احتفالية مع كونفيتي</div>
                    </div>
                </label>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem;">
            <button id="applyTheme" style="
                flex: 1;
                padding: 1rem;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                border-radius: 0.75rem;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                font-family: 'Cairo', sans-serif;
                transition: transform 0.2s;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                ✓ طبق التصميم
            </button>
            <button id="closePanel" style="
                padding: 1rem 1.5rem;
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                font-family: 'Cairo', sans-serif;
                transition: transform 0.2s;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                إغلاق
            </button>
        </div>
    `;
    
    panel.appendChild(panelContent);
    document.body.appendChild(panel);
    
    // Handle theme application
    document.getElementById('applyTheme').addEventListener('click', () => {
        const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
        applyTheme(selectedTheme);
        localStorage.setItem('siteTheme', selectedTheme);
        alert('تم تطبيق التصميم بنجاح! ✓');
        document.body.removeChild(panel);
    });
    
    // Handle close
    document.getElementById('closePanel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });
    
    // Close on background click
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            document.body.removeChild(panel);
        }
    });
}

// Apply Theme Function
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('ramadan-theme', 'celebration-theme');
    
    // Apply selected theme
    if (theme === 'ramadan') {
        document.body.classList.add('ramadan-theme');
    } else if (theme === 'celebration') {
        document.body.classList.add('celebration-theme');
    }
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('siteTheme') || 'normal';
    applyTheme(savedTheme);
});

// ====================================
// Additional Enhancements
// ====================================

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (heroGradient) {
        heroGradient.style.opacity = 1 - (scrolled / 600);
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Console message for developers
console.log(`
╔═══════════════════════════════════════╗
║   Portfolio Website by Developer     ║
║   Built with ❤️ and JavaScript       ║
╚═══════════════════════════════════════╝

Developer Notes:
- All styles are in styles.css
- Easy to modify and maintain
- Fully responsive design
- Admin panel: Triple-click ⚙️ button
- Credentials: admin / 2026
`);
