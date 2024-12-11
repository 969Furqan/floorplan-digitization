import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.marginLeft = !isOpen ? '240px' : '0';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        navRef.current && 
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        document.body.style.marginLeft = '0';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="navbar-top">
        <button 
          className="hamburger-btn" 
          onClick={toggleMenu}
          ref={hamburgerRef}
        >
          <span className="hamburger-icon">☰</span>
        </button>
        <div className="logo">Floorplan App</div>
        <div className="auth-links">
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        </div>
      </nav>

      <nav 
        className={`navbar-vertical ${isOpen ? 'open' : ''}`}
        ref={navRef}
      >
        <ul className="nav-links-vertical">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/canvas">Canvas</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar; 