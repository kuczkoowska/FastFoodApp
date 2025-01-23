"use client";
import React, { useState } from "react";

const TableNumber = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [error, setError] = useState("");

  const handleTableNumberChange = (index, value) => {
    const newTableNumber =
      tableNumber.substring(0, index) +
      value +
      tableNumber.substring(index + 1);
    setTableNumber(newTableNumber);

    const tableNum = parseInt(newTableNumber, 10);
    if (tableNum && (tableNum < 100 || tableNum > 149)) {
      setError("Table number must be between 100 and 149.");
    } else {
      setError("");
    }
  };

  return (
    <>
      {[0, 1, 2].map((idx) => (
        <input
          key={idx}
          type="number"
          value={tableNumber[idx] || ""}
          onChange={(e) => handleTableNumberChange(idx, e.target.value)}
          maxLength={1}
          className="w-20 h-28 px-3 py-3 border-2 border-zinc-500 rounded-lg text-center outline-none"
        />
      ))}
    </>
  );
};

export default TableNumber;
