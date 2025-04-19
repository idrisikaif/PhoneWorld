const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kaifkaif1',
    database: 'registered'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Registration Route
app.post('/register', async (req, res) => {
    try {
        const { fullName, mobileNumber, email, dob, gender, password } = req.body;

        // Validation
        if (!fullName || !mobileNumber || !email || !dob || !gender || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        db.query('SELECT * FROM regis WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: 'An error occurred. Please try again.' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            const newUser = { fullName, mobileNumber, email, dob, gender, password: hashedPassword };
            db.query('INSERT INTO regis SET ?', newUser, (err) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).json({ message: 'An error occurred. Please try again.' });
                }
                res.status(201).json({ message: 'Registration successful' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Query to find user by email
    db.query('SELECT * FROM regis WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            console.log('No user found with the provided email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Set JWT Token in cookie
        res.cookie('token', token, { httpOnly: true, secure: false }); // secure: true for HTTPS
        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email }
        });
    });
});

// Profile Route
app.get('/profile', authenticateToken, (req, res) => {
    const { email } = req.user;
    
    db.query('SELECT * FROM regis WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(results[0]);
    });
});

// Logout Route
app.post('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the cookie
    res.status(200).json({ message: 'Logged out successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});