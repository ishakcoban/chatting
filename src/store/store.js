import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";

const store = configureStore({
    reducer:{auth :AuthReducer.reducer} 
})

export default store;