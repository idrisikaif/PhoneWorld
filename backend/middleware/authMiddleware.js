const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies && req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { authenticateToken };
