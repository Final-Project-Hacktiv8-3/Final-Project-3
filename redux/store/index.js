import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "../hotel/hotelSlice";
import authSlice from "../auth/authSlice";

export const store = configureStore({
  reducer: { hotel: hotelSlice, auth: authSlice },
});
