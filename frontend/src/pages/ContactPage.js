// ====================================================
// BEGINNER STUDENT CODE - CONTACT PAGE (frontend/src/pages/ContactPage.js)
// ====================================================
// Contact page form with WhatsApp direct link, store location, and FAQ accordion.

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/css.css';

const ContactPage = () => {
  const locationUrl = 'https://www.google.com/maps?q=gaibi+nagar+near+norani+masjid+bhiwandi'; 
  const whatsappUrl = 'https://wa.me/919226012635?text=Hello%20Kaif%20Phones,%20I%20have%20an%20inquiry.';

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "What is the repair warranty period at Kaif Phones?",
      answer: "All screen replacements and hardware repairs include an official 90-day Kaif Phones warranty covering touch response and manufacturing defects."
    },
    {
      question: "Are all smartphones and accessories 100% original?",
      answer: "Yes! We source all smartphones, chargers, and cases directly from authorized distributors with original brand seals."
    },
    {
      question: "How fast is shipping across Bhiwandi?",
      answer: "We offer free same-day or next-day doorstep delivery across all areas of Bhiwandi for device and accessory purchases."
    },
    {
      question: "Do you offer trade-in value for old smartphones?",
      answer: "Yes! Bring your old working smartphone to our store at Gaibi Nagar for instant evaluation and trade-in discount towards any new phone."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Contact Kaif Phones</h2>
            <p>Send us a message or visit our store in Bhiwandi.</p>
          </div>

          <div className="catalog-toolbar">
            {/* Left Form */}
            <div className="feature-card" style={{ flex: '1 1 500px', padding: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>Send Us a Message</h3>

              {isSubmitted && (
                <div style={{ backgroundColor: '#d1e7dd', color: '#0f5132', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                  Thank you! Your message has been sent successfully. We will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Your Full Name</label>
                  <input type="text" name="name" className="search-input" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Email Address</label>
                  <input type="email" name="email" className="search-input" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Mobile Number</label>
                  <input type="tel" name="phone" className="search-input" value={formData.phone} onChange={handleInputChange} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Message</label>
                  <textarea rows={4} name="message" className="search-input" value={formData.message} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%', textAlign: 'center' }}>Send Message</button>
              </form>
            </div>

            {/* Right Store Info */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="feature-card" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Store Address & Details</h3>
                <p style={{ marginBottom: '8px' }}><strong>Location:</strong> Gaibi Nagar, Near Noorani Masjid, Bhiwandi, Maharashtra</p>
                <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> (+91) 9226012635</p>
                <p style={{ marginBottom: '8px' }}><strong>Email:</strong> idrisizaid8898@gmail.com</p>
                <p style={{ marginBottom: '16px' }}><strong>Instagram:</strong> @kaif_lift86</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ backgroundColor: '#198754', textAlign: 'center' }}>
                    WhatsApp Direct Chat
                  </a>
                  <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="secondary-btn" style={{ color: '#0d6efd', borderColor: '#0d6efd', textAlign: 'center' }}>
                    Open Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="feature-card" style={{ marginTop: '32px', padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ border: '1px solid #e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                  <button 
                    type="button" 
                    style={{ width: '100%', padding: '12px 16px', textAlignment: 'left', backgroundColor: '#f8f9fa', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.question}</span>
                    <span>{activeFaq === idx ? '▲' : '▼'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div style={{ padding: '12px 16px', backgroundColor: '#ffffff', color: '#6c757d', fontSize: '0.9rem' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
