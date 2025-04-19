import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css.css';
import Navbar from './Navy2';
import axios from 'axios';

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

  const [errors, setErrors] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

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

  const [isFormValid, setIsFormValid] = useState(false);
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

  useEffect(() => {
    let errors = {};
    let isValid = true;

    if (touched.fullName && (formData.fullName.trim() === '' || formData.fullName.length < 2)) {
      errors.fullName = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (touched.mobileNumber && formData.mobileNumber.length < 10) {
      errors.mobileNumber = 'Mobile Number must be a valid 10-digit number';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (touched.dob && !formData.dob) {
      errors.dob = 'Date of Birth is required';
      isValid = false;
    }

    if (touched.gender && !formData.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    if (touched.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (touched.confirmPassword && formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (touched.terms && !formData.terms) {
      errors.terms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(errors);
    setIsFormValid(isValid);
  }, [formData, touched]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
        try {
            const formattedDate = formData.dob ? formData.dob.toISOString().split('T')[0] : null;
            const dataToSend = { ...formData, dob: formattedDate };

            const response = await axios.post('http://localhost:5000/register', dataToSend);

            setSubmissionMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setSubmissionMessage(error.response.data.message); // Display server error message
            } else {
                setSubmissionMessage('An error occurred. Please try again.');
            }
        }
    } else {
        setSubmissionMessage('Form is incomplete.');
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
    setErrors({
      fullName: '',
      mobileNumber: '',
      email: '',
      dob: '',
      gender: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
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
      <Navbar />
      <div className="register" >
        <div className="p-4  bg-grey" style={{ maxWidth: '600px', margin: '30px auto' }}>
          <h2 className="textregis">Registration Page</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="text" className="form-control" name="fullName" placeholder='Enter Your Full Name' value={formData.fullName} onChange={handleChange} />
              {touched.fullName && errors.fullName && <span className="texterror">{errors.fullName}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="text" className="form-control" name="mobileNumber" placeholder='Enter Your Mobile Number'  value={formData.mobileNumber} onChange={handleChange} />
              {touched.mobileNumber && errors.mobileNumber && <span className="texterror">{errors.mobileNumber}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="email"  required className="form-control" name="email" placeholder='Enter Your Email' value={formData.email} onChange={handleChange} />
              {touched.email && errors.email && <span className="texterror">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showYearDropdown
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                placeholderText="Select your date of birth"
                className="form-control"/>
              {touched.dob && errors.dob && <span className="texterror">{errors.dob}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <select className="form-select" name="gender" placeholder='Gender' value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {touched.gender && errors.gender && <span className="texterror">{errors.gender}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="password" className="form-control" name="password" placeholder='Enter Your Password' value={formData.password} onChange={handleChange} />
              {touched.password && errors.password && <span className="texterror">{errors.password}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="password" className="form-control" name="confirmPassword" placeholder='ConfirmPassword' value={formData.confirmPassword} onChange={handleChange} />
              {touched.confirmPassword && errors.confirmPassword && <span className="texterror">{errors.confirmPassword}</span>}
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" required className="form-check-input" name="terms" checked={formData.terms} onChange={handleChange} />
              <label className="form-check-label">
                I agree to the terms and conditions
              </label>
              {touched.terms && errors.terms && <span className="texterror">{errors.terms}</span>}
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
            {submissionMessage && <div className="alert alert-info mt-3">{submissionMessage}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
