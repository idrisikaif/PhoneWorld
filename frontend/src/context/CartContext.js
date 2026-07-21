// ====================================================
// SHOPPING CART CONTEXT (frontend/src/context/CartContext.js)
// ====================================================
// This Context manages shopping cart state across all pages:
// - Adding products & increasing quantity
// - Decrementing quantity & deleting items
// - Saving cart state persistently in browser localStorage

import React, { createContext, useState, useEffect } from 'react';

// 1. Create Context Object
export const CartContext = createContext();

// 2. Create Cart Provider Component
export const CartProvider = ({ children }) => {
  // Load saved cart items from localStorage on initial render
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  // Save cart state to localStorage whenever cart items change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add Item to Cart (or increment quantity if already in cart)
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.title === item.title);
      if (existingItem) {
        return prevCart.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Decrement Item Quantity by 1 (removes if quantity reaches 0)
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.title === item.title);
      if (!existingItem) return prevCart;
      
      if (existingItem.quantity === 1) {
        return prevCart.filter((i) => i.title !== item.title);
      } else {
        return prevCart.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  // Delete Item completely from cart
  const deleteFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((i) => i.title !== item.title));
  };

  // Update Item Quantity directly
  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      deleteFromCart(item);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) => (i.title === item.title ? { ...i, quantity: newQuantity } : i))
      );
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
