import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup:false
};

const PopupSlice = createSlice({
  name: "Popup",
  initialState,
  reducers: {
    changeState(state) {
      state.popup = !(state.popup);
    },
    
  },
});
export const PopupActions = PopupSlice.actions;
export default PopupSlice;