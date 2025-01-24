"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { food } from "../data/food";

import FoodCategories from "../components/FoodCategories";
import FoodList from "../components/FoodList";
import Cart from "../components/Cart";
import KFCLogo from "../../public/kfc-icon.svg";
import SearchBar from "../components/SearchBar";

import Toolbar from "@mui/material/Toolbar";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryClicked(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCategoryClicked(false);
    localStorage.removeItem("cart");
    setCartItems([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="p-4 flex justify-between items-center">
            <Toolbar>
              <button
                className="w-32 pt-4 h-32 hover:cursor-pointer hover:scale-105 hover:transition-transform hover:duration-300"
                onClick={toggleDropdown}
              >
                <KFCLogo />
              </button>
              <div
                className={`absolute top-full w-full bg-white shadow-md transition-all duration-300 ${
                  isDropdownOpen
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <FoodCategories
                  onSelectCategory={(category) => {
                    handleCategorySelect(category);
                    setIsDropdownOpen(false);
                  }}
                  food={food}
                />
              </div>
              <SearchBar />
              <button
                className="text-gray-500 ml-8"
                onClick={() => {
                  handleReset();
                }}
              >
                &#8634;
              </button>
            </Toolbar>
          </div>
          <div className="flex-1 h-[calc(80vh-4rem)] ml-4 mt-8 overflow-y-auto">
            <FoodList
              selectedCategory={selectedCategory}
              food={food}
              categoryClicked={categoryClicked}
              setCategoryClicked={setCategoryClicked}
            />
          </div>
          <div className="w-full bg-gray-50 shadow-md p-4 flex justify-between items-center">
            <Cart cartItems={cartItems} />
          </div>
        </>
      ) : (
        <>
          <main className="h-screen overflow-hidden">
            <div className="grid grid-rows-[10_10_auto_10] grid-cols-[20%_80%] min-h-screen">
              <div className="flex items-center justify-center">
                <KFCLogo
                  className="w-32 h-auto hover:cursor-pointer hover:scale-105 hover:transition-transform hover:duration-300 col-span-2 pt-4"
                  onClick={() => router.push("/")}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="p-4 flex justify-between items-center">
                  <SearchBar />
                  <div>
                    <button
                      className="text-gray-500 min-w-28 pl-4"
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      &#8634; Start Over
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-60 flex flex-col items-center gap-4">
                  <FoodCategories
                    onSelectCategory={handleCategorySelect}
                    food={food}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-1 h-[calc(80vh-4rem)] ml-4 mt-8 overflow-y-auto row-span-2">
                  <FoodList
                    selectedCategory={selectedCategory}
                    food={food}
                    categoryClicked={categoryClicked}
                    setCategoryClicked={setCategoryClicked}
                  />
                </div>
              </div>
              <div className="w-full bg-gray-50 shadow-md p-4 flex justify-between items-center col-span-2">
                <Cart cartItems={cartItems} />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default MenuPage;
