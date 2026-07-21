// ====================================================
// BEGINNER STUDENT CODE - CART PAGE (frontend/src/pages/CartPage.js)
// ====================================================
// Shopping cart page showing selected products, quantity adjustments,
// promo discount code, and order subtotal calculations.

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import '../styles/css.css';

const CartPage = () => {
  const navigate = useNavigate();
  
  // Access Cart and Auth state from Context
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  // Student State for Promo Coupon Code
  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponNotice, setCouponNotice] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate order subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = subtotal - discountAmount;

  // Simple handler to apply promo coupon KAIF10
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'KAIF10') {
      setDiscountPercent(10);
      setCouponNotice('Success! Coupon KAIF10 applied 10% discount.');
    } else {
      setCouponNotice('Invalid coupon code. Try entering KAIF10.');
    }
  };

  // Simple handler for order checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Your Shopping Cart</h2>
            <p>{cart.length > 0 ? `You have ${cart.length} item(s) in your cart` : 'Your cart is empty'}</p>
          </div>

          {/* Order Success Banner */}
          {orderPlaced && (
            <div className="empty-box text-center">
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for shopping at Kaif Phones. Redirecting to your Profile...</p>
            </div>
          )}

          {/* Cart View: Empty vs Cart Items */}
          {cart.length === 0 ? (
            <div className="empty-box">
              <h3>Your Shopping Cart is Empty</h3>
              <p>No items added yet. Explore our mobile store catalog to start shopping!</p>
              <Link to="/product" className="primary-btn">Browse Products</Link>
            </div>
          ) : (
            <div className="catalog-toolbar">
              <div style={{ flex: '1 1 600px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map((item, index) => (
                    <div key={index} className="product-card" style={{ padding: '16px', flexDirection: 'row', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <img src={item.imageUrl} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 className="product-title">{item.title}</h4>
                        <p className="product-description">{item.description}</p>
                        <p style={{ fontWeight: 'bold', color: '#0d6efd' }}>₹{item.price.toLocaleString('en-IN')}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button type="button" className="filter-btn" onClick={() => removeFromCart(item)}>-</button>
                        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                        <button type="button" className="filter-btn" onClick={() => addToCart(item)}>+</button>
                      </div>

                      <button type="button" className="logout-btn" onClick={() => deleteFromCart(item)}>Remove</button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button type="button" className="secondary-btn" style={{ color: '#dc3545', borderColor: '#dc3545' }} onClick={clearCart}>
                    Clear Entire Cart
                  </button>
                  <Link to="/product" className="primary-btn">Continue Shopping</Link>
                </div>
              </div>

              {/* Sidebar Order Summary */}
              <div style={{ flex: '1 1 300px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h3>Order Summary</h3>
                
                <form onSubmit={handleApplyCoupon} style={{ margin: '16px 0', display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Coupon Code (KAIF10)" 
                    className="search-input"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="search-btn">Apply</button>
                </form>
                {couponNotice && <p style={{ fontSize: '0.85rem', color: discountPercent > 0 ? '#198754' : '#dc3545', marginBottom: '12px' }}>{couponNotice}</p>}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Shipping Fee:</span>
                  <span style={{ color: '#198754', fontWeight: 'bold' }}>FREE</span>
                </div>

                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#198754' }}>
                    <span>Discount (10%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <hr style={{ margin: '12px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: '#0d6efd' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <button type="button" className="primary-btn" style={{ width: '100%', textAlign: 'center' }} onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
