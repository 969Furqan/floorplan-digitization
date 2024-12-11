import React from 'react';
import './SocialLoginButtons.css'; // Import the CSS file for styling

const SocialLoginButtons = () => {
  const handleGoogleLogin = () => {
    // Add logic for Google login
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // Add logic for Facebook login
    console.log('Facebook login clicked');
  };

  const handleTwitterLogin = () => {
    // Add logic for Twitter login
    console.log('Twitter login clicked');
  };

  return (
    <>
      <div className="divider">
        <span>Sign in with third party</span>
      </div>
      <div className="social-login">
        <div className="social-icon-wrapper" onClick={handleGoogleLogin}>
          <img src={require('../../assets/google-logo.svg').default} alt="Google" className="social-icon" />
        </div>
        <div className="social-icon-wrapper" onClick={handleFacebookLogin}>
          <img src={require('../../assets/facebook-logo.svg').default} alt="Facebook" className="social-icon" />
        </div>
        <div className="social-icon-wrapper" onClick={handleTwitterLogin}>
          <img src={require('../../assets/twitter-logo.svg').default} alt="Twitter" className="social-icon" />
        </div>
      </div>
    </>
  );
};

export default SocialLoginButtons; 
