import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className=" text-inherit md:w-72 w-30 p-2 ml-4 rounded-lg border-2 border-red-500 focus:outline-none"
    />
  );
};

export default SearchBar;
