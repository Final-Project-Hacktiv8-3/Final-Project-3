import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listHistory: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action) => {
        const { price,image,title,rating } = action.payload;
        state.listHistory.push(action.payload);
    }
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
