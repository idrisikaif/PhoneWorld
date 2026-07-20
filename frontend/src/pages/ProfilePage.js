import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import '../styles/css.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import API_URL from '../api/config';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, setUser: setAuthUser } = useContext(AuthContext);

  const [user, setUser] = useState(() => {
    try {
      const cachedUser = localStorage.getItem('user');
      return cachedUser ? JSON.parse(cachedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(!user);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
        setUser(response.data);
        setAuthUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setError('');
      } catch (error) {
        if (!user) {
          setError('Session expired or authentication failed. Please log in.');
          setAuthUser(null);
          localStorage.removeItem('user');
          setTimeout(() => navigate('/login'), 1500);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <>
      <Navbar />
      <div className="pro py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-primary text-white text-center py-4 bg-gradient">
                  <div 
                    className="rounded-circle bg-white text-primary fw-bold mx-auto mb-3 d-flex align-items-center justify-content-center shadow"
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    {user ? getInitial(user.fullName) : '?'}
                  </div>
                  <h2 className="mb-0 text-white h3">{user ? user.fullName : 'User Profile'}</h2>
                  <Badge bg="light" text="dark" className="mt-2 px-3 py-1 rounded-pill">
                    Verified Customer
                  </Badge>
                </Card.Header>
                
                <Card.Body className="p-4">
                  {isLoading && !user ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="mt-2 text-muted">Loading profile details...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger text-center">{error}</div>
                  ) : user ? (
                    <>
                      <h4 className="text-muted text-center mb-4 small text-uppercase tracking-wider">Account Information</h4>
                      <div className="profile-info space-y-3">
                        <div className="d-flex align-items-center p-3 rounded bg-light mb-3">
                          <i className="fa-solid fa-envelope text-primary fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block">Email Address</small>
                            <span className="fw-semibold">{user.email}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center p-3 rounded bg-light mb-3">
                          <i className="fa-solid fa-phone text-success fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block">Mobile Number</small>
                            <span className="fw-semibold">{user.mobileNumber || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center p-3 rounded bg-light mb-3">
                          <i className="fa-solid fa-calendar-days text-warning fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block">Date of Birth</small>
                            <span className="fw-semibold">{user.dob || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center p-3 rounded bg-light mb-3">
                          <i className="fa-solid fa-venus-mars text-info fs-4 me-3"></i>
                          <div>
                            <small className="text-muted d-block">Gender</small>
                            <span className="fw-semibold">{user.gender || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="row g-2 mt-4">
                        <Col xs={6}>
                          <Link to="/product" className="btn btn-outline-primary w-100 py-2">
                            <i className="fa-solid fa-store me-1"></i> Products
                          </Link>
                        </Col>
                        <Col xs={6}>
                          <Link to="/cart" className="btn btn-outline-secondary w-100 py-2">
                            <i className="fa-solid fa-cart-shopping me-1"></i> Cart
                          </Link>
                        </Col>
                      </div>

                      <div className="d-grid mt-3">
                        <Button variant="danger" size="lg" className="py-2 fw-semibold" onClick={handleLogout}>
                          <i className="fa-solid fa-right-from-bracket me-2"></i> Logout from Account
                        </Button>
                      </div>
                    </>
                  ) : null}
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
