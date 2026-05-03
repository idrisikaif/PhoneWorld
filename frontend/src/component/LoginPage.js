import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css.css';
import Navbar from './Navy2';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

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
      try {
        const response = await axios.post('http://localhost:5000/login', loginData, { withCredentials: true });

        if (response.status === 200) {
          const userData = response.data.user;
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/profile');
        }
      } catch (error) {
        setLoginMessage('Invalid email or password.');
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
    <Navbar/>
    <div className='login'>
    <div className="p-4  bg-grey" style={{ maxWidth: '500px', margin: '30px auto' }}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className="form-group">
          <label></label>
          <i className="fa-solid fa-user"></i>
          <input
            type="email"
            name="email"
            placeholder='Enter Your Email'
            value={loginData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label></label>
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder='Enter Your Password'
            value={loginData.password}
            onChange={handleChange}
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={loginData.rememberMe}
              onChange={handleChange}
            /> Remember Me
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
        <div className="forgot-password">
          <Link to="/">Forgot Password?</Link>
        </div>
        {loginMessage && <div className="login-message">{loginMessage}</div>}
      </form>
    </div>
    </div>
    </>
  );
};

export default LoginPage;