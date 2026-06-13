// script.js
// Main JavaScript for TechMaster Academy website

// Wait for DOM content
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.getElementById("header");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const themeToggle = document.getElementById("themeToggle");
    const preloader = document.getElementById("preloader");
    const counters = document.querySelectorAll(".counter");
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const prevTestimonial = document.getElementById("prevTestimonial");
    const nextTestimonial = document.getElementById("nextTestimonial");
    const faqItems = document.querySelectorAll(".faq-item");
    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");
    const newsletterEmail = document.getElementById("newsletterEmail");

    /* ---------------------------
       Navigation & Header
    ---------------------------- */

    // Toggle mobile navigation
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        navToggle.classList.toggle("open");
    });

    // Close mobile menu on link click & set active link
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            // Smooth scroll handled by browser; just close menu on mobile
            navMenu.classList.remove("open");
            navToggle.classList.remove("open");

            // Active state
            navLinks.forEach((l) => l.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });

    // Sticky header shadow on scroll & show scroll-to-top button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // Scroll to top
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---------------------------
       Theme Toggle (Dark / Light)
    ---------------------------- */

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("tma-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem("tma-theme", isLight ? "light" : "dark");
    });

    /* ---------------------------
       Preloader
    ---------------------------- */

    window.addEventListener("load", () => {
        // Small delay for smoother feel
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 400);
        }, 400);
    });

    /* ---------------------------
       Animated Counters
    ---------------------------- */

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 1600;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value.toString();
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toString();
            }
        };

        requestAnimationFrame(update);
    };

    // Use IntersectionObserver to trigger counters when visible
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        // Fallback: animate immediately
        counters.forEach((counter) => animateCounter(counter));
    }

    /* ---------------------------
       Testimonials Slider
    ---------------------------- */

    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    };

    const next = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    const prev = () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    nextTestimonial.addEventListener("click", next);
    prevTestimonial.addEventListener("click", prev);

    // Auto-slide every 7 seconds
    setInterval(next, 7000);

    /* ---------------------------
       FAQ Accordion
    ---------------------------- */

    faqItems.forEach((item) => {
        const questionBtn = item.querySelector(".faq-question");
        questionBtn.addEventListener("click", () => {
            // Close others
            faqItems.forEach((other) => {
                if (other !== item) {
                    other.classList.remove("active");
                }
            });
            item.classList.toggle("active");
        });
    });

    /* ---------------------------
       Contact Form Validation
    ---------------------------- */

    const validateEmail = (email) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        // Basic phone validation (digits, spaces, +, -, parentheses)
        return /^[0-9+\-\s()]{7,20}$/.test(phone);
    };

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        contactMessage.textContent = "";
        contactMessage.style.color = "#f97373";

        const fullName = contactForm.fullName.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();
        const message = contactForm.message.value.trim();

        if (!fullName || !email || !phone || !message) {
            contactMessage.textContent = "Please fill in all required fields.";
            return;
        }

        if (!validateEmail(email)) {
            contactMessage.textContent = "Please enter a valid email address.";
            return;
        }

        if (!validatePhone(phone)) {
            contactMessage.textContent = "Please enter a valid phone number.";
            return;
        }

        // Simulate successful submission
        contactMessage.style.color = "#4ade80";
        contactMessage.textContent = "Thank you! Your message has been submitted successfully.";
        contactForm.reset();

        // Clear message after a delay
        setTimeout(() => {
            contactMessage.textContent = "";
        }, 5000);
    });

    /* ---------------------------
       Newsletter Subscription
    ---------------------------- */

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        newsletterMessage.textContent = "";
        newsletterMessage.style.color = "#f97373";

        const email = newsletterEmail.value.trim();
        if (!email) {
            newsletterMessage.textContent = "Please enter your email address.";
            return;
        }

        if (!validateEmail(email)) {
            newsletterMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Simulate subscription success
        newsletterMessage.style.color = "#4ade80";
        newsletterMessage.textContent = "Subscribed successfully! Look out for our next update.";
        newsletterForm.reset();

        setTimeout(() => {
            newsletterMessage.textContent = "";
        }, 5000);
    });
});
