const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.post('/logout', logoutUser);

module.exports = router;
