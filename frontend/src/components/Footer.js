import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/css.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        <div className="footer-col">
          <h4 className="footer-heading">Kaif Phones</h4>
          <p className="footer-text">
            Your trusted local mobile store for genuine smartphones, protective cases, chargers, and expert repair services.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/service">Services</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Store</h4>
          <p className="footer-text">
            <strong>Address:</strong> Gaibi Nagar, Near Noorani Masjid, Bhiwandi, Maharashtra
          </p>
          <p className="footer-text">
            <strong>Phone:</strong> (+91) 9226012635
          </p>
          <p className="footer-text">
            <strong>Email:</strong> idrisizaid8898@gmail.com
          </p>
          <p className="footer-text">
            <strong>Instagram:</strong> @kaif_lift86
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} Kaif Phones. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
