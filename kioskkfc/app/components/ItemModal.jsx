import React, { useState, useContext } from "react";
import { Checkbox } from "@mui/material";
import { pink, yellow, red } from "@mui/material/colors";
import { CartContext } from "../CartContext";

import Burger from "../../public/foodicons/burger-color-stroke-by-Vexels.svg";
import Chicken from "../../public/foodicons/food-illustration-chicken-by-Vexels.svg";
import Drink from "../../public/foodicons/soda-cute-by-Vexels.svg";
import Wrap from "../../public/foodicons/shawarma-arabic-food-illustration-by-Vexels.svg";
import Fries from "../../public/foodicons/food-french-fries-meal-by-Vexels.svg";
import Bucket from "../../public/foodicons/happy-fried-chicken-bucket-kawaii-by-Vexels.svg"
import Shake from "../../public/foodicons/milkshake-illustration-cup-by-Vexels.svg";
import Coffee from "../../public/foodicons/coffee-drink-illustration-cup-by-Vexels.svg";

const button = "px-4 py-2 border rounded-full hover:bg-gray-200";

const ItemModal = (props) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    extras: [],
    ingredients: props.item.ingredients || [],
  });
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraBacon, setExtraBacon] = useState(false);

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
    if (value === "extra cheese") {
      setExtraCheese(checked);
    } else if (value === "bacon") {
      setExtraBacon(checked);
    }
    setSelectedOptions((prev) => ({
      ...prev,
      extras: checked
        ? [...prev.extras, value]
        : prev.extras.filter((extra) => extra !== value),
    }));
  };

  const handleAddToCart = () => {
    let extraCost = 0;
    if (extraCheese) extraCost += 2.00;
    if (extraBacon) extraCost += 2.00;

    const itemWithExtras = {
      ...props.item,
      extraCheese,
      extraBacon,
      price: props.item.price + extraCost,
    };

    const deletedIngredients = props.item.ingredients.filter(
      (ingredient) => !selectedOptions.ingredients.includes(ingredient)
    );
    const orderDetails = {
      item: itemWithExtras,
      quantity,
      selectedOptions,
      deletedIngredients,
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
          {props.item.type === "burger" && (
            <Burger className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "wrap" && (
            <Wrap className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "chicken" && (
            <Chicken className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "drink" && (
            <Drink className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "fries" && (
            <Fries className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "bucket" && (
            <Bucket className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "shake" && (
            <Shake className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          {props.item.type === "coffee" && (
            <Coffee className="w-12 h-12 sm:w-24 sm:h-24" />
          )}
          <p>{props.item.name}</p>
          <p>{props.item.price}</p>
        </div>
        <p>{props.item.description}</p>
        {(props.item.type === "burger" || props.item.type === "wrap") && props.item.ingredients.length > 0 && (
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
                <p>Extra Cheese (+2.00)</p>
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
                <p>Extra Bacon (+2.00)</p>
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
