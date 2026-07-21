// ====================================================
// BEGINNER STUDENT CODE - ABOUT PAGE (frontend/src/pages/AboutPage.js)
// ====================================================
// Simple about page introducing Kaif Phones store mission and store history.

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/css.css';

const AboutPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>About Kaif Phones</h2>
            <p>Your premier destination for smartphones, accessories, and mobile repairs in Bhiwandi.</p>
          </div>

          <div className="feature-card" style={{ padding: '32px', marginBottom: '24px' }}>
            <h3 style={{ color: '#0d6efd', marginBottom: '12px' }}>Our Mission</h3>
            <p style={{ color: '#6c757d', marginBottom: '16px', lineHeight: '1.7' }}>
              At Kaif Phones, our goal is to provide original, high-quality smartphones and genuine mobile accessories at affordable prices. We believe in customer transparency, honest pricing, and dependable post-sale support.
            </p>
            <p style={{ color: '#6c757d', lineHeight: '1.7' }}>
              Located in Gaibi Nagar near Noorani Masjid, Bhiwandi, our store serves thousands of happy local customers with authentic brand products from Samsung, Apple, OnePlus, Google, and Sony.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h3>Genuine Products</h3>
              <p>100% factory-sealed original products backed by official manufacturer warranties.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Repair Shop</h3>
              <p>Specialized mobile screen replacements, battery repairs, and motherboard diagnostics.</p>
            </div>
            <div className="feature-card">
              <h3>Friendly Customer Care</h3>
              <p>Dedicated local support on WhatsApp and phone for all device inquiries and assistance.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
