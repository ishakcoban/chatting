import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  focusInput:0
};

const focusInputSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    changeState(state,action) {
      state.focusInput = action.payload;
    },
    
  },
});
export const focusInputActions = focusInputSlice.actions;
export default focusInputSlice;