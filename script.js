// ====================================
// Portfolio Website JavaScript
// Mobile Navigation Fix
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // Mobile Navigation Toggle
    // ====================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // فتح/إغلاق القائمة
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    // إغلاق القائمة عند الضغط على أي رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // ====================================
    // Active Navigation Link
    // ====================================
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // تفعيل عند تحميل الصفحة
    
    // ====================================
    // Smooth Scroll
    // ====================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================================
    // Animated Counter for Stats
    // ====================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60 FPS
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target + (target === 100 ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // تفعيل عند تحميل الصفحة
    
    // ====================================
    // Contact Form Handler
    // ====================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
            console.log('Form Data:', formData);
            
            // رسالة نجاح
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }
    
    // ====================================
    // Navbar Background on Scroll
    // ====================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 19, 43, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(11, 19, 43, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ====================================
    // Admin Panel Access (Hidden Feature)
    // ====================================
    const adminBtn = document.getElementById('adminBtn');
    
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            const password = prompt('أدخل كلمة المرور:');
            
            // يمكنك تغيير كلمة المرور هنا
            if (password === 'admin123') {
                alert('مرحباً بك في لوحة التحكم!');
                // هنا يمكنك توجيه المستخدم إلى صفحة الإدارة
                // window.location.href = 'admin.html';
            } else if (password) {
                alert('كلمة المرور غير صحيحة!');
            }
        });
    }
    
    // ====================================
    // Theme Detection (Ramadan/Celebration)
    // ====================================
    function checkSpecialDates() {
        const today = new Date();
        const month = today.getMonth() + 1; // 1-12
        const day = today.getDate();
        
        // مثال: تفعيل ثيم رمضان في شهر رمضان (يمكن تخصيصه)
        // هذا مجرد مثال - يجب تعديل التواريخ حسب التقويم الهجري الفعلي
        if (month === 3 || month === 4) {
            body.classList.add('ramadan-theme');
        }
        
        // مثال: تفعيل ثيم الاحتفال في المناسبات (رأس السنة، الأعياد، إلخ)
        if ((month === 12 && day >= 25) || (month === 1 && day <= 7)) {
            body.classList.add('celebration-theme');
        }
    }
    
    checkSpecialDates();
    
    // ====================================
    // Scroll Reveal Animation
    // ====================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.service-card, .project-card, .stat-card, .skill-item');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // إضافة أنماط أولية للعناصر
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-card, .skill-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تفعيل عند تحميل الصفحة
    
    // ====================================
    // Project Gallery (if exists)
    // ====================================
    const galleryMain = document.querySelector('.gallery-main img');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    
    if (galleryThumbs.length > 0) {
        galleryThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // إزالة الكلاس active من جميع الصور المصغرة
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // إضافة الكلاس active للصورة المحددة
                this.classList.add('active');
                
                // تغيير الصورة الرئيسية
                const newSrc = this.querySelector('img').src;
                if (galleryMain) {
                    galleryMain.src = newSrc;
                }
            });
        });
        
        // Gallery Navigation Buttons
        const prevBtn = document.querySelector('.gallery-btn.prev');
        const nextBtn = document.querySelector('.gallery-btn.next');
        let currentIndex = 0;
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
                galleryThumbs[currentIndex].click();
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % galleryThumbs.length;
                galleryThumbs[currentIndex].click();
            });
        }
    }
    
    // ====================================
    // Prevent Context Menu on Images (Optional)
    // ====================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            // غير مفعّل افتراضياً - يمكن إزالة التعليق لتفعيله
            // e.preventDefault();
        });
    });
    
    // ====================================
    // Loading Animation (Optional)
    // ====================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ====================================
    // Console Message
    // ====================================
    console.log('%c👋 مرحباً بك في موقع محمد سيد حسن غنيم!', 'color: #0f766e; font-size: 20px; font-weight: bold;');
    console.log('%cللتواصل: واتساب +20 109 724 0734', 'color: #25d366; font-size: 14px;');
    console.log('%cمطور تطبيقات Flutter و PHP', 'color: #0ea5e9; font-size: 14px;');
    
});

// ====================================
// Utility Functions
// ====================================

// دالة لتحويل الأرقام العربية إلى إنجليزية (إذا لزم الأمر)
function convertArabicToEnglish(string) {
    return string.replace(/[\u0660-\u0669]/g, function(c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function(c) {
        return c.charCodeAt(0) - 0x06f0;
    });
}

// دالة للتحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// دالة لتنسيق رقم الهاتف
function formatPhoneNumber(phone) {
    // إزالة جميع المسافات والرموز
    phone = phone.replace(/\D/g, '');
    
    // تنسيق الرقم
    if (phone.startsWith('20')) {
        return '+' + phone;
    } else if (phone.startsWith('0')) {
        return '+20' + phone.substring(1);
    } else {
        return '+20' + phone;
    }
}

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        convertArabicToEnglish,
        isValidEmail,
        formatPhoneNumber
    };
}
