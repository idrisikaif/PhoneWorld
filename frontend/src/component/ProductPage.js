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
      <div className="product">
      <Container className="mt-4">
      <h2>Newly Launched</h2>
        <Row>
          <Col md={4}>
            <Card 
              title="Samsung S24 Ultra" 
              imageUrl={sumsung}
              price={129999} // Numeric value
              description=
              {<>
                Display: 6.8-inch Dynamic AMOLED, Quad HD+ (1440 x 3200), 120Hz refresh rate.<br />
                Processor: Qualcomm Snapdragon 8 Gen 2.<br />
                RAM: up to 16GB.<br />
                Storage: up to 512GB.<br />
                Rear Camera: 108MP primary sensor, 40MP front camera.<br />
                Battery: 5000mAh, fast charging support.<br />
                Operating System: Android 13.
                </>}
            />
          </Col>
          <Col md={4}>
            <Card 
              title=" iPhone 15 Pro" 
              imageUrl={iphone }
              price={134900 }
              description={
                <>
               Display: 6.1-inch Super Retina XDR, 120Hz refresh rate.<br/>
               Processor: A17 Bionic chip.<br/>
               RAM: 6GB.<br/>
               Storage: up to 512GB.<br/>
               Rear Camera: 48MP main camera, 12MP front camera.<br/>
               Operating System: iOS 17.<br/>
               Battery: Up to 12 hours internet use, fast charging support.<br/>
                </>
              }
             
            />
          </Col>
          <Col md={4}>
            <Card 
              title=" OnePlus 12 " 
              imageUrl={oneplus } 
              price={60174}
              description={
                <>
                Display: 6.7-inch AMOLED, 120Hz refresh rate.<br/>
                Processor: Snapdragon 8 Gen 2 chip.<br/>
                RAM: up to 16GB.<br/>
                Storage: up to 512GB.<br/>
                Rear Camera: 50MP main camera, 16MP front camera.<br/>
                Battery: Up to 12 hours internet use, 100W SuperVOOC fast charging.<br/>
                Operating System: OxygenOS 13 (based on Android 13).<br/>
                </>
              }
               
            />
          </Col>
        </Row>
        <h2>Case and Cover</h2>
        <Row>
          <Col md={4}>
            <Card 
              title="iphone 14 cover" 
              imageUrl={case1 }
              price={450 }
              description={
                <>
                The iPhone 14 Clear Case with MagSafe is available from Apple
                </>
              }
            />
          </Col>
          <Col md={4}>
            <Card 
              title="iphone 13 pro cover" 
              imageUrl={case2 } 
              price={500}
              description={
                <>
                Protect your iPhone 13 Pro in style with our premium black leather case.
                </>
              }
            />
          </Col>
          <Col md={4}>
            <Card 
              title="iphone x covers" 
              imageUrl={case3 } 
              price={350 }
              description={
                <>
                Explore our collection of iPhone X covers, designed to provide superior protection and showcase your personal style.
                </>
              }
            />
          </Col>
        </Row>
        <h2>Accessories</h2>
        <Row>
          <Col md={4}>
            <Card 
              title="Samsung Fast Charger" 
              imageUrl={charger1}
              price={1500}
              description={
                <>
                Stay powered up on the go with Samsung's range of fast and reliable chargers. 
                
                </>
              }
            />
          </Col>
          <Col md={4}>
            <Card 
              title="AirPods Pro" 
              imageUrl={airpods} 
              price={1700 }
              description={
                <>
                Experience unparalleled sound quality and convenience with AirPods Pro, Apple's latest wireless earbuds.
                </>
              }
            />
          </Col>
          <Col md={4}>
            <Card 
              title="iwatch" 
              imageUrl={watch } 
              price={89900}
              description={
                <>
                Rugged Design: Titanium case and sapphire crystal face for durability<br/>
               Long Battery Life: Up to 36 hours of normal use, up to 60 hours with Low Power Mode.<br/>
                </>
              }
            />
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default ProductPage;