require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

// ✅ CORS Configuration - Allows production domain and all Vercel preview domains
const allowedOrigins = [
  'https://task-manager-1tfj440t6-rohans-projects-845bc57f.vercel.app',  // Replace with your final Vercel production domain
  /\.vercel\.app$/                    // Allow all Vercel preview deployments
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman or server-to-server requests
    if (allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

//  Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

//  Routes
app.use('/api/tasks', taskRoutes);

//  Correct Port for Render (or fallback to 5000 for local testing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
