import React, { useState, useEffect } from 'react'; //For Managing state & Data Fetching
import axios from 'axios';  // axios for making HTTP requests
import './App.css';

const AdminPanel = () => {
  //formData hold the value of form 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    meetingDetails: '',
    followUpDateTime: ''
  });
  
  //users:array to store the list of user fetch from server or DB
  const [users, setUsers] = useState([]);

  //Display form or display the data odf saved user
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // make an API call to fetch the list of users using axios.get
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);//updates the users state with the data.
    };
    fetchUsers();
  }, []);
   
  //update the formData state whenever change in input field of form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value //name of the input field and user value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//prevent form submission behavior
    try {
      //sends a POST request to save the form data.
      const response = await axios.post('http://localhost:5000/api/users', formData);
      setUsers([...users, response.data]);
      //reset the form  aftr submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        meetingDetails: '',
        followUpDateTime: ''
      });
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };
  const onSubmitt  = () => {
   alert("Form Submitted")
  };
  

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>ADMIN</h2>
        <ul>
          <li>
            {/* toggle between saved data & form */}
            <a href="#form" onClick={() => setShowUsers(false)}> 
              <span className="icon">📝</span> Form
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => setShowUsers(true)}>
              <span className="icon">📋</span> Saved Users
            </a>
          </li>
        </ul>
      </div>

       {/* Main content  */}
      <div className="content">  
        {/* when click on user it show thwe table data */}
        {/* ternary oprator condition ? expressionIfTrue : expressionIfFalse */}
        {showUsers ? (
          <div className="card saved-users">
            <h2>Saved Users</h2>
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
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  // react require unique key to identify when item change
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.meetingDetails}</td>
                    <td>{new Date(user.followUpDateTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card">
            <h2 className="form-header">FormEase CRM</h2>
            <form onSubmit={handleSubmit}>
              <div className="full-width">
                <label>Sr No: </label>
                <input type="text" value="Auto Generated" disabled />
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
              <button type="submit" onClick={onSubmitt}>Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
