import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewProjectDialog from '../NewProjectDialog/NewProjectDialog';
import projectService from '../../services/projectService';
import './ProjectList.css';

const ProjectList = () => {
  const navigate = useNavigate();
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectList = await projectService.getAllProjects();
      setProjects(projectList);
    } catch (error) {
      console.error('Failed to load projects:', error);
      // You might want to show an error message to the user
    }
  };

  const handleNewProject = () => {
    setShowNewProjectDialog(true);
  };

  const handleNewProjectSubmit = async (filename) => {
    try {
      const newProject = await projectService.createProject(filename);
      setShowNewProjectDialog(false);
      // Navigate to canvas with the new project ID
      navigate(`/canvas?project=${newProject.id}&new=true`);
    } catch (error) {
      console.error('Failed to create project:', error);
      // You might want to show an error message to the user
    }
  };

  const handleEditProject = (projectId) => {
    navigate(`/canvas?project=${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(projectId);
        await loadProjects(); // Reload the projects list
      } catch (error) {
        console.error('Failed to delete project:', error);
        // You might want to show an error message to the user
      }
    }
  };

  const handleExportProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    const dataStr = JSON.stringify(project, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format date to local string (only return date)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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
        <h1>Projects</h1>
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
          <div className="actions">Actions</div>
        </div>
        
        {projects.map((project) => (
          <div key={project.id} className="table-row" id="project-list-row">
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
              <button 
                className="action-btn export"
                onClick={() => handleExportProject(project.id)}
              >
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNewProjectDialog && (
        <NewProjectDialog
          onClose={() => setShowNewProjectDialog(false)}
          onSubmit={handleNewProjectSubmit}
        />
      )}
    </div>
  );
};

export default ProjectList; 