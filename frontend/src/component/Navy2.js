import React from 'react'
import logo from './image/phone2.png'


const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href='#'>
          <img src={logo} width="95" height="65" className="d-inline-block align-top" alt="Logo" />
           </a>
           <h1 className="ml-auto mb-0">Kaif Phones</h1>
   
      </nav>
    );
  };
  
  export default Navbar;


