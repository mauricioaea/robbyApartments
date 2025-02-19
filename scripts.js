document.addEventListener('DOMContentLoaded', () => {
    // Actualizar año del footer
    const currentYear = document.getElementById('current-year');
    if(currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Animaciones al scroll
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

    // Menú responsive
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

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.main-nav ul');
        if(!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Optimizar redimensionamiento
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});