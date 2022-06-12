import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/Auth";
import PopupReducer from "./slices/Popup";

const store = configureStore({
    reducer:{auth :AuthReducer.reducer,popup:PopupReducer.reducer} 
})

export default store;