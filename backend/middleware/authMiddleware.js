const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Authentication token required' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await TokenBlacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token has been revoked/blacklisted' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ message: 'Internal authentication error' });
    }
};

module.exports = { authenticateToken };
