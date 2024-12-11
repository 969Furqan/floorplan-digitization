// Simple in-memory storage for demo purposes
// In production, this should be replaced with actual backend calls
let projects = [];

const projectService = {
  getAllProjects: () => {
    return Promise.resolve(projects);
  },

  createProject: (filename) => {
    const newProject = {
      id: Date.now(),
      filename,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      size: 0,
      owner: 'Current User', // This should come from auth service
      status: 'In Progress',
      canvasState: null
    };
    
    projects = [...projects, newProject];
    return Promise.resolve(newProject);
  },

  saveProjectCanvas: (projectId, canvasState) => {
    projects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          modifiedAt: new Date().toISOString(),
          size: JSON.stringify(canvasState).length, // Approximate size
          canvasState
        };
      }
      return project;
    });
    return Promise.resolve(projects.find(p => p.id === projectId));
  },

  getProject: (projectId) => {
    return Promise.resolve(projects.find(p => p.id === parseInt(projectId)));
  },

  deleteProject: (projectId) => {
    projects = projects.filter(p => p.id !== projectId);
    return Promise.resolve();
  }
};

export default projectService;