"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../CartContext";

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
    <>
      <div className="h-[90vh] overflow-y-auto">
        <h1 className="text-gray-800 text-4xl font-bold text-center mt-8 mb-8">
          Your Cart
        </h1>
        <ul className="list-none p-4 mb-20">
          {groupedItems.map((order, index) => (
            <li key={index} className="bg-gray-100 mb-2 p-2 rounded shadow-md">
              <p className="text-lg font-bold">{order.item.name}</p>
              <p>{(order.item.price * order.quantity).toFixed(2)}</p>
              <div className="mt-4">
                <label className="block mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      order.quantity === 1
                        ? removeItem(
                            cartItems.findIndex(
                              (ci) =>
                                ci.item.id === order.item.id &&
                                JSON.stringify(ci.selectedOptions) ===
                                  JSON.stringify(order.selectedOptions)
                            )
                          )
                        : updateQuantity(
                            cartItems.findIndex(
                              (ci) =>
                                ci.item.id === order.item.id &&
                                JSON.stringify(ci.selectedOptions) ===
                                  JSON.stringify(order.selectedOptions)
                            ),
                            order.quantity - 1
                          )
                    }
                  >
                    -
                  </button>
                  <p className="px-4">{order.quantity}</p>
                  <button
                    onClick={() =>
                      updateQuantity(
                        cartItems.findIndex(
                          (ci) =>
                            ci.item.id === order.item.id &&
                            JSON.stringify(ci.selectedOptions) ===
                              JSON.stringify(order.selectedOptions)
                        ),
                        order.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Extras: {order.selectedOptions.extras.join(", ") || "None"}
              </p>
              <p className="text-sm text-gray-600">
                Deleted Ingredients:{" "}
                {order.deletedIngredients.join(", ") || "None"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <footer className="fixed bottom-0 w-full bg-gray-50 shadow-md pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 py-2 px-4 text-lg"
          >
            &lt; Go Back
          </button>
          <button
            onClick={() => router.push("/payment-methods")}
            className="bg-green-500 text-white rounded py-5 px-20 text-lg"
          >
            Pay Now {totalPrice.toFixed(2)}
          </button>
        </div>
        {estimatedTime && (
          <div className="mt-4 text-center text-gray-700">
            Estimated Waiting Time: {estimatedTime}
          </div>
        )}
      </footer>
    </>
  );
};

export default CheckoutPage;
