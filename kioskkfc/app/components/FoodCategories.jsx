"use client";
import React, { useState, useEffect } from "react";

const FoodCategories = (props) => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (props.food) {
      const categories = props.food.map((item) => item.category);
      setFilteredCategories(categories);
    }
  }, []);

  return (
    <div className="border-r border-gray-200 w-full">
      <ul>
        {filteredCategories.map((category, index) => (
          <li
            key={index}
            className="h-12 flex items-center justify-center border-b border-gray-200 cursor-pointer hover:bg-zinc-200"
            onClick={() => {
              console.log(`Clicked on category: ${category}`);
              props.onSelectCategory(category);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodCategories;
