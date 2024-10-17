import React from "react";

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full flex">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder="Hotels with rooftop pool near..."
        className="py-2 px-4 w-full mr-5 bg-[#f7f8f9] focus:outline-none focus:border"
      />
      <button
        onClick={handleSearch}
        className="bg-[#1e73be] px-4 py-2 text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
