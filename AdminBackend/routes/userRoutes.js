// routes/userRoutes.js
const express = require('express');
const router = express.Router();//create a new router object
const User = require('../models/User');


// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);  // Send back the saved user
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



//  Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });


// Update an existing user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,  //we access through this or retrives id parameter
      req.body,  //it contain data to update
     
    );
    if (!updatedUser) { //if user not found
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get all users, sorted by creation date (newest first)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });  // Sorting by descending _id to get the latest records first
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;
