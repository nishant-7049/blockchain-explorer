import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ pad }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <form className="w-full flex items-center rounded-lg flex-auto">
      <input
        type="text"
        placeholder="Search account by Ethereum address."
        className={`${
          pad ? "p-" + pad : "p-1 pr-8"
        } rounded-md w-full border-2 text-black`}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          navigate(`/account/${searchText}`);
        }}
        className="text-xl text-[#2c3e50] relative right-7 cursor-pointer"
      >
        <IoMdSearch />
      </button>
    </form>
  );
};

export default SearchBar;
