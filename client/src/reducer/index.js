import {combineReducers} from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";

const rootReducer  = combineReducers({
    auth: authReducer,
    
})

export default rootReducer