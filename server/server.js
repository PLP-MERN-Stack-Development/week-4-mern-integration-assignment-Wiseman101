// // server.js - Main server file for the MERN blog application

// // Import required modules
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// // Import routes
// const postRoutes = require('./routes/posts');
// const categoryRoutes = require('./routes/categories');
// const authRoutes = require('./routes/auth');

// // Load environment variables
// dotenv.config();
// // connectDB();

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Log requests in development mode
// if (process.env.NODE_ENV === 'development') {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   });
// }

// // API routes
// app.use('/api/posts', postRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/auth', authRoutes);

// // Root route
// app.get('/', (req, res) => {
//   res.send('MERN Blog API is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     error: err.message || 'Server Error',
//   });
// });

// // Connect to MongoDB and start server
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Promise Rejection:', err);
//   // Close server & exit process
//   process.exit(1);
// });

// module.exports = app; 


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Route imports (all CommonJS)
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

// Global Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
