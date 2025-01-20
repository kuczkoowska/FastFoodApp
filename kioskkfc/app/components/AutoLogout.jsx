"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AutoLogout = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  let timeout;
  let popupTimeout;

  const logout = () => {
    router.push("/");
  };

  const resetTimer = () => {
    clearTimeout(timeout);
    clearTimeout(popupTimeout);
    setShowPopup(false);
    timeout = setTimeout(() => setShowPopup(true), 60 * 1000);
    popupTimeout = setTimeout(logout, 2 * 60 * 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeout);
      clearTimeout(popupTimeout);
    };
  }, []);

  return (
    showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-md text-center text-xl font-bold">
          <p>Are you still here?</p>
        </div>
      </div>
    )
  );
};

export default AutoLogout;
