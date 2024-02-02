import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUser,
  sendServiceWorkerSubscription,
} from "./store/slices/userSlice.jsx";
import Profile from "./components/Profile.jsx";
import Address from "./components/Address.jsx";
import Notification from "./components/Notification.jsx";
import NotificationPage from "./components/NotificationPage.jsx";

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account/:address" element={<Address />} />
        <Route path="/notification" element={<Notification />} />
        <Route
          path="/notification/:notificationId"
          element={<NotificationPage />}
        />
      </Routes>
    </>
  );
}

export default App;
