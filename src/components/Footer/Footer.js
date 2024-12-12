import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <a href="/">Home</a>
          <a href="/Projects">Projects</a>
          <a href="/About">Pricing</a>
          <a href="/Account">Account</a>
          <a href="/Help">Help</a>
          <a href="/Canvas">Canvas</a>
        </div>
        <div className="footer-column">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://linkedin.com">LinkedIn</a>
        </div>
        <div className="footer-column query-column">
            <p>Have questions? Reach out at{' '}</p>    
            <a href="mailto:support@floorplandesign.com">support@floorplandesign.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 