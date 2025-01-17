import React from "react";
import Link from "next/link";

import DeliveryIcon from "../../public/food-bike-delivery-icon.svg";
import ForHereIcon from "../../public/dish-icon.svg";
import TakeAwayIcon from "../../public/takeaway-icon.svg";

const listItemClass =
  "flex flex-col w-64 h-52 bg-zinc-100 rounded-2xl shadow-md justify-center items-center uppercase text-black font-bold hover:text-white hover:bg-red-600 hover:scale-105 hover:transition-transform hover:duration-300";

const orderTypes = [
  { href: "/menu", icon: DeliveryIcon, label: "Dostawa" },
  { href: "/menu", icon: ForHereIcon, label: "Na miejscu" },
  { href: "/menu", icon: TakeAwayIcon, label: "Na wynos" },
];

const OrderType = () => {
  return (
    <>
      <ul className="flex flex-row gap-8 mt-6">
        {orderTypes.map((orderType, index) => (
          <Link key={index} href={orderType.href}>
            <li className={listItemClass}>
              <orderType.icon width="125" height="125" />
              <p>{orderType.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default OrderType;
