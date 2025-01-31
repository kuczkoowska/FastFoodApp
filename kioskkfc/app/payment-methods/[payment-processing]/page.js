"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartContext } from "../../CartContext.jsx";

const PaymentProcessingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const [message, setMessage] = useState("Processing your payment...");
  const [orderNumber, setOrderNumber] = useState(null);
  const { clearCart } = useContext(CartContext);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    let timeout1, timeout2;
    if (method === "Cash") {
      setOrderNumber(Math.floor(1 + Math.random() * 99));

      timeout1 = setTimeout(() => {
      clearCart();
      router.push("/");
      }, 7000);
    } else {
      const isError = Math.random() < 0.3;
      if (isError) {
      setMessage("Payment Failed! Please try again.");
      timeout1 = setTimeout(() => {
        setMessage("Processing your payment...");
        timeout2 = setTimeout(() => {
        setOrderNumber(Math.floor(1 + Math.random() * 99));
        setMessage("Payment Successful!");

        timeout1 = setTimeout(() => {
          clearCart();
          router.push("/");
        }, 5000);
        }, 5000);
      }, 5000);
      } else {
      timeout1 = setTimeout(() => {
        setOrderNumber(Math.floor(1 + Math.random() * 99));
        setMessage("Payment Successful!");

        timeout2 = setTimeout(() => {
        clearCart();
        router.push("/");
        }, 5000);
      }, 5000);
      }
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
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
            <button
              onClick={handlePrint}
              className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Print Confirmation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessingPage;
