import React from "react";
import { Link } from "react-router-dom";

const AddressCard = ({ address, balance }) => {
  return (
    <div className="border-4 text-[#2c3e50] border-[#2c3e50] w-3/5 p-4 rounded-xl">
      <Link to={`/account/${address}`} className="text-lg font-bold underline">
        {address}
      </Link>
      <div className="flex gap-2">
        <h2 className="font-semibold">Balance: </h2>
        <p className="text-gray-400">{balance / 1e18} ETH</p>
      </div>
    </div>
  );
};

export default AddressCard;
