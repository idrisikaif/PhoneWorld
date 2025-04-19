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
      <div className="ho">
        <Container className="mt-4">
          <Row className="text-center">
            <Col>
              <h1>"Discover the Future with Kaif Phones"</h1>
              <h5>
                "Explore our wide range of smartphones and experience
                unparalleled customer service"
              </h5>
            </Col>
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <h2>Featured Phones</h2>
              <ul className="list-unstyled">
                <li>
                  <h5>Latest Models</h5>
                </li>
                <li>
                  <h5>Advanced Features</h5>
                </li>
                <li>
                  <h5>Exclusive Deals</h5>
                </li>
              </ul>
              <h2>Explore Our Collection</h2>
              <Row className="g-4">
                <Col md={4} className="bg-yellow">
                  <img src={home1} alt="homeimage" className="img-fluid" />
                </Col>
                <Col md={4} className="bg-yellow">
                  <img src={home2} alt="homeimage" className="img-fluid" />
                </Col>
                <Col md={4} className="bg-yellow">
                  <img src={home3} alt="homeimage" className="img-fluid" />
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
