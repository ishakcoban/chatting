import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/Auth";
import PopupReducer from "./slices/Popup";
import MessageReducer from "./slices/Message";
import FriendRequestReducer from "./slices/FriendRequest";
import NotificationReducer from "./slices/Notification";
import DropdownReducer from "./slices/LeftSideDropdown"
import FocusInputReducer from "./slices/HomeSectionInputFocus";

const store = configureStore({
    reducer:{auth :AuthReducer.reducer,
        popup:PopupReducer.reducer,
        message:MessageReducer.reducer,
        request:FriendRequestReducer.reducer,
        notification:NotificationReducer.reducer,
        dropdown:DropdownReducer.reducer,
        focusInput:FocusInputReducer.reducer
    } 
})

export default store;