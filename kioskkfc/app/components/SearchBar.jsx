import React, { useState } from "react";
import FoodList from "./FoodList";

const SearchBar = ({ food }) => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setQuery("");
    setFilteredItems([]);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const filtered = food.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    setFilteredItems(filtered.slice(0, 10));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="text-inherit md:w-72 w-30 p-2 ml-4 rounded-lg border-2 border-red-500 focus:outline-none"
        onClick={handleClick}
        value={query}
        onChange={handleSearch}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 h-full w-full">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearch}
              className="p-2 rounded-lg border-2 border-red-500 focus:outline-none w-full mb-4"
            />
            <button
              onClick={handleClose}
              className="absolute bottom-0 right-4 py-4 px-8 bg-red-700 text-white rounded mb-4"
            >
              Close
            </button>
            <FoodList food={filteredItems} main={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
