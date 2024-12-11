import React, { useState } from 'react';
import './NewProjectDialog.css';

const NewProjectDialog = ({ onClose, onSubmit }) => {
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filename.trim()) {
      setError('Filename is required');
      return;
    }
    onSubmit(filename.trim());
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="filename">Project Name</label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter project name"
              autoFocus
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="dialog-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectDialog;
