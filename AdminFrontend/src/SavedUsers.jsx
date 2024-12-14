import React, { useState } from 'react';
import './SavedUsers.css';

const SavedUsers = ({ users, handleEdit, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase()
    .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="saved-users card">
      <h2>Saved Users</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => 
          setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Meeting Details</th>
            <th>Follow-up Date and Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.meetingDetails}</td>
                <td>{new Date(user.followUpDateTime).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedUsers;
