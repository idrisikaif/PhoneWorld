import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar";
import ProductCard from '../components/ProductCard'; 
import sumsung from '../assets/image/s24ultrapro.jpg';
import iphone from '../assets/image/Iphone.jpg';
import oneplus from '../assets/image/1plus12.jpg';
import case1 from '../assets/image/caseiphone14.jpg';
import case2 from '../assets/image/caseiphone13pro.jpg';
import case3 from '../assets/image/case.jpg';
import charger1 from '../assets/image/asschargeer.jpg';
import airpods from '../assets/image/airpods.jpg';
import watch from '../assets/image/watch.jpg';

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <div className="product py-4">
        <Container>
          <h2 className="mb-4">Newly Launched</h2>
          
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <ProductCard 
                title="Samsung S24 Ultra" 
                imageUrl={sumsung}
                price={129999}
                description={<p className="mb-0">Processor: Snapdragon 8 Gen 2. RAM: 16GB. Battery: 5000mAh.</p>}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard 
                title="iPhone 15 Pro" 
                imageUrl={iphone}
                price={134900}
                description={<p className="mb-0">Processor: A17 Bionic chip. RAM: 6GB. OS: iOS 17.</p>}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard 
                title="OnePlus 12" 
                imageUrl={oneplus} 
                price={60174}
                description={<p className="mb-0">Processor: Snapdragon 8 Gen 2. Charging: 100W SuperVOOC.</p>}
              />
            </Col>
          </Row>

          <h2 className="my-5">Case and Cover</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="iphone 14 cover" imageUrl={case1} price={450} description={<p className="mb-0">Clear Case with MagSafe.</p>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="iphone 13 pro cover" imageUrl={case2} price={500} description={<p className="mb-0">Premium black leather case.</p>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="iphone x covers" imageUrl={case3} price={350} description={<p className="mb-0">Superior protection and style.</p>} />
            </Col>
          </Row>

          <h2 className="my-5">Accessories</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="Samsung Fast Charger" imageUrl={charger1} price={1500} description={<p className="mb-0">Reliable fast charging.</p>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="AirPods Pro" imageUrl={airpods} price={1700} description={<p className="mb-0">Wireless earbuds with noise cancellation.</p>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ProductCard title="iwatch" imageUrl={watch} price={89900} description={<p className="mb-0">Titanium case with 36 hours battery life.</p>} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductPage;
