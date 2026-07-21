// ====================================================
// BEGINNER STUDENT CODE - PRODUCT PAGE (frontend/src/pages/ProductPage.js)
// ====================================================
// Product catalog page featuring category filter buttons and product search.

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Brand new product image imports
import s25ultra from '../assets/image/s25ultra.png';
import iphone16pro from '../assets/image/iphone16pro.png';
import oneplus from '../assets/image/1plus12.jpg';
import pixel8 from '../assets/image/pixel8pro.png';
import samsunga55 from '../assets/image/samsung_a55.png';
import realmegt6 from '../assets/image/realme_gt6.png';

import magsafecase from '../assets/image/magsafe_case.png';
import armorcase from '../assets/image/armor_case.png';
import leatherwallet from '../assets/image/leather_wallet.png';
import siliconecase from '../assets/image/silicone_case.png';
import case1 from '../assets/image/caseiphone14.jpg';
import case2 from '../assets/image/caseiphone13pro.jpg';

import gancharger from '../assets/image/gan_charger.png';
import airpods from '../assets/image/airpods.jpg';
import watch from '../assets/image/watch.jpg';
import galaxywatch from '../assets/image/galaxywatch6.png';
import sonyheadphones from '../assets/image/sonyheadphones.png';
import charger1 from '../assets/image/asschargeer.jpg';
import '../styles/css.css';

const ProductPage = () => {
  // Beginner State 1: Active Category Filter ("all", "smartphones", "cases", "accessories")
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Beginner State 2: Active Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Complete Expanded Product List Array (19 Items)
  const productsList = [
    // --- SMARTPHONES CATEGORY (6 Products) ---
    {
      id: 1,
      title: "Samsung Galaxy S25 Ultra",
      imageUrl: s25ultra,
      price: 134999,
      originalPrice: 144999,
      category: "smartphones",
      badgeText: "2026 Flagship",
      description: "Snapdragon 8 Elite • 16GB RAM • 5000mAh Battery • 200MP Quad Camera."
    },
    {
      id: 2,
      title: "iPhone 16 Pro Max",
      imageUrl: iphone16pro,
      price: 144900,
      originalPrice: 154900,
      category: "smartphones",
      badgeText: "Latest Apple",
      description: "A18 Pro Bionic Chip • 8GB RAM • Grade 5 Titanium • Capture Button."
    },
    {
      id: 3,
      title: "OnePlus 12 5G",
      imageUrl: oneplus,
      price: 60174,
      originalPrice: 64999,
      category: "smartphones",
      badgeText: "Hot Deal",
      description: "Snapdragon 8 Gen 3 • 100W SuperVOOC Fast Charging • Hasselblad Camera."
    },
    {
      id: 4,
      title: "Google Pixel 8 Pro",
      imageUrl: pixel8,
      price: 84999,
      originalPrice: 93999,
      category: "smartphones",
      badgeText: "AI Powered",
      description: "Tensor G3 Chip • 12GB RAM • Magic Eraser • Pure Android 14."
    },
    {
      id: 5,
      title: "Samsung Galaxy A55 5G",
      imageUrl: samsunga55,
      price: 39999,
      originalPrice: 44999,
      category: "smartphones",
      badgeText: "New Mid-Range",
      description: "Exynos 1480 • 12GB RAM • Super AMOLED 120Hz • IP67 Water Resistant."
    },
    {
      id: 6,
      title: "RealMe GT 6 5G",
      imageUrl: realmegt6,
      price: 40999,
      originalPrice: 45999,
      category: "smartphones",
      badgeText: "Speed Monster",
      description: "Snapdragon 8s Gen 3 • 120W Ultra Fast Charge • 6000 nits OLED Display."
    },

    // --- CASES & COVERS CATEGORY (6 Products) ---
    {
      id: 7,
      title: "iPhone 16 Pro MagSafe Case",
      imageUrl: magsafecase,
      price: 650,
      originalPrice: 999,
      category: "cases",
      badgeText: "New Arrival",
      description: "Shockproof crystal clear protective cover with magnetic charging support."
    },
    {
      id: 8,
      title: "Galaxy S25 Ultra Armor Case",
      imageUrl: armorcase,
      price: 550,
      originalPrice: 899,
      category: "cases",
      badgeText: "Rugged",
      description: "Heavy duty drop protection cover with integrated kickstand support."
    },
    {
      id: 9,
      title: "iPhone Leather Wallet Cover",
      imageUrl: leatherwallet,
      price: 499,
      originalPrice: 799,
      category: "cases",
      badgeText: "Leather",
      description: "Premium synthetic leather wallet case with card holder slots."
    },
    {
      id: 10,
      title: "Universal Soft Silicone Case",
      imageUrl: siliconecase,
      price: 299,
      originalPrice: 499,
      category: "cases",
      badgeText: "Best Seller",
      description: "Soft liquid silicone protective cover with scratch-resistant inner lining."
    },
    {
      id: 11,
      title: "Pixel 8 Pro Clear Armor Case",
      imageUrl: case1,
      price: 399,
      originalPrice: 699,
      category: "cases",
      badgeText: "Clear View",
      description: "Anti-yellowing transparent TPU bumper case with raised camera lens protection."
    },
    {
      id: 12,
      title: "OnePlus 12 Sandstone Case",
      imageUrl: case2,
      price: 450,
      originalPrice: 750,
      category: "cases",
      badgeText: "Textured",
      description: "Iconic matte sandstone textured grip case with precision button cutouts."
    },

    // --- ACCESSORIES CATEGORY (7 Products) ---
    {
      id: 13,
      title: "65W GaN Fast Wall Charger",
      imageUrl: gancharger,
      price: 2100,
      originalPrice: 2999,
      category: "accessories",
      badgeText: "Fast Charge",
      description: "Dual Type-C and USB-A 65W GaN fast charger for laptops and smartphones."
    },
    {
      id: 14,
      title: "AirPods Pro (2nd Gen)",
      imageUrl: airpods,
      price: 17900,
      originalPrice: 24900,
      category: "accessories",
      badgeText: "Top Rated",
      description: "Active Noise Cancellation • Transparency mode • Personalized Spatial Audio."
    },
    {
      id: 15,
      title: "iWatch Ultra 2 Titanium",
      imageUrl: watch,
      price: 89900,
      originalPrice: 94900,
      category: "accessories",
      badgeText: "Flagship Watch",
      description: "Rugged 49mm Titanium case • Dual-frequency GPS • Up to 36 hours battery."
    },
    {
      id: 16,
      title: "Samsung Galaxy Watch 6",
      imageUrl: galaxywatch,
      price: 27999,
      originalPrice: 32999,
      category: "accessories",
      badgeText: "Fitness Pro",
      description: "Advanced sleep coaching • ECG monitoring • Crystal Sapphire glass display."
    },
    {
      id: 17,
      title: "Sony WH-1000XM5 Headphones",
      imageUrl: sonyheadphones,
      price: 24990,
      originalPrice: 29990,
      category: "accessories",
      badgeText: "Hi-Res Audio",
      description: "Industry-leading noise cancellation • 30-hour battery • Crystal clear calls."
    },
    {
      id: 18,
      title: "10,000mAh MagSafe Power Bank",
      imageUrl: charger1,
      price: 3200,
      originalPrice: 4500,
      category: "accessories",
      badgeText: "Wireless Pack",
      description: "Magnetic wireless fast charging power bank with LED battery level indicator."
    },
    {
      id: 19,
      title: "7-in-1 Type-C Multi-port Hub",
      imageUrl: charger1,
      price: 1850,
      originalPrice: 2499,
      category: "accessories",
      badgeText: "Multi-Port",
      description: "HDMI 4K, USB 3.0, SD Card Reader, and 100W PD charging pass-through adapter."
    }
  ];

  // Filter products by active category and search text
  const filteredProducts = productsList.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Mobile Store Catalog</h2>
            <p>Browse our expanded collection of smartphones, cases, and accessories.</p>
          </div>

          {/* Category Filter Buttons & Search Box */}
          <div className="catalog-toolbar">
            <div className="category-btn-group">
              <button 
                type="button" 
                className={selectedCategory === "all" ? "filter-btn active" : "filter-btn"}
                onClick={() => setSelectedCategory("all")}
              >
                All Products ({productsList.length})
              </button>
              <button 
                type="button" 
                className={selectedCategory === "smartphones" ? "filter-btn active" : "filter-btn"}
                onClick={() => setSelectedCategory("smartphones")}
              >
                Smartphones ({productsList.filter(p => p.category === 'smartphones').length})
              </button>
              <button 
                type="button" 
                className={selectedCategory === "cases" ? "filter-btn active" : "filter-btn"}
                onClick={() => setSelectedCategory("cases")}
              >
                Cases & Covers ({productsList.filter(p => p.category === 'cases').length})
              </button>
              <button 
                type="button" 
                className={selectedCategory === "accessories" ? "filter-btn active" : "filter-btn"}
                onClick={() => setSelectedCategory("accessories")}
              >
                Accessories ({productsList.filter(p => p.category === 'accessories').length})
              </button>
            </div>

            <div className="catalog-search-box">
              <input
                type="text"
                placeholder="Filter by product name..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="empty-box">
              <h3>No Products Match Your Search</h3>
              <p>Try clearing your search query or switching categories.</p>
              <button 
                type="button"
                className="primary-btn"
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
