    document.addEventListener('DOMContentLoaded', () => {
        // ===== CONSTANTES REUTILIZABLES =====
        const DOM = {
            currentYear: document.getElementById('current-year'),
            menuToggle: document.querySelector('.menu-toggle'),
            navMenu: document.querySelector('.main-nav ul'),
            animatedElements: document.querySelectorAll('.animate-on-scroll'),
            lazyIframes: document.querySelectorAll('iframe[loading="lazy"]')
        };

        // ===== FUNCIONALIDAD BÁSICA =====
        const updateFooterYear = () => {
            if (DOM.currentYear) {
                DOM.currentYear.textContent = new Date().getFullYear();
            }
        };

        // ===== ANIMACIONES AL SCROLL =====
        const checkElementVisibility = (element) => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= viewportHeight * 0.85 && rect.bottom >= 0;
        };

        const handleScrollAnimations = () => {
            DOM.animatedElements.forEach(element => {
                if (checkElementVisibility(element) && !element.classList.contains('active')) {
                    element.classList.add('active');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // ===== MENÚ RESPONSIVE =====
        const toggleMenu = (e) => {
            e.stopPropagation();
            DOM.navMenu.classList.toggle('active');
            DOM.menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        const closeMenu = () => {
            DOM.navMenu.classList.remove('active');
            DOM.menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        const handleMenuClicks = (e) => {
            if (!e.target.closest('.main-nav') && !e.target.matches('.menu-toggle')) {
                closeMenu();
            }
        };

        // ===== CARGA DIFERIDA DE VIDEOS =====
        const loadLazyVideos = () => {
            DOM.lazyIframes.forEach(iframe => {
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
            });
        };

        // ===== OPTIMIZACIÓN DE EVENTOS =====
        const debounce = (func, delay = 150) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        };

        // ===== INICIALIZACIÓN =====
        const init = () => {
            updateFooterYear();
            loadLazyVideos();
            
            // Event listeners
            window.addEventListener('scroll', debounce(handleScrollAnimations));
            window.addEventListener('resize', debounce(() => {
                document.body.classList.add('resize-animation-stopper');
                setTimeout(() => document.body.classList.remove('resize-animation-stopper'), 150);
            }));

            DOM.menuToggle.addEventListener('click', toggleMenu);
            document.addEventListener('click', handleMenuClicks);
            
            // Cerrar menú al hacer clic en enlaces móviles
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.addEventListener('click', () => window.innerWidth <= 768 && closeMenu());
            });

            // Trigger inicial
            handleScrollAnimations();
        };

        // ===== INICIO =====
        try {
            if (document.readyState !== 'loading') {
                init();
            } else {
                document.addEventListener('DOMContentLoaded', init);
            }
        } catch (error) {
            console.error('Error inicializando:', error);
        }
    });