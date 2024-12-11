import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects] = useState([
    {
      id: 1,
      filename: 'Office Building',
      createdAt: '2024-03-15T10:30:00',
      modifiedAt: '2024-03-16T14:20:00',
      size: 2048576,
      owner: 'John Doe',
      status: 'In Progress'
    },
    {
      id: 2,
      filename: 'Apartment Complex',
      createdAt: '2024-03-14T09:15:00',
      modifiedAt: '2024-03-14T16:45:00',
      size: 1048576,
      owner: 'John Doe',
      status: 'Completed'
    }
  ]);

  const handleNewProject = () => {
    // Navigate to canvas with a new project ID
    const newProjectId = Date.now(); // Simple way to generate unique ID
    navigate(`/canvas?project=${newProjectId}&new=true`);
  };

  const handleEditProject = (projectId) => {
    // Navigate to canvas with existing project ID
    navigate(`/canvas?project=${projectId}`);
  };

  const handleDeleteProject = (projectId) => {
    // Add delete logic here
    console.log('Delete project:', projectId);
  };

  // Format date to local string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Format file size to human readable format
  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>My Projects</h1>
        <button className="new-project-btn" onClick={handleNewProject}>
          New Project
        </button>
      </div>
      
      <div className="project-list-table">
        <div className="table-header">
          <div className="filename">Filename</div>
          <div className="created">Created</div>
          <div className="modified">Modified</div>
          <div className="size">Size</div>
          <div className="owner">Owner</div>
          <div className="status">Status</div>
          <div className="actions">Actions</div>
        </div>
        
        {projects.map((project) => (
          <div key={project.id} className="table-row">
            <div 
              className="filename clickable" 
              onClick={() => handleEditProject(project.id)}
            >
              {project.filename}
            </div>
            <div className="created">{formatDate(project.createdAt)}</div>
            <div className="modified">{formatDate(project.modifiedAt)}</div>
            <div className="size">{formatFileSize(project.size)}</div>
            <div className="owner">{project.owner}</div>
            <div className="status">
              <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <div className="actions">
              <button 
                className="action-btn edit"
                onClick={() => handleEditProject(project.id)}
              >
                Edit
              </button>
              <button 
                className="action-btn delete"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 