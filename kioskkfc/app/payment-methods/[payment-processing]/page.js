"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartContext } from "../../CartContext.jsx";

const PaymentProcessingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const table = searchParams.get("table");
  const [message, setMessage] = useState("Processing your payment...");
  const [orderNumber, setOrderNumber] = useState(null);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    if (method === "Cash") {
      setOrderNumber(Math.floor(1 + Math.random() * 99));

      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 1000);
    } else {
      setTimeout(() => {
        setOrderNumber(Math.floor(1 + Math.random() * 99));
        setMessage(`Payment Successful!`);

        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 5000);
      }, 5000);
    }
  }, [method, clearCart, router]);

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        {method !== "Cash" ? (
          <h2 className="text-3xl font-bold">{message}</h2>
        ) : (
          <h2 className="text-3xl font-bold">Proceed to the cash register</h2>
        )}
        {orderNumber && (
          <>
            <p className="mt-4 text-xl">Your order number is</p>

            <div className="bg-white p-32 rounded-full mt-8 border-8 border-green-200">
              <p className="text-7xl">{orderNumber}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessingPage;
