import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './component/RegisterPage';
import LoginPage from './component/LoginPage';
import ContactPage from './component/ContactPage';
import HomePage from './component/HomePage';
import AboutPage from './component/AboutPage';
import ProductPage from './component/ProductPage';
import ServicesPage from './component/ServicesPage';
import ProfilePage from './component/ProfilePage';
import CartPage from './component/CartPage'; // Import the CartPage
import { CartProvider } from './component/CartContext'; // Import CartProvider

function App() {
  return (
    <CartProvider>
      
        <Routes>
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/service" element={<ServicesPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/product" element={<ProductPage />} />
          <Route exact path="/cart" element={<CartPage />} /> {/* Cart Page Route */}
        </Routes>
      
    </CartProvider>
  );
}

export default App;
