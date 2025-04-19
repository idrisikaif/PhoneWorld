import React from 'react';
import Navy from './Navy';


const AboutPage = () => {
  return (
    <div>
      <Navy />
      <div className='about'>
      <div className="my-5">
        <h1 className="text-center">About Kaif Phones</h1>
        <div className="mt-4">
          <h2>Mission Statement</h2>
          <p>At Kaif Phones, our mission is to offer a comprehensive range of phones and accessories, delivering exceptional quality and value to our customers. We are dedicated to enhancing your mobile experience with innovative products and outstanding service.</p>
        </div>
        <div className="mt-4">
          <h2>History</h2>
          <p>Founded in 2018, Kaif Phones has quickly established itself as a leader in the phone and accessory industry. Our journey began with a simple goal: to provide high-quality mobile devices and accessories that cater to the diverse needs of our customers. Over the years, we have grown from a small startup into a prominent player in the market, thanks to our unwavering commitment to excellence.</p>
          <p>Our initial focus was on offering a carefully curated selection of phones from leading brands. As we gained traction, we expanded our product range to include a variety of accessories, such as cases, chargers, and screen protectors, ensuring that our customers could find everything they needed in one place.</p>
        </div>
        <div className="mt-4">
          <h2>Values</h2>
          <p>At Kaif Phones, our core values guide everything we do:</p>
          <ul>
            <li><strong>Customer-Centricity:</strong> We prioritize our customers' needs and strive to exceed their expectations with every interaction.</li>
            <li><strong>Quality:</strong> We are committed to offering products that meet the highest standards of quality and durability.</li>
            <li><strong>Innovation:</strong> We embrace new technologies and innovative solutions to enhance our products and services.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h2>Awards and Recognition</h2>
          <p>Our dedication to excellence has been recognized by various industry awards and accolades:</p>
          <ul>
            <li><strong>Best Mobile Accessory Retailer 2022:</strong> Awarded by the Mobile Tech Association for our exceptional range of phone accessories and customer service.</li>
            <li><strong>Top Emerging Brand 2021:</strong> Recognized by the Tech Innovators Group for our rapid growth and innovative approach in the mobile industry.</li>
            <li><strong>Customer Satisfaction Excellence 2020:</strong> Received the Customer Choice Award for outstanding customer satisfaction and support.</li>
          </ul>
          <p>We are proud of these achievements and continue to strive for excellence in all that we do.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutPage;
