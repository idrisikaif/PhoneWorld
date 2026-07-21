const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegistration = (req, res, next) => {
  const { fullName, mobileNumber, email, dob, gender, password } = req.body;

  if (!fullName || !mobileNumber || !email || !dob || !gender || !password) {
    return res.status(400).json({ message: 'All form fields are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (mobileNumber.length < 10) {
    return res.status(400).json({ message: 'Mobile number must be at least 10 digits' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address format' });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};
