import React, { useState } from 'react';
import { Navbar as BsNavbar, Container, Form, FormControl, Button, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/image/phone2.png';
import '../styles/css.css';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Service', path: '/service' },
    ];

    const extraSearchItems = [
        { name: 'Profile', path: '/profile' },
        { name: 'Cart', path: '/cart' },
        { name: 'Register', path: '/register' },
        { name: 'Login', path: '/login' },
    ];

    const allItems = [...navLinks, ...extraSearchItems];
    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSearchResults(e.target.value !== '');
    };

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
                        {(showSearchResults ? filteredItems : navLinks).map(link => (
                            <Nav.Link key={link.name} as={Link} to={link.path} className="px-3">
                                {link.name}
                            </Nav.Link>
                        ))}
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
                        <Form className="d-flex search-box">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ width: '180px' }} 
                            />
                            <Button variant="outline-light" onClick={() => setShowSearchResults(true)}>Search</Button>
                        </Form>

                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Account
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/cart">Cart</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
