"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../CartContext";

import Burger from "../../public/foodicons/burger-color-stroke-by-Vexels.svg";
import Chicken from "../../public/foodicons/food-illustration-chicken-by-Vexels.svg";
import Drink from "../../public/foodicons/soda-cute-by-Vexels.svg";
import Wrap from "../../public/foodicons/shawarma-arabic-food-illustration-by-Vexels.svg";
import Fries from "../../public/foodicons/food-french-fries-meal-by-Vexels.svg";
import Bucket from "../../public/foodicons/happy-fried-chicken-bucket-kawaii-by-Vexels.svg";
import Shake from "../../public/foodicons/milkshake-illustration-cup-by-Vexels.svg";
import Coffee from "../../public/foodicons/coffee-drink-illustration-cup-by-Vexels.svg";

const CheckoutPage = () => {
  const { cartItems, totalPrice, updateQuantity, removeItem } =
    useContext(CartContext);

  const router = useRouter();
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    const calculateEstimatedTime = () => {
      const minTime = 2;
      const maxTime = cartItems.length > 5 ? 20 : 15;
      const additionalTime = cartItems.length * 2;
      const randomTime =
        Math.floor(Math.random() * (maxTime - minTime + 1)) +
        minTime +
        additionalTime;
      return `${randomTime} minutes`;
    };

    const timer = setTimeout(() => {
      setEstimatedTime(calculateEstimatedTime());
    }, 900);

    return () => clearTimeout(timer);
  }, [cartItems]);

  const groupedCartItems = cartItems.reduce((groups, item) => {
    const key = JSON.stringify({
      id: item.item.id,
      selectedOptions: item.selectedOptions,
    });
    if (!groups[key]) {
      groups[key] = { ...item, quantity: item.quantity };
    } else {
      groups[key].quantity += item.quantity;
    }
    return groups;
  }, {});

  const groupedItems = Object.values(groupedCartItems);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-gray-800 text-4xl font-bold text-center mt-8 mb-8">
        Your Cart
      </h1>
      <div className="flex-grow overflow-y-auto p-4">
        <ul className="list-none space-y-4">
          {groupedItems.map((order, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {order.item.type === "burger" && <Burger className="w-16 h-16" />}
                {order.item.type === "wrap" && <Wrap className="w-16 h-16" />}
                {order.item.type === "chicken" && <Chicken className="w-16 h-16" />}
                {order.item.type === "drink" && <Drink className="w-16 h-16" />}
                {order.item.type === "fries" && <Fries className="w-16 h-16" />}
                {order.item.type === "bucket" && <Bucket className="w-16 h-16" />}
                {order.item.type === "shake" && <Shake className="w-16 h-16" />}
                {order.item.type === "coffee" && <Coffee className="w-16 h-16" />}
                <div>
                  <p className="text-xl font-semibold">{order.item.name}</p>
                  <p className="text-gray-600">{(order.item.price * order.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Extras: {order.selectedOptions.extras.join(", ") || "None"}</p>
                  <p className="text-sm text-gray-500">Deleted Ingredients: {order.deletedIngredients.join(", ") || "None"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
                <div className="flex items-center border px-4 py-2 rounded-lg">
                  <button
                    className="text-lg px-2"
                    onClick={() =>
                      updateQuantity(
                        index,
                        order.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <p className="mx-4 text-lg font-semibold">{order.quantity}</p>
                  <button
                    className="text-lg px-2"
                    onClick={() =>
                      updateQuantity(
                        index,
                        order.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="py-6 px-6 bg-white shadow-md fixed bottom-0 w-full flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={() => window.history.back()}
          className="text-gray-700 text-lg"
        >
          &lt; Go Back
        </button>
        <p className="text-lg font-semibold text-gray-700">
          Estimated Time: {estimatedTime || "Calculating..."}
        </p>
        <button
          onClick={() => totalPrice > 0 && router.push("/payment-methods")}
          className={`rounded-lg py-4 px-10 text-lg font-bold shadow-md ${totalPrice > 0 ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          disabled={totalPrice <= 0}
        >
          Pay Now {totalPrice.toFixed(2)}
        </button>
      </footer>
    </div>
  );
};

export default CheckoutPage;
