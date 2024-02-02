import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ConvertError from "../ConvertError";

export const getUserNotifications = createAsyncThunk(
  "getUserNotifications",
  () => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://etherexplorer.onrender.com/api/notify",
        config
      );
      return data;
    };
    return ConvertError(fetchData);
  }
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    loading: false,
    error: null,
    notifications: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload.notifications;
    });
    builder.addCase(getUserNotifications.rejected, (state, action) => {
      state.loading = false;
      state.notifications = action.error.message;
    });
  },
});

export const { clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
