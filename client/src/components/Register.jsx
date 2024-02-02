import React, { useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, registerUser } from "../store/slices/userSlice";
import Loader from "./Loader.jsx";

const Register = () => {
  const [hidePass, setHidePass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [pass, setPass] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const options = {
      username: name,
      email,
      phone,
      password: pass,
    };
    dispatch(registerUser(options));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error]);

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
            <h1 className="font-bold text-xl text-[#2c3e50] mb-4">Register</h1>
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
              />
            </div>
            <div className="flex gap-2 items-center justify-between relative">
              <label className="font-semibold text-[#2c3e50]">Pass: </label>
              <input
                className="w-4/5 border-2 p-2 pr-4"
                type={`${hidePass ? "password" : "text"}`}
                required
                placeholder="Enter password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <button
                className="absolute right-3"
                type="button"
                onClick={() => {
                  setHidePass(!hidePass);
                }}
              >
                {hidePass ? (
                  <IoIosEyeOff className="text-[#2c3e50] font-bold text-lg" />
                ) : (
                  <IoIosEye className="text-[#2c3e50] font-bold text-lg" />
                )}
              </button>
            </div>
            <Link
              to="/login"
              className="text-[#2c3e50] font-semibold text-sm ml-auto mr-12"
            >
              Login
            </Link>
            <input
              type="submit"
              className="border-[#2c3e50] mt-4 border-2 px-4 py-2 bg-[#2c3e50] text-[#ecf0f1] font-semibold hover:text-[#2c3e50] hover:bg-[#ecf0f1]"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
