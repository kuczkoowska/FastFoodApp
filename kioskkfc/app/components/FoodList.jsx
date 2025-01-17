import React from "react";
import FoodItem from "./FoodItem";
const listFood =
  "flex flex-row flex-wrap w-60 h-52 bg-zinc-100 rounded-2xl justify-center items-center uppercase text-black font-bold hover:text-white hover:bg-zinc-200 hover:transition-transform hover:duration-300";

const fullList = "grid grid-cols-3 gap-4";

const FoodList = (props) => {
  return (
    <>
      {props.selectedCategory ? (
        <ul className={fullList}>
          {props.food
            .find((category) => category.category === props.selectedCategory)
            .items.map((item, index) => (
              <li key={index} className={listFood}>
                <div>
                  <FoodItem item={item.name} />
                </div>
              </li>
            ))}
        </ul>
      ) : (
        props.food && (
          <ul className={fullList}>
            <p>LISTA</p>
          </ul>
        )
      )}
    </>
  );
};

export default FoodList;
