import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling
import SocialLoginButtons from '../SocialLoginButtons/SocialLoginButtons'; // Import the new component
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Proceed with form submission
    }
  };

  return (
    <div className="card-container">
      <div className="signup-card">
        <h1 className="signup-logo">Floorplan Digitization</h1>
        <p>Create your account to get started.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm Password*</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="signup-button">Create Account</button>
        </form>
        
        <div className="login-prompt">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">Sign in to your account</Link>
        </div>

        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default Signup; 
