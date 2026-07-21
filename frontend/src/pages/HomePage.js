// ====================================================
// BEGINNER STUDENT CODE - HOME PAGE (frontend/src/pages/HomePage.js)
// ====================================================
// Main home page component displaying hero banner, featured products, and store features.

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Import brand new product images
import s25ultra from '../assets/image/s25ultra.png';
import iphone16pro from '../assets/image/iphone16pro.png';
import oneplus from '../assets/image/1plus12.jpg';
import pixel8 from '../assets/image/pixel8pro.png';
import '../styles/css.css';

const HomePage = () => {
  // Brand new featured products array
  const featuredProducts = [
    {
      id: 1,
      title: "Samsung Galaxy S25 Ultra",
      imageUrl: s25ultra,
      price: 134999,
      originalPrice: 144999,
      badgeText: "2026 Flagship",
      description: "Snapdragon 8 Elite • 16GB RAM • 200MP Quad Camera • S-Pen Integrated."
    },
    {
      id: 2,
      title: "iPhone 16 Pro Max",
      imageUrl: iphone16pro,
      price: 144900,
      originalPrice: 154900,
      badgeText: "Latest Apple",
      description: "A18 Pro Bionic Chip • 8GB RAM • Grade 5 Titanium • Capture Button."
    },
    {
      id: 3,
      title: "OnePlus 12",
      imageUrl: oneplus,
      price: 60174,
      originalPrice: 64999,
      badgeText: "Hot Deal",
      description: "Snapdragon 8 Gen 3 • 100W Charging • Hasselblad Camera System."
    },
    {
      id: 4,
      title: "Google Pixel 8 Pro",
      imageUrl: pixel8,
      price: 84999,
      originalPrice: 93999,
      badgeText: "AI Powered",
      description: "Tensor G3 Chip • 12GB RAM • Magic Eraser • Pure Android 14."
    }
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="container hero-container">
          <span className="hero-tag">New 2026 Smartphone Arrivals</span>
          <h1 className="hero-title">Welcome to Kaif Phones</h1>
          <p className="hero-subtitle">
            Discover brand new flagship smartphones, original covers, chargers, and professional repair services.
          </p>
          <div className="hero-btn-group">
            <Link to="/product" className="primary-btn">Explore Products</Link>
            <Link to="/service" className="secondary-btn">Our Repair Services</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Featured New Products</h2>
            <p>Handpicked latest smartphones with official manufacturer warranty.</p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                price={product.price}
                originalPrice={product.originalPrice}
                badgeText={product.badgeText}
                description={product.description}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/product" className="primary-btn">View Full Product Catalog</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-light-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Kaif Phones?</h2>
            <p>We provide authentic products and customer satisfaction.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h3>100% Original Guarantee</h3>
              <p>All phones and accessories come with original brand seals and manufacturer warranties.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Local Delivery</h3>
              <p>Free same-day or next-day doorstep delivery across Bhiwandi for all purchases.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Repair Service</h3>
              <p>Professional screen replacements, battery repairs, and motherboard diagnostics with 90-day warranty.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
