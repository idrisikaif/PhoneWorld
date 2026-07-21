import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/css.css';

const ProductCard = ({ imageUrl, title, price, originalPrice, description, badgeText }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ title, price, imageUrl, description });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const formattedPrice = Number(price).toLocaleString('en-IN');
  const formattedOriginalPrice = originalPrice ? Number(originalPrice).toLocaleString('en-IN') : null;

  return (
    <div className="product-card">
      {badgeText && (
        <span className="product-badge">{badgeText}</span>
      )}

      <div className="product-img-container">
        <img src={imageUrl} alt={title} className="product-img" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        
        <div className="price-row">
          <span className="current-price">₹{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="old-price">₹{formattedOriginalPrice}</span>
          )}
        </div>

        <div className="card-btn-group">
          <button 
            type="button" 
            className={isAdded ? "btn-added" : "btn-add-cart"}
            onClick={handleAddToCart}
          >
            {isAdded ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          
          <Link to="/cart" className="btn-view-cart">
            View Cart
          </Link>
        </div>
      </div>

    </div>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  badgeText: PropTypes.string
};

export default ProductCard;
