import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import NewUserForm from './NewUserForm';
import SavedUsers from './SavedUsers';
import './App.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    meetingDetails: '',
    followUpDateTime: '',
  });

  const [users, setUsers] = useState([]);//used to update the users' state
  const [showUsers, setShowUsers] = useState(false);// whether the Saved Users view is shown or not.
  const [showDashboard, setShowDashboard] = useState(false);//Controls whether the Dashboard is displayed or not.
  const [editMode, setEditMode] = useState(false);//whether the form is in edit mode 
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      console.log('Fetched users:', response.data); // Log the fetched users
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateUser();
      } else {
        await createUser();
      }
      resetForm();
      setShowUsers(true);
      fetchUsers();
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      // Prepend the new user to the beginning of the list
      setUsers((prevUsers) => [response.data, ...prevUsers]);
    } catch (err) {
      console.log("Error while submitting form", err);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${editUserId}`, formData);
      setUsers((prevUsers) => {
        return [response.data, ...prevUsers.filter(user => user._id !== editUserId)];
      });
    } catch (err) {
      console.error('Error updating user', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      meetingDetails: '',
      followUpDateTime: '',
    });
    setEditMode(false);
    setEditUserId(null);
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      meetingDetails: user.meetingDetails,
      followUpDateTime: new Date(user.followUpDateTime).toISOString().slice(0, 16),
    });
    setEditUserId(user._id);
    setEditMode(true);
    setShowUsers(false);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>CRM</h2>
        <ul>
          <li>
            <a href="#dashboard" onClick={() => { setShowDashboard(true); setShowUsers(false); }}>
              <span className="icon">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#form" onClick={() => { setShowDashboard(false); setShowUsers(false); setEditMode(false); }}>
              <span className="icon">New User</span>
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => { setShowDashboard(false); setShowUsers(true); }}>
              <span className="icon">Saved Users</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        {showDashboard ? (
          <Dashboard
            users={users}
            showUsers={() => setShowUsers(true)}
            setShowUsers={setShowUsers}
            setShowDashboard={setShowDashboard}
          />
        ) : showUsers ? (
          <SavedUsers
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <NewUserForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editMode={editMode}
            editUserId={editUserId}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
