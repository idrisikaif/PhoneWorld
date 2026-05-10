import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navy from "./Navy";

const ServicesPage = () => {
  return (
    <div>
      <Navy />
      <div className="services py-5">
        <Container>
          <h1 className="text-center mb-5 fw-bold">Our Services</h1>
          <Row className="g-4">
            <Col xs={12} md={6}>
              <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-primary border-5">
                <h3 className="mb-3">Phone In Service</h3>
                <p>At Kaif Phones, we understand that sometimes your phone needs a little extra attention. Whether you're experiencing technical difficulties or simply need a repair, our dedicated team is here to help.</p>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-success border-5">
                <h3 className="mb-3">Repair Services</h3>
                <ul className="list-unstyled">
                  <li>✔ Diagnostic and troubleshooting</li>
                  <li>✔ Screen replacement and repair</li>
                  <li>✔ Battery replacement and repair</li>
                  <li>✔ Water damage recovery</li>
                  <li>✔ Software updates</li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-warning border-5">
                <h3 className="mb-3">Benefits of Our Service</h3>
                <ul className="list-unstyled">
                  <li>✔ Quick turnaround times</li>
                  <li>✔ Competitive pricing</li>
                  <li>✔ Genuine parts used</li>
                  <li>✔ Expert technicians</li>
                  <li>✔ Warranty on all repairs</li>
                </ul>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-info border-5">
                <h3 className="mb-3">Frequently Asked Questions</h3>
                <strong>Q: How long does a repair take?</strong>
                <p>A: Most repairs take 24-48 hours.</p>
                <strong>Q: Do you use genuine parts?</strong>
                <p>A: Yes, we only use genuine parts for quality.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ServicesPage;