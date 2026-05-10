import React from 'react';
import Navy from './Navy';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const locationUrl = 'https://www.google.com/maps?q=gaibi+nagar+near+norani+masjid+bhiwandi'; 
  return (
    <div>
      <Navy />
      <div className='contact py-5'>
        <Container>
          <h1 className="mb-5 text-center fw-bold">Contact Us</h1>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="bg-white p-4 rounded shadow-sm">
              <div className="mb-4">
                <h4 className="text-primary"><i className="fa-solid fa-envelope me-2"></i>Email:</h4>
                <p className="ms-4 ps-2">
                  <Link to="mailto:idrisikaif8898@gmail.com" className="text-decoration-none">idrisikaif8898@gmail.com</Link>
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-primary"><i className="fa-solid fa-phone me-2"></i>Phone:</h4>
                <p className="ms-4 ps-2">
                  <Link to="tel:+9226012635" className="text-decoration-none">(+91) 9226012635</Link>
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-primary"><i className="fa-solid fa-location-dot me-2"></i>Location:</h4>
                <p className="ms-4 ps-2">
                  <Link to={locationUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                    Gaibi Nagar, Near Noorani Masjid, Bhiwandi
                  </Link>
                </p>
              </div>
              
              <div className="mb-2">
                <h4 className="text-primary"><i className="fa-brands fa-instagram me-2"></i>Instagram:</h4>
                <p className="ms-4 ps-2">
                  <Link to="https://www.instagram.com/i_kaif86" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                    @i_kaif86
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ContactPage;