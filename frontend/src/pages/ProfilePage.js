// ====================================================
// BEGINNER STUDENT CODE - PROFILE PAGE (frontend/src/pages/ProfilePage.js)
// ====================================================
// User account profile dashboard displaying account info, order history,
// and order cancellation options.

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API_URL from '../api/config';
import { AuthContext } from '../context/AuthContext';
import '../styles/css.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, setUser: setAuthUser } = useContext(AuthContext);

  // Initialize user profile from localStorage cache
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('user');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(!user);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'orders'

  // Student Order History State
  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-9043",
      date: "July 20, 2026",
      items: "AirPods Pro (2nd Gen) (1x)",
      total: 17900,
      status: "Processing (Before Transit)",
      canCancel: true
    },
    {
      id: "ORD-2026-8812",
      date: "July 18, 2026",
      items: "Samsung S24 Ultra (1x)",
      total: 129999,
      status: "Delivered",
      canCancel: false
    },
    {
      id: "ORD-2026-7491",
      date: "July 10, 2026",
      items: "iPhone 14 MagSafe Cover (1x)",
      total: 450,
      status: "Delivered",
      canCancel: false
    }
  ]);

  // Fetch backend profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
        setUser(response.data);
        setAuthUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        if (!user) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate, setAuthUser, user]);

  // Logout Handler
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Order Cancellation Handler (Before Transit)
  const handleCancelOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: "Cancelled", canCancel: false }
          : order
      )
    );
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="feature-card" style={{ padding: '32px' }}>
            <h2 className="text-center" style={{ marginBottom: '4px' }}>User Account Profile</h2>
            <p className="text-center" style={{ color: '#6c757d', marginBottom: '24px' }}>
              Welcome back, {user ? user.fullName : 'Customer'}!
            </p>

            {/* Profile vs Orders Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <button 
                type="button" 
                className={activeTab === 'profile' ? "filter-btn active" : "filter-btn"}
                style={{ flex: 1 }}
                onClick={() => setActiveTab('profile')}
              >
                Personal Details
              </button>
              <button 
                type="button" 
                className={activeTab === 'orders' ? "filter-btn active" : "filter-btn"}
                style={{ flex: 1 }}
                onClick={() => setActiveTab('orders')}
              >
                Order History ({orders.length})
              </button>
            </div>

            {isLoading && !user ? (
              <p className="text-center">Loading profile details...</p>
            ) : activeTab === 'profile' && user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                  <small style={{ color: '#6c757d', display: 'block' }}>Full Name</small>
                  <strong>{user.fullName}</strong>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                  <small style={{ color: '#6c757d', display: 'block' }}>Email Address</small>
                  <strong>{user.email}</strong>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                  <small style={{ color: '#6c757d', display: 'block' }}>Mobile Number</small>
                  <strong>{user.mobileNumber || 'N/A'}</strong>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                  <small style={{ color: '#6c757d', display: 'block' }}>Date of Birth</small>
                  <strong>{user.dob || 'N/A'}</strong>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <Link to="/product" className="primary-btn" style={{ flex: 1, textAlign: 'center' }}>Browse Catalog</Link>
                  <button type="button" className="logout-btn" style={{ flex: 1 }} onClick={handleLogout}>Logout Account</button>
                </div>
              </div>
            ) : activeTab === 'orders' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order, idx) => (
                  <div key={idx} style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e9ecef' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong>{order.id}</strong>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold', 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        backgroundColor: order.status === 'Delivered' ? '#d1e7dd' : order.status === 'Cancelled' ? '#f8d7da' : '#fff3cd',
                        color: order.status === 'Delivered' ? '#0f5132' : order.status === 'Cancelled' ? '#842029' : '#664d03'
                      }}>
                        {order.status}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#6c757d', marginBottom: '4px' }}>Date: {order.date}</p>
                    <p style={{ fontSize: '0.88rem', color: '#6c757d', marginBottom: '8px' }}>Items: {order.items}</p>
                    <p style={{ fontWeight: 'bold', color: '#0d6efd' }}>Total: ₹{order.total.toLocaleString('en-IN')}</p>

                    {/* Order Cancellation Option (Before Transit) */}
                    {order.canCancel ? (
                      <button 
                        type="button" 
                        className="logout-btn" 
                        style={{ marginTop: '8px', fontSize: '0.8rem', padding: '6px 12px' }}
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order (Before Transit)
                      </button>
                    ) : (
                      <small style={{ color: '#6c757d', display: 'block', marginTop: '8px' }}>
                        {order.status === "Cancelled" ? "Order Cancelled" : "Delivered (Return Only)"}
                      </small>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
