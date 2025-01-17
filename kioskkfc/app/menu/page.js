"use client";
import React, { useState } from "react";

import FoodCategories from "../components/FoodCategories";
import FoodList from "../components/FoodList";
import Cart from "../components/Cart";
import KFCLogo from "../../public/kfc-icon.svg";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <main>
        <div className="grid grid-cols-6 grid-rows-2 gap-8">
          <div className="col-start-1 mt-4">
            <KFCLogo className="w-40 h-40" />
            <FoodCategories
              onSelectCategory={handleCategorySelect}
              food={food}
            />
          </div>
          <div className="col-start-2">
            <FoodList selectedCategory={selectedCategory} food={food} />
          </div>
        </div>
      </main>
      <footer className="bg-zinc-100 p-4">
        <Cart />
      </footer>
    </>
  );
};

export default MenuPage;

const food = [
  {
    category: "Fruits",
    items: [
      {
        name: "Apple",
        ingredients: ["Apple"],
        description: "A sweet, edible fruit produced by an apple tree.",
      },
      {
        name: "Banana",
        ingredients: ["Banana"],
        description:
          "An elongated, edible fruit produced by several kinds of large herbaceous flowering plants.",
      },
      {
        name: "Orange",
        ingredients: ["Orange"],
        description: "A type of citrus fruit which people often eat.",
      },
    ],
  },
  {
    category: "Vegetables",
    items: [
      {
        name: "Carrot",
        ingredients: ["Carrot"],
        description: "A root vegetable, usually orange in color.",
      },
      {
        name: "Broccoli",
        ingredients: ["Broccoli"],
        description: "An edible green plant in the cabbage family.",
      },
      {
        name: "Spinach",
        ingredients: ["Spinach"],
        description: "A leafy green flowering plant.",
      },
    ],
  },
  {
    category: "Dairy",
    items: [
      {
        name: "Milk",
        ingredients: ["Milk"],
        description:
          "A nutrient-rich liquid food produced by the mammary glands of mammals.",
      },
      {
        name: "Cheese",
        ingredients: ["Milk", "Salt", "Rennet"],
        description: "A dairy product derived from milk.",
      },
      {
        name: "Yogurt",
        ingredients: ["Milk", "Bacteria"],
        description: "A food produced by bacterial fermentation of milk.",
      },
    ],
  },
  {
    category: "Meat",
    items: [
      {
        name: "Chicken",
        ingredients: ["Chicken"],
        description: "Meat from chickens.",
      },
      {
        name: "Beef",
        ingredients: ["Beef"],
        description: "Meat from cattle.",
      },
      {
        name: "Pork",
        ingredients: ["Pork"],
        description: "Meat from pigs.",
      },
    ],
  },
  {
    category: "Grains",
    items: [
      {
        name: "Rice",
        ingredients: ["Rice"],
        description:
          "A cereal grain, which is the most widely consumed staple food.",
      },
      {
        name: "Wheat",
        ingredients: ["Wheat"],
        description: "A grass widely cultivated for its seed, a cereal grain.",
      },
      {
        name: "Oats",
        ingredients: ["Oats"],
        description: "A species of cereal grain grown for its seed.",
      },
    ],
  },
];
