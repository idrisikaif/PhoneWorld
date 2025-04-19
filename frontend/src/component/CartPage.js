import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                <div className="row">
                  <div className="col-md-3">
                    <img src={item.imageUrl} alt={item.title} className="img-fluid" />
                  </div>
                  <div className="col-md-9">
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-right">Total: ₹{calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
