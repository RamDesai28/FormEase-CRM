import React from 'react';

const NewUserForm = ({ formData, handleChange, handleSubmit, editMode, editUserId }) => {
  return (
    <div className="card">
      <h2 className="form-header">{editMode ? 'Edit User' : 'New User Registration'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="full-width">
          <label>Sr No: </label>
          <input type="text" value={editMode ? editUserId : 'Auto Generated'} disabled />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="full-width">
          <label>Meeting Details: </label>
          <textarea
            name="meetingDetails"
            value={formData.meetingDetails}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Follow Up Date and Time: </label>
          <input
            type="datetime-local"
            name="followUpDateTime"
            value={formData.followUpDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">{editMode ? 'Update User' : 'Register User'}</button>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
