import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";

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
      console.log(destination);

      return destination;
    } catch (error) {
      console.log(error);
    }
  }
);
