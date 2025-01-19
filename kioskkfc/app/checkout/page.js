"use client";
import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CheckoutPage = () => {
  const { cartItems, totalPrice, updateQuantity } = useContext(CartContext);

  return (
    <>
      <div className="h-screen overflow-y-auto">
        <h1 className="text-gray-800 text-4xl font-bold text-center mt-8 mb-8">
          Your Cart
        </h1>
        <ul className="list-none p-4 mb-20">
          {cartItems.map((order, index) => (
            <li key={index} className="bg-gray-100 mb-2 p-2 rounded shadow-md">
              <p className="text-lg font-bold">{order.item.name}</p>
              <p>{order.item.price * order.quantity}</p>
              <div className="mt-4">
                <label className="block mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(index, Math.max(1, order.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <p className="px-4">{order.quantity}</p>
                  <button
                    onClick={() => updateQuantity(index, order.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="text-sm text-gray-600">
                Options: {order.selectedOptions.extras.join(", ") || "None"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="fixed bottom-0 w-full bg-gray-50 shadow-md p-4">
        <div className="flex justify-between items-center text-white">
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 py-2 px-4 text-lg"
          >
            &lt; Go Back
          </button>
          <button className="bg-green-500 text-white rounded py-5 px-20 text-lg">
            Pay Now {totalPrice.toFixed(2)}
          </button>
        </div>
      </footer>
    </>
  );
};

export default CheckoutPage;
