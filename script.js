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
                }
            }, 50);
        }, 1500); // Start after 1.5s
    }

    // Matrix Rain Effect
    const canvas = document.getElementById('matrix');
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
});

function playBootSequence() {
    const bootMessages = [
        "> Initializing kernel...",
        "> Loading security modules...",
        "> Bypassing firewalls...",
        "> Decrypting user profile...",
        "> Mounting volumes...",
        "> SYSTEM_READY"
    ];

    const bootContainer = document.createElement('div');
    bootContainer.id = 'boot-sequence';
    bootContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Fira Code', monospace;
        color: #00ff00;
        font-size: 18px;
        z-index: 9999;
        padding: 40px;
        text-align: center;
    `;

    bootContainer.innerHTML = '<h1 style="margin-bottom: 40px; font-size: 24px; letter-spacing: 2px;">BOOT_SEQUENCE</h1><div id="boot-messages"></div>';
    document.body.appendChild(bootContainer);

    const messagesDiv = document.getElementById('boot-messages');
    let delay = 500;

    bootMessages.forEach((msg, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.style.cssText = 'margin: 10px 0; text-align: left;';
            line.textContent = msg;
            messagesDiv.appendChild(line);

            if (index === bootMessages.length - 1) {
                setTimeout(() => {
                    bootContainer.style.opacity = '1';
                    bootContainer.style.transition = 'opacity 0.8s ease-out';
                    setTimeout(() => {
                        bootContainer.style.opacity = '0';
                        setTimeout(() => bootContainer.remove(), 800);
                    }, 1000);
                }, 500);
            }
        }, delay);
        delay += 400;
    });
}

// Call on page load
window.addEventListener('load', playBootSequence);
