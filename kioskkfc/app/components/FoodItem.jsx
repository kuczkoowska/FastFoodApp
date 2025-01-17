import React from "react";

const FoodItem = (props) => {
  return (
    <>
      <p>{props.item}</p>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log("Add to cart")}
      >
        Add to cart
      </button>
    </>
  );
};

export default FoodItem;
