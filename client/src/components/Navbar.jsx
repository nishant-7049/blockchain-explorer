import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEthereum, FaRegUserCircle } from "react-icons/fa";

import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="bg-[#2c3e50] text-[#ecf0f1] py-4 px-8  flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <FaEthereum className="text-2xl" />
        <Link to="/" className="font-bold text-xl">
          ETHER EXPLORER
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-between gap-4">
        <SearchBar />

        <Link to="/" className="font-semibold">
          Home
        </Link>
        {isAuthenticated && (
          <Link to="/notification" className="font-semibold">
            Notifications
          </Link>
        )}
        {isAuthenticated ? (
          <Link to="/profile">
            <FaRegUserCircle className="text-2xl" />
          </Link>
        ) : (
          <Link to="/login" className="font-semibold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
