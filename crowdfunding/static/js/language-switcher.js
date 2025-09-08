// تبديل اللغة
const languageSwitcher = {
    currentLang: 'ar',
    
    init: function() {
        this.loadLanguage();
        this.setupEventListeners();
    },
    
    loadLanguage: function() {
        const savedLang = localStorage.getItem('siteLanguage');
        if (savedLang) {
            this.switchLanguage(savedLang);
        }
    },
    
    switchLanguage: function(lang) {
        this.currentLang = lang;
        localStorage.setItem('siteLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // تغيير نص جميع العناصر ذات data-translate
        this.translatePage();
    },
    
    translatePage: function() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = this.translations[this.currentLang][key] || el.textContent;
        });
    },
    
    setupEventListeners: function() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    },
    
    translations: {
        'ar': {
            'welcome': 'مرحباً بكم في شركة الفتح',
            'services': 'خدماتنا',
            'projects': 'مشاريعنا',
            // ... المزيد من الترجمات
        },
        'en': {
            'welcome': 'Welcome to Al-Fath Company',
            'services': 'Our Services',
            'projects': 'Our Projects',
            // ... المزيد من الترجمات
        }
    }
};

// تهيئة مبدل اللغة
document.addEventListener('DOMContentLoaded', function() {
    languageSwitcher.init();
});