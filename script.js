// Smooth scroll animation and text reveals
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for text reveals
    const observeElements = () => {
        const textRevealElements = document.querySelectorAll('.text-reveal');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        textRevealElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Video background management and parallax
    const videoBackgroundSetup = () => {
        const heroVideo = document.querySelector('.hero-video');
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroVideo) {
            // Handle video loading
            heroVideo.addEventListener('loadeddata', () => {
                console.log('Video background loaded successfully');
                heroVideo.style.opacity = '1';
            });
            
            // Handle video load errors
            heroVideo.addEventListener('error', () => {
                console.log('Video failed to load, using fallback background');
                heroVideo.style.display = 'none';
            });
            
            // Pause video when not in viewport (performance optimization)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        heroVideo.play().catch(e => console.log('Video autoplay prevented'));
                    } else {
                        heroVideo.pause();
                    }
                });
            });
            observer.observe(heroVideo);
            
            // Handle visibility change (tab switching)
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    heroVideo.pause();
                } else {
                    heroVideo.play().catch(e => console.log('Video play prevented'));
                }
            });
        }
        
        // Enhanced parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (heroBackground && scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
        });
    };
    
    // Remove leaf animation on landing to reduce visual noise
    const removeLeafAnimationIfPresent = () => {
        const leavesContainer = document.querySelector('.leaves-container');
        if (leavesContainer) {
            leavesContainer.remove();
        }
    };
    
    // Smooth scrolling for internal links
    const smoothScrolling = () => {
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
    };
    
    // Form handling
    const handleForm = () => {
        const form = document.getElementById('signupForm');
        const formSuccess = document.getElementById('formSuccess');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Validate required fields
                const requiredFields = ['name', 'email', 'city', 'medium'];
                let isValid = true;
                
                requiredFields.forEach(field => {
                    const input = form.querySelector(`[name="${field}"]`);
                    if (!data[field] || data[field].trim() === '') {
                        input.style.borderColor = '#ff4444';
                        isValid = false;
                    } else {
                        input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }
                });
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailInput = form.querySelector('[name="email"]');
                if (!emailRegex.test(data.email)) {
                    emailInput.style.borderColor = '#ff4444';
                    isValid = false;
                }
                
                if (isValid) {
                    // Simulate form submission
                    console.log('Form submitted:', data);
                    
                    // Store data in localStorage (in real app, this would go to a server)
                    const submissions = JSON.parse(localStorage.getItem('retreatSignups') || '[]');
                    submissions.push({
                        ...data,
                        timestamp: new Date().toISOString()
                    });
                    localStorage.setItem('retreatSignups', JSON.stringify(submissions));
                    
                    // Show success message
                    form.style.display = 'none';
                    formSuccess.classList.add('show');
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Track conversion (in real app, this would be analytics)
                    console.log('Conversion tracked for Maine Creative Retreat 2025');
                }
            });
        }
        
        // Form field animations
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    };
    
    // Activity hover effects
    const activityHoverEffects = () => {
        const activities = document.querySelectorAll('.activity');
        
        activities.forEach(activity => {
            activity.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });
            
            activity.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    };
    
    // Testimonial animation
    const testimonialAnimation = () => {
        const testimonials = document.querySelectorAll('blockquote');
        
        testimonials.forEach((testimonial, index) => {
            testimonial.style.animationDelay = `${index * 0.2}s`;
            testimonial.classList.add('testimonial-animate');
        });
    };
    
    // Scroll progress indicator
    const scrollProgress = () => {
        const createProgressBar = () => {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-orange), var(--warm-yellow));
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
            return progressBar;
        };
        
        const progressBar = createProgressBar();
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    // Add floating animation to submit button
    const animateSubmitButton = () => {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', function() {
                this.style.animation = 'float 2s ease-in-out infinite';
            });
            
            submitBtn.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        }
    };
    
    // Add CSS for floating animation
    const addFloatingAnimation = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(-2px); }
                50% { transform: translateY(-8px); }
            }
            
            .testimonial-animate {
                animation: slideInUp 0.8s ease-out forwards;
                opacity: 0;
                transform: translateY(30px);
            }
            
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Loading states for form */
            .form-group.loading input,
            .form-group.loading select,
            .form-group.loading textarea {
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Performance optimization - throttle scroll events
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // Enhanced parallax with throttling
    const optimizedParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    }, 16); // ~60fps
    
    // Photo Gallery Management
    const gallerySetup = () => {
        const slides = document.querySelectorAll('.gallery-slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.querySelector('.gallery-nav.prev');
        const nextBtn = document.querySelector('.gallery-nav.next');
        const playPauseBtn = document.querySelector('.gallery-play-pause');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!slides.length) return; // Exit if no gallery found
        
        let currentSlide = 0;
        let isPlaying = false; // default to manual to reduce distraction
        let autoPlayInterval;
        let progressInterval;
        const slideSpeed = 3000; // faster when enabled
        
        // Initialize gallery
        const initGallery = () => {
            showSlide(0);
            startAutoPlay();
        };
        
        // Show specific slide
        const showSlide = (index) => {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active', 'prev'));
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Set current slide
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            thumbnails[currentSlide].classList.add('active');
            
            // Set previous slide for transition effect
            const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            slides[prevIndex].classList.add('prev');
            
            // Reset and start progress bar
            resetProgressBar();
        };
        
        // Next slide
        const nextSlide = () => {
            const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(next);
        };
        
        // Previous slide
        const prevSlide = () => {
            const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(prev);
        };
        
        // Auto-play functionality
        const startAutoPlay = () => {
            if (!isPlaying) return;
            autoPlayInterval = setInterval(nextSlide, slideSpeed);
            playPauseBtn.classList.remove('paused');
            startProgressBar();
        };
        
        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
            clearInterval(progressInterval);
            playPauseBtn.classList.add('paused');
        };
        
        const toggleAutoPlay = () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        };
        
        // Progress bar animation
        const startProgressBar = () => {
            clearInterval(progressInterval);
            progressBar.style.width = '0%';
            
            let progress = 0;
            const increment = 100 / (slideSpeed / 100);
            
            progressInterval = setInterval(() => {
                progress += increment;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                }
            }, 100);
        };
        
        const resetProgressBar = () => {
            clearInterval(progressInterval);
            progressBar.style.width = '0%';
            if (isPlaying) {
                startProgressBar();
            }
        };
        
        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            if (isPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            if (isPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        });
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', toggleAutoPlay);
            // set UI to paused state initially
            playPauseBtn.classList.add('paused');
        }
        
        // Thumbnail navigation
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                showSlide(index);
                if (isPlaying) {
                    stopAutoPlay();
                    startAutoPlay();
                }
            });
        });
        
        // Pause on hover
        const galleryMain = document.querySelector('.gallery-main');
        galleryMain.addEventListener('mouseenter', () => {
            if (isPlaying) {
                clearInterval(autoPlayInterval);
                clearInterval(progressInterval);
            }
        });
        
        galleryMain.addEventListener('mouseleave', () => {
            if (isPlaying) {
                startAutoPlay();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!galleryMain.matches(':hover')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
            }
        });
        
        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        galleryMain.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        galleryMain.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swiped left, go to next
                } else {
                    prevSlide(); // Swiped right, go to previous
                }
                
                if (isPlaying) {
                    stopAutoPlay();
                    startAutoPlay();
                }
            }
        };
        
        // Lazy loading for gallery images
        const galleryImages = document.querySelectorAll('.gallery-slide img, .thumbnail img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        galleryImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
        
        // Initialize the gallery
        initGallery();
        
        // Accessibility improvements
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
            slide.setAttribute('role', 'img');
        });
        
        galleryMain.setAttribute('role', 'region');
        galleryMain.setAttribute('aria-label', 'Photo gallery from last year\'s retreat');
    };

    // Personalizable activities data (easy to edit)
    const plannedActivitiesData = [
        { title: '🌞 Morning Meditation', desc: 'Short guided session to start the day grounded and focused.' },
        { title: '🍁 Nature Hike', desc: 'Scenic walk or drive to enjoy peak fall colors in Maine.' },
        { title: '🛁 Hot Tub & Relaxation', desc: 'Unwind with a soak while taking in the autumn views.' },
        { title: '🔥 Firepit Gathering', desc: 'Evening conversations, stories, and warmth under the stars.' },
        { title: '🎨 Deep Focus Sessions', desc: 'Dedicated blocks of time for working on personal creative projects.' },
        { title: '🤝 Icebreaker Circle', desc: 'Fun, low-pressure activities to connect with fellow attendees.' },
        { title: '🎭 Art Exploration Stations', desc: 'Experiment with other attendees’ mediums and try something new.' },
        { title: '📣 Creative Presentations', desc: 'Share your finished or in-progress work with the group.' }
    ];

    const renderPlannedActivities = () => {
        const container = document.getElementById('plannedActivities');
        if (!container) return;
        container.innerHTML = plannedActivitiesData.map(({ title, desc }) => `
            <div class="activity-card">
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `).join('');
    };
    
    // Initialize all functions
    const init = () => {
        observeElements();
        videoBackgroundSetup(); // New video background setup
        removeLeafAnimationIfPresent();
        smoothScrolling();
        handleForm();
        activityHoverEffects();
        testimonialAnimation();
        gallerySetup(); // Initialize photo gallery
        renderPlannedActivities();
        scrollProgress();
        animateSubmitButton();
        addFloatingAnimation();
        // Deadline countdown (announcement bar)
        const deadline = new Date('2025-08-22T23:59:59-04:00');
        const el = document.getElementById('deadlineCountdown');
        if (el) {
            const tick = () => {
                const left = deadline - new Date();
                if (left <= 0) { el.textContent = ' — deadline passed'; return; }
                const days = Math.ceil(left / (1000*60*60*24));
                el.textContent = ` — ${days} day${days>1?'s':''} left to apply`;
            };
            tick();
            setInterval(tick, 60000);
        }
        
        // Add resize listener for responsive adjustments
        window.addEventListener('resize', throttle(() => {
            // Recalculate animations on resize
            console.log('Window resized - adjusting animations');
        }, 250));
    };
    
    // Start the magic
    init();
    
    // Add some delightful console message for developers
    console.log(`
    🍂 Maine Creative Retreat 2025 🍂
    ================================
    Welcome to the code behind this beautiful retreat experience!
    Built with love for artists and creative souls.
    
    📸 Gallery Features:
    - Auto-rotating slideshow with 5-second intervals
    - Click thumbnails or use arrow keys to navigate
    - Hover to pause, spacebar to play/pause
    - Swipe left/right on mobile devices
    - Accessibility-friendly with ARIA labels
    
    May your creativity flow like autumn leaves dancing in the wind...
    `);
});

// Service Worker registration for offline capability (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 