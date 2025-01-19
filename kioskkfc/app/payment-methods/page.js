"use client";
import React, { useState } from "react";

const PaymentMethodsPage = () => {
  const [tableNumber, setTableNumber] = useState("");

  const handlePaymentSelection = (method) => {
    if (tableNumber.trim() === "") {
      alert("Please enter your table number.");
      return;
    }

    console.log(
      `Selected payment method: ${method}, Table Number: ${tableNumber}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>
      <div className="mb-4">
        <label className="block mb-2">Table Number</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your table number"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => handlePaymentSelection("Credit Card")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Credit Card
        </button>
        <button
          onClick={() => handlePaymentSelection("Mobile Payment")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mobile Payment
        </button>
        <button
          onClick={() => handlePaymentSelection("Cash")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cash
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
