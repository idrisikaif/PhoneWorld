import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/css.css';
import NavbarSimple from '../components/NavbarSimple';
import axios from 'axios';
import API_URL from '../api/config';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    dob: null,
    gender: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    fullName: false,
    mobileNumber: false,
    email: false,
    dob: false,
    gender: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'fullName') {
      setFormData({
        ...formData,
        [name]: value.replace(/[^a-zA-Z ]/g, ''),
      });
    } else if (name === 'mobileNumber') {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9]/g, ''),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
    setTouched({
      ...touched,
      dob: true,
    });
  };

  const validateForm = (data, isTouched) => {
    let errs = {};
    let isValid = true;

    if (isTouched.fullName && (!data.fullName || data.fullName.trim() === '' || data.fullName.length < 2)) {
      errs.fullName = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (isTouched.mobileNumber && (!data.mobileNumber || data.mobileNumber.length < 10)) {
      errs.mobileNumber = 'Mobile Number must be a valid 10-digit number';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isTouched.email && (!data.email || !emailRegex.test(data.email))) {
      errs.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (isTouched.dob && !data.dob) {
      errs.dob = 'Date of Birth is required';
      isValid = false;
    }

    if (isTouched.gender && !data.gender) {
      errs.gender = 'Gender is required';
      isValid = false;
    }

    if (isTouched.password && (!data.password || data.password.length < 6)) {
      errs.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (isTouched.confirmPassword && (!data.confirmPassword || data.confirmPassword !== data.password)) {
      errs.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (isTouched.terms && !data.terms) {
      errs.terms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(errs);
    return isValid;
  };

  useEffect(() => {
    validateForm(formData, touched);
  }, [formData, touched]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const allTouched = {
      fullName: true,
      mobileNumber: true,
      email: true,
      dob: true,
      gender: true,
      password: true,
      confirmPassword: true,
      terms: true,
    };
    setTouched(allTouched);

    const isValid = validateForm(formData, allTouched);

    if (isValid) {
      setIsLoading(true);
      setSubmissionMessage('');
      try {
        const formattedDate = formData.dob ? formData.dob.toISOString().split('T')[0] : null;
        const dataToSend = { ...formData, dob: formattedDate };

        const response = await axios.post(`${API_URL}/register`, dataToSend);

        setSubmissionMessage(response.data.message);
        setTimeout(() => {
          navigate('/login', { state: { registered: true, message: 'Registration successful! Please log in.' } });
        }, 1000);
      } catch (error) {
        if (error.response && error.response.data) {
          setSubmissionMessage(error.response.data.message);
        } else {
          setSubmissionMessage('An error occurred during registration. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setSubmissionMessage('Please complete all required fields correctly.');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      dob: null,
      gender: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
    setErrors({});
    setTouched({
      fullName: false,
      mobileNumber: false,
      email: false,
      dob: false,
      gender: false,
      password: false,
      confirmPassword: false,
      terms: false,
    });
    setSubmissionMessage('');
  };

  return (
    <>
      <NavbarSimple />
      <div className="register py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="p-4 bg-grey rounded shadow-sm login-container">
                <h2 className="textregis mb-4">Registration Page</h2>
                <form onSubmit={handleSubmit} autoComplete='off'>
                  <div className="mb-3">
                    <input type="text" className="form-control" name="fullName" placeholder='Enter Your Full Name' value={formData.fullName} onChange={handleChange} />
                    {touched.fullName && errors.fullName && <span className="texterror">{errors.fullName}</span>}
                  </div>
                  
                  <div className="mb-3">
                    <input type="text" className="form-control" name="mobileNumber" placeholder='Enter Your Mobile Number (10 digits)' value={formData.mobileNumber} onChange={handleChange} maxLength="10" />
                    {touched.mobileNumber && errors.mobileNumber && <span className="texterror">{errors.mobileNumber}</span>}
                  </div>

                  <div className="mb-3">
                    <input type="email" className="form-control" name="email" placeholder='Enter Your Email' value={formData.email} onChange={handleChange} />
                    {touched.email && errors.email && <span className="texterror">{errors.email}</span>}
                  </div>

                  <div className="mb-3">
                    <DatePicker
                      selected={formData.dob}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      maxDate={new Date()}
                      showYearDropdown
                      placeholderText="Select your date of birth"
                      className="form-control w-100" 
                    />
                    {touched.dob && errors.dob && <span className="texterror">{errors.dob}</span>}
                  </div>

                  <div className="mb-3">
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.gender && errors.gender && <span className="texterror">{errors.gender}</span>}
                  </div>

                  <div className="mb-3">
                    <div className="position-relative">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="form-control pe-5" 
                        name="password" 
                        placeholder='Enter Your Password' 
                        value={formData.password} 
                        onChange={handleChange} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-white p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 10, fontSize: '1.2rem', lineHeight: 1 }}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {touched.password && errors.password && <span className="texterror">{errors.password}</span>}
                  </div>

                  <div className="mb-3">
                    <div className="position-relative">
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        className="form-control pe-5" 
                        name="confirmPassword" 
                        placeholder='Confirm Password' 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-white p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ zIndex: 10, fontSize: '1.2rem', lineHeight: 1 }}
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && <span className="texterror">{errors.confirmPassword}</span>}
                  </div>

                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
                    <label className="form-check-label text-white" htmlFor="terms">
                      I agree to the terms and conditions
                    </label>
                    {touched.terms && errors.terms && (
                      <>
                        <br />
                        <span className="texterror">{errors.terms}</span>
                      </>
                    )}
                  </div>

                  <div className="form-actions d-flex gap-2">
                    <button type="submit" className="btn btn-primary flex-grow-1" disabled={isLoading}>
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" className="btn btn-secondary flex-grow-1" onClick={handleCancel} disabled={isLoading}>Cancel</button>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/login" className="text-white text-decoration-underline">Already have an account? Login</Link>
                  </div>

                  {submissionMessage && (
                    <div className={`alert ${submissionMessage.includes('successful') ? 'alert-success' : 'alert-info'} mt-3`}>
                      {submissionMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
