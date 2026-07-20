import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar'; 

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pb-5">
        <h2 className="mb-4">My Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <p className="h4 text-muted">Your cart is empty.</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <ul className="list-group mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item p-3 mb-3 shadow-sm border rounded">
                    <div className="row align-items-center">
                      <div className="col-4 col-md-3">
                        <img src={item.imageUrl} alt={item.title} className="img-fluid rounded" />
                      </div>
                      <div className="col-8 col-md-9">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="mb-1">{item.title}</h5>
                          <button 
                            className="btn btn-outline-danger btn-sm border-0" 
                            onClick={() => removeFromCart(item)}
                          >
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        </div>
                        <div className="text-muted small d-none d-md-block">{item.description}</div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="mb-0"><strong>Qty:</strong> {item.quantity}</p>
                          <p className="mb-0 fw-bold text-success">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-lg-4">
              <div className="card p-4 shadow-sm bg-light">
                <h4>Order Summary</h4>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 fw-bold h5">
                  <span>Total:</span>
                  <span className="text-primary">₹{calculateTotal()}</span>
                </div>
                <button className="btn btn-success btn-lg w-100 mt-2">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
