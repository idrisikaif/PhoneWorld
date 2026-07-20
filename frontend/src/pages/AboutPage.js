import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className='about py-5'>
        <Container>
          <h1 className="text-center mb-5 display-4 fw-bold">About Kaif Phones</h1>
          
          <section className="mt-4 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary">Mission Statement</h2>
            <p className="lead">At Kaif Phones, our mission is to offer a comprehensive range of phones and accessories, delivering exceptional quality and value to our customers. We are dedicated to enhancing your mobile experience with innovative products and outstanding service.</p>
          </section>

          <section className="mt-5 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary">History</h2>
            <p>Founded in 2018, Kaif Phones has quickly established itself as a leader in the phone and accessory industry. Our journey began with a simple goal: to provide high-quality mobile devices and accessories that cater to the diverse needs of our customers.</p>
            <p>Over the years, we have grown from a small startup into a prominent player in the market, thanks to our unwavering commitment to excellence. We expanded our product range to include a variety of accessories, ensuring that our customers could find everything they needed in one place.</p>
          </section>

          <section className="mt-5 p-4 bg-white rounded shadow-sm">
            <h2 className="text-primary">Values</h2>
            <p>At Kaif Phones, our core values guide everything we do:</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Customer-Centricity:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
              <li className="list-group-item"><strong>Quality:</strong> We are committed to products that meet the highest standards of durability.</li>
              <li className="list-group-item"><strong>Innovation:</strong> We embrace new technologies to enhance our products and services.</li>
            </ul>
          </section>

          <section className="mt-5 p-4 bg-white rounded shadow-sm mb-4">
            <h2 className="text-primary">Awards and Recognition</h2>
            <p>Our dedication has been recognized by various industry accolades:</p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 border rounded h-100 bg-light">
                  <strong>Best Mobile Accessory Retailer 2022</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100 bg-light">
                  <strong>Top Emerging Brand 2021</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded h-100 bg-light">
                  <strong>Customer Satisfaction Excellence 2020</strong>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;
