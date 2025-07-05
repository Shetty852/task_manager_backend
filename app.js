require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors({
  origin: 'https://task-manager-gtinjccv4-rohans-projects-845bc57f.vercel.app', // replace this with your actual deployed frontend URL
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/tasks', taskRoutes);

// ✅ Correct Port for Render (or fallback to 5000 for local testing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
