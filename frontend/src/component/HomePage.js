import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navy from "./Navy";
import home1 from "./image/home1.jpg";
import home2 from "./image/home2.jpg";
import home3 from "./image/home3.jpg";
const HomePage = () => {
  return (
    <div>
      <Navy />
      <div className="ho py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col xs={12}>
              <h1 className="display-5 fw-bold">"Discover the Future with Kaif Phones"</h1>
              <h5 className="text-muted mt-3">
                "Explore our wide range of smartphones and experience unparalleled customer service"
              </h5>
            </Col>
          </Row>

          <Row className="text-center mt-4">
            <Col xs={12}>
              <h2 className="mb-4">Featured Phones</h2>
              <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 gap-md-5 mb-5">
                <li><h5>Latest Models</h5></li>
                <li><h5>Advanced Features</h5></li>
                <li><h5>Exclusive Deals</h5></li>
              </ul>
              
              <h2 className="mb-4">Explore Our Collection</h2>
              <Row className="g-4">
                <Col xs={12} md={4}>
                  <img src={home1} alt="homeimage" className="img-fluid rounded shadow-sm" />
                </Col>
                <Col xs={12} md={4}>
                  <img src={home2} alt="homeimage" className="img-fluid rounded shadow-sm" />
                </Col>
                <Col xs={12} md={4}>
                  <img src={home3} alt="homeimage" className="img-fluid rounded shadow-sm" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
