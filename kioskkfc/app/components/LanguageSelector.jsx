import React from "react";
import En from "../../public/uk-flag-round-circle-icon.svg";
import Pl from "../../public/poland-flag-round-circle-icon.svg";
import Sp from "../../public/spain-country-flag-round-icon.svg";

const languageItem =
  "w-24 h-24 rounded-full shadow-md hover:scale-110 hover:transition-transform hover:duration-300";

const languages = [
  { Component: En, alt: "UK Flag" },
  { Component: Pl, alt: "Poland Flag" },
  { Component: Sp, alt: "Spain Flag" },
];

const LanguageSelector = () => {
  return (
    <ul className="flex flex-row items-center justify-center gap-8 mt-6">
      {languages.map(({ Component, alt }, index) => (
        <li key={index} className={languageItem}>
          <Component alt={alt} />
        </li>
      ))}
    </ul>
  );
};

export default LanguageSelector;
