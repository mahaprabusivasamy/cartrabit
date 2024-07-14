const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cronJobs = require('./utils/cronJobs');
const cors = require('cors');
const bodyParser= require('body-parser');

const app = express();

// Connect Database
connectDB();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Init Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;
