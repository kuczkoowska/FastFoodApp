"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { food } from "../../data/food";
function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(food);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-3">
              ${product.price.toFixed(2)}
            </p>
            <ul className="mt-3 text-sm text-gray-600">
              {product.ingredients.map((ingredient, i) => (
                <li key={i} className="list-disc list-inside">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
