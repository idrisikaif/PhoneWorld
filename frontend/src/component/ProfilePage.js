import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css.css';
import axios from 'axios';
import Navy from './Navy';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch profile data');
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
      <Navy/>
      
        <div className="pro" >
          <h1 className="card-title">Welcome {user.fullName}</h1>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Mobile Number: {user.mobileNumber}</p>
          <p className="card-text">Date of Birth: {user.dob}</p>
          <p className="card-text">Gender: {user.gender}</p>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
   
    </>
  );
};

export default ProfilePage;