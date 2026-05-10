import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, title, price, description }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 shadow-sm">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <h5 className="card-price text-primary mb-3">₹{price}</h5>
        <div className="d-grid gap-2 d-md-block">
          <button 
            className="btn btn-primary me-md-2" 
            onClick={() => addToCart({ title, price, imageUrl, description })}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-outline-secondary mt-2 mt-md-0">
            View Cart
          </Link>
        </div>
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