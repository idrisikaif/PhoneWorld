// Centralized Backend API URL configuration pointing to live Render backend
const API_URL = process.env.REACT_APP_API_URL || (
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api/auth'
    : 'https://phoneworld-751p.onrender.com/api/auth'
);

export default API_URL;
