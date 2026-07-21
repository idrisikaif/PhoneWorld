// ====================================================
// BEGINNER STUDENT CODE - SERVICES PAGE (frontend/src/pages/ServicesPage.js)
// ====================================================
// Mobile repair services page outlining repair options, diagnostic procedures,
// and booking consultation buttons.

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/css.css';

const ServicesPage = () => {
  const repairServices = [
    {
      title: "Display & Touch Screen Replacement",
      description: "Original Super AMOLED and IPS LCD screen replacements for Samsung, iPhone, OnePlus, and RealMe devices with 90-day warranty.",
      pricing: "Starting from ₹1,200"
    },
    {
      title: "Battery Diagnostic & Replacement",
      description: "Genuine high-health capacity battery replacements to fix fast draining, swelling, or unexpected phone shutdowns.",
      pricing: "Starting from ₹800"
    },
    {
      title: "Charging Port & Speaker Repair",
      description: "Fix loose charging pins, slow Type-C/Lightning port connections, distorted mic audio, or silent ear speakers.",
      pricing: "Starting from ₹500"
    },
    {
      title: "Water Damage & Motherboard Repair",
      description: "Advanced micro-soldering IC repair, liquid damage clean-up, and dead phone recovery using diagnostic tools.",
      pricing: "Starting from ₹1,500"
    }
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Mobile Repair & Diagnostic Services</h2>
            <p>Professional repair services by certified technicians at Kaif Phones Bhiwandi.</p>
          </div>

          <div className="features-grid">
            {repairServices.map((service, index) => (
              <div key={index} className="feature-card">
                <h3>{service.title}</h3>
                <p style={{ marginBottom: '12px' }}>{service.description}</p>
                <p style={{ fontWeight: 'bold', color: '#0d6efd' }}>{service.pricing}</p>
              </div>
            ))}
          </div>

          <div className="empty-box" style={{ marginTop: '32px' }}>
            <h3>Need a Custom Repair Estimate?</h3>
            <p>Bring your smartphone to our store or contact us on WhatsApp for an instant free repair quote.</p>
            <Link to="/contact" className="primary-btn">Book Repair Consultation</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
