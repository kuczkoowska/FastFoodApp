"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlikIcon from "../../public/Blik-logo.svg";
import CardIcon from "../../public/credit-card-icon.svg";
import CashIcon from "../../public/saving-icon.svg";

const PaymentMethodsPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const handlePaymentSelection = (method) => {
    router.push(
      `payment-methods/payment-processing?method=${method}&table=${tableNumber}`
    );
  };

  const handleTableNumberChange = (index, value) => {
    const newTableNumber =
      tableNumber.substring(0, index) +
      value.slice(-1) +
      tableNumber.substring(index + 1);
    setTableNumber(newTableNumber);

    const tableNum = parseInt(newTableNumber, 10);
    if (tableNum && (tableNum < 100 || tableNum > 149)) {
      setError("Table number must be between 100 and 149.");
    } else {
      setError("");
    }
  };

  const paymentMethods = [
    { method: "Credit Card", color: "blue", icon: <CardIcon /> },
    { method: "BLIK", color: "green", icon: <BlikIcon /> },
    { method: "Cash", color: "yellow", icon: <CashIcon /> },
  ];

  return (
    <div className="p-6 h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Choose Payment Method
      </h1>
      <div className="mb-6">
        <label className="block mb-2 text-2xl text-center">Table Number</label>
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              pattern="\d{1}"
              value={tableNumber[idx] || ""}
              onChange={(e) => handleTableNumberChange(idx, e.target.value)}
              maxLength={1}
              className="w-20 h-28 px-3 text-2xl py-3 border-2 border-zinc-500 rounded-lg text-center outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="grid grid-rows-3 gap-8 flex-grow">
        {paymentMethods.map(({ method, color, icon }) => (
          <button
            key={method}
            onClick={() => handlePaymentSelection(method)}
            className={`flex items-center justify-center bg-${color}-600 text-white px-6 py-4 text-lg sm:text-2xl rounded-lg shadow w-full h-full hover:bg-${color}-700`}
          >
            <svg className="w-12 h-12 sm:w-20 sm:h-20 mr-2">{icon}</svg>
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
