// ====================================
// Portfolio Website JavaScript
// Developer Notes: Easy to modify
// ====================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

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
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Mobile Navigation Toggle
function closeMobileMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    });

    // Close menu when clicking a menu link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

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

if (contactForm) {
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
}

// ====================================
// Admin Panel Functionality
// ====================================

const adminBtn = document.getElementById('adminBtn');
let adminClickCount = 0;
let adminClickTimer;

function handleAdminClicks() {
    adminClickCount += 1;

    if (adminClickCount === 1) {
        adminClickTimer = setTimeout(() => {
            adminClickCount = 0;
        }, 900);
    }

    if (adminClickCount === 3) {
        clearTimeout(adminClickTimer);
        adminClickCount = 0;
        showLoginModal();
    }
}

if (adminBtn) {
    adminBtn.addEventListener('click', handleAdminClicks);
    adminBtn.addEventListener('touchend', handleAdminClicks, { passive: true });

    // Keyboard accessibility
    adminBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleAdminClicks();
        }
    });
}

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
    const currentTheme = window.siteTheme || 'normal';
    
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
        window.siteTheme = selectedTheme;
        showGlobalThemeHint(selectedTheme);
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

// Load shared theme on page load
window.addEventListener('DOMContentLoaded', () => {
    loadGlobalTheme();
});

async function loadGlobalTheme() {
    try {
        const response = await fetch('theme.json', { cache: 'no-store' });
        if (response.ok) {
            const data = await response.json();
            if (data && typeof data.theme === 'string' && data.theme.length > 0) {
                window.siteTheme = data.theme;
                applyTheme(data.theme);
                return;
            }
        }
    } catch (error) {
        // Fallback to default theme if the shared file is missing or invalid.
    }

    window.siteTheme = 'normal';
    applyTheme('normal');
}

function showGlobalThemeHint(theme) {
    const jsonPreview = JSON.stringify({ theme }, null, 2);
    alert(
        'تم تطبيق التصميم للمعاينة. لتطبيقه لكل الزوار، عدل ملف theme.json بهذا المحتوى:\n\n' +
        jsonPreview
    );
}

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

// Project details gallery
const projectDetailsMap = {
    store: {
        title: 'تطبيق متجر إلكتروني',
        subtitle: 'تجربة تسوق سلسة مع إدارة المنتجات والدفع الآمن.',
        description: 'مشروع يركز على تجربة المستخدم، أداء سريع، وتكامل آمن مع بوابات الدفع.',
        tags: ['Flutter', 'Dart', 'Firebase', 'Payments'],
        images: [
            'https://picsum.photos/seed/store-1/1200/675',
            'https://picsum.photos/seed/store-2/1200/675',
            'https://picsum.photos/seed/store-3/1200/675',
            'https://picsum.photos/seed/store-4/1200/675'
        ]
    },
    education: {
        title: 'منصة تعليمية تفاعلية',
        subtitle: 'لوحات متابعة واختبارات ومواد تعليمية منظمة.',
        description: 'تصميم تجربة تعليمية واضحة للطلاب والإدارة مع تقارير تقدم.',
        tags: ['PHP', 'Bootstrap', 'MySQL'],
        images: [
            'https://picsum.photos/seed/edu-1/1200/675',
            'https://picsum.photos/seed/edu-2/1200/675',
            'https://picsum.photos/seed/edu-3/1200/675'
        ]
    },
    clinic: {
        title: 'نظام إدارة العيادات',
        subtitle: 'مواعيد وسجلات وفواتير ضمن لوحة موحدة.',
        description: 'حل متكامل لإدارة العيادات بصلاحيات متعددة وسير عمل واضح.',
        tags: ['PHP', 'HTML/CSS', 'PostgreSQL'],
        images: [
            'https://picsum.photos/seed/clinic-1/1200/675',
            'https://picsum.photos/seed/clinic-2/1200/675',
            'https://picsum.photos/seed/clinic-3/1200/675'
        ]
    },
    food: {
        title: 'تطبيق توصيل الطعام',
        subtitle: 'تتبع مباشر للطلبات وتقييم المطاعم.',
        description: 'واجهة سهلة للطلبات مع خرائط وتحديثات لحظية.',
        tags: ['Flutter', 'Dart', 'Maps API'],
        images: [
            'https://picsum.photos/seed/food-1/1200/675',
            'https://picsum.photos/seed/food-2/1200/675',
            'https://picsum.photos/seed/food-3/1200/675'
        ]
    },
    analytics: {
        title: 'لوحة تحكم تحليلية',
        subtitle: 'تقارير تفاعلية لمؤشرات الأداء.',
        description: 'لوحة بيانات تساعد على اتخاذ القرار بسرعة.',
        tags: ['PHP', 'JavaScript', 'Charts'],
        images: [
            'https://picsum.photos/seed/analytics-1/1200/675',
            'https://picsum.photos/seed/analytics-2/1200/675',
            'https://picsum.photos/seed/analytics-3/1200/675'
        ]
    },
    tasks: {
        title: 'تطبيق إدارة المهام',
        subtitle: 'تنظيم يومي مع تذكيرات ذكية.',
        description: 'واجهة خفيفة لإدارة المهام والتذكيرات.',
        tags: ['Flutter', 'Dart', 'SQLite'],
        images: [
            'https://picsum.photos/seed/tasks-1/1200/675',
            'https://picsum.photos/seed/tasks-2/1200/675',
            'https://picsum.photos/seed/tasks-3/1200/675'
        ]
    },
    wallet: {
        title: 'تطبيق محفظة رقمية',
        subtitle: 'تحويلات ومدفوعات بأمان وسهولة.',
        description: 'لوحة مالية مع تنبيهات وتقارير مبسطة.',
        tags: ['Flutter', 'Dart', 'API'],
        images: [
            'https://picsum.photos/seed/wallet-1/1200/675',
            'https://picsum.photos/seed/wallet-2/1200/675',
            'https://picsum.photos/seed/wallet-3/1200/675'
        ]
    },
    orders: {
        title: 'نظام متابعة الطلبات',
        subtitle: 'متابعة المخزون والطلبات بوضوح.',
        description: 'إدارة يومية للطلبات مع تقارير وأذونات.',
        tags: ['PHP', 'Bootstrap', 'MySQL'],
        images: [
            'https://picsum.photos/seed/orders-1/1200/675',
            'https://picsum.photos/seed/orders-2/1200/675'
        ]
    },
    school: {
        title: 'تطبيق النقل المدرسي',
        subtitle: 'تتبع الحافلات وإشعارات لحظية.',
        description: 'حل آمن لأولياء الأمور مع خرائط دقيقة.',
        tags: ['Flutter', 'Dart', 'Maps API'],
        images: [
            'https://picsum.photos/seed/school-1/1200/675',
            'https://picsum.photos/seed/school-2/1200/675'
        ]
    },
    stores: {
        title: 'منصة إدارة المتاجر',
        subtitle: 'لوحة مبيعات ومخزون في واجهة واحدة.',
        description: 'تقارير وإدارة صلاحيات مع أداء سريع.',
        tags: ['PHP', 'HTML/CSS', 'MySQL'],
        images: [
            'https://picsum.photos/seed/stores-1/1200/675',
            'https://picsum.photos/seed/stores-2/1200/675'
        ]
    },
    roles: {
        title: 'نظام صلاحيات المستخدمين',
        subtitle: 'تحكم كامل بالأدوار والصلاحيات.',
        description: 'سجل نشاطات وتنبيهات أمنية للإدارة.',
        tags: ['PHP', 'Bootstrap', 'Security'],
        images: [
            'https://picsum.photos/seed/roles-1/1200/675',
            'https://picsum.photos/seed/roles-2/1200/675'
        ]
    },
    support: {
        title: 'نظام دعم العملاء الذكي',
        subtitle: 'إدارة التذاكر وتقارير الأداء.',
        description: 'تصنيف التذاكر وخط سير واضح للفريق.',
        tags: ['PHP', 'JavaScript', 'MySQL'],
        images: [
            'https://picsum.photos/seed/support-1/1200/675',
            'https://picsum.photos/seed/support-2/1200/675'
        ]
    }
};

function initProjectDetails() {
    const detailsPage = document.querySelector('[data-project-details]');
    if (!detailsPage) return;

    const params = new URLSearchParams(window.location.search);
    const projectKey = params.get('project') || detailsPage.getAttribute('data-project-details') || 'store';
    const data = projectDetailsMap[projectKey] || projectDetailsMap.store;

    const titleEl = document.getElementById('projectTitle');
    const subtitleEl = document.getElementById('projectSubtitle');
    const descEl = document.getElementById('projectDescription');
    const tagsEl = document.getElementById('projectTags');
    const mainImage = document.getElementById('galleryMainImage');
    const thumbsEl = document.getElementById('galleryThumbs');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!titleEl || !subtitleEl || !descEl || !tagsEl || !mainImage || !thumbsEl) return;

    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.description;

    tagsEl.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
    });

    let currentIndex = 0;

    function renderMain() {
        mainImage.src = data.images[currentIndex];
        mainImage.alt = data.title;
        Array.from(thumbsEl.children).forEach((child, index) => {
            child.classList.toggle('active', index === currentIndex);
        });
    }

    thumbsEl.innerHTML = '';
    data.images.forEach((src, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-thumb';
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${data.title} ${index + 1}`;
        button.appendChild(img);
        button.addEventListener('click', () => {
            currentIndex = index;
            renderMain();
        });
        thumbsEl.appendChild(button);
    });

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + data.images.length) % data.images.length;
            renderMain();
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % data.images.length;
            renderMain();
        });
    }

    renderMain();
}

initProjectDetails();

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
- Admin panel: Triple-click the ⚙️ button
- Credentials: admin / 2026
`);
