import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/phone2.png';
import '../styles/css.css';

function NavbarSimple() {
    return (
        <header className="custom-navbar">
            <div className="container flex align-center justify-between">
                <Link to="/" className="flex align-center">
                    <img src={logo} className="navbar-logo" alt="Kaif Phones" title="Kaif Phones" />
                </Link>

                <Link to="/" className="btn btn-outline-primary btn-sm flex align-center gap-1 text-white">
                    <i className="fa-solid fa-house"></i>
                    <span>Back to Home</span>
                </Link>
            </div>
        </header>
    );
}

export default NavbarSimple;
