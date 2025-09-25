import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = ({ onSearch, weather }) => {
  const [inputValue, setInputValue] = useState("");

  //To Enable suggestions on Searchbar click
  const [suggestionsBox, setSuggestionBox] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      setSuggestionBox(false);
    }
  };

  const HandleClick = () => {
    onSearch(inputValue);
    setSuggestionBox(false);
  };

  return (
    <>
      <div className="flex items-center bg-white/20 rounded-full px-4 py-3 mb-6">
        <input
          value={inputValue}
          type="text"
          placeholder="Search City"
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            setSuggestionBox(value.trim() !== "");
          }}
          onKeyDown={handleKeyDown}
          className="bg-transparent relative flex-1 text-sm text-white placeholder-white/70 placeholder:text-lg focus:outline-none"
        />
        <button onClick={HandleClick}>
          <FaSearch className="w-5 h-4 text-white cursor-pointer" />
        </button>
      </div>
      {suggestionsBox ? (
        <SearchSuggestions
          InputValue={inputValue}
          onClick={(selectedCity) => {
            setInputValue(selectedCity);
            onSearch(selectedCity);
            setSuggestionBox(false);
          }}
          weather={weather}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SearchBar;
