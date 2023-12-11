import { createSlice } from "@reduxjs/toolkit";
import { getHotelByLocation, getLocation } from "./hotelAction";

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
    builder.addCase(getHotelByLocation.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getHotelByLocation.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getHotelByLocation.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listHotels = payload;
      state.error = null;
    });
  },
});

export default hotelSlice.reducer;
