"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import DeliveryIcon from "../../public/food-bike-delivery-ico.svg";
import ForHereIcon from "../../public/dish-ico.svg";
import TakeAwayIcon from "../../public/takeaway.ico.svg";

const listItemClass =
  "flex flex-col w-36 h-28 rounded-2xl shadow-md justify-center items-center uppercase text-black font-bold md:w-64 md:h-52";

const here = "bg-zinc-100 hover:text-white hover:bg-red-600 hover:scale-105 hover:transition-transform hover:duration-300"

const orderTypes = [
  { href: "/menu", icon: DeliveryIcon, label: "Delivery" },
  { href: "/menu", icon: ForHereIcon, label: "For here" },
  { href: "/menu", icon: TakeAwayIcon, label: "Take away" },
];

const OrderType = () => {
  const [isDeliveryClickable, setIsDeliveryClickable] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setIsDeliveryClickable(Math.random() >= 0.5);
  }, []);

  return (
    <>
      <ul className="flex flex-row items-center md:gap-10 md:flex-row md:gap-8 md:mt-6 gap-4">
        {orderTypes.map((orderType, index) =>
          orderType.label === "Delivery" && !isDeliveryClickable ? (
            <li
              key={index}
              className={`${listItemClass} bg-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-300`}
              onClick={() => setShowAlert(true)}
            >
              <div className="hidden md:block">
                <orderType.icon width="125" height="125" />
              </div>
              <p>{orderType.label}</p>
            </li>
          ) : (
            <Link key={index} href={orderType.href} className={listItemClass}>
              <div className="hidden md:block">
                <orderType.icon width="125" height="125" />
              </div>
              <p>{orderType.label}</p>
            </Link>
          )
        )}
      </ul>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800">
              🚫 Delivery Unavailable
            </h2>
            <p className="text-gray-600 mt-2">
              Sorry, delivery is not available right now.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderType;
