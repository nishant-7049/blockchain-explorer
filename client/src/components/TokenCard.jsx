import React from "react";

const TokenCard = ({ token }) => {
  return (
    <div className="flex justify-between items-center text-black text-sm p-2">
      <div className="flex items-center">
        <img className="w-10" src={token.logo} />
        <p>{token.name}</p>
        <p>[{token.symbol}]</p>
      </div>
      <p>{token.balance} WEI</p>
    </div>
  );
};

export default TokenCard;
