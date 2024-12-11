import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import SocialLoginButtons from '../SocialLoginButtons/SocialLoginButtons'; // Reuse the social login component
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    setError(''); // Reset error on submit
  };

  return (
    <div className="card-container">
      <div className="login-card">
        <h1 className="login-logo">Floorplan Digitization</h1>
        <p>Log in to continue to Floorplan Digitization.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
        
        <div className="signup-prompt">
          <p>New to Floorplan?</p>
          <Link to="/signup" className="create-account-btn">Create an Account</Link>
        </div>

        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default Login; 
