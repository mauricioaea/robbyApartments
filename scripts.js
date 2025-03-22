document.addEventListener('DOMContentLoaded', () => {
    // ===== CONSTANTES REUTILIZABLES =====
    const DOM = {
        currentYear: document.getElementById('current-year'),
        animatedElements: document.querySelectorAll('.animate-on-scroll'),
        lazyIframes: document.querySelectorAll('iframe[loading="lazy"]'),
        navMenu: document.querySelector('.main-nav ul'),
        menuToggle: document.querySelector('.menu-toggle'),
        serviceButtons: document.querySelectorAll('.service-button'),
        modals: document.querySelectorAll('.modal'),
        closeButtons: document.querySelectorAll('.close-modal')
    };

    // ===== FUNCIONALIDAD BÁSICA =====
    const updateFooterYear = () => {
        if (DOM.currentYear) DOM.currentYear.textContent = new Date().getFullYear();
    };

    // ===== ANIMACIONES AL SCROLL =====
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // ===== MENÚ RESPONSIVE =====
    const toggleMenu = () => {
        DOM.navMenu.classList.toggle('active');
        document.documentElement.classList.toggle('no-scroll');
    };

    const closeMenu = () => {
        if (DOM.navMenu.classList.contains('active')) {
            DOM.navMenu.classList.remove('active');
            document.documentElement.classList.remove('no-scroll');
        }
    };

    // ===== MANEJO DE MODALES (VERSIÓN CORREGIDA) =====
    const setupModals = () => {
        // Función para cerrar modales
        const closeModal = (modal) => {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.documentElement.classList.remove('no-scroll');
        };

        // Delegación de eventos para apertura
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.service-button');
            
            if (button) {
                e.preventDefault();
                const modalId = button.id.replace('btn-', 'modal-');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    // Cerrar otros modales primero
                    DOM.modals.forEach(m => closeModal(m));
                    
                    // Mostrar nuevo modal
                    modal.style.display = 'block';
                    modal.classList.add('active');
                    document.documentElement.classList.add('no-scroll');
                } else {
                    console.error(`Modal no encontrado: ${modalId}`);
                }
            }
        });

        // Cierre con botón X o clic externo
        DOM.closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(button.closest('.modal')));
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
    };

    // ===== INICIALIZACIÓN COMPLETA =====
    const init = () => {
        updateFooterYear();
        setupModals();

        // Configurar observador de animaciones
        DOM.animatedElements.forEach(el => animationObserver.observe(el));

        // Lazy loading para iframes
        DOM.lazyIframes.forEach(iframe => {
            new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
            }).observe(iframe);
        });

        // Eventos del menú responsive
        DOM.menuToggle.addEventListener('click', toggleMenu);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav')) closeMenu();
        });

        // Cerrar menú al hacer clic en enlaces (mobile)
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => window.innerWidth <= 768 && closeMenu());
        });
    };

    // ===== INICIAR APLICACIÓN =====
    init();
});