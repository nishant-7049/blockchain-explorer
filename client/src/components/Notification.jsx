import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../store/slices/navigationSlice";
import Loader from "./Loader";

const Notification = () => {
  const dispatch = useDispatch();
  const { loading, error, notifications } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    dispatch(getUserNotifications());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-20 my-8">
          <h1 className="text-xl text-[#2c3e50] font-bold">Notifications:</h1>
          <div className="flex flex-col gap-4">
            {notifications &&
              notifications.map((notify) => {
                return (
                  <NotificationCard key={notify._id} notification={notify} />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
