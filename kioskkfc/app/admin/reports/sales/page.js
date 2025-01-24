"use client";
import * as React from "react";
import { useState } from "react";

const dummySalesData = [
  {
    id: 1,
    product: "Cheeseburger",
    category: "Burgers",
    unitsSold: 120,
    totalRevenue: 718.8,
    date: "2025-01-20",
  },
  {
    id: 2,
    product: "Twister",
    category: "Wraps",
    unitsSold: 80,
    totalRevenue: 479.2,
    date: "2025-01-19",
  },
  {
    id: 3,
    product: "Pepsi",
    category: "Drinks",
    unitsSold: 200,
    totalRevenue: 398.0,
    date: "2025-01-18",
  },
  {
    id: 4,
    product: "Strawberry Shake",
    category: "Drinks",
    unitsSold: 45,
    totalRevenue: 179.55,
    date: "2025-01-17",
  },
];

export default function SalesPage() {
  const [salesData, setSalesData] = useState(dummySalesData);

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4 border-b">Product</th>
              <th className="text-left py-2 px-4 border-b">Category</th>
              <th className="text-right py-2 px-4 border-b">Units Sold</th>
              <th className="text-right py-2 px-4 border-b">
                Total Revenue ($)
              </th>
              <th className="text-left py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 text-gray-600">
                <td className="py-2 px-4 border-b">{sale.product}</td>
                <td className="py-2 px-4 border-b">{sale.category}</td>
                <td className="text-right py-2 px-4 border-b">
                  {sale.unitsSold}
                </td>
                <td className="text-right py-2 px-4 border-b">
                  ${sale.totalRevenue.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
