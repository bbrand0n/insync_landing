/**
 * InSync Landing Page - Main JavaScript
 * Handles smooth scrolling, navigation, and interactive elements
 */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event listener for nav background
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove shadow based on scroll position
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and gallery items
    document.querySelectorAll('.feature-card, .screenshot-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile navigation toggle (if needed in the future)
    const createMobileNav = () => {
        const navLinks = document.querySelector('.nav-links');
        const isMobile = window.innerWidth < 768;

        if (isMobile && !document.querySelector('.mobile-menu-toggle')) {
            // Add mobile menu toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-menu-toggle';
            toggleButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            toggleButton.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: var(--text-primary);
                cursor: pointer;
                padding: 0.5rem;
            `;

            toggleButton.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
            });

            document.querySelector('.nav-content').appendChild(toggleButton);

            // Style mobile nav
            navLinks.style.cssText = `
                position: fixed;
                top: 60px;
                right: -100%;
                background: rgba(10, 1, 24, 0.98);
                backdrop-filter: blur(20px);
                width: 250px;
                height: calc(100vh - 60px);
                flex-direction: column;
                padding: 2rem;
                transition: right 0.3s ease;
                border-left: 1px solid var(--glass-border);
            `;
        }
    };

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createMobileNav();
        }, 250);
    });

    // Initialize mobile nav
    createMobileNav();

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only add loading state if it's not an anchor to a section
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Parallax effect for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    if (orbs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(255, 83, 192, 0.5)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--glass-border)';
        });
    });

    // Screenshot placeholder click handler (for development)
    document.querySelectorAll('.screenshot-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const filename = this.querySelector('span')?.textContent;
            if (filename) {
                console.log(`Replace this placeholder with: ${filename}`);
            }
        });
    });

    // Add CSS for mobile menu open state
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.mobile-open {
            right: 0 !important;
        }

        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
        }

        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
            .nav-links {
                position: static !important;
                flex-direction: row !important;
                width: auto !important;
                height: auto !important;
                padding: 0 !important;
                border: none !important;
            }
        }

        /* Smooth transitions for all interactive elements */
        .btn, .nav-links a, .feature-card, .screenshot-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Loading spinner for buttons */
        .btn.loading::after {
            content: '';
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            display: inline-block;
            margin-left: 8px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Ensure orbs stay behind content */
        .gradient-orb {
            z-index: 0;
            pointer-events: none;
        }

        /* Accessibility improvements */
        .btn:focus-visible,
        a:focus-visible {
            outline: 2px solid var(--gradient-cyan);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);

    console.log('InSync Landing Page initialized ✓');
});

// Utility function to detect if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isInViewport };
}
