import React, { useState, useRef, useEffect, useContext } from 'react';
import { Navbar as BsNavbar, Container, Form, FormControl, Button, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/phone2.png';
import '../styles/css.css';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);

    const searchableItems = [
        { name: 'Home', path: '/', category: 'Page' },
        { name: 'Products', path: '/product', category: 'Page' },
        { name: 'About Us', path: '/about', category: 'Page' },
        { name: 'Contact Us', path: '/contact', category: 'Page' },
        { name: 'Services', path: '/service', category: 'Page' },
        { name: 'My Profile', path: '/profile', category: 'Page' },
        { name: 'Shopping Cart', path: '/cart', category: 'Page' },
        { name: 'Samsung S24 Ultra', path: '/product', category: 'Product' },
        { name: 'iPhone 15 Pro', path: '/product', category: 'Product' },
        { name: 'OnePlus 12', path: '/product', category: 'Product' },
        { name: 'iPhone 14 Cover', path: '/product', category: 'Accessory' },
        { name: 'iPhone 13 Pro Cover', path: '/product', category: 'Accessory' },
        { name: 'iPhone X Covers', path: '/product', category: 'Accessory' },
        { name: 'Samsung Fast Charger', path: '/product', category: 'Accessory' },
        { name: 'AirPods Pro', path: '/product', category: 'Accessory' },
        { name: 'iWatch', path: '/product', category: 'Accessory' },
    ];

    const filteredResults = searchableItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(value.trim().length > 0);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            const match = searchableItems.find(item =>
                item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
            if (match) {
                navigate(match.path);
            } else {
                navigate('/product');
            }
            setShowDropdown(false);
        }
    };

    const handleSelectResult = (path) => {
        setSearchTerm('');
        setShowDropdown(false);
        navigate(path);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleLogoutClick = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <BsNavbar className="custom-navbar px-2" expand="lg" sticky="top" variant="dark">
            <Container fluid>
                <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img 
                        src={logo} 
                        className="navbar-logo" 
                        alt="Kaif Phones" 
                        title="Kaif Phones" 
                    />
                </BsNavbar.Brand>
                
                <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <BsNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
                        <Nav.Link as={Link} to="/product" className="px-3">Product</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="px-3">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/service" className="px-3">Service</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
                        {/* Search Bar Container */}
                        <div className="position-relative" ref={searchRef}>
                            <Form className="d-flex search-box" onSubmit={handleSearchSubmit}>
                                <div className="position-relative w-100 me-2">
                                    <FormControl
                                        type="search"
                                        placeholder="Search products..."
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        onFocus={() => searchTerm.trim() && setShowDropdown(true)}
                                        style={{ width: '200px', paddingRight: searchTerm ? '30px' : '12px' }}
                                    />
                                    {searchTerm && (
                                        <button 
                                            type="button" 
                                            className="btn btn-sm text-secondary position-absolute top-50 end-0 translate-middle-y me-1 border-0 bg-transparent p-0 px-1"
                                            onClick={clearSearch}
                                            style={{ zIndex: 5 }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                <Button variant="primary" type="submit" className="d-flex align-items-center gap-1">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <span>Search</span>
                                </Button>
                            </Form>

                            {/* Floating Search Results Dropdown */}
                            {showDropdown && (
                                <div 
                                    className="position-absolute bg-white rounded shadow-lg mt-1 w-100 overflow-hidden" 
                                    style={{ zIndex: 1050, maxHeight: '300px', overflowY: 'auto' }}
                                >
                                    {filteredResults.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {filteredResults.map((item, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-3 text-dark text-start"
                                                    onClick={() => handleSelectResult(item.path)}
                                                >
                                                    <span className="fw-medium">{item.name}</span>
                                                    <span className="badge bg-light text-secondary border">{item.category}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-3 text-center text-muted small">
                                            No results found for "{searchTerm}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Account Dropdown with Auth Integration */}
                        <Dropdown align="end">
                            <Dropdown.Toggle variant={isAuthenticated ? "primary" : "secondary"} id="dropdown-basic">
                                <i className="fa-solid fa-user me-1"></i>
                                {isAuthenticated ? (user?.fullName ? user.fullName.split(' ')[0] : 'Account') : 'Account'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {isAuthenticated ? (
                                    <>
                                        <Dropdown.Item as={Link} to="/profile">
                                            <i className="fa-solid fa-id-card me-2 text-primary"></i>My Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/cart">
                                            <i className="fa-solid fa-cart-shopping me-2 text-success"></i>Cart
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogoutClick} className="text-danger">
                                            <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                                        </Dropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Item as={Link} to="/login">
                                            <i className="fa-solid fa-key me-2 text-primary"></i>Login
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/register">
                                            <i className="fa-solid fa-user-plus me-2 text-success"></i>Register
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to="/cart">
                                            <i className="fa-solid fa-cart-shopping me-2 text-secondary"></i>Cart
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
