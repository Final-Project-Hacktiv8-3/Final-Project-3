import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "../hotel/hotelSlice";

export const store = configureStore({
  reducer: { hotel: hotelSlice },
});
