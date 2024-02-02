import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ConvertError from "../ConvertError";

export const loadUser = createAsyncThunk("loadUser", async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    "https://etherexplorer.onrender.com/api/detail/me",
    config
  );
  return data;
});

export const registerUser = createAsyncThunk("registerUser", (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const fetchData = async () => {
    const { data } = await axios.post(
      "https://etherexplorer.onrender.com/api/register",
      options,
      config
    );
    return data;
  };
  return ConvertError(fetchData);
});

export const loginUser = createAsyncThunk("loginUser", (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const fetchData = async () => {
    const { data } = await axios.post(
      "https://etherexplorer.onrender.com/api/login",
      options,
      config
    );
    return data;
  };
  return ConvertError(fetchData);
});

export const updateUser = createAsyncThunk("updateUser", (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const fetchData = async () => {
    const { data } = await axios.put(
      "https://etherexplorer.onrender.com/api/update/profile",
      options,
      config
    );
    return data;
  };
  return ConvertError(fetchData);
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    "https://etherexplorer.onrender.com/api/logout",
    config
  );
  return data;
});

export const sendServiceWorkerSubscription = createAsyncThunk(
  "sendServiceWorkerSubscription",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      "https://etherexplorer.onrender.com/api/notify/subscribe",
      options,
      config
    );
    return data;
  }
);

const userSlice = createSlice({
  name: "UserSlice",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    profile: null,
    message: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.profile = action.payload.user;
        state.isAuthenticated = action.payload.success;
      } else {
        state.error = action.payload.message;
      }
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
      state.profile = null;
      loadUser();
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
      state.isAuthenticated = action.payload.success;
      loadUser();
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(sendServiceWorkerSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      sendServiceWorkerSubscription.fulfilled,
      (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      }
    );
    builder.addCase(sendServiceWorkerSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      loadUser();
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
