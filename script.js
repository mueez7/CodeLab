document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileClose && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden';
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            });
        });
    }

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button, input, textarea');

    // Enable custom cursor only for devices with fine pointers (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Smoothly follow the mouse
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Intersection Observer for scroll animations (Awwwards Style Reveals)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to keep it clean and performant
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all trigger elements
    document.querySelectorAll('.trigger-reveal, .trigger-fade').forEach(el => {
        observer.observe(el);
    });

    // Manually trigger the hero animations immediately on load
    setTimeout(() => {
        document.querySelectorAll('.hero .trigger-reveal, .hero .trigger-fade').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const elementPosition = target.getBoundingClientRect().top;
                // Offset calculation (approx navigation height)
                const offsetPosition = elementPosition + window.pageYOffset - 80; 
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Visual Feedback
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const origText = btn.innerHTML;
            
            // Minimalist Success State
            btn.innerHTML = 'REQUEST RECEIVED';
            btn.style.background = '#fff';
            btn.style.color = '#000';
            
            form.reset();
            
            // Revert State
            setTimeout(() => {
                btn.innerHTML = origText;
                btn.style.background = 'transparent';
                btn.style.color = '#fff';
            }, 3000);
        });
    }
});
