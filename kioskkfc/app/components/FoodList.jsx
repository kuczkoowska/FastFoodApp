"use client";
import React, { useState, useRef } from "react";
import ItemModal from "./ItemModal";

const listOfFood =
  "flex flex-row flex-wrap w-32 h-32 sm:w-52 sm:h-48 m-4 bg-zinc-100 rounded-2xl justify-center items-center uppercase text-black font-bold hover:text-white hover:bg-zinc-200 hover:transition-transform hover:duration-300";

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
