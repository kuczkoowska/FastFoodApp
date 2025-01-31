"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlikIcon from "../../public/Blik-logo.svg";
import CardIcon from "../../public/credit-card-icon.svg";
import CashIcon from "../../public/saving-icon.svg";

const PaymentMethodsPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [tableNumber, setTableNumber] = useState(["", "", ""]);

  const handlePaymentSelection = (method) => {
    router.push(
      `payment-methods/payment-processing?method=${method}&table=${tableNumber}`
    );
  };

  const handleTableNumberChange = (value, index, event) => {
    const newTableNumber = [...tableNumber];

    if (event.key === "Backspace" && !value) {
      if (index > 0) {
        document.getElementById(`square-${index - 1}`).focus();
      }
    } else if (/^\d$/.test(value)) {
      newTableNumber[index] = value;

      if (index < 2) {
        document.getElementById(`square-${index + 1}`).focus();
      }
    } else {
      return;
    }

    newTableNumber[index] = value;
    setTableNumber(newTableNumber);
  };

  const paymentMethods = [
    { method: "Credit Card", icon: <CardIcon /> },
    { method: "BLIK", icon: <BlikIcon /> },
    { method: "Cash", icon: <CashIcon /> },
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
              id={`square-${idx}`}
              type="text"
              inputMode="numeric"
              value={tableNumber[idx]}
              onChange={(e) => handleTableNumberChange(e.target.value, idx, e)}
              onKeyDown={(e) => handleTableNumberChange("", idx, e)}
              maxLength={1}
              className="w-20 h-28 px-3 text-2xl py-3 border-2 border-zinc-500 rounded-lg text-center outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="grid grid-rows-3 gap-8 flex-grow w-[75vw] mx-auto">
        {paymentMethods.map(({ method, icon }) => (
          <button
            key={method}
            onClick={() => handlePaymentSelection(method)}
            className="flex items-center justify-center px-6 py-4 text-lg sm:text-2xl rounded-full shadow h-full border-4 border-black-500 hover:bg-gray-200"
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
