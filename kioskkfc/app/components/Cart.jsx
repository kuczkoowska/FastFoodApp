"use client";
import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <div className="text-lg font-bold">
          Total Price: {totalPrice.toFixed(2)}
        </div>
      </div>
      {totalPrice > 0 ? (
        <button
          className="bg-orange-500 font-bold text-white py-3 px-5 cursor-pointer rounded"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      ) : (
        <button className="bg-zinc-100 font-bold text-gray-400 py-3 px-5 border-2 rounded cursor-not-allowed">
          Checkout
        </button>
      )}
    </>
  );
};

export default Cart;
