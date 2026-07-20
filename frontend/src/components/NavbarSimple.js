import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/phone2.png';

const NavbarSimple = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
                src={logo} 
                width="70" 
                height="auto" 
                className="d-inline-block align-top img-fluid" 
                alt="Logo" 
            />
          </Link>
          <h5 className="mb-0 d-inline-block d-sm-none fw-bold">Kaif Phones</h5>
        </div>
      </nav>
    );
};
  
export default NavbarSimple;
