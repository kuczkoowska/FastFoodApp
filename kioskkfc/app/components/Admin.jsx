"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin");
  };

  return (
    <button className="absolute top-2 right-2" onClick={handleClick}>
      Admin login
    </button>
  );
};

export default Admin;
