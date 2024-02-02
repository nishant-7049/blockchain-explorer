import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../store/slices/navigationSlice";
import { useParams } from "react-router-dom";

const NotificationPage = () => {
  const { notificationId } = useParams();
  const { notifications } = useSelector((state) => state.notification);
  const [noti, setNoti] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications) {
      const curNot = notifications.filter((not) => not._id == notificationId);
      setNoti(curNot[0]);
    } else {
      dispatch(getUserNotifications());
    }
  }, [notifications]);
  return (
    <>
      {noti && (
        <div className="mx-20 my-3">
          <h1 className="text-xl font-bold text-[#2c3e50]">{noti.title}</h1>
          <p className="">{noti.body}</p>
          <div className="flex flex-col gap-4 my-6">
            <div className="flex gap-2">
              <h3 className="text-[#2c3e50] font-semibold">From Address:</h3>
              <p className="text-gray-400">{noti.fromAddress}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="text-[#2c3e50] font-semibold">To Address:</h3>
              <p className="text-gray-400">{noti.toAddress}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="text-[#2c3e50] font-semibold">
                Balance Transfered:
              </h3>
              <p className="text-gray-400">{noti.value / 1e18}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="text-[#2c3e50] font-semibold">Gas Used:</h3>
              <p className="text-gray-400">{noti.gas / 1e18}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="text-[#2c3e50] font-semibold">
                Transaction Hash:
              </h3>
              <p className="text-gray-400">{noti.hash}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPage;
