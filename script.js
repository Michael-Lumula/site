document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typewriter effect for the "delayed" text in Hero
    const delayedText = document.querySelector('.delayed');
    if (delayedText) {
        const text = delayedText.textContent;
        delayedText.textContent = '';
        let i = 0;

        // Wait a bit before starting the second line typing
        setTimeout(() => {
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    delayedText.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                    // Show scroll indicator after typing finishes
                    const scrollInd = document.getElementById('scroll-down');
                    if (scrollInd) {
                        scrollInd.style.opacity = '1';
                    }

                    // Update initialization text
                    const initText = document.querySelector('.system-init');
                    if (initText) {
                        initText.innerHTML = '> Initialization Complete.';
                        initText.style.color = '#0f0'; // Ensure it stays green/accent
                    }

                    // Unlock page
                    document.body.classList.remove('loading-locked');
                }
            }, 50);
        }, 1500); // Start after 1.5s
    }
    // Matrix Rain Effect
    const canvas = document.getElementById('matrix');

    // Scroll Indicator Logic
    const scrollInd = document.getElementById('scroll-down');
    if (scrollInd) {
        // Fade out on click
        scrollInd.addEventListener('click', () => {
            scrollInd.style.opacity = '0';
            scrollInd.style.pointerEvents = 'none';
        });

        // Fade out on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                scrollInd.style.opacity = '0';
                scrollInd.style.pointerEvents = 'none';
            } else {
                // Only restore if the typing animation has finished (page unlocked)
                if (!document.body.classList.contains('loading-locked')) {
                    scrollInd.style.opacity = '1';
                    scrollInd.style.pointerEvents = 'auto';
                }
            }
        });
    }
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Neon Green
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 33);

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    }));
});




