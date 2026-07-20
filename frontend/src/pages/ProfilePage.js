import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/css.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import API_URL from '../api/config';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
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
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!user) return <p className="text-center mt-5">Loading Profile...</p>;

  return (
    <>
      <Navbar />
      <div className="pro py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white text-center py-4">
                  <h2 className="mb-0 text-white">User Profile</h2>
                </Card.Header>
                <Card.Body className="p-4">
                  <h3 className="text-center mb-4">Welcome, {user.fullName}</h3>
                  <div className="profile-info">
                    <p className="border-bottom pb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="border-bottom pb-2"><strong>Mobile:</strong> {user.mobileNumber}</p>
                    <p className="border-bottom pb-2"><strong>DOB:</strong> {user.dob}</p>
                    <p className="border-bottom pb-2"><strong>Gender:</strong> {user.gender}</p>
                  </div>
                  <div className="d-grid mt-4">
                    <Button variant="danger" size="lg" onClick={handleLogout}>
                      Logout from Account
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
