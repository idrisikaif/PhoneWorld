import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage'; 
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route 
              exact 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/service" element={<ServicesPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/product" element={<ProductPage />} />
            <Route exact path="/cart" element={<CartPage />} /> 
          </Routes>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
