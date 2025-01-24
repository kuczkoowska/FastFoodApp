"use client";
import React, { useState, useRef } from "react";
import ItemModal from "./ItemModal";

const listOfFood =
  "flex flex-row flex-wrap w-32 h-32 sm:w-52 sm:h-48 m-4 bg-zinc-100 rounded-2xl justify-center items-center uppercase text-black font-bold hover:text-white hover:bg-zinc-200 hover:transition-transform hover:duration-300";

const generalList = "flex flex-row flex-wrap w-full";

const FoodList = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const categoryRefs = useRef([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    openModal();
  };

  React.useEffect(() => {
    if (props.selectedCategory) {
      const index = props.food.findIndex(
        (category) => category.category === props.selectedCategory
      );
      if (categoryRefs.current[index]) {
        categoryRefs.current[index].scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      props.setCategoryClicked(false);
    };
  }, [props.categoryClicked]);

  return (
    <>
      {props.food && (
        <>
          {props.food.map((category, index) => (
            <li key={index} ref={(el) => (categoryRefs.current[index] = el)}>
              <h2
                className={`text-xl font-bold mb-2 ${
                  props.selectedCategory === category.category
                }`}
              >
                {category.category}
              </h2>
              <ul className={generalList}>
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={listOfFood}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <p>{item.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {isModalOpen && (
            <ItemModal item={selectedItem} onClose={closeModal} />
          )}
        </>
      )}
    </>
  );
};

export default FoodList;
