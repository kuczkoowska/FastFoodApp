import React from "react";
import AutoLogout from "../components/AutoLogout";

const PaymentLayout = ({ children }) => {
  return (
    <>
      <AutoLogout />
      {children}
    </>
  );
};

export default PaymentLayout;
