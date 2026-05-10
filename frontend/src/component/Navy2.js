import React from 'react'
import logo from './image/phone2.png'

const Navbar2 = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img 
                src={logo} 
                width="70" 
                height="auto" 
                className="d-inline-block align-top img-fluid" 
                alt="Logo" 
            />
            
          </a>
          <h5 className="mb-0 d-inline-block d-sm-none fw-bold">Kaif Phones</h5>
          
          <div className="d-flex">
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar2;