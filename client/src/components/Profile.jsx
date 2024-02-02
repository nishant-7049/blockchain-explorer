import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, updateUser } from "../store/slices/userSlice";
import Loader from "./Loader";

const Profile = () => {
  const [hidePass, setHidePass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();

  const { loading, profile } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const options = {
      username: name,
      email,
      phone,
    };
    dispatch(updateUser(options));
  };

  useEffect(() => {
    if (profile) {
      setName(profile.username);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  }, [profile]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-[90vh] w-full flex justify-center items-center">
          <form
            className="w-1/4 p-4  shadow-xl  flex flex-col gap-4 items-center"
            onSubmit={submitHandler}
          >
            <h1 className="font-bold text-xl text-[#2c3e50] mb-4">Profile</h1>
            <div className="flex gap-2 items-center justify-between">
              <label className="font-semibold text-[#2c3e50]">Name: </label>
              <input
                className="w-4/5 border-2 p-2"
                type="text"
                required
                minLength={3}
                maxLength={40}
                placeholder="Enter Username"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label className="font-semibold text-[#2c3e50]">Email: </label>
              <input
                className="w-4/5 border-2 p-2"
                type="email"
                required
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label className="font-semibold text-[#2c3e50]">Phone: </label>
              <input
                className="w-4/5 border-2 p-2"
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="Enter phone no."
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="submit"
                value={"Save"}
                className="border-[#2c3e50] mt-4 border-2 px-4 py-2 bg-[#2c3e50] text-[#ecf0f1] font-semibold hover:text-[#2c3e50] hover:bg-[#ecf0f1]"
              />
              <button
                className="border-red-700 mt-4 border-2 px-4 py-2 bg-red-700 text-[#ecf0f1] font-semibold hover:text-red-700 hover:bg-[#ecf0f1]"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
