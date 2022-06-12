import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authentication: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : false,
  userID: localStorage.getItem("userID")
    ? JSON.parse(localStorage.getItem("userID"))
    : null,
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.authentication = true;
      state.userID = action.payload;
      localStorage.setItem("token", JSON.stringify(state.authentication));
      localStorage.setItem("userID", JSON.stringify(state.userID));
    },
    logout(state) {
      state.authentication = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
    },
  },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice;