import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "johndoe@gmail.com",
  username: "johndoe",
  password: "123456",
  fullName: "John Doe",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
