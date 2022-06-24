import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification:false
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeState(state) {
      state.notification = !(state.notification);
    },
    
  },
});
export const NotificationActions = NotificationSlice.actions;
export default NotificationSlice;