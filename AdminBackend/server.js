// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware cors used for communication between fronted and backend
app.use(cors());
app.use(bodyParser.json());// pars incoming request

// Routes
app.use('/api/users', userRoutes); //all req handle by userRoute

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
