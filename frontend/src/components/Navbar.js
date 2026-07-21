import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/image/phone2.png';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/css.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate('/product');
      setSearchText('');
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="container header-container">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="brand-logo-link" onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>
          <img src={logo} alt="Kaif Phones Logo" className="site-logo" />
          <span className="brand-title">Kaif Phones</span>
        </Link>

        {/* Desktop Links */}
        <nav className="desktop-nav">
          <Link to="/" className={isActive('/') ? "nav-item active" : "nav-item"}>Home</Link>
          <Link to="/product" className={isActive('/product') ? "nav-item active" : "nav-item"}>Products</Link>
          <Link to="/about" className={isActive('/about') ? "nav-item active" : "nav-item"}>About Us</Link>
          <Link to="/contact" className={isActive('/contact') ? "nav-item active" : "nav-item"}>Contact</Link>
          <Link to="/service" className={isActive('/service') ? "nav-item active" : "nav-item"}>Services</Link>
        </nav>

        {/* Right Search & Account Dropdown */}
        <div className="header-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>

          {/* Account Dropdown */}
          <div className="dropdown-container">
            <button 
              type="button" 
              className="dropdown-toggle-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Account & Cart {cartItemCount > 0 ? `(${cartItemCount})` : ''} {isDropdownOpen ? '▲' : '▼'}
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/cart" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                  Shopping Cart ({cartItemCount})
                </Link>

                <div className="dropdown-divider"></div>

                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                      My Profile ({user?.fullName ? user.fullName.split(' ')[0] : 'User'})
                    </Link>
                    <button type="button" className="dropdown-link logout-option" onClick={handleLogout}>
                      Logout Account
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                      Login to Account
                    </Link>
                    <Link to="/register" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                      Register New Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          type="button" 
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSearch} className="mobile-search-form">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>

          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/product" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/service" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Cart ({cartItemCount})</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <button type="button" className="mobile-logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="mobile-auth-row">
              <Link to="/login" className="login-btn text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="register-btn text-center" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
