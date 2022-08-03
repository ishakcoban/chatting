import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dropdown:true
};

const DropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    changeState(state,action) {
      state.dropdown = action.payload;
    },
    
  },
});
export const DropdownActions = DropdownSlice.actions;
export default DropdownSlice;