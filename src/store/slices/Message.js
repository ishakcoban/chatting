import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message:false
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeState(state) {
      state.message = !(state.message);
    },
    
  },
});
export const MessageActions = MessageSlice.actions;
export default MessageSlice;