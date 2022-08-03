import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification:''
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeState(state,action) {
      state.notification = action.payload;
    },
    
  },
});
export const NotificationActions = NotificationSlice.actions;
export default NotificationSlice;