"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentProcessingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const table = searchParams.get("table");
  const [message, setMessage] = useState("Processing your payment...");
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    if (method === "Cash") {
      setOrderNumber(Math.floor(1 + Math.random() * 99));

      setTimeout(() => {
        router.push("/");
      }, 10000);
    } else {
      setTimeout(() => {
        setOrderNumber(Math.floor(1 + Math.random() * 99));
        setMessage(`Payment Successful!`);

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }, 5000);
    }
  }, [method]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        {method !== "Cash" ? (
          <h2 className="text-xl font-bold mb-4">{message}</h2>
        ) : (
          <h2>Proceed to the cash register</h2>
        )}
        {orderNumber && (
          <p>
            Your order number is{" "}
            <span className="font-mono">{orderNumber}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessingPage;
