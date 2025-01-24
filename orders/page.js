"use client";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul className="list-disc list-inside">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
