import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { getTodayDate, getTomorrowDate } from "../../utils/Date";

export const getLocation = createAsyncThunk(
  "hotel/getLocation",
  async ({ cityName }) => {
    try {
      const response = await axiosInstance.get("/locations/auto-complete", {
        params: {
          text: cityName,
          languagecode: "id",
        },
      });
      const destination = response.data.filter((item) => {
        return item.cc1 === "id";
      });
      // console.log(destination);

      return destination;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getHotelByLocation = createAsyncThunk(
  "getHotels",
  async (
    {
      dest_id,
      arrival_date,
      departure_date,
      guest_qty,
      room_qty,
      order_by,
      offset = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/properties/list`, {
        params: {
          offset: 0,
          arrival_date: arrival_date ? arrival_date : getTodayDate(),
          departure_date: departure_date ? departure_date : getTomorrowDate(),
          guest_qty: guest_qty ? guest_qty : 1,
          dest_ids: dest_id,
          room_qty: room_qty ? room_qty : 1,
          order_by: order_by ? order_by : "",
          search_type: "city",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
