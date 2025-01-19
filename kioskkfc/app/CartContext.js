"use client";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    const newTotal = updatedCart.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    const newTotal = updatedCart.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
