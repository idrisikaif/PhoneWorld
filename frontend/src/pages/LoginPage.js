import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/css.css';
import NavbarSimple from '../components/NavbarSimple';
import axios from 'axios';
import API_URL from '../api/config';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState(location.state?.message || '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({ ...loginData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateLogin = () => {
    let errors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateLogin()) {
      setIsLoading(true);
      setLoginMessage('');
      try {
        const response = await axios.post(`${API_URL}/login`, loginData, { withCredentials: true });

        if (response.status === 200) {
          const userData = response.data.user;
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/profile');
        }
      } catch (error) {
        setLoginMessage(error.response?.data?.message || 'Invalid email or password.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginMessage('Login failed. Please check your email and password.');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setLoginData({
      email: '',
      password: '',
      rememberMe: false,
    });
    setErrors({
      email: '',
      password: '',
    });
    setLoginMessage('');
  };

  return (
    <>
      <NavbarSimple />
      <div className='login py-5'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5">
              <div className="p-4 bg-grey login-container">
                <h2 className="textregis text-center mb-4">Login Page</h2>
                
                {location.state?.registered && (
                  <div className="alert alert-success text-center mb-3">
                    {location.state.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} autoComplete='off'>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder='Enter Your Email'
                      value={loginData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'error-input' : ''}`}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group mb-3">
                    <div className="position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder='Enter Your Password'
                        value={loginData.password}
                        onChange={handleChange}
                        className={`form-control pe-5 ${errors.password ? 'error-input' : ''}`}
                      />
                      <button 
                        type="button" 
                        className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-white p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 10, fontSize: '1.2rem', lineHeight: 1 }}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-white" htmlFor="rememberMe">Remember Me</label>
                  </div>

                  <div className="form-actions d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <button type="button" className="btn btn-danger flex-grow-1" onClick={handleCancel} disabled={isLoading}>Cancel</button>
                  </div>

                  <div className="forgot-password text-center mt-3">
                    <Link to="/register" className="text-white text-decoration-underline">Don't have an account? Register</Link>
                  </div>
                  
                  {loginMessage && !location.state?.registered && (
                    <div className="alert alert-danger mt-3 text-center">{loginMessage}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
