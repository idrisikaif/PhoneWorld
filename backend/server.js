require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// API Routes
app.use('/', authRoutes);

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend server is running smoothly' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});