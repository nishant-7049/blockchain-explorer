import React from "react";
import { Link } from "react-router-dom";

const NotificationCard = ({ notification }) => {
  return (
    <div className="border-2 border-[#2c3e50] p-4 rounded-lg">
      {notification && (
        <div>
          <Link
            to={`/notification/${notification._id}`}
            className="text-lg text-[#2c3e50] font-semibold underline"
          >
            {notification.title}
          </Link>
          <p className="text-sm text-gray-400">{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
