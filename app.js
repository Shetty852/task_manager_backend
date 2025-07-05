require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas using .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/tasks', taskRoutes);  //this name is used test in postman like this (http://localhost:5000/api/tasks)

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
