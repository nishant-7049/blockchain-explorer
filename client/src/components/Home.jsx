import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlertedAddressDetails,
  getEtherPrice,
} from "../store/slices/etherSlice";
import { RiLoginBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { loadUser } from "../store/slices/userSlice";
import AddressCard from "./AddressCard";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, etherPrice, userAddressDetails } = useSelector(
    (state) => state.ether
  );
  const { isAuthenticated, profile } = useSelector((state) => state.user);

  useEffect(() => {
    if (!etherPrice) {
      dispatch(getEtherPrice());
    }
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    if (isAuthenticated && !userAddressDetails) {
      dispatch(getAlertedAddressDetails());
    }
  }, [profile]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="relative  bg-[url('/bg.jpg')] bg-cover bg-blend-lighten">
            <div className="bg-black bg-opacity-30">
              <div className="h-[50vh] flex flex-col gap-4 items-center justify-center">
                <div className="w-1/2 mx-auto ">
                  <SearchBar pad={4} />
                </div>
                <div className="w-1/2">
                  <h2 className="text-[#2c3e50]  font-bold   bg-white p-2 rounded-lg w-fit">
                    Current Ether Price: $
                    {Number(etherPrice && etherPrice.usdPrice).toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="my-12 mx-20">
              <h1 className="text-xl mb-4 text-[#2c3e50] font-bold">
                Alerted Addressess:
              </h1>
              <div className="flex flex-col gap-4">
                {userAddressDetails &&
                  userAddressDetails.map((add) => {
                    return (
                      <AddressCard
                        key={add.address}
                        address={add.address}
                        balance={add.balance.balance}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="my-12  text-[#2c3e50] flex flex-col items-center gap-2">
              <Link to="/login">
                <RiLoginBoxLine className="text-3xl" />
              </Link>

              <p className="text-center  text-lg font-semibold">
                Login to get alerted addressess.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
