import { createSlice } from "@reduxjs/toolkit";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let Sock = new SockJS('http://localhost:8080/ws');

const initialState = {
  stompClient: over(Sock)
};

const WebSocketClientSlice = createSlice({
  name: "stompClient",
  initialState,
  reducers: {},
});


export const WebSocketClientActions = WebSocketClientSlice.actions;
export default WebSocketClientSlice;