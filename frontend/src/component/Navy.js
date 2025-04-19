import React, { useState } from 'react';
import { Navbar, Container, Form, FormControl, Button, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './image/phone2.png';
import './css.css'; // Import the custom CSS

function Navy() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'About ', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Service', path: '/service' },
    ];

    // Additional items to include in the search
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
        <Navbar className="custom-navbar" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img src={logo} className="d-inline-block align-top img-fluid" alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {showSearchResults ? (
                            filteredItems.map(item => (
                                <Nav.Link key={item.name} as={Link} to={item.path}>
                                    {item.name}
                                </Nav.Link>
                            ))
                        ) : (
                            navLinks.map(link => (
                                <Nav.Link key={link.name} as={Link} to={link.path}>
                                    {link.name}
                                </Nav.Link>
                            ))
                        )}
                    </Nav>
                    <Form className="d-flex ml-auto">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-light" onClick={() => setShowSearchResults(true)}>Search</Button>
                    </Form>
                    <Dropdown className="ml-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Dropdown
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/cart">Cart</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navy;