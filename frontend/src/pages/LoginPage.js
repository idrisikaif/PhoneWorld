// ====================================================
// BEGINNER STUDENT CODE - LOGIN PAGE (frontend/src/pages/LoginPage.js)
// ====================================================
// Standard React login form with email/password input handling, validation,
// error state, and password visibility toggle.

import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import '../styles/css.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access login function from AuthContext
  const { login } = useContext(AuthContext);

  // Student State for Login Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await login(email, password);
      if (result.success) {
        const redirectTo = location.state?.from?.pathname || '/profile';
        navigate(redirectTo, { replace: true });
      } else {
        setErrorMessage(result.message || 'Login failed. Invalid email or password.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="feature-card" style={{ padding: '32px' }}>
            <h2 className="text-center" style={{ marginBottom: '8px' }}>User Account Login</h2>
            <p className="text-center" style={{ color: '#6c757d', marginBottom: '24px' }}>
              Sign in to your Kaif Phones account
            </p>

            {/* Error Message Alert */}
            {errorMessage && (
              <div style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.9rem' }}>
                {errorMessage}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  className="search-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Password</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter account password"
                    className="search-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="filter-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="primary-btn" style={{ width: '100%', textAlign: 'center' }} disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login to Account"}
              </button>
            </form>

            <p className="text-center" style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6c757d' }}>
              Don't have an account yet? <Link to="/register" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Register Here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
