const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 3600000 // 1 hour
    };
};

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, dob, gender, password } = req.body;

        if (!fullName || !mobileNumber || !email || !dob || !gender || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            mobileNumber,
            email: email.toLowerCase(),
            dob,
            gender,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: 'Registration successful' });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'An internal server error occurred' });
    }
};

// @desc    Login user & get token cookie
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, getCookieOptions());
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                dob: user.dob,
                gender: user.gender
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc    Get user profile
// @route   GET /profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc    Logout user & blacklist JWT token
// @route   POST /logout
// @access  Public
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (token) {
            const decoded = jwt.decode(token);
            if (decoded && decoded.exp) {
                const expiresAt = new Date(decoded.exp * 1000);
                await TokenBlacklist.create({ token, expiresAt }).catch(err => {
                    // Ignore duplicate key errors if token is already blacklisted
                    if (err.code !== 11000) console.error('Blacklist create error:', err);
                });
            }
        }

        res.clearCookie('token', getCookieOptions());
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.clearCookie('token', getCookieOptions());
        return res.status(200).json({ message: 'Logged out successfully' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};
