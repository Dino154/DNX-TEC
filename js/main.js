/**
 * main.js - Motor de Interactividad para DNX Tecnología
 * Arquitectura: Full Stack / Alto Rendimiento / 3D UI + Typewriter + Data Counters
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Mensaje de Consola Corporativo
    console.log("%c DNX Tecnología %c Sistema Central Iniciado | 60 FPS ", 
        "color: #fff; background: #9d00ff; padding:5px; font-weight: bold; border-radius: 4px 0 0 4px;", 
        "color: #000; background: #00e5ff; padding:5px; border-radius: 0 4px 4px 0;");

    /* =========================================================================
       0. SECUENCIA DE ARRANQUE (Máquina de escribir del Hero)
       ========================================================================= */
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroBtns = document.getElementById('heroBtns');

    if (heroTitle && heroDesc) {
        const textTitle = "Arquitectura Digital Avanzada";
        const textDesc = "Construimos ecosistemas web escalables, tiendas virtuales de alto rendimiento y software de gestión 100% responsive para impulsar tu operatividad.";

        function typeEffect(element, text, speed, callback) {
            element.innerHTML = "";
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1) + '<span class="cursor-hero">|</span>';
                    i++;
                    setTimeout(type, speed + (Math.random() * 30)); 
                } else {
                    element.innerHTML = text; 
                    if (callback) callback();
                }
            }
            type();
        }

        setTimeout(() => {
            typeEffect(heroTitle, textTitle, 40, () => {
                typeEffect(heroDesc, textDesc, 20, () => {
                    if (heroBtns) {
                        heroBtns.style.transition = "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                        heroBtns.style.opacity = "1";
                        heroBtns.style.transform = "translateY(0)";
                    }
                });
            });
        }, 400); 
    }

    /* =========================================================================
       1. EFECTO PARALLAX FLUIDO (Universo 3D interactivo)
       ========================================================================= */
    const starsLayer = document.querySelector('.stars-bg');
    const midLayer = document.querySelector('.stars-mid');
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    if (window.innerWidth > 768 && starsLayer) {
        document.addEventListener('mousemove', (e) => {
            targetX = (window.innerWidth / 2 - e.pageX) / 90;
            targetY = (window.innerHeight / 2 - e.pageY) / 90;
        });

        function renderParallax() {
            currentX += (targetX - currentX) * 0.05; 
            currentY += (targetY - currentY) * 0.05;

            starsLayer.style.transform = `translate(${currentX}px, ${currentY}px)`;
            if(midLayer) {
                midLayer.style.transform = `translate(${currentX * -1.5}px, ${currentY * -1.5}px)`;
            }
            requestAnimationFrame(renderParallax);
        }
        renderParallax(); 
    }

    /* =========================================================================
       2. EFECTO 3D TILT (Inclinación Cyberpunk para TODAS las tarjetas)
       ========================================================================= */
    // Ahora aplica al catálogo, a "Por qué elegirnos" y a los paneles de contacto
    const interactiveCards = document.querySelectorAll('.catalog-card, .feature-card');

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; 
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease-out'; 
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'; 
        });
    });

    /* =========================================================================
       3. CONTADORES DE ESTADÍSTICAS ANIMADOS (Números que corren solos)
       ========================================================================= */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if (counters.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const speed = 100; 
                        
                        const updateCount = () => {
                            const count = +counter.innerText;
                            const inc = target / speed;

                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 20); 
                            } else {
                                counter.innerText = target; 
                            }
                        };
                        updateCount();
                    });
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) statObserver.observe(statsSection);
    }

    /* =========================================================================
       4. INTERSECTION OBSERVER (Aparición en Cascada Unificada)
       ========================================================================= */
    // Agregamos todos los elementos nuevos a la animación de scroll
    const elementsToReveal = document.querySelectorAll('.catalog-card, .timeline-step, .section-header, .feature-card, .stat-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    elementsToReveal.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        let delay = (index % 4) * 0.15; 
        el.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`;
        scrollObserver.observe(el);
    });

    /* =========================================================================
       5. MENÚ MÓVIL (Hamburguesa) Y NAVBAR DINÁMICO
       ========================================================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBar = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navBar.style.background = 'rgba(2, 0, 5, 0.98)';
            navBar.style.boxShadow = '0 5px 20px rgba(157, 0, 255, 0.2)';
            navBar.style.padding = '5px 0'; // Compacta ligeramente al bajar
        } else {
            navBar.style.background = 'rgba(5, 0, 10, 0.85)';
            navBar.style.boxShadow = 'none';
            navBar.style.padding = '0';
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animación de icono de hamburguesa a X
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '☰';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    /* =========================================================================
       6. OPTIMIZACIÓN DE RENDIMIENTO (Pausa animaciones si cambias de pestaña)
       ========================================================================= */
    const globalUniverse = document.querySelector('.global-universe');
    document.addEventListener('visibilitychange', () => {
        if (globalUniverse) {
            globalUniverse.style.opacity = document.visibilityState === 'visible' ? '1' : '0.3';
        }
    });

});