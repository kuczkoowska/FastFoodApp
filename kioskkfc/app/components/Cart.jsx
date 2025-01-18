"use client";
import React, { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  return (
    <>
      <div className="flex flex-col">
        <div>Items: {items}</div>
        <div>Total Price: {totalPrice.toFixed(2)}</div>
      </div>
      <button
        className="bg-orange-500 text-white py-2 px-4 cursor-pointer rounded"
        onClick={() => alert("Proceed to checkout")}
      >
        Checkout
      </button>
    </>
  );
};

export default Cart;
