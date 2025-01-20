import React from 'react';
import './Navbar.css'; // Importing CSS for Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        MyLogo
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
