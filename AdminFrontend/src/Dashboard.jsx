
import React, { useState } from 'react';
import './Dashboard.css';

const Modal = ({ isOpen, onClose, todayFollowUps }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Today's Follow-ups ({todayFollowUps.length})</h3>
        <ul>
          {todayFollowUps.map((user, index) => (
            <li key={index}>
              {index + 1}. Name: {user.name}, Phone: {user.phone}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Dashboard = ({ users, showUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayFollowUps, setTodayFollowUps] = useState([]);

  const handleFollowUpClick = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayFollowUpsList = users.filter(
      (user) => new Date(user.followUpDateTime).toISOString().split('T')[0] === today
    );
    
    setTodayFollowUps(todayFollowUpsList);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayFollowUpsCount = users.filter(
    (user) => new Date(user.followUpDateTime).toISOString().split('T')[0] === today
  ).length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-boxes">
        <div className="card" onClick={showUsers}>
          <h3>Number of Customers</h3>
          <p>{users.length}</p>
        </div>
        <div className="card" onClick={handleFollowUpClick}>
          <h3>Today's Follow-up Date Reminder</h3>
          <p>{todayFollowUpsCount} follow-ups today</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todayFollowUps={todayFollowUps}
      />
    </div>
  );
};

export default Dashboard;

