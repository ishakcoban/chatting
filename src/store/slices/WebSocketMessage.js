import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: null
};

const WebSocketMessageSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    changeState(state,action) {

      state.msg = action.payload;
    },

  },
});

export const WebSocketMessageActions = WebSocketMessageSlice.actions;
export default WebSocketMessageSlice;