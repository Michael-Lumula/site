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
                        // Fade out
                        initText.classList.add('fade-out');

                        setTimeout(() => {
                            // Change text and color while hidden
                            initText.innerHTML = '> Initialization Complete.';
                            initText.style.color = '#0f0';

                            // Fade back in
                            initText.classList.remove('fade-out');

                            // Unlock page after text reappears (plus a small delay for effect)
                            setTimeout(() => {
                                document.body.classList.remove('loading-locked');
                            }, 500);

                        }, 500); // Wait for fade out transition (0.5s)
                    } else {
                        // Fallback unlock if element missing
                        document.body.classList.remove('loading-locked');
                    }
                }
            }, 50);
        }, 1500); // Start after 1.5s
    }
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
    // Matrix effect removed for all sections (disabled).
    // Previously there was a canvas-based matrix rain effect here; it's been intentionally disabled.

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            try {
                hamburger.classList.toggle('active');
                if (navLinks) navLinks.classList.toggle('active');

                // Accessibility: reflect expanded state
                const expanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                if (navLinks) navLinks.setAttribute('aria-hidden', expanded ? 'false' : 'true');
            } catch (err) {
                console.error('Menu toggle error:', err);
            }
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    }));
});




