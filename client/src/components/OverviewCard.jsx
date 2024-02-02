import React, { useEffect, useState } from "react";
import TokenCard from "./TokenCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const OverviewCard = ({ accountDetails }) => {
  const [tokenBalance, setTokenBalance] = useState();
  const [showTokens, setShowTokens] = useState(false);
  return (
    <div className="rounded-lg border-2 w-3/5 p-4 bg-[#2c3e50] text-[#ecf0f1] flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Overview</h3>
      <div className="flex gap-2">
        <p className="font-semibold">Ether Balance: </p>
        <p>
          {accountDetails &&
            accountDetails.accountBalance &&
            accountDetails.accountBalance.balance / Math.pow(10, 18)}{" "}
          ETH
        </p>
      </div>
      <div
        onClick={() => {
          setShowTokens(!showTokens);
        }}
        className="border-2 text-[#2c3e50] px-2 py-1 flex justify-between items-center bg-white "
      >
        <p>
          ERC-20 Tokens (
          {accountDetails &&
            accountDetails.tokenBalance &&
            accountDetails.tokenBalance.length}
          )
        </p>
        {showTokens ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {showTokens && (
        <div className="bg-white max-h-32 overflow-y-auto ">
          {accountDetails &&
            accountDetails.tokenBalance.map((token) => {
              return <TokenCard token={token} />;
            })}
        </div>
      )}
    </div>
  );
};

export default OverviewCard;
