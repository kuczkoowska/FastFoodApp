"use client";
import React, { useState, useRef } from "react";

import Burger from "../../public/foodicons/burger-color-stroke-by-Vexels.svg";
import Chicken from "../../public/foodicons/food-illustration-chicken-by-Vexels.svg";
import Drink from "../../public/foodicons/soda-cute-by-Vexels.svg";
import Wrap from "../../public/foodicons/shawarma-arabic-food-illustration-by-Vexels.svg";
import Fries from "../../public/foodicons/food-french-fries-meal-by-Vexels.svg";
import Bucket from "../../public/foodicons/happy-fried-chicken-bucket-kawaii-by-Vexels.svg"
import Shake from "../../public/foodicons/milkshake-illustration-cup-by-Vexels.svg";
import Coffee from "../../public/foodicons/coffee-drink-illustration-cup-by-Vexels.svg";

import ItemModal from "./ItemModal";

const listOfFood =
  "flex flex-row flex-wrap w-32 h-32 sm:w-52 sm:h-48 m-4 bg-zinc-100 rounded-2xl justify-center items-center uppercase text-black font-bold hover:bg-zinc-200 hover:transition-transform hover:duration-300 hover:cursor-pointer";

const generalList = "flex flex-row flex-wrap w-full";

const FoodList = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const categoryRefs = useRef({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    openModal();
  };

  const groupedFood = React.useMemo(() => {
    const categories = {};
    props.food.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  }, [props.food]);

  React.useEffect(() => {
    if (props.selectedCategory) {
      if (categoryRefs.current[props.selectedCategory]) {
        categoryRefs.current[props.selectedCategory].scrollIntoView({
          behavior: "smooth",
        });
      }
    }

    return () => {
      if (props.setCategoryClicked) {
        props.setCategoryClicked(false);
      }
    };
  }, [props.categoryClicked, props.selectedCategory]);

  return (
    <>
      {props.main && groupedFood ? (
        Object.entries(groupedFood).map(([category, items], index) => (
          <li
            key={index}
            ref={(el) => (categoryRefs.current[category] = el)}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <ul className={generalList}>
              {items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={listOfFood}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-center text-center">
                    {item.type === "burger" && (
                      <Burger className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "wrap" && (
                      <Wrap className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "chicken" && (
                      <Chicken className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "drink" && (
                      <Drink className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "fries" && (
                      <Fries className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "bucket" && (
                      <Bucket className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "shake" && (
                      <Shake className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "coffee" && (
                      <Coffee className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))
      ) : (
        <ul className="flex flex-row flex-wrap">
          {props.food.map((item, index) => (
            <li
              key={index}
              className={listOfFood}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex flex-col items-center text-center">
              {item.type === "burger" && (
                      <Burger className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "wrap" && (
                      <Wrap className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "chicken" && (
                      <Chicken className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "drink" && (
                      <Drink className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "fries" && (
                      <Fries className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "bucket" && (
                      <Bucket className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "shake" && (
                      <Shake className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                    {item.type === "coffee" && (
                      <Coffee className="w-12 h-12 sm:w-24 sm:h-24" />
                    )}
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">{item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && <ItemModal item={selectedItem} onClose={closeModal} />}
    </>
  );
};

export default FoodList;
