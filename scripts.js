document.addEventListener('DOMContentLoaded', () => {
    // ===== ACTUALIZAR AÑO FOOTER =====
    const currentYear = document.getElementById('current-year');
    if(currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ===== ANIMACIONES AL SCROLL =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if(elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== MENÚ RESPONSIVE =====
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.body.appendChild(menuToggle);

    const toggleMenu = () => {
        const nav = document.querySelector('.main-nav ul');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);


    // ===== CERRAR MENÚ AL HACER CLIC FUERA =====
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.main-nav ul');
        if(!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // ===== SMOOTH SCROLL MODIFICADO (Líneas corregidas) =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => { // Solo enlaces internos válidos
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar
                if(history.pushState) {
                    history.pushState(null, null, this.hash);
                } else {
                    location.hash = this.hash;
                }
            }
        });
    });

    // ===== OPTIMIZAR REDIMENSIONAMIENTO =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});