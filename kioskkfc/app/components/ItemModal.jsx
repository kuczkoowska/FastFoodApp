import React, { useState, useContext } from "react";
import { Checkbox } from "@mui/material";
import { pink, yellow, red } from "@mui/material/colors";
import { CartContext } from "../CartContext";

const button = "px-4 py-2 border rounded-full hover:bg-gray-200";

const ItemModal = (props) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    extras: [],
    ingredients: props.item.ingredients || [],
  });

  const handleIngredientsChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      ingredients: checked
        ? [...prev.ingredients, value]
        : prev.ingredients.filter((ingredient) => ingredient !== value),
    }));
  };

  const handleExtrasChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      extras: checked
        ? [...prev.extras, value]
        : prev.extras.filter((extra) => extra !== value),
    }));
  };

  const handleAddToCart = () => {
    const orderDetails = {
      item: props.item,
      quantity,
      selectedOptions,
    };
    addToCart(orderDetails);
    props.onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-md max-h-screen overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray px-4 py-2"
          onClick={props.onClose}
        >
          &times;
        </button>
        <div className="flex justify-between items-center font-bold mb-2 text-xl">
          <p>{props.item.name}</p>
          <p>{props.item.price}</p>
        </div>
        <p>{props.item.description}</p>
        {props.item.ingredients.length > 0 && (
          <div className="mt-4">
            <label className="block mb-2">Ingredients</label>
            <div className="flex flex-col max-h-32 overflow-y-auto">
              {props.item.ingredients.map((ingredient, index) => (
                <label
                  key={index}
                  className="inline-flex items-center h-12 bg-red-100 p-2 mb-2"
                >
                  <Checkbox
                    name="ingredients"
                    value={ingredient}
                    onChange={handleIngredientsChange}
                    checked={selectedOptions.ingredients.includes(ingredient)}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <span className="ml-2">{ingredient}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4">
          <label className="block mb-2">Quantity</label>
          <div className="flex items-center">
            <button
              className={button}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="inline-block text-center w-20 px-2">
              {quantity}
            </span>
            <button
              className={button}
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        {(props.item.type === "wrap" || props.item.type === "burger") && (
          <div className="mt-4 mb-4">
            <label className="block mb-2">Extras</label>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <Checkbox
                  type="checkbox"
                  name="extras"
                  value="extra cheese"
                  onChange={handleExtrasChange}
                  className="form-checkbox"
                  sx={{
                    "&.Mui-checked": {
                      color: yellow[700],
                    },
                  }}
                />
                <p>Extra Cheese</p>
              </label>
              <label className="inline-flex items-center">
                <Checkbox
                  name="extras"
                  value="bacon"
                  onChange={handleExtrasChange}
                  sx={{
                    "&.Mui-checked": {
                      color: red[300],
                    },
                  }}
                />
                <p>Bacon</p>
              </label>
            </div>
          </div>
        )}

        {(props.item.type === "burger" ||
          props.item.ingredients.includes("cheese") ||
          props.item.ingredients.includes("milk") ||
          props.item.ingredients.includes("peanut butter")) && (
          <p className="text-red-500 font-bold mb-2">
            This item contains ingredients that some people may be allergic to.
          </p>
        )}
        <button
          className="absolute bottom-2 right-2 text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
