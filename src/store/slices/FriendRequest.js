import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  request: 'Add'
};

const FriendRequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    control(state) {

      state.popup = !(state.popup);
    },
    
  },
});
export const FriendRequestActions = FriendRequestSlice.actions;
export default FriendRequestSlice;