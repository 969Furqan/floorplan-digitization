import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DownArrowIcon } from '../../assets/dropdown-arrow.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';


const Home = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState({});
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

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
        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <SearchIcon className="search-icon" />
        </div>
      </section>

      {/* Card Layout Section */}
      <div className="card-layout">
        {/* Recent Projects */}
        <div className="card wide-card" id="recent-projects">
          <h2>Recent Projects</h2>
          <div className="project-list-table" ref={dropdownRef}>
            {projects.map((project) => (
              <div key={project.id} className="table-row" onClick={() => toggleDropdown(project.id)} >
                <div 
                  className="filename clickable" 
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.filename}
                </div>
                <div className="modified">last modified: {project.modifiedAt}</div>
                <div className="actions">
                  <div className="dropdown">
                    <DownArrowIcon 
                      className="dropdown-toggle" 
                    />
                    {openDropdown[project.id] && ( // Show dropdown if open
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
      </div>
    </div>
  );
};

export default Home; 