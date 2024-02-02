import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import etherSlice from "./slices/etherSlice";
import notificationSlice from "./slices/navigationSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ether: etherSlice,
    notification: notificationSlice,
  },
});

export default store;
