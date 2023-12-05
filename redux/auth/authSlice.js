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
    editProfile: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.fullName = action.payload.fullName;
    },
  },
});

export const { login, logout, editProfile } = authSlice.actions;
export default authSlice.reducer;
