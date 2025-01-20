import React from "react";
import AutoLogout from "../components/AutoLogout";

const MenuLayout = ({ children }) => {
  return (
    <>
      <AutoLogout />
      {children}
    </>
  );
};

export default MenuLayout;
