import React from 'react';
import Navy from './Navy';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ContactPage = () => {
  const locationUrl = 'https://www.google.com/maps?q= gaibi nagar near norani masjid bhiwandi '; 
  return (
    <div>
      <Navy />
      <div className='contact'>
      <Container className="mt-5">
        <h1 className="mb-4">Contact Us Through</h1>
            <Row>
              <Col md={6}>
                <h2><i class="fa-solid fa-envelope"></i>Email:</h2>
                <p>
                  <Link to ="mailto:idrisikaif8898@gmail.com">idrisikaif8898@gmail.com</Link>
                </p>
                <h2><i class="fa-solid fa-phone"></i>Phone:</h2>
                <p>
                  <Link to ="tel:+9226012635">(+91) 9226012635</Link>
                </p>
                <h2><i class="fa-solid fa-location-dot"></i>Location:</h2>
                <p>
                  <Link to={locationUrl} target="_blank" rel="noopener noreferrer">
                    gaibi nagar near norani masjid bhiwandi 
                  </Link>
                </p>
                
                <h2><i class="fa-brands fa-instagram"></i>Instagram:</h2>
                
                <p>
                  <Link to="https://www.instagram.com/i_kaif86" target="_blank" rel="noopener noreferrer">
                    @i_kaif86
                  </Link>
                </p>
              </Col>
            </Row>
      </Container>
      </div>
    </div>
  );
};

export default ContactPage;
