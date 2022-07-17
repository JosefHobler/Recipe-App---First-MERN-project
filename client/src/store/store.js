import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./darkModeSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
  },
});

export default store;
