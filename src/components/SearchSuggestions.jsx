import React from "react";
import useSuggestions from "../hooks/useSuggestions";

const SearchSuggestions = ({ InputValue, onClick, weather }) => {
  const { suggestions, loading, error } = useSuggestions(InputValue);
  const txtColor =
    weather === "Haze" || "Smoke" || "Clouds" || "Thunderstorm"
      ? "text-white"
      : "text-black";

  const bgColor =
    weather === "Haze" || "Smoke" || "Clouds" || "Thunderstorm"
      ? "hover:bg-gray-100 hover:text-black"
      : "hover:bg-gray-100";

  return (
    <>
      <ul className="absolute left-0 right-0 mb-5 p-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl max-h-60 overflow-x-y-auto z-10">
        {error ? (
          <p className={`text-lg px-4 ${txtColor} py-2`}>Not Found</p>
        ) : loading ? (
          <p className={`text-lg px-4 ${txtColor} py-2`}>Loading...</p>
        ) : suggestions && suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer ${txtColor} ${bgColor}`}
              onClick={() => onClick(item.city)}
            >
              {item.city}, {item.region}, {item.country}
            </li>
          ))
        ) : (
          <p className={`text-xl ${txtColor} px-4 py-2`}>No suggestions</p>
        )}
      </ul>
    </>
  );
};

export default SearchSuggestions;
