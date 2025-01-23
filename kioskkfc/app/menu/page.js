"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { food } from "../data/food";

import FoodCategories from "../components/FoodCategories";
import FoodList from "../components/FoodList";
import Cart from "../components/Cart";
import KFCLogo from "../../public/kfc-icon.svg";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const router = useRouter();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryClicked(true);
  };

  return (
    <>
      <main className="h-screen overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-500"
            onClick={() => {
              setSelectedCategory(null);
              setCategoryClicked(false);
            }}
          >
            &#8634; Start Over
          </button>
        </div>
        <div className="flex">
          <div className="w-60 mt-4 flex flex-col items-center gap-4">
            <KFCLogo
              className="w-40 h-40 hover:cursor-pointer hover:scale-105 hover:transition-transform hover:duration-300"
              onClick={() => router.push("/")}
            />
            <FoodCategories
              onSelectCategory={handleCategorySelect}
              food={food}
            />
          </div>
          <div className="flex-1 h-[calc(100vh-4rem)] ml-4 mt-8 overflow-y-auto">
            <FoodList
              selectedCategory={selectedCategory}
              food={food}
              categoryClicked={categoryClicked}
              setCategoryClicked={setCategoryClicked}
            />
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full bg-gray-50 shadow-md p-4 flex justify-between items-center">
        <Cart />
      </footer>
    </>
  );
};

export default MenuPage;
