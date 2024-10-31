// src/pages/LandingPage/index.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './styles.css';
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="container"> {/* Use className to match CSS styles */}
      {/* Header */}
      <header className="header">
        <h1>PlacementConnect</h1>
        <nav className="nav-menu">
          <Link to="#companies" className="nav-item">Top Recruiters</Link>
          <Link to="#testimonials" className="nav-item">Testimonials</Link>
          <Link to="#about" className="nav-item">About Us</Link>
          <Link to="/login" className="button primary">Login</Link> {/* Link to LoginPage */}
          <Link to="/login-password" className="button">Get Started</Link> {/* Link to LoginPassword */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Your Bridge to the Future</h2>
          <p className="hero-text">Connecting students with industry leaders for a successful career launch.</p>
          <Link to="#companies" className="cta-button">Explore Opportunities</Link>
        </div>
      </section>

      {/* Top Recruiters */}
      <section id="companies" className="section">
        <h2 className="section-title">Top Companies That Hire From Our Campus</h2>
        <div className="grid">
          <div className="logo-card">Company Logo 1</div>
          <div className="logo-card">Company Logo 2</div>
          <div className="logo-card">Company Logo 3</div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section">
        <h2 className="section-title">Student Success Stories</h2>
        <div className="grid">
          <div className="testimonial">
            “The placement portal connected me with my dream job at a Fortune 500 company.”
            <p className="author">- Alice Johnson, Software Engineer, Google</p>
          </div>
          <div className="testimonial">
            “An invaluable resource that paved the way for my career in finance.”
            <p className="author">- Mark Wilson, Financial Analyst, Goldman Sachs</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="section-title">About Us</h2>
        <div className="grid">
          <div className="about-card">
            “Our mission is to bridge the gap between students and industry leaders.”
            <p className="author">- Dr. Smith, Placement Coordinator</p>
          </div>
          <div className="about-card">
            “We strive to prepare students for their best futures by connecting them with top employers.”
            <p className="author">- Sarah Lee, Career Advisor</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 PlacementConnect. All rights reserved.</p>
        <div className="social-icons">
          <FaLinkedin />
          <FaTwitter />
          <FaFacebook />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
