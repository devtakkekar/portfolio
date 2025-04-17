// Update active navigation link based on scroll position
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-container';
    document.body.appendChild(matrixContainer);

    const characters = '01';
    const columns = Math.floor(window.innerWidth / 15);

    function createMatrixColumn() {
        for (let i = 0; i < columns; i++) {
            // Much less frequent character generation
            if (Math.random() > 0.99) {
                const matrixChar = document.createElement('div');
                matrixChar.className = 'matrix-char';
                
                // Simpler character set
                matrixChar.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Position the character relative to viewport
                const startX = i * 15;
                const startY = -20; // Start above the viewport
                
                matrixChar.style.left = `${startX}px`;
                matrixChar.style.top = `${startY}px`;
                
                // Subtle fade and transform
                requestAnimationFrame(() => {
                    matrixChar.style.opacity = '1';
                });

                // Add to container
                matrixContainer.appendChild(matrixChar);

                // Animate falling with scroll
                function animateFall() {
                    const currentTop = parseFloat(matrixChar.style.top);
                    
                    // Move down slowly
                    matrixChar.style.top = `${currentTop + 1}px`;
                    
                    // Check if character is below viewport
                    if (currentTop > window.innerHeight) {
                        matrixChar.remove();
                        return;
                    }
                    
                    // Continue animation
                    requestAnimationFrame(animateFall);
                }
                
                // Start falling animation
                animateFall();

                // Fade out after some time
                setTimeout(() => {
                    matrixChar.style.opacity = '0';
                    setTimeout(() => matrixChar.remove(), 800);
                }, 3000);
            }
        }
    }

    // Create matrix rain effect periodically
    setInterval(createMatrixColumn, 200);
}

// Initialize matrix rain when page loads
document.addEventListener('DOMContentLoaded', createMatrixRain);

// Shooting Stars Animation
document.addEventListener('DOMContentLoaded', function() {
    const starsContainers = ['stars', 'stars2', 'stars3'];
    
    starsContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        
        function createShootingStar() {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Randomize starting position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = '-20px';
            
            // Randomize animation delay
            star.style.animationDelay = `${Math.random() * 10}s`;
            
            container.appendChild(star);
            
            // Remove star after animation completes
            star.addEventListener('animationend', () => {
                star.remove();
                // Very low chance of creating a new star
                if (Math.random() < 0.1) {
                    createShootingStar();
                }
            });
        }
        
        // Initial star creation (reduced to 1)
        for (let i = 0; i < 1; i++) {
            createShootingStar();
        }
    });

    // Right-side shooting stars
    function createRightSideShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star right-side';
        
        // Randomize vertical starting position
        star.style.top = `${Math.random() * 100}%`;
        
        // Randomize animation delay
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        document.body.appendChild(star);
        
        // Remove star after animation completes
        star.addEventListener('animationend', () => {
            star.remove();
            // Very low chance of creating a new star
            if (Math.random() < 0.1) {
                createRightSideShootingStar();
            }
        });
    }
    
    // Initial right-side star creation (reduced to 1)
    for (let i = 0; i < 1; i++) {
        createRightSideShootingStar();
    }
});

// Greeting Text Transition
document.addEventListener('DOMContentLoaded', () => {
    const greetingWrapper = document.querySelector('.greeting-wrapper');
    const greetings = ['Hello', 'नमस्ते'];
    let currentIndex = 0;

    function transitionGreeting() {
        // Add transition class to trigger CSS animation
        greetingWrapper.classList.add('transition');

        // After transition, change text and remove transition class
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % greetings.length;
            greetingWrapper.textContent = greetings[currentIndex];
            
            // Remove transition class to reset to original state
            greetingWrapper.classList.remove('transition');
        }, 500);
    }

    // Start the infinite transition every 7 seconds for a more relaxed feel
    setInterval(transitionGreeting, 7000);
});
