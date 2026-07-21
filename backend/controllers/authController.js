const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 3600000
});

// Register User (with Auto-Login)
const registerUser = async (req, res) => {
  try {
    const { fullName, mobileNumber, email, dob, gender, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      mobileNumber,
      email: email.toLowerCase(),
      dob,
      gender,
      password: hashedPassword
    });

    await newUser.save();

    // Auto-Login: Generate JWT Token and set HTTP-Only Cookie
    const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, getCookieOptions());

    return res.status(201).json({
      message: 'Registration successful! Logged in automatically.',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
        dob: newUser.dob,
        gender: newUser.gender
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Internal server error during registration' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email address or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email address or password' });
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
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal server error during login' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({ message: 'Internal server error fetching profile' });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (token) {
      await TokenBlacklist.create({ token });
    }

    res.clearCookie('token', getCookieOptions());
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({ message: 'Internal server error during logout' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
};
