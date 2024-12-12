import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Transform Your Physical Floor Plans into Digital, Editable Masterpieces</h1>
        <p>Upload, digitize, and edit your floor plans effortlessly with our easy-to-use platform.</p>
        {/* Visual Element (Image or Animation) */}
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <ul>
          <li>Effortless Uploads: Support for JPEG and PNG formats with instant digitization.</li>
          <li>Smart Editing Tools: Easily move, resize, add, or delete elements like walls, windows, and doors.</li>
          <li>User-Friendly Interface: Intuitive design tailored for both beginners and professionals.</li>
          <li>Fast and Accurate: Leverage cutting-edge image recognition to save time.</li>
          <li>Tailored for Professionals and Homeowners: A solution for architects, designers, real estate agents, and homeowners.</li>
        </ul>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>From Paper to Digital in 3 Simple Steps</h2>
        <ol>
          <li>Upload Your Floor Plan: Drag and drop your image, or select from your device.</li>
          <li>Automatic Digitization: Watch as your floor plan is transformed into an editable format.</li>
          <li>Edit and Save: Customize your plan and save your design with ease.</li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>See What Our Users Say</h2>
        <blockquote>
          "This platform saved me hours of work! The digitization process is seamless." - Homeowner
        </blockquote>
        {/* Visual examples of before-and-after transformations can be added here */}
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Designed for Everyone</h2>
        <p>Homeowners: Create the perfect layout for renovations or new builds.</p>
        <p>Architects & Designers: Simplify your workflow with quick, editable conversions.</p>
        <p>Real Estate Agents: Showcase properties with professionally digitized floor plans.</p>
      </section>

      
    </div>
  );
};

export default Home; 