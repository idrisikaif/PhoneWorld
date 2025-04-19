import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, title, price, description }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <h5 className="card-price">₹{price}</h5>
        <button className="btn btn-primary" onClick={() => addToCart({ title, price, imageUrl, description })}>Add to Cart</button>
        <Link to="/cart" className="btn btn-light ml-2">
          View Cart
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired, 
};

export default Card;
