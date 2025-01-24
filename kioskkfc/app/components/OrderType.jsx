"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import DeliveryIcon from "../../public/food-bike-delivery-icon.svg";
import ForHereIcon from "../../public/dish-icon.svg";
import TakeAwayIcon from "../../public/takeaway-icon.svg";

const listItemClass =
  "flex flex-col w-36 h-28 bg-zinc-100 rounded-2xl shadow-md justify-center items-center uppercase text-black font-bold md:w-64 md:h-52 hover:text-white hover:bg-red-600 hover:scale-105 hover:transition-transform hover:duration-300";

const orderTypes = [
  { href: "/menu", icon: DeliveryIcon, label: "Delivery" },
  { href: "/menu", icon: ForHereIcon, label: "For here" },
  { href: "/menu", icon: TakeAwayIcon, label: "Take away" },
];

const OrderType = () => {
  const [isDeliveryClickable, setIsDeliveryClickable] = useState(true);

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
              className={`${listItemClass} bg-gray-500 text-gray-400`}
              onClick={() => alert("Delivery is not available right now")}
            >
              <div className="hidden md:block">
                <orderType.icon width="125" height="125" />
              </div>
              <p>{orderType.label}</p>
            </li>
          ) : (
            <Link key={index} href={orderType.href}>
              <li className={listItemClass}>
                <div className="hidden md:block">
                  <orderType.icon width="125" height="125" />
                </div>
                <p>{orderType.label}</p>
              </li>
            </Link>
          )
        )}
      </ul>
    </>
  );
};

export default OrderType;
