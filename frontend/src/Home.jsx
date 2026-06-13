import React, { useState, useEffect } from "react";
import "./style.css"; // Ensure your CSS file is imported

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Handle Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div id="preloader">
          <div className="loader-circle"></div>
          <p>Launching your courier journey</p>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        id="scrollTopBtn"
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Dark / Light Mode Toggle */}
      <button
        id="themeToggle"
        aria-label="Toggle dark mode"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>

      {/* Header & Navigation */}
      <header className="header" id="header">
        <nav className="navbar">
          <div className="nav-logo">
            <span className="logo-icon">
              <i className="fas fa-laptop-code"></i>
            </span>
            <span className="logo-text">
              Combined<span>Courier</span>
            </span>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div
            className={`nav-toggle ${isNavOpen ? "open" : ""}`}
            id="navToggle"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-menu ${isNavOpen ? "active" : ""}`} id="navMenu">
            <li>
              <a href="#hero" className="nav-link active">
                Home
              </a>
            </li>
            <li>
              <a href="#courses" className="nav-link">
                Courses
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About Us
              </a>
            </li>
            <li>
              <a href="#certifications" className="nav-link">
                Certifications
              </a>
            </li>
            <li>
              <a href="#corporate" className="nav-link">
                Corporate Training
              </a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-text">
            <p className="hero-tagline">
              Professional IT & Computer Training for Tomorrow’s Innovators
            </p>
            <h1>
              Empowering Your Future with{" "}
              <span className="accent">Industry-Leading IT Training</span>
            </h1>
            <p className="hero-subtitle">
              Hands-on courses, expert trainers, and globally recognised
              certifications designed to accelerate your tech career.
            </p>
            <div className="hero-cta">
              <a href="#courses" className="btn btn-primary">
                Explore Courses
              </a>
              <a href="#contact" className="btn btn-outline">
                Get Free Consultation
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="counter">10000</span>
                <span>+</span>
                <p>Professionals Trained</p>
              </div>
              <div className="stat">
                <span className="counter">150</span>
                <span>+</span>
                <p>Corporate Clients</p>
              </div>
              <div className="stat">
                <span className="counter">95</span>
                <span>%</span>
                <p>Student Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card glass">
              <i className="fas fa-code"></i>
              <h3>Real-World Projects</h3>
              <p>
                Build portfolio-ready applications guided by senior industry
                experts.
              </p>
            </div>
            <div className="hero-floating-icon icon-1">
              <i className="fas fa-cloud"></i>
            </div>
            <div className="hero-floating-icon icon-2">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="hero-floating-icon icon-3">
              <i className="fas fa-network-wired"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section" id="courses">
        <div className="container">
          <div className="section-header">
            <h2>
              Our <span className="accent">Courses</span>
            </h2>
            <p>
              Future-ready training programs designed to match the pace of
              modern technology.
            </p>
          </div>
          <div className="courses-grid">
            {[
              {
                title: "Software Development",
                icon: "fa-code",
                desc: "Master full-stack development with modern languages, frameworks, and best practices.",
              },
              {
                title: "Cybersecurity",
                icon: "fa-shield-alt",
                desc: "Learn ethical hacking, security operations, and risk management to protect digital infrastructure.",
              },
              {
                title: "Cloud Computing",
                icon: "fa-cloud",
                desc: "Gain expertise in AWS, Azure, and Google Cloud to architect and manage cloud-native solutions.",
              },
              {
                title: "Networking",
                icon: "fa-network-wired",
                desc: "Build strong foundations in network design, routing, switching, and infrastructure management.",
              },
              {
                title: "Data Science",
                icon: "fa-database",
                desc: "Transform data into insights using Python, SQL, machine learning, and visualisation tools.",
              },
              {
                title: "AI & Machine Learning",
                icon: "fa-robot",
                desc: "Design intelligent systems and predictive models using cutting-edge AI and ML techniques.",
              },
            ].map((course, index) => (
              <article className="course-card" key={index}>
                <div className="course-icon">
                  <i className={`fas ${course.icon}`}></i>
                </div>
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <button className="btn btn-sm btn-secondary">
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section section-alt" id="about">
        <div className="container about-grid">
          <div className="about-image">
            <div className="about-illustration glass">
              <i className="fas fa-users-cog"></i>
            </div>
          </div>
          <div className="about-content">
            <h2>
              About <span className="accent">TechMaster Academy</span>
            </h2>
            <p className="about-mission">
              Our mission is to empower individuals and organisations with
              future-ready technology skills, bridging the gap between academic
              learning and real-world industry demands. We believe in practical,
              hands-on training that transforms careers.
            </p>
            <h3>Why Choose Us</h3>
            <ul className="about-list">
              <li>
                <i className="fas fa-check-circle"></i>10+ Years Industry
                Experience
              </li>
              <li>
                <i className="fas fa-check-circle"></i>Certified Professional
                Trainers
              </li>
              <li>
                <i className="fas fa-check-circle"></i>Hands-on Practical Labs
              </li>
              <li>
                <i className="fas fa-check-circle"></i>Flexible Online & Offline
                Learning
              </li>
              <li>
                <i className="fas fa-check-circle"></i>Career Guidance &
                Mentorship
              </li>
              <li>
                <i className="fas fa-check-circle"></i>95% Student Satisfaction
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section" id="certifications">
        <div className="container">
          <div className="section-header">
            <h2>
              Globally Recognised <span className="accent">Certifications</span>
            </h2>
            <p>
              Prepare for industry-leading certifications with structured
              learning paths and expert guidance.
            </p>
          </div>
          <div className="cert-grid">
            {["Microsoft", "Cisco", "AWS", "CompTIA", "Google Cloud"].map(
              (cert, i) => (
                <div className="cert-card" key={i}>
                  <div className="cert-logo">{cert}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="section section-alt" id="corporate">
        <div className="container corporate-grid">
          <div className="corporate-content">
            <h2>
              Corporate <span className="accent">Training Solutions</span>
            </h2>
            <p>
              Equip your teams with the skills they need to drive digital
              transformation. Our corporate training programs are tailored to
              your business goals, technology stack, and workforce needs.
            </p>
            <ul className="corporate-list">
              <li>
                <i className="fas fa-building"></i>On-site corporate training
              </li>
              <li>
                <i className="fas fa-video"></i>Live online team workshops
              </li>
              <li>
                <i className="fas fa-route"></i>Customised learning paths
              </li>
              <li>
                <i className="fas fa-chart-line"></i>Employee upskilling
                programs
              </li>
              <li>
                <i className="fas fa-certificate"></i>Certification preparation
                bootcamps
              </li>
            </ul>
            <a href="#contact" className="btn btn-primary">
              Request a Quote
            </a>
          </div>
          <div className="corporate-image">
            <div className="corporate-illustration glass">
              <i className="fas fa-handshake"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Career Support Section */}
      <section className="section" id="career">
        <div className="container career-grid">
          <div className="career-content">
            <h2>
              Career <span className="accent">Support</span>
            </h2>
            <p>
              We go beyond training by supporting you at every step of your
              career journey—from your first resume to your next promotion.
            </p>
            <ul className="career-list">
              <li>
                <i className="fas fa-file-alt"></i>Resume & LinkedIn profile
                optimisation
              </li>
              <li>
                <i className="fas fa-comments"></i>Mock interviews with industry
                experts
              </li>
              <li>
                <i className="fas fa-briefcase"></i>Job placement assistance &
                referrals
              </li>
              <li>
                <i className="fas fa-users"></i>Access to alumni & mentor
                network
              </li>
            </ul>
          </div>
          <div className="career-highlight glass">
            <h3>Career Outcomes</h3>
            <p>
              Our learners have secured roles at leading technology companies
              and global enterprises.
            </p>
            <div className="career-tags">
              <span>Software Engineer</span>
              <span>Cloud Architect</span>
              <span>Security Analyst</span>
              <span>Data Scientist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-alt" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>
              What Our <span className="accent">Students Say</span>
            </h2>
            <p>
              Real stories from learners who transformed their careers with
              TechMaster Academy.
            </p>
          </div>
          <div className="testimonial-slider" id="testimonialSlider">
            <article className="testimonial-card active">
              <div className="testimonial-header">
                <div className="testimonial-photo">A</div>
                <div>
                  <h3>Alex Johnson</h3>
                  <p>Software Development Program</p>
                </div>
              </div>
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                “The full-stack course was incredibly practical. I built real
                applications and landed a developer role within 3 months.”
              </p>
            </article>
            {/* Add other testimonial cards here in the same pattern */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-header">
            <h2>
              Frequently Asked <span className="accent">Questions</span>
            </h2>
            <p>
              Find quick answers to common questions about our programs and
              services.
            </p>
          </div>
          <div className="faq-accordion" id="faqAccordion">
            {[
              {
                q: "What is the mode of training?",
                a: "We offer both online and classroom-based training, along with blended models for corporate clients.",
              },
              {
                q: "Do you provide certification exam preparation?",
                a: "Yes, our courses are aligned with leading certification bodies and include dedicated exam preparation sessions.",
              },
              {
                q: "Is there any placement assistance?",
                a: "We provide career guidance, interview preparation, and job referrals through our hiring partners and alumni network.",
              },
              {
                q: "Can I pay in instalments?",
                a: "Yes, flexible payment options and instalment plans are available for selected programs.",
              },
            ].map((faq, index) => (
              <div className="faq-item" key={index}>
                <button className="faq-question">
                  {faq.q}
                  <span className="faq-icon">
                    <i className="fas fa-plus"></i>
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section section-alt" id="newsletter">
        <div className="container newsletter-grid">
          <div className="newsletter-content">
            <h2>
              Stay Ahead with <span className="accent">Tech Insights</span>
            </h2>
            <p>
              Subscribe to our newsletter for course updates, tech trends, and
              exclusive learning resources.
            </p>
          </div>
          <form
            className="newsletter-form"
            id="newsletterForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              id="newsletterEmail"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
            <p className="form-message" id="newsletterMessage"></p>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="container contact-grid">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>
              Contact <span className="accent">Us</span>
            </h2>
            <p>
              Have questions or need a custom training plan? Share your details
              and we’ll get back to you.
            </p>
            <form
              id="contactForm"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Message
              </button>
              <p className="form-message" id="contactMessage"></p>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="contact-info-wrapper">
            <h3>Get in Touch</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-location-dot"></i>123 Tech Park, Innovation
                Street, Harrow, London, UK
              </li>
              <li>
                <i className="fas fa-phone"></i>+44 (0)20 1234 5678
              </li>
              <li>
                <i className="fas fa-envelope"></i>info@techmasteracademy.com
              </li>
              <li>
                <i className="fas fa-clock"></i>Mon – Sat: 9:00 AM – 7:00 PM
              </li>
            </ul>
            <div className="map-wrapper">
              <iframe
                title="TechMaster Academy Location"
                src="https://maps.google.com/maps?q=Harrow%20London&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section cta-section">
        <div className="container cta-content">
          <h2>
            Ready to <span className="accent">Transform</span> Your Career?
          </h2>
          <p>
            Join TechMaster Academy and gain the skills, confidence, and
            credentials to lead in the digital era.
          </p>
          <div className="cta-buttons">
            <a href="#courses" className="btn btn-primary">
              Browse Programs
            </a>
            <a href="#contact" className="btn btn-outline">
              Talk to a Learning Advisor
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3>TechMaster Academy</h3>
            <p>
              Empowering professionals and organisations with future-ready
              technology skills and globally recognised certifications.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#courses">Courses</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#certifications">Certifications</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>
                <i className="fas fa-phone"></i> +44 (0)20 1234 5678
              </li>
              <li>
                <i className="fas fa-envelope"></i>{" "}
                support@techmasteracademy.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 TechMaster Academy. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
