import React from "react";
import AutoLogout from "../components/AutoLogout";

const CheckoutLayout = ({ children }) => {
  return (
    <>
      <AutoLogout />
      {children}
    </>
  );
};

export default CheckoutLayout;
