import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API_URL from '../api/config';
import { AuthContext } from '../context/AuthContext';
import '../styles/css.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    dob: '',
    gender: 'Male'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="section-padding">
        <div className="container" style={{ maxWidth: '520px' }}>
          <div className="feature-card" style={{ padding: '32px' }}>
            <h2 className="text-center" style={{ marginBottom: '8px' }}>Create New Account</h2>
            <p className="text-center" style={{ color: '#6c757d', marginBottom: '24px' }}>
              Register for Kaif Phones Mobile Store
            </p>

            {errorMessage && (
              <div style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.9rem' }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  className="search-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="search-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password (min 6 characters)"
                  className="search-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="10-digit mobile number"
                  className="search-input"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="search-input"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Gender</label>
                <select name="gender" className="search-input" value={formData.gender} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="primary-btn" style={{ width: '100%', textAlign: 'center' }} disabled={isSubmitting}>
                {isSubmitting ? "Registering Account..." : "Complete Registration"}
              </button>
            </form>

            <p className="text-center" style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6c757d' }}>
              Already registered? <Link to="/login" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Login Here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
