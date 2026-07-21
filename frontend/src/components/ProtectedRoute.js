import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/image/phone2.png';
import '../styles/css.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-column justify-center align-center min-vh-100 bg-light" style={{ gap: '16px' }}>
        <img src={logo} alt="Kaif Phones" style={{ height: '50px', width: 'auto', borderRadius: 'var(--radius-sm)' }} />
        <div className="spinner" style={{ borderColor: 'var(--primary-color)', borderTopColor: 'transparent', width: '32px', height: '32px' }}></div>
        <p className="text-muted small fw-medium">Verifying your secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location, message: 'Please log in to access this page.' }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
