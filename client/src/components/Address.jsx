import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAccountDetails,
  getEtherAddress,
  setAddressAlert,
  resetIsAddressAlertUpdated,
} from "../store/slices/etherSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import OverviewCard from "./OverviewCard.jsx";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { RiLoginBoxFill } from "react-icons/ri";

const Address = () => {
  const [isAlerted, setIsAlerted] = useState(false);
  const { address } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    addressLoading,
    etherAddress,
    addressAlertUpdated,
    transactions,
    accountBalance,
    tokenBalance,
  } = useSelector((state) => state.ether);
  const { profile, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!etherAddress) {
      dispatch(getEtherAddress(address));
    }
    dispatch(getAccountDetails(address));
  }, []);
  useEffect(() => {
    if (etherAddress && profile) {
      setIsAlerted(etherAddress.users.includes(profile._id));
    }
  }, [etherAddress, profile]);
  useEffect(() => {
    if (addressAlertUpdated) {
      dispatch(getEtherAddress(address));
      dispatch(resetIsAddressAlertUpdated());
    }
  }, [addressAlertUpdated]);
  return (
    <>
      {loading || addressLoading ? (
        <Loader />
      ) : (
        <>
          {error && error.slice(0, 7) == "[C0005]" ? (
            <div className="h-[10vh] flex gap-2 justify-center items-center">
              <h1 className="text-2xl font-bold text-[#2c3e50]">
                Invalid Address:
              </h1>
              <p className="text-2xl text-semibold text-gray-400">{address}</p>
            </div>
          ) : (
            <div className="mx-20">
              <div className="my-4 flex gap-2 text-lg  ">
                <h2 className="text-[#2c3e50] font-semibold">Address: </h2>
                <h2 className="text-gray-400">{address}</h2>
              </div>
              <div className="flex gap-24">
                <OverviewCard
                  accountDetails={{
                    accountBalance,
                    tokenBalance,
                  }}
                />
                {isAuthenticated ? (
                  <button
                    className="flex flex-col items-center"
                    onClick={() => {
                      dispatch(setAddressAlert(address));
                    }}
                  >
                    {!etherAddress ? (
                      <FaToggleOff className="text-4xl  text-[#2c3e50] " />
                    ) : isAlerted ? (
                      <FaToggleOn className="text-4xl  text-[#2c3e50] " />
                    ) : (
                      <FaToggleOff className="text-4xl  text-[#2c3e50] " />
                    )}
                    <p className="text-[#2c3e50] font-semibold">set alerts</p>
                  </button>
                ) : (
                  <Link to="/login" className="flex flex-col items-center">
                    <RiLoginBoxFill className="text-red-800 text-3xl" />

                    <p className="text-red-800 font-semibold">
                      Login to set alerts.
                    </p>
                  </Link>
                )}
              </div>

              <h2 className="text-[#2c3e50] mt-8 text-lg font-bold">
                Transactions
              </h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-[#2c3e50] text-white">
                      Transaction Hash
                    </th>
                    <th className="bg-[#2c3e50] text-white">Method</th>
                    <th className="bg-[#2c3e50] text-white">Block</th>
                    <th className="bg-[#2c3e50] text-white">Age</th>
                    <th className="bg-[#2c3e50] text-white">From</th>
                    <th className="bg-[#2c3e50] text-white"></th>
                    <th className="bg-[#2c3e50] text-white">To</th>
                    <th className="bg-[#2c3e50] text-white">Value</th>
                    <th className="bg-[#2c3e50] text-white">Txs Free</th>
                  </tr>
                </thead>
                {transactions &&
                  transactions.result.map((tx) => {
                    return (
                      <tr>
                        <td className="mx-1 text-sm text-center">
                          {tx.hash.slice(0, 16)}...
                        </td>
                        <td className="mx-1 text-sm text-center">
                          <span>
                            {tx.decoded_call
                              ? tx.decoded_call.label
                              : "Unknown"}
                          </span>
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {tx.block_number}
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {
                            new Date(tx.block_timestamp)
                              .toISOString()
                              .split("T")[0]
                          }
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {tx.from_address.slice(0, 8)}...
                          {tx.from_address.slice(34)}
                        </td>
                        <td className="mx-1 text-sm text-center">
                          <span>
                            {tx.from_address.toLowerCase() !== address
                              ? "IN"
                              : "OUT"}
                          </span>
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {tx.to_address.slice(0, 8)}...
                          {tx.to_address.slice(34)}
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {(tx.value / 10 ** 18).toFixed(5)} ETH
                        </td>
                        <td className="mx-1 text-sm text-center">
                          {(tx.gas_price / 10 ** 18).toFixed(12)}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Address;
