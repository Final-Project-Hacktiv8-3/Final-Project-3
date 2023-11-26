import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY,
    "X-RapidAPI-Host": process.env.EXPO_PUBLIC_API_HOST,
  },
});