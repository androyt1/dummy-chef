// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/userSlice"; // adjust this import as needed

export const rootReducer = combineReducers({
    auth: authReducer,
    // add other reducers here
});
