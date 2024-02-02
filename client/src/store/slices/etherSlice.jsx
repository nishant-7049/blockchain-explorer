import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ConvertError from "../ConvertError";

export const getEtherPrice = createAsyncThunk("getEtherPrice", () => {
  const fetchData = async () => {
    const { data } = await axios.get("/api/ether/getEthPrice");
    return data;
  };
  return ConvertError(fetchData);
});

export const getAccountDetails = createAsyncThunk(
  "getAccountDetails",
  (address) => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/ether/address/detail/${address}`);
      return data;
    };
    return ConvertError(fetchData);
  }
);

export const getEtherAddress = createAsyncThunk(
  "getEtherAddress",
  (address) => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      const { data } = await axios.get(`/api/address/${address}`, config);
      return data;
    };
    return ConvertError(fetchData);
  }
);

export const setAddressAlert = createAsyncThunk(
  "setAddressAlert",
  (address) => {
    const config = {
      withCredentials: true,
    };
    const fetchData = async () => {
      const { data } = await axios.put(
        `/api/address/setAddressAlert/${address}`,
        {},
        config
      );
      return data;
    };
    return ConvertError(fetchData);
  }
);

export const getAlertedAddressDetails = createAsyncThunk(
  "getAlertedAddressDetails",
  () => {
    const config = {
      withCredentials: true,
    };
    const fetchData = async () => {
      const { data } = await axios.get("/api/ether/address/detail", config);
      return data;
    };
    return ConvertError(fetchData);
  }
);

const etherSlice = createSlice({
  name: "EtherSlice",
  initialState: {
    loading: false,
    addressLoading: false,
    error: null,
    etherPrice: null,
    accountBalance: null,
    transactionCount: null,
    transactions: null,
    tokenBalance: null,
    etherAddress: null,
    addressAlertUpdated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsAddressAlertUpdated: (state) => {
      state.addressAlertUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEtherPrice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEtherPrice.fulfilled, (state, action) => {
      state.loading = false;
      state.etherPrice = action.payload.etherPrice;
    });
    builder.addCase(getEtherPrice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAccountDetails.pending, (state) => {
      state.addressLoading = true;
    });
    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      state.addressLoading = false;
      state.accountBalance = action.payload.balance;
      state.transactionCount = action.payload.transactionCount;
      state.transactions = action.payload.transactions;
      state.tokenBalance = action.payload.tokenBalance;
    });
    builder.addCase(getAccountDetails.rejected, (state, action) => {
      state.addressLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getEtherAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEtherAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.etherAddress = action.payload.address;
    });
    builder.addCase(getEtherAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setAddressAlert.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setAddressAlert.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.addressAlertUpdated = action.payload.success;
    });
    builder.addCase(setAddressAlert.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAlertedAddressDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAlertedAddressDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userAddressDetails = action.payload.addressessDetails;
    });
    builder.addCase(getAlertedAddressDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError, resetIsAddressAlertUpdated } = etherSlice.actions;
export default etherSlice.reducer;
