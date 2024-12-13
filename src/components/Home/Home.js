import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import DownArrowIcon from '../../assets/dropdown-arrow.svg';


const Home = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState({});
  const dropdownRef = useRef(null);

  const projects = [
    { id: 1, filename: 'Modern Apartment Renovation', modifiedAt: '2023-10-01' },
    { id: 2, filename: 'Office Space Redesign', modifiedAt: '2023-09-15' },
    { id: 3, filename: 'Cozy Cottage Layout', modifiedAt: '2023-08-20' },
    { id: 4, filename: 'Open Concept Living Area', modifiedAt: '2023-07-30' },
    { id: 5, filename: 'Luxury Villa Floor Plan', modifiedAt: '2023-06-25' },
  ];

  const handleProjectClick = (projectId) => {
    navigate(`/canvas?project=${projectId}`);
  };

  const handleEditProject = (projectId) => {
    navigate(`/canvas?project=${projectId}`);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      console.log(`Project ${projectId} deleted`);
    }
  };

  const toggleDropdown = (projectId) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Transform Your Physical Floor Plans into Digital, Editable Masterpieces</h1>
        <p>Upload, digitize, and edit your floor plans effortlessly with our easy-to-use platform.</p>
        {/* Visual Element (Image or Animation) */}
      </section>

      {/* Card Layout Section */}
      <div className="card-layout">
        {/* First Row */}
        <div className="card wide-card">
          <h2>Why Choose Our Platform?</h2>
          <ul>
            <li>Effortless Uploads: Support for JPEG and PNG formats with instant digitization.</li>
            <li>Smart Editing Tools: Easily move, resize, add, or delete elements like walls, windows, and doors.</li>
            <li>User-Friendly Interface: Intuitive design tailored for both beginners and professionals.</li>
            <li>Fast and Accurate: Leverage cutting-edge image recognition to save time.</li>
            <li>Tailored for Professionals and Homeowners: A solution for architects, designers, real estate agents, and homeowners.</li>
          </ul>
        </div>
        <div className="card less-wide-card">
          <h2>From Paper to Digital in 3 Simple Steps</h2>
          <ol>
            <li>Upload Your Floor Plan: Drag and drop your image, or select from your device.</li>
            <li>Automatic Digitization: Watch as your floor plan is transformed into an editable format.</li>
            <li>Edit and Save: Customize your plan and save your design with ease.</li>
          </ol>
        </div>

        {/* Second Row */}
        <div className="card less-wide-card">
          <h2>Designed for Everyone</h2>
            <p>Homeowners: Create the perfect layout for renovations or new builds.</p>
            <p>Architects & Designers: Simplify your workflow with quick, editable conversions.</p>
            <p>Real Estate Agents: Showcase properties with professionally digitized floor plans.</p>          
        </div>
        <div className="card wide-card" id="recent-projects">
          <h2>Recent Projects</h2>
          <div className="project-list-table" ref={dropdownRef}>
            {projects.map((project) => (
              <div key={project.id} className="table-row">
                <div 
                  className="filename clickable" 
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.filename}
                </div>
                <div className="modified">Last Modified: {project.modifiedAt}</div>
                <div className="actions">
                  <div className="dropdown">
                    <span 
                      className="dropdown-toggle" 
                      onClick={() => toggleDropdown(project.id)}
                    >
                      <img src={DownArrowIcon} alt="Down Arrow" />
                    </span>
                    {openDropdown[project.id] && (
                      <div className="dropdown-menu">
                        <span 
                          className="dropdown-item"
                          onClick={() => handleEditProject(project.id)}
                        >
                          Edit
                        </span>
                        <span 
                          className="dropdown-item"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Delete
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card wide-card">
        <h2>See What Our Users Say</h2>
          <blockquote>
            "This platform saved me hours of work! The digitization process is seamless." - Homeowner
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Home; 