// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // ========== السلايدر الرئيسي ==========
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(parseInt(this.getAttribute('data-index')));
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // ========== آراء العملاء ==========
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    testimonialNext.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
    
    testimonialPrev.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
    
    // ========== تأثير الظهور عند التمرير ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // تحقق مرة واحدة عند التحميل
    
    // ========== العدادات المتحركة ==========
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let countersAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // بدء动画 العدادات عند التمرير إلى قسم الإحصائيات
    const statsSection = document.querySelector('.stats');
    
    function checkCounter() {
        if (countersAnimated) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const isVisible = statsSectionTop < window.innerHeight - 100;
        
        if (isVisible) {
            animateCounters();
            countersAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkCounter);
    checkCounter(); // تحقق مرة واحدة عند التحميل
    
    // ========== التنقل السلس ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== تأثيرات عند التمرير للقائمة ==========
    const header = document.querySelector('header');
    
    function toggleHeaderScroll() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 77, 64, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = '#004d40';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', toggleHeaderScroll);
    toggleHeaderScroll(); // تطبيق مرة واحدة عند التحميل
    
    // ========== إضافة تأثيرات للخدمات والمشاريع ==========
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    function addHoverEffects() {
        // تأثيرات للخدمات
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
        
        // تأثيرات للمشاريع
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            const overlay = card.querySelector('.project-overlay');
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                if (img) img.style.transform = 'scale(1.1)';
                if (overlay) overlay.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
            });
        });
    }
    
    addHoverEffects();
    
    // ========== إعدادات responsive إضافية ==========
    function handleResize() {
        // تعديل ارتفاع السلايدر على الشاشات الصغيرة
        if (window.innerWidth < 768) {
            document.querySelector('.slider').style.height = '60vh';
        } else {
            document.querySelector('.slider').style.height = '80vh';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // تطبيق مرة واحدة عند التحميل
});

// ========== دالة للتحميل الآمن ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // أي كود إضافي تحتاج تنفيذه عند التحميل
    console.log('تم تحميل موقع شركة الفتح للمقاولات بنجاح');
}
// إدارة نموذج الاتصال
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
        console.log('تم إرسال النموذج:', formData);
        
        // عرض رسالة نجاح
        showNotification('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً', 'success');
        
        // إعادة تعيين النموذج
        contactForm.reset();
    });
}

// دالة لعرض الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // أنماط الإشعار (يمكن إضافتها في CSS)
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else {
        notification.style.background = '#F44336';
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
// تحميل خريطة Google Maps
function initMap() {
    // إحداثيات الموقع الافتراضي (الرياض)
    const companyLocation = { lat: 24.7136, lng: 46.6753 };
    
    const map = new google.maps.Map(document.getElementById('companyMap'), {
        zoom: 15,
        center: companyLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#f1f1f1" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#004d40" }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: 'شركة الفتح للمقاولات',
        icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMDA0ZDQwIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjE1IiBmaWxsPSIjZmZkNTRmIi8+Cjwvc3ZnPg==',
            scaledSize: new google.maps.Size(50, 50)
        }
    });
}

// تحميل Google Maps API
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// تحميل الخريطة عندما يكون العنصر مرئياً
function loadMapWhenVisible() {
    const mapSection = document.querySelector('.map-section');
    if (!mapSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadGoogleMaps();
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(mapSection);
}

// استدعاء الدالة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    loadMapWhenVisible();
});
// أسعار الخدمات (ريال سعودي لكل متر مربع)
const servicePrices = {
    'construction': { small: 800, medium: 700, large: 600 },
    'soil-drying': { small: 200, medium: 180, large: 150 },
    'interior': { small: 500, medium: 450, large: 400 },
    'infrastructure': { small: 300, medium: 250, large: 200 }
};

// مساحات افتراضية لكل حجم
const sizeAreas = {
    'small': 300,   // متر مربع
    'medium': 1000, // متر مربع
    'large': 3000   // متر مربع
};

// حساب التكلفة
function calculateCost() {
    const serviceType = document.getElementById('serviceType').value;
    const projectSize = document.getElementById('projectSize').value;
    const costElement = document.getElementById('estimatedCost');
    
    if (serviceType && projectSize) {
        const area = sizeAreas[projectSize];
        const pricePerM2 = servicePrices[serviceType][projectSize];
        const totalCost = area * pricePerM2;
        
        // تنسيق الرقم بإضافة فواصل
        costElement.textContent = totalCost.toLocaleString('ar-SA');
    } else {
        costElement.textContent = '0';
    }
}

// إدارة نموذج طلب الخدمة
const serviceRequestForm = document.getElementById('serviceRequestForm');
if (serviceRequestForm) {
    serviceRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('requestName').value,
            email: document.getElementById('requestEmail').value,
            service: document.getElementById('serviceType').value,
            size: document.getElementById('projectSize').value,
            details: document.getElementById('projectDetails').value,
            estimatedCost: document.getElementById('estimatedCost').textContent
        };
        
        console.log('تم إرسال طلب الخدمة:', formData);
        showNotification('تم إرسال طلب الخدمة بنجاح، سنتواصل معك خلال 24 ساعة', 'success');
        serviceRequestForm.reset();
        document.getElementById('estimatedCost').textContent = '0';
    });
}
// إدارة معرض الفيديوهات
function playVideo(element, videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoPlayer.src = videoUrl;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // منع التمرير عند فتح الفيديو
}

// إغلاق الفيديو
function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // إغلاق بالنقر على الزر
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        videoPlayer.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // إغلاق بالنقر خارج الفيديو
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // إغلاق بالضغط على زر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// تهيئة معرض الفيديوهات عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    setupVideoModal();
});
// إدارة الأسئلة الشائعة
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// إغلاق جميع الأسئلة عند فتح سؤال جديد (اختياري)
function setupFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // إذا أردت أن يغلق السؤال الآخر عند فتح سؤال جديد
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== this.parentElement) {
                currentlyActive.classList.remove('active');
            }
        });
    });
}

// تهيئة الأسئلة الشائعة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    setupFaqAccordion();
});
// مؤتمر العروض الخاصة
function setupOfferTimer() {
    //设定结束日期 (30天 من الآن)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 30);
    
    // تحديث المؤقت كل ثانية
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // حساب الأيام، الساعات، الدقائق والثواني
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // عرض النتائج
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        // إذا انتهى الوقت
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("offerTimer").innerHTML = "انتهى العرض!";
        }
    }, 1000);
}

// تهيئة مؤتمر العرض عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    setupOfferTimer();
});
// Lazy loading للصور
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy-load');
                lazyImage.classList.add('loaded');
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    
    lazyImages.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
    });
}
// نظام التقييم
function setupRatingSystem() {
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.dataset.value);
            highlightStars(value);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(currentRating);
        });
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.value);
            highlightStars(currentRating);
        });
    });
    
    function highlightStars(count) {
        stars.forEach((star, index) => {
            if (index < count) {
                star.textContent = '★';
                star.style.color = '#ffd54f';
            } else {
                star.textContent = '☆';
                star.style.color = '#ccc';
            }
        });
    }
}

function submitReview() {
    const rating = document.querySelectorAll('.star[style="color: rgb(255, 213, 79);"]').length;
    const reviewText = document.getElementById('reviewText').value;
    
    if (rating === 0) {
        showNotification('يرجى اختيار تقييم', 'error');
        return;
    }
    
    // إرسال التقييم إلى الخادم
    console.log('تقييم جديد:', { rating, review: reviewText });
    showNotification('شكراً لتقييمك!', 'success');
    
    // إعادة تعيين النموذج
    document.querySelectorAll('.star').forEach(star => {
        star.textContent = '☆';
        star.style.color = '#ccc';
    });
    document.getElementById('reviewText').value = '';
}
// نظام الإشعارات المتقدم
const notificationSystem = {
    show: function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${this.getIcon(type)}
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                &times;
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // إضافة أنيميشن
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // إزالة تلقائية
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
        
        return notification;
    },
    
    getIcon: function(type) {
        const icons = {
            'success': '✓',
            'error': '✕',
            'warning': '⚠',
            'info': 'ℹ'
        };
        return icons[type] || icons['info'];
    },
    
    // إشعارات مسبقة الصنع
    welcome: function() {
        this.show('مرحباً بكم في شركة الفتح للمقاولات!', 'info', 3000);
    },
    
    offline: function() {
        this.show('أنت غير متصل بالإنترنت', 'warning', 0);
    },
    
    online: function() {
        this.show('تم استعادة الاتصال بالإنترنت', 'success', 3000);
    }
};

// مراقبة حالة الاتصال
window.addEventListener('online', () => {
    notificationSystem.online();
});

window.addEventListener('offline', () => {
    notificationSystem.offline();
});

// استبدال دالة showNotification القديمة
function showNotification(message, type) {
    notificationSystem.show(message, type);
}
// Dark Mode functionality
function setupDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'تبديل الوضع الليلي';
    
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.left = '20px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.style.background = '#004d40';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.fontSize = '20px';
    
    document.body.appendChild(darkModeToggle);
    
    // التحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            this.innerHTML = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '☀️';
        }
    });
}


// شريط التقدم أثناء التمرير
function setupProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', function() {
    setupProgressBar();
    // ... rest of your code
});// استبدل src بـ data-src في HTML للصور التي تريد تحميلها عند الظهور
// زر العودة إلى الأعلى
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', function() {
    setupBackToTop();
    // ... rest of your code
});
// تحميل الصور بكسل
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            imageObserver.observe(img);
        }
    });
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    // ... rest of your code
});
// إدارة النماذج والرسائل
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة النموذج
            if (this.checkValidity()) {
                // عرض رسالة نجاح
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                this.reset();
            } else {
                // عرض رسالة خطأ
                showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.', 'error');
            }
        });
    });
}

// عرض الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // أنماط الإشعار
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else {
        notification.style.background = '#F44336';
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    // ... rest of your code
});