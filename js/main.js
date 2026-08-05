/* ============================================
   ARIA PILATES - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    const preloaderPercent = document.querySelector('.preloader-percent');

    // Animate preloader percentage
    if (preloaderPercent) {
        let pct = 0;
        const pctInterval = setInterval(() => {
            pct += Math.floor(Math.random() * 8) + 3;
            if (pct >= 100) {
                pct = 100;
                clearInterval(pctInterval);
            }
            preloaderPercent.textContent = pct + '%';
        }, 90);
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1800);
    });

    // Fallback in case load event already fired
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 2500);

    // ============================================
    // HERO IMAGE SLIDER
    // ============================================
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlideIdx = 0;
        let slideInterval;

        function goToHeroSlide(idx) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[idx].classList.add('active');
            if (dots[idx]) dots[idx].classList.add('active');
            currentSlideIdx = idx;
        }

        function nextHeroSlide() {
            goToHeroSlide((currentSlideIdx + 1) % slides.length);
        }

        slideInterval = setInterval(nextHeroSlide, 5000);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                goToHeroSlide(parseInt(dot.dataset.slide));
                slideInterval = setInterval(nextHeroSlide, 5000);
            });
        });
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.12;
            outlineY += (mouseY - outlineY) * 0.12;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .class-card, .price-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ============================================
    // NAVBAR
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000;
                    const start = Date.now();

                    function updateCounter() {
                        const elapsed = Date.now() - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(eased * target);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.hero-stats'));
    }

    // ============================================
    // PARTICLES (Rose Petals)
    // ============================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--duration', (4 + Math.random() * 6) + 's');
            particle.style.setProperty('--delay', Math.random() * 4 + 's');
            const size = (2 + Math.random() * 5);
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            // Alternate between rose shades
            const colors = [
                'rgba(196, 136, 123, 0.4)',
                'rgba(212, 165, 165, 0.35)',
                'rgba(232, 180, 168, 0.3)',
                'rgba(142, 108, 124, 0.3)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '40% 60% 60% 40%';
            particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // SCHEDULE TABS
    // ============================================
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleDays = document.querySelectorAll('.schedule-day');

    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;
            scheduleTabs.forEach(t => t.classList.remove('active'));
            scheduleDays.forEach(d => d.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`.schedule-day[data-day="${day}"]`).classList.add('active');
        });
    });

    // ============================================
    // PRICING TOGGLE
    // ============================================
    document.querySelectorAll('.pricing-toggle .toggle-switch').forEach(toggle => {
        const section = toggle.closest('.pricing-section') || toggle.closest('section');
        const labels = section.querySelectorAll('.toggle-label');
        const singleGrid = section.querySelector('.pricing-single');
        const packageGrid = section.querySelector('.pricing-package');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const isPackage = toggle.classList.contains('active');

            labels.forEach(label => {
                label.classList.remove('active');
                if (label.dataset.type === (isPackage ? 'package' : 'single')) {
                    label.classList.add('active');
                }
            });

            if (isPackage) {
                singleGrid.classList.remove('active');
                packageGrid.classList.add('active');
            } else {
                packageGrid.classList.remove('active');
                singleGrid.classList.add('active');
            }
        });

        labels.forEach(label => {
            label.addEventListener('click', () => {
                const isPackage = label.dataset.type === 'package';
                if (isPackage && !toggle.classList.contains('active')) {
                    toggle.click();
                } else if (!isPackage && toggle.classList.contains('active')) {
                    toggle.click();
                }
            });
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testDotsContainer = document.getElementById('testDots');
    const testPrev = document.querySelector('.test-prev');
    const testNext = document.querySelector('.test-next');

    if (testimonialTrack) {
        const cards = testimonialTrack.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        const totalSlides = cards.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'test-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            testDotsContainer.appendChild(dot);
        }

        const dots = testDotsContainer.querySelectorAll('.test-dot');

        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        }

        testNext.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % totalSlides);
        });

        testPrev.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        });

        // Auto-play
        let autoPlay = setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 5000);

        testimonialTrack.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
        testimonialTrack.parentElement.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                goToSlide((currentSlide + 1) % totalSlides);
            }, 5000);
        });
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Subscribed! ✓';
            btn.style.background = '#10b981';
            input.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PARALLAX ON SCROLL (subtle)
    // ============================================
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // HERO EQUALIZER - randomized bar heights
    // ============================================
    const eqBars = document.querySelectorAll('.hero-equalizer span');
    eqBars.forEach(bar => {
        bar.style.animationDuration = (0.8 + Math.random() * 1.2) + 's';
        bar.style.animationDelay = (Math.random() * 0.8) + 's';
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    if (window.innerWidth > 1024) {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
            });
            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // 3D TILT CARDS
    // ============================================
    if (window.innerWidth > 1024) {
        const tiltCards = document.querySelectorAll('.tilt');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            });
        });
    }

    // ============================================
    // IMAGE PARALLAX ON HOVER (class cards)
    // ============================================
    if (window.innerWidth > 1024) {
        const cardImages = document.querySelectorAll('.class-image img, .gallery-item img');
        cardImages.forEach(img => {
            const parent = img.parentElement;
            parent.addEventListener('mousemove', (e) => {
                const rect = parent.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                img.style.transform = `scale(1.1) translate(${x * -10}px, ${y * -10}px)`;
            });
            parent.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }

    // ============================================
    // SECTION LABEL DRAW UNDERLINE
    // ============================================
    document.querySelectorAll('.section-label').forEach(label => {
        label.classList.add('draw-underline');
    });
});
