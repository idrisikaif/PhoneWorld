import React from "react";
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import Navy from "./Navy";
import Card from './Card'; 
import sumsung from './image/s24ultrapro.jpg';
import iphone from './image/Iphone.jpg';
import oneplus from './image/1plus12.jpg';
import case1 from './image/caseiphone14.jpg';
import case2 from './image/caseiphone13pro.jpg';
import case3 from './image/case.jpg';
import charger1 from './image/asschargeer.jpg';
import airpods from './image/airpods.jpg';
import watch from './image/watch.jpg'

const ProductPage = () => {
  return (
    <>
      <Navy />
      <div className="product py-4">
        <Container>
          <h2 className="mb-4">Newly Launched</h2>
          
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <Card 
                title="Samsung S24 Ultra" 
                imageUrl={sumsung}
                price={129999}
                description={<>Processor: Snapdragon 8 Gen 2. RAM: 16GB. Battery: 5000mAh.</>}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card 
                title="iPhone 15 Pro" 
                imageUrl={iphone}
                price={134900}
                description={<>Processor: A17 Bionic chip. RAM: 6GB. OS: iOS 17.</>}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card 
                title="OnePlus 12" 
                imageUrl={oneplus} 
                price={60174}
                description={<>Processor: Snapdragon 8 Gen 2. Charging: 100W SuperVOOC.</>}
              />
            </Col>
          </Row>

          <h2 className="my-5">Case and Cover</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <Card title="iphone 14 cover" imageUrl={case1} price={450} description={<>Clear Case with MagSafe.</>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card title="iphone 13 pro cover" imageUrl={case2} price={500} description={<>Premium black leather case.</>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card title="iphone x covers" imageUrl={case3} price={350} description={<>Superior protection and style.</>} />
            </Col>
          </Row>

          <h2 className="my-5">Accessories</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} md={4}>
              <Card title="Samsung Fast Charger" imageUrl={charger1} price={1500} description={<>Reliable fast charging.</>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card title="AirPods Pro" imageUrl={airpods} price={1700} description={<>Wireless earbuds with noise cancellation.</>} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card title="iwatch" imageUrl={watch} price={89900} description={<>Titanium case with 36 hours battery life.</>} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductPage;