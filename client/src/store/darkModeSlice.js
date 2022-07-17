import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => {
      return !state;
    },
  },
});

export default darkModeSlice;

export const darkModeSliceAction = darkModeSlice.actions;
