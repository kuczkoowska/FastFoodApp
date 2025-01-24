"use client";
import * as React from "react";

function OrdersPage() {
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      items: [
        { name: "Cheeseburger", quantity: 2, price: 5.99 },
        { name: "Pepsi", quantity: 2, price: 1.99 },
      ],
      total: 15.96,
      status: "Delivered",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: [
        { name: "Double Zinger", quantity: 1, price: 8.99 },
        { name: "Strawberry Shake", quantity: 1, price: 3.99 },
      ],
      total: 12.98,
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Michael Brown",
      items: [
        { name: "Twister", quantity: 2, price: 5.99 },
        { name: "Water", quantity: 1, price: 0.99 },
      ],
      total: 12.97,
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Order #{order.id}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Customer:</span> {order.customer}
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">Items:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lg font-bold text-gray-800">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
