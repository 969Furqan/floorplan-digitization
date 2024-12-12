import React, { useState } from 'react';
import './Account.css';
import defaultUser from '../../assets/default-user.svg'; // Import the default user SVG

const Account = () => {
  const [accountDetails, setAccountDetails] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
  });

  const [floorPlanPrefs, setFloorPlanPrefs] = useState({
    metric: 'Imperial',
    gridSize: '1ft',
  });

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveDetails = () => {
    // Logic to save account details
    alert('Account details saved!');
  };

  const handleMetricChange = (e) => {
    setFloorPlanPrefs((prev) => ({ ...prev, metric: e.target.value }));
  };

  return (
    <div className="account-container">
      <div className="profile-section">
        <img src={defaultUser} alt="User Profile" className="profile-picture" />
        <h1>Account Settings</h1>
      </div>

      <div className="horizontal-layout">
        <section className="account-details section">
          <h2>Change Account Details</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={accountDetails.username}
              onChange={handleChangeDetails}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={accountDetails.email}
              onChange={handleChangeDetails}
            />
          </label>
          <button onClick={handleSaveDetails}>Save Changes</button>
        </section>

        <section className="floorplan-preferences section">
          <h2>Floor Plan Preferences</h2>
          <p>What metric do you prefer for your floor plans?</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Imperial"
                checked={floorPlanPrefs.metric === 'Imperial'}
                onChange={handleMetricChange}
              />
              Imperial
            </label>
            <label>
              <input
                type="radio"
                value="Metric"
                checked={floorPlanPrefs.metric === 'Metric'}
                onChange={handleMetricChange}
              />
              Metric
            </label>
          </div>
          <label>
            Grid Size:
            <input
              type="text"
              value={floorPlanPrefs.gridSize}
              onChange={(e) =>
                setFloorPlanPrefs((prev) => ({ ...prev, gridSize: e.target.value }))
              }
            />
          </label>
        </section>
      </div>

      <section className="more-functions section">
        <h2>More Functions</h2>
        <button onClick={() => alert('Functionality coming soon!')}>
          Additional Settings
        </button>
      </section>
    </div>
  );
};

export default Account; 