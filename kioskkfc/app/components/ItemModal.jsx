import React from "react";

const ItemModal = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-md">
        <button
          className="absolute bottom-2 right-2 text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          onClick={props.onClose}
        >
          Add to cart
        </button>
        <button
          className="absolute top-2 right-2 text-gray px-4 py-2 rounded"
          onClick={props.onClose}
        >
          &times;
        </button>
        <p>picture of the item</p>
        <p className="text-xl font-bold mb-2">{props.item.name}</p>
        <p className="text-lg font-bold mb-2">{props.item.price}</p>
        <p>{props.item.description}</p>
        <ul>
          {props.item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>quantity</p>
        <p>personalize</p>
      </div>
    </div>
  );
};

export default ItemModal;
