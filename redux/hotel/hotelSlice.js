import { createSlice } from "@reduxjs/toolkit";
import { getLocation } from "./hotelAction";

const initialState = {
  wishlists: [],
  listHotels: [],
  isLoading: false,
  error: null,
  location: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location = action.payload;
    });
  },
});

export default hotelSlice.reducer;
