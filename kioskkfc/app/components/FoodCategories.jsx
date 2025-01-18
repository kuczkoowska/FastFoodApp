"use client";
import { Divider } from "@mui/material";
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
    <div>
      <ul>
        {filteredCategories.map((category, index) => (
          <li
            key={index}
            className="h-12 flex items-center justify-center"
            onClick={() => {
              console.log(`Clicked on category: ${category}`);
              props.onSelectCategory(category);
            }}
          >
            {category}
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodCategories;
