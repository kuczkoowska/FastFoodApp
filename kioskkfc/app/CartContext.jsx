"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    calculateTotal(cartItems);
  }, [cartItems]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const addToCart = (orderDetails) => {
    setCartItems((prev) => [...prev, orderDetails]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
